import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllParticipants,
  getOptOutHandles,
  getRosterMeta,
  githubAvatar,
} from "@/lib/roster";
import { deployEvidence } from "@/lib/work";

export const metadata: Metadata = {
  title: "Students",
  description: "Public cohort profiles with GitHub and deployment evidence.",
};

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; skill?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().toLowerCase();
  const skill = (sp.skill ?? "").trim().toLowerCase();
  const optOuts = await getOptOutHandles();
  const all = getAllParticipants();

  const filtered = all.filter((p) => {
    if (q) {
      const hay = `${p.displayName} ${p.handle} ${p.bio} ${p.skills.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (skill && !p.skills.some((s) => s.toLowerCase().includes(skill))) return false;
    return true;
  });

  const skillSet = Array.from(
    new Set(all.flatMap((p) => p.skills.map((s) => s)))
  ).sort();
  const rosterUpdated = getRosterMeta().updatedAt;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-50">Students</h1>
      <p className="mt-3 max-w-2xl text-slate-300">
        {all.length} public profile pages from submission + PR evidence. Opt-outs show as
        private. Filter by skill or search handles. Prefer the{" "}
        <Link href="/work" className="font-semibold holo-text-link hover:underline">
          work index
        </Link>{" "}
        for a single week · project · live URL table.
      </p>
      <p className="mt-2 jarvis-metric-label">
        Roster evidence as of{" "}
        {new Date(rosterUpdated).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder="Search name, handle, bio…"
          className="holo-input min-w-[220px] flex-1 px-4 py-2 text-sm"
        />
        <select
          name="skill"
          defaultValue={sp.skill ?? ""}
          className="holo-input px-4 py-2 text-sm"
        >
          <option value="">All skills</option>
          {skillSet.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="holo-btn-ghost px-4 py-2 text-sm">
          Filter
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => {
          const isPrivate = optOuts.has(p.handle.toLowerCase()) || !p.optIn;
          return (
            <Link
              key={p.handle}
              href={`/students/${p.handle}`}
              className="holo-card p-4"
            >
              <div className="flex items-center gap-3">
                {!isPrivate ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={githubAvatar(p.handle)}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-cyan-400/25 bg-slate-900 object-cover"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full border border-cyan-400/20 bg-slate-900" />
                )}
                <div>
                  <p className="font-semibold text-slate-100">
                    {isPrivate ? "Private profile" : p.displayName}
                  </p>
                  <p className="text-sm text-slate-400">@{p.handle}</p>
                </div>
              </div>
              {!isPrivate && (
                <>
                  <p className="mt-3 line-clamp-2 text-sm text-slate-400">{p.bio}</p>
                  {(() => {
                    const deploys = deployEvidence(p);
                    return deploys.count > 0 ? (
                      <p className="mt-2 text-xs font-semibold text-cyan-300">
                        {deploys.count} live deploy{deploys.count === 1 ? "" : "s"} ·{" "}
                        {deploys.labels.join(" · ")}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">
                        No public deploy URL yet
                      </p>
                    );
                  })()}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.skills.slice(0, 4).map((s) => (
                      <span key={s} className="holo-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {isPrivate && (
                <p className="mt-3 text-sm text-slate-400">
                  This student opted out of public marketing.
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
