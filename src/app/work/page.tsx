import Link from "next/link";
import type { Metadata } from "next";
import { getWorkIndex } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work index",
  description:
    "One table of week · project · live URL across the cohort — evaluate shipping velocity without opening every profile.",
};

function formatRosterDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function WorkPage() {
  const { rows, updatedAt, liveCount, builderCount } = await getWorkIndex();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="jarvis-status-line">Partner proof strip</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-50">
        Work index
      </h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        Week · project · live URL — the same velocity signal hiring partners want without
        clicking every student card. Built from public roster deploy URLs (privacy opt-outs
        excluded).
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className="holo-pill">{liveCount} live deploys</span>
        <span className="holo-pill-muted rounded-full border px-3 py-1 font-semibold">
          {builderCount} builders with production URLs
        </span>
        <span className="holo-pill-muted rounded-full border px-3 py-1">
          Roster evidence as of {formatRosterDate(updatedAt)}
        </span>
      </div>

      <div className="holo-table-wrap mt-8">
        <table className="holo-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Project</th>
              <th>Builder</th>
              <th>Live URL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.handle}-${row.weekOrder}-${row.liveUrl}`}>
                <td className="whitespace-nowrap font-semibold text-slate-100">
                  {row.week}
                </td>
                <td className="text-slate-300">{row.project}</td>
                <td>
                  <Link
                    href={`/students/${row.handle}`}
                    className="font-semibold holo-text-link hover:underline"
                  >
                    {row.displayName}
                  </Link>
                  <span className="ml-1.5 text-slate-500">@{row.handle}</span>
                </td>
                <td>
                  <a
                    href={row.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all font-medium text-slate-200 underline decoration-cyan-400/35 hover:text-cyan-300"
                  >
                    {row.liveUrl.replace(/^https?:\/\//, "")}
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-slate-400">
                  No public deploy URLs in the roster yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Want an intro after scanning the table?{" "}
        <Link
          href="/partners#request-intro"
          className="font-semibold holo-text-link hover:underline"
        >
          Request intro
        </Link>{" "}
        or open a{" "}
        <Link href="/students" className="font-semibold holo-text-link hover:underline">
          full profile
        </Link>
        .
      </p>
    </div>
  );
}
