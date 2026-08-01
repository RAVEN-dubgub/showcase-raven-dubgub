import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntroForm } from "@/components/intro-form";
import {
  getAllParticipants,
  githubAvatar,
  githubUrl,
  portfolioLinks,
  resolvePublicParticipant,
} from "@/lib/roster";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return getAllParticipants().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const resolved = await resolvePublicParticipant(handle);
  if (!resolved) return { title: "Student not found" };
  if (resolved.private) {
    return {
      title: `@${resolved.participant.handle} (private)`,
      description: "This student opted out of the public showcase.",
    };
  }
  const p = resolved.participant;
  return {
    title: `${p.displayName} (@${p.handle})`,
    description: p.bio,
    openGraph: {
      title: `${p.displayName} · Hult Cohort Showcase`,
      description: p.bio,
      images: [githubAvatar(p.handle)],
    },
  };
}

export default async function StudentProfilePage({ params }: Props) {
  const { handle } = await params;
  const resolved = await resolvePublicParticipant(handle);
  if (!resolved) notFound();
  const { participant: p, private: isPrivate } = resolved;

  if (isPrivate) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="jarvis-metric-label">Privacy</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-50">
          @{p.handle} is private
        </h1>
        <p className="mt-4 text-slate-300">
          This participant opted out of the public marketing showcase. Contact the
          placement lead if you have an active hiring conversation already in progress.
        </p>
        <Link href="/students" className="mt-8 inline-block font-semibold holo-text-link">
          ← Back to students
        </Link>
      </div>
    );
  }

  const links = portfolioLinks(p);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <div className="flex flex-wrap items-start gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={githubAvatar(p.handle)}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border border-cyan-400/30 bg-slate-900"
            />
            <div>
              <p className="jarvis-status-line">
                {p.campus} · {siteConfig.term}
              </p>
              <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-50">
                {p.displayName}
              </h1>
              <a
                href={githubUrl(p.handle)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block font-semibold text-slate-400 hover:text-cyan-300"
              >
                @{p.handle} on GitHub →
              </a>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {p.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.skills.map((s) => (
              <span key={s} className="holo-pill">
                {s}
              </span>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-slate-50">
            Portfolio evidence
          </h2>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold holo-text-link hover:underline"
                >
                  {l.label}: {l.href}
                </a>
              </li>
            ))}
          </ul>

          <div className="holo-panel mt-8 p-4 text-sm text-slate-400">
            <p className="font-semibold text-slate-100">PM integration</p>
            <p className="mt-1">
              Cohort project status snapshot:{" "}
              <Link href="/status" className="holo-text-link hover:underline">
                /status
              </Link>
              . Author PM:{" "}
              <a
                href={siteConfig.pmUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {siteConfig.pmUrl}
              </a>
              . Operating winner Forth:{" "}
              <a
                href={siteConfig.forthUrl}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {siteConfig.forthUrl}
              </a>
              .
            </p>
          </div>
        </div>

        <aside id="request-intro" className="jarvis-panel p-5">
          <h2 className="relative z-[1] text-2xl font-semibold text-slate-50">
            Request intro
          </h2>
          <p className="relative z-[1] mt-2 text-sm text-slate-400">
            Placement lead is emailed within about a minute when Resend or SMTP is
            configured; you also get a short confirmation. Otherwise it is queued in the
            showcase database.
          </p>
          <div className="relative z-[1] mt-4">
            <IntroForm defaultStudents={p.handle} />
          </div>
        </aside>
      </div>
    </div>
  );
}
