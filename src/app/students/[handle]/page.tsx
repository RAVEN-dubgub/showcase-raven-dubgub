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
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
          Privacy
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">
          @{p.handle} is private
        </h1>
        <p className="mt-4 text-[var(--ink-soft)]">
          This participant opted out of the public marketing showcase. Contact the
          placement lead if you have an active hiring conversation already in progress.
        </p>
        <Link href="/students" className="mt-8 inline-block font-semibold text-[var(--magenta)]">
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
              className="h-24 w-24 rounded-full border border-[var(--line)] bg-[var(--cream-deep)]"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--magenta)]">
                {p.campus} · {siteConfig.term}
              </p>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-4xl">
                {p.displayName}
              </h1>
              <a
                href={githubUrl(p.handle)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block font-semibold text-[var(--ink-soft)] hover:text-[var(--magenta)]"
              >
                @{p.handle} on GitHub →
              </a>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
            {p.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-[var(--sage-soft)] px-3 py-1 text-xs font-semibold text-[var(--sage)]"
              >
                {s}
              </span>
            ))}
          </div>

          <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
            Portfolio evidence
          </h2>
          <ul className="mt-4 space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--magenta)] hover:underline"
                >
                  {l.label}: {l.href}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-[var(--line)] bg-white/60 p-4 text-sm text-[var(--ink-soft)]">
            <p className="font-semibold text-[var(--ink)]">PM integration</p>
            <p className="mt-1">
              Cohort project status snapshot:{" "}
              <Link href="/status" className="text-[var(--magenta)] hover:underline">
                /status
              </Link>
              . Author PM:{" "}
              <a href={siteConfig.pmUrl} target="_blank" rel="noreferrer" className="underline">
                {siteConfig.pmUrl}
              </a>
              . Operating winner Forth:{" "}
              <a href={siteConfig.forthUrl} target="_blank" rel="noreferrer" className="underline">
                {siteConfig.forthUrl}
              </a>
              .
            </p>
          </div>
        </div>

        <aside
          id="request-intro"
          className="rounded-2xl border border-[var(--line)] bg-white/70 p-5 shadow-sm"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Request intro</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Placement lead is emailed within about a minute when Resend or SMTP is
            configured; you also get a short confirmation. Otherwise it is queued in the
            showcase database.
          </p>
          <div className="mt-4">
            <IntroForm defaultStudents={p.handle} />
          </div>
        </aside>
      </div>
    </div>
  );
}
