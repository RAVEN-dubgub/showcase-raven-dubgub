import {
  getAllParticipants,
  getOptOutHandles,
  getRosterMeta,
  type Participant,
} from "./roster";

export type WorkRow = {
  week: string;
  weekOrder: number;
  project: string;
  handle: string;
  displayName: string;
  liveUrl: string;
};

const PROJECTS = [
  {
    week: "Week 1",
    weekOrder: 1,
    project: "Project management platform",
    urlKey: "pmUrl" as const,
  },
  {
    week: "Week 2",
    weekOrder: 2,
    project: "Internal communications",
    urlKey: "commsUrl" as const,
  },
  {
    week: "Week 3",
    weekOrder: 3,
    project: "Hiring-partner showcase",
    urlKey: "showcaseUrl" as const,
  },
];

function rowsForParticipant(p: Participant): WorkRow[] {
  const rows: WorkRow[] = [];
  for (const proj of PROJECTS) {
    const liveUrl = p[proj.urlKey];
    if (!liveUrl) continue;
    rows.push({
      week: proj.week,
      weekOrder: proj.weekOrder,
      project: proj.project,
      handle: p.handle,
      displayName: p.displayName,
      liveUrl,
    });
  }
  return rows;
}

/** Public live-deploy index for partners (privacy opt-outs excluded). */
export async function getWorkIndex(): Promise<{
  rows: WorkRow[];
  updatedAt: string;
  liveCount: number;
  builderCount: number;
}> {
  const optOuts = await getOptOutHandles();
  const publicParticipants = getAllParticipants().filter(
    (p) => p.optIn && !optOuts.has(p.handle.toLowerCase())
  );

  const rows = publicParticipants
    .flatMap(rowsForParticipant)
    .sort((a, b) => a.weekOrder - b.weekOrder || a.handle.localeCompare(b.handle));

  const builders = new Set(rows.map((r) => r.handle));

  return {
    rows,
    updatedAt: getRosterMeta().updatedAt,
    liveCount: rows.length,
    builderCount: builders.size,
  };
}

/** Cheap deploy evidence summary for student cards. */
export function deployEvidence(p: Participant): {
  count: number;
  labels: string[];
} {
  const labels: string[] = [];
  if (p.pmUrl) labels.push("PM");
  if (p.commsUrl) labels.push("Comms");
  if (p.showcaseUrl) labels.push("Showcase");
  return { count: labels.length, labels };
}
