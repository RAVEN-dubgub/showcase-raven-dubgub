import Link from "next/link";
import { getAllParticipants, githubAvatar } from "@/lib/roster";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getAllParticipants()
    .filter((p) => p.optIn && (p.pmUrl || p.commsUrl))
    .slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-cyan-400/15">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <p className="jarvis-status-line mb-3">{siteConfig.cohortName}</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-[3.25rem]">
              Don&apos;t trust our word — inspect their GitHub.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Public portfolios for every enrolled builder in the {siteConfig.term}:
              production deploys, peer reviews, and partner-ready intros.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="holo-btn-primary px-5 py-2.5 text-sm">
                Work index
              </Link>
              <Link href="/students" className="holo-btn-ghost px-5 py-2.5 text-sm">
                Browse students
              </Link>
              <Link href="/partners" className="holo-btn-outline px-5 py-2.5 text-sm">
                Hiring partners
              </Link>
            </div>
          </div>
          <aside className="flex flex-col items-center gap-6 lg:items-stretch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/holoframe.png"
              alt="Holographic frame mark"
              width={320}
              height={320}
              className="holo-hero-frame"
            />
            <div className="jarvis-panel w-full p-5">
              <p className="jarvis-metric-label relative z-[1]">Live signal</p>
              <ul className="relative z-[1] mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">PM winner:</span>{" "}
                  <a
                    className="holo-text-link underline decoration-cyan-400/40"
                    href={siteConfig.forthUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Forth
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-100">Author PM:</span>{" "}
                  <a
                    className="holo-text-link underline decoration-cyan-400/40"
                    href={siteConfig.pmUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    pm-raven-dubgub
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-100">Comms:</span>{" "}
                  <a
                    className="holo-text-link underline decoration-cyan-400/40"
                    href={siteConfig.commsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    comms-raven-dubgub
                  </a>
                </li>
                <li>
                  <Link href="/work" className="font-semibold text-cyan-300 hover:underline">
                    Week · project · live URL table →
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="font-semibold text-cyan-300 hover:underline">
                    Open PM status snapshot →
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-slate-50">
          Why this cohort
        </h2>
        <div className="mt-5 max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-slate-300">
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
          <h2 className="text-3xl font-bold tracking-tight text-slate-50">
            Featured builders
          </h2>
          <Link href="/students" className="text-sm font-semibold text-cyan-300 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.handle}
              href={`/students/${p.handle}`}
              className="holo-card group p-4"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={githubAvatar(p.handle)}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-cyan-400/25 bg-slate-900"
                />
                <div>
                  <p className="font-semibold text-slate-100 group-hover:text-cyan-300">
                    {p.displayName}
                  </p>
                  <p className="text-sm text-slate-400">@{p.handle}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-slate-400">{p.bio}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
