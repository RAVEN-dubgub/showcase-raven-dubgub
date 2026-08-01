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
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--magenta)]">
        Partner proof strip
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl">
        Work index
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
        Week · project · live URL — the same velocity signal hiring partners want without
        clicking every student card. Built from public roster deploy URLs (privacy opt-outs
        excluded).
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-[var(--sage-soft)] px-3 py-1 font-semibold text-[var(--sage)]">
          {liveCount} live deploys
        </span>
        <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 font-semibold text-[var(--ink-soft)]">
          {builderCount} builders with production URLs
        </span>
        <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[var(--ink-soft)]">
          Roster evidence as of {formatRosterDate(updatedAt)}
        </span>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white/75">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--cream-deep)]/60 text-xs uppercase tracking-[0.12em] text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Week</th>
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">Builder</th>
              <th className="px-4 py-3 font-semibold">Live URL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.handle}-${row.weekOrder}-${row.liveUrl}`}
                className="border-b border-[var(--line)]/70 last:border-0"
              >
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-[var(--ink)]">
                  {row.week}
                </td>
                <td className="px-4 py-3 text-[var(--ink-soft)]">{row.project}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/students/${row.handle}`}
                    className="font-semibold text-[var(--magenta)] hover:underline"
                  >
                    {row.displayName}
                  </Link>
                  <span className="ml-1.5 text-[var(--ink-soft)]">@{row.handle}</span>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={row.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all font-medium text-[var(--ink)] underline decoration-[var(--magenta)]/35 hover:text-[var(--magenta)]"
                  >
                    {row.liveUrl.replace(/^https?:\/\//, "")}
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-[var(--ink-soft)]">
                  No public deploy URLs in the roster yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-[var(--ink-soft)]">
        Want an intro after scanning the table?{" "}
        <Link href="/partners#request-intro" className="font-semibold text-[var(--magenta)] hover:underline">
          Request intro
        </Link>{" "}
        or open a{" "}
        <Link href="/students" className="font-semibold text-[var(--magenta)] hover:underline">
          full profile
        </Link>
        .
      </p>
    </div>
  );
}
