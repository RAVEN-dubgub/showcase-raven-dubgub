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
      <h1 className="text-4xl font-bold tracking-tight text-slate-50">
        Cohort PM status
      </h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Read-only hiring-partner view of project status. Snapshot sourced from{" "}
        <a
          href={snapshot.pmPlatformUrl}
          className="holo-text-link underline"
          target="_blank"
          rel="noreferrer"
        >
          pm-raven-dubgub
        </a>
        , Forth winner ops, and live cohort stats — not lorem ipsum.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="jarvis-panel p-4">
          <p className="jarvis-metric-label relative z-[1]">Enrolled (live)</p>
          <p className="jarvis-metric-glow relative z-[1] mt-2">
            {live?.enrolledCount ?? "—"}
          </p>
          <p className="relative z-[1] text-sm text-slate-400">
            cohort {live?.cohortId ?? siteConfig.cohortId}
          </p>
        </div>
        <div className="jarvis-panel p-4">
          <p className="jarvis-metric-label relative z-[1]">Peer reviews each</p>
          <p className="jarvis-metric-glow relative z-[1] mt-2">
            {live?.peerReviewCount ?? "—"}
          </p>
        </div>
        <div className="jarvis-panel p-4">
          <p className="jarvis-metric-label relative z-[1]">Snapshot updated</p>
          <p className="relative z-[1] mt-2 text-lg font-semibold text-slate-100">
            {new Date(snapshot.updatedAt).toLocaleString("en-US", {
              timeZone: "America/New_York",
            })}{" "}
            ET
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-slate-50">Phase 1 projects</h2>
      <div className="holo-table-wrap mt-4">
        <table className="holo-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Deploy evidence</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {snapshot.projects.map((p) => (
              <tr key={p.slug}>
                <td className="font-semibold text-slate-100">{p.title}</td>
                <td className="text-slate-300">{p.status}</td>
                <td className="text-slate-300">
                  {p.submissionsWithDeploy} public URLs
                </td>
                <td>
                  {"operatorUrl" in p && p.operatorUrl ? (
                    <a
                      href={p.operatorUrl}
                      className="holo-text-link underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Operator
                    </a>
                  ) : "sampleUrl" in p && p.sampleUrl ? (
                    <a
                      href={p.sampleUrl}
                      className="holo-text-link underline"
                      target="_blank"
                      rel="noreferrer"
                    >
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

      <h2 className="mt-10 text-2xl font-semibold text-slate-50">Highlights</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {snapshot.highlights.map((h) => (
          <li key={h.handle} className="holo-card p-4">
            <Link
              href={`/students/${h.handle}`}
              className="font-semibold holo-text-link hover:underline"
            >
              @{h.handle}
            </Link>
            <p className="mt-1 text-sm text-slate-400">{h.label}</p>
            <ul className="mt-2 space-y-1 text-xs break-all text-slate-400">
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

      <p className="mt-8 text-sm text-slate-400">
        JSON feed:{" "}
        <Link href="/api/pm-status" className="font-semibold holo-text-link">
          /api/pm-status
        </Link>
        . Refresh snapshot daily via{" "}
        <code className="rounded bg-cyan-400/10 px-1 text-cyan-200">
          data/pm-snapshot.json
        </code>
        .
      </p>
    </div>
  );
}
