import rosterData from "../../data/roster.json";
import { prisma } from "./db";

export type Participant = {
  handle: string;
  displayName: string;
  campus: string;
  skills: string[];
  bio: string;
  pmUrl: string | null;
  commsUrl: string | null;
  pmRepo: string | null;
  commsRepo: string | null;
  showcaseUrl: string | null;
  showcaseRepo: string | null;
  optIn: boolean;
};

export type RosterMeta = {
  cohortId: string;
  cohortName: string;
  term: string;
  updatedAt: string;
  participants: Participant[];
};

export function getRosterMeta(): RosterMeta {
  return rosterData as RosterMeta;
}

export function getAllParticipants(): Participant[] {
  return getRosterMeta().participants;
}

export function getParticipant(handle: string): Participant | undefined {
  const key = handle.toLowerCase();
  return getAllParticipants().find((p) => p.handle.toLowerCase() === key);
}

export async function getOptOutHandles(): Promise<Set<string>> {
  try {
    const rows = await prisma.privacyOptOut.findMany({ select: { handle: true } });
    return new Set(rows.map((r) => r.handle.toLowerCase()));
  } catch {
    return new Set();
  }
}

export async function resolvePublicParticipant(
  handle: string
): Promise<{ participant: Participant; private: boolean } | null> {
  const participant = getParticipant(handle);
  if (!participant) return null;
  const optOuts = await getOptOutHandles();
  const isPrivate = optOuts.has(participant.handle.toLowerCase()) || !participant.optIn;
  return { participant, private: isPrivate };
}

export function githubUrl(handle: string): string {
  return `https://github.com/${handle}`;
}

export function githubAvatar(handle: string): string {
  return `https://github.com/${handle}.png?size=200`;
}

export function portfolioLinks(p: Participant) {
  const links: { label: string; href: string }[] = [
    { label: "GitHub", href: githubUrl(p.handle) },
  ];
  if (p.pmUrl) links.push({ label: "PM deploy", href: p.pmUrl });
  if (p.pmRepo) links.push({ label: "PM repo", href: p.pmRepo });
  if (p.commsUrl) links.push({ label: "Comms deploy", href: p.commsUrl });
  if (p.commsRepo) links.push({ label: "Comms repo", href: p.commsRepo });
  if (p.showcaseUrl) links.push({ label: "Showcase deploy", href: p.showcaseUrl });
  if (p.showcaseRepo) links.push({ label: "Showcase repo", href: p.showcaseRepo });
  return links;
}
