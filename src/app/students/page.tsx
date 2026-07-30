import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllParticipants,
  getOptOutHandles,
  githubAvatar,
} from "@/lib/roster";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Students</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
        {all.length} public profile pages from submission + PR evidence. Opt-outs show as
        private. Filter by skill or search handles.
      </p>

      <form className="mt-6 flex flex-wrap gap-3" method="get">
        <input
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder="Search name, handle, bio…"
          className="min-w-[220px] flex-1 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm"
        />
        <select
          name="skill"
          defaultValue={sp.skill ?? ""}
          className="rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-sm"
        >
          <option value="">All skills</option>
          {skillSet.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--cream)]"
        >
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
              className="rounded-2xl border border-[var(--line)] bg-white/65 p-4 hover:border-[var(--magenta)]/35 transition"
            >
              <div className="flex items-center gap-3">
                {!isPrivate ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={githubAvatar(p.handle)}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--cream-deep)] object-cover"
                  />
                ) : (
                  <div className="h-11 w-11 rounded-full border border-[var(--line)] bg-[var(--cream-deep)]" />
                )}
                <div>
                  <p className="font-semibold">
                    {isPrivate ? "Private profile" : p.displayName}
                  </p>
                  <p className="text-sm text-[var(--ink-soft)]">@{p.handle}</p>
                </div>
              </div>
              {!isPrivate && (
                <>
                  <p className="mt-3 line-clamp-2 text-sm text-[var(--ink-soft)]">{p.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.skills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[var(--sage-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--sage)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {isPrivate && (
                <p className="mt-3 text-sm text-[var(--ink-soft)]">
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
