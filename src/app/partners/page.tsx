import type { Metadata } from "next";
import Link from "next/link";
import { IntroForm } from "@/components/intro-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hiring partners",
  description:
    "How to hire from the Hult Cohort — fee model, evaluation path, and request intro.",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-50">
        Hiring partners
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-300">
        We produce developers you can evaluate entirely on GitHub — every review, every
        deployment, every merged PR is public — and you pay only when you hire.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="holo-panel p-6">
          <h2 className="text-2xl font-semibold text-slate-50">How hiring works</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-300">
            <li>Browse student profiles and open their GitHub + deploy URLs.</li>
            <li>
              Cross-check cohort status on the{" "}
              <Link href="/status" className="holo-text-link underline">
                PM snapshot
              </Link>
              .
            </li>
            <li>Request an intro — placement lead routes the conversation.</li>
            <li>Run your interview process. Fee triggers only on start date.</li>
          </ol>
          <p className="mt-4 text-sm text-slate-400">
            Full partner README:{" "}
            <a
              href="https://github.com/RAVEN-dubgub/showcase-raven-dubgub/blob/main/PARTNERS.md"
              className="font-semibold holo-text-link hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              PARTNERS.md
            </a>
          </p>
        </section>

        <section className="holo-panel p-6">
          <h2 className="text-2xl font-semibold text-slate-50">Fee model summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-cyan-400/15 pb-2">
              <dt className="font-semibold text-slate-100">Referral fee</dt>
              <dd className="text-slate-400">25% of first-year base salary</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cyan-400/15 pb-2">
              <dt className="font-semibold text-slate-100">Trigger</dt>
              <dd className="text-slate-400">Candidate starts employment</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cyan-400/15 pb-2">
              <dt className="font-semibold text-slate-100">Invoice</dt>
              <dd className="text-slate-400">Net 30 from start date</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-cyan-400/15 pb-2">
              <dt className="font-semibold text-slate-100">Clawback</dt>
              <dd className="text-slate-400">
                100% if exit within 90 days (for cause / terminate)
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-100">Exclusivity</dt>
              <dd className="text-slate-400">None</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-slate-400">
            Placement lead:{" "}
            <a
              className="font-semibold holo-text-link"
              href={`mailto:${siteConfig.placementEmail}`}
            >
              {siteConfig.placementEmail}
            </a>
          </p>
        </section>
      </div>

      <section id="request-intro" className="jarvis-panel mt-10 p-6">
        <h2 className="relative z-[1] text-2xl font-semibold text-slate-50">
          Request an intro
        </h2>
        <p className="relative z-[1] mt-2 max-w-2xl text-sm text-slate-400">
          Tell us who you want to meet. We email the placement lead and send you a short
          confirmation when notifications are configured; otherwise the request is queued in
          Postgres for follow-up within the SLA.
        </p>
        <div className="relative z-[1] mt-5 max-w-xl">
          <IntroForm />
        </div>
      </section>

      <p className="mt-8 text-sm text-slate-400">
        Attending the end-of-pilot showcase?{" "}
        <Link href="/event" className="font-semibold holo-text-link hover:underline">
          RSVP here
        </Link>
        .
      </p>

      <section className="mt-12 border-t border-cyan-400/10 pt-6">
        <h2 className="jarvis-metric-label">Credits</h2>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500">
          Site atmosphere includes{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Holographic_Interface_by_beeple.jpg"
            className="holo-text-link"
            target="_blank"
            rel="noreferrer"
          >
            &ldquo;Holographic Interface&rdquo;
          </a>{" "}
          by beeple (Mike Winkelmann), licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="holo-text-link"
            target="_blank"
            rel="noreferrer"
          >
            CC BY 4.0
          </a>
          , via Wikimedia Commons. Additional ambient textures from Unsplash (Salvus,
          Adi Goldstein).
        </p>
      </section>
    </div>
  );
}
