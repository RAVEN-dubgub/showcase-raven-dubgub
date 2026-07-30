import type { Metadata } from "next";
import Link from "next/link";
import snapshot from "../../../data/pm-snapshot.json";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "PM status",
  description: "Read-only cohort project status snapshot integrated from the PM platform.",
};

async function liveCohortStats(): Promise<{
  enrolledCount?: number;
  peerReviewCount?: number;
  cohortId?: string;
} | null> {
  try {
    const res = await fetch(`${siteConfig.cohortUrl}/api/cohort/stats`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function StatusPage() {
  const live = await liveCohortStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        Cohort PM status
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
        Read-only hiring-partner view of project status. Snapshot sourced from{" "}
        <a href={snapshot.pmPlatformUrl} className="text-[var(--magenta)] underline" target="_blank" rel="noreferrer">
          pm-raven-dubgub
        </a>
        , Forth winner ops, and live cohort stats — not lorem ipsum.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-white/65 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Enrolled (live)
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {live?.enrolledCount ?? "—"}
          </p>
          <p className="text-sm text-[var(--ink-soft)]">
            cohort {live?.cohortId ?? siteConfig.cohortId}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/65 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Peer reviews each
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {live?.peerReviewCount ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white/65 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            Snapshot updated
          </p>
          <p className="mt-2 text-lg font-semibold">
            {new Date(snapshot.updatedAt).toLocaleString("en-US", {
              timeZone: "America/New_York",
            })}{" "}
            ET
          </p>
        </div>
      </div>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl">
        Phase 1 projects
      </h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white/70">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--cream-deep)]/60 text-xs uppercase tracking-wide text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deploy evidence</th>
              <th className="px-4 py-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.projects.map((p) => (
              <tr key={p.slug} className="border-b border-[var(--line)] last:border-0">
                <td className="px-4 py-3 font-semibold">{p.title}</td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{p.status}</td>
                <td className="px-4 py-3">{p.submissionsWithDeploy} public URLs</td>
                <td className="px-4 py-3">
                  {"operatorUrl" in p && p.operatorUrl ? (
                    <a href={p.operatorUrl} className="text-[var(--magenta)] underline" target="_blank" rel="noreferrer">
                      Operator
                    </a>
                  ) : "sampleUrl" in p && p.sampleUrl ? (
                    <a href={p.sampleUrl} className="text-[var(--magenta)] underline" target="_blank" rel="noreferrer">
                      Sample
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl">Highlights</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {snapshot.highlights.map((h) => (
          <li
            key={h.handle}
            className="rounded-2xl border border-[var(--line)] bg-white/65 p-4"
          >
            <Link
              href={`/students/${h.handle}`}
              className="font-semibold text-[var(--magenta)] hover:underline"
            >
              @{h.handle}
            </Link>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{h.label}</p>
            <ul className="mt-2 space-y-1 text-xs break-all">
              {h.urls.map((u) => (
                <li key={u}>
                  <a href={u} target="_blank" rel="noreferrer" className="underline">
                    {u}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-[var(--ink-soft)]">
        JSON feed:{" "}
        <Link href="/api/pm-status" className="font-semibold text-[var(--magenta)]">
          /api/pm-status
        </Link>
        . Refresh snapshot daily via{" "}
        <code className="rounded bg-black/5 px-1">data/pm-snapshot.json</code>.
      </p>
    </div>
  );
}
