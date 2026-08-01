import Link from "next/link";
import { getAllParticipants, githubAvatar } from "@/lib/roster";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getAllParticipants()
    .filter((p) => p.optIn && (p.pmUrl || p.commsUrl))
    .slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23cc164c' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--magenta)]">
              {siteConfig.cohortName}
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[var(--ink)] sm:text-5xl lg:text-[3.4rem]">
              Don&apos;t trust our word — inspect their GitHub.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
              Public portfolios for every enrolled builder in the {siteConfig.term}:
              production deploys, peer reviews, and partner-ready intros.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-full bg-[var(--magenta)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--magenta-dark)]"
              >
                Work index
              </Link>
              <Link
                href="/students"
                className="rounded-full border border-[var(--ink)]/20 bg-white/70 px-5 py-2.5 text-sm font-semibold hover:border-[var(--magenta)]"
              >
                Browse students
              </Link>
              <Link
                href="/partners"
                className="rounded-full border border-[var(--ink)]/20 bg-white/70 px-5 py-2.5 text-sm font-semibold hover:border-[var(--magenta)]"
              >
                Hiring partners
              </Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-[var(--line)] bg-white/55 p-5 shadow-[0_20px_50px_-30px_rgba(43,43,43,0.45)] backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sage)]">
              Live signal
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--ink-soft)]">
              <li>
                <span className="font-semibold text-[var(--ink)]">PM winner:</span>{" "}
                <a className="underline decoration-[var(--magenta)]/40" href={siteConfig.forthUrl} target="_blank" rel="noreferrer">
                  Forth
                </a>
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">Author PM:</span>{" "}
                <a className="underline decoration-[var(--magenta)]/40" href={siteConfig.pmUrl} target="_blank" rel="noreferrer">
                  pm-raven-dubgub
                </a>
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">Comms:</span>{" "}
                <a className="underline decoration-[var(--magenta)]/40" href={siteConfig.commsUrl} target="_blank" rel="noreferrer">
                  comms-raven-dubgub
                </a>
              </li>
              <li>
                <Link href="/work" className="font-semibold text-[var(--magenta)] hover:underline">
                  Week · project · live URL table →
                </Link>
              </li>
              <li>
                <Link href="/status" className="font-semibold text-[var(--magenta)] hover:underline">
                  Open PM status snapshot →
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
          Why this cohort
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-[var(--ink-soft)]">
          <p>
            The Hult Cohort Developer Program is a compressed, production-first pilot.
            Participants do not submit slides as proof of skill. They ship live project
            management tools, internal communications platforms, and this public marketing
            surface — then review each other&apos;s code in public GitHub issues and cast
            private peer votes. Hiring partners get a trail that resumes cannot fake:
            repositories, deployment URLs, written reviews, and operating platforms with
            real authentication and databases.
          </p>
          <p>
            Week by week, the cohort builds infrastructure it will actually use. The PM
            contest produced Forth as the operating winner, while builders like Joshua
            Scotland (@raven-dubgub) continue to ship parallel production stacks (PM,
            Comms, Showcase) designed for unification. Every profile on this site links
            outward to that evidence. If a student opts out of public marketing, their
            page shows a respectful private placeholder — default enrollment is opt-in.
          </p>
          <p>
            For partners, the commercial model is simple: evaluate on GitHub, request an
            intro through this site, interview on your process, and pay a referral fee only
            when a graduate starts. Fee model, contact path, and showcase event RSVP live
            on the partners page. This is the vibe marketing layer of the pilot — energetic
            enough to attract attention, concrete enough that a hiring manager can spend ten
            minutes here and schedule interviews without waiting for a pitch deck.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">Featured builders</h2>
          <Link href="/students" className="text-sm font-semibold text-[var(--magenta)] hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.handle}
              href={`/students/${p.handle}`}
              className="group rounded-2xl border border-[var(--line)] bg-white/60 p-4 transition hover:-translate-y-0.5 hover:border-[var(--magenta)]/40 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={githubAvatar(p.handle)}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-[var(--line)] bg-[var(--cream-deep)]"
                />
                <div>
                  <p className="font-semibold text-[var(--ink)] group-hover:text-[var(--magenta)]">
                    {p.displayName}
                  </p>
                  <p className="text-sm text-[var(--ink-soft)]">@{p.handle}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-[var(--ink-soft)]">{p.bio}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
