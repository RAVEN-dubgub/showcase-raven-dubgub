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
      <h1 className="font-[family-name:var(--font-display)] text-4xl">Hiring partners</h1>
      <p className="mt-3 max-w-2xl text-lg text-[var(--ink-soft)]">
        We produce developers you can evaluate entirely on GitHub — every review, every
        deployment, every merged PR is public — and you pay only when you hire.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--line)] bg-white/65 p-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">How hiring works</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--ink-soft)]">
            <li>Browse student profiles and open their GitHub + deploy URLs.</li>
            <li>Cross-check cohort status on the <Link href="/status" className="text-[var(--magenta)] underline">PM snapshot</Link>.</li>
            <li>Request an intro — placement lead routes the conversation.</li>
            <li>Run your interview process. Fee triggers only on start date.</li>
          </ol>
          <p className="mt-4 text-sm">
            Full partner README:{" "}
            <a
              href="https://github.com/RAVEN-dubgub/showcase-raven-dubgub/blob/main/PARTNERS.md"
              className="font-semibold text-[var(--magenta)] hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              PARTNERS.md
            </a>
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--line)] bg-white/65 p-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Fee model summary</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-2">
              <dt className="font-semibold">Referral fee</dt>
              <dd className="text-[var(--ink-soft)]">25% of first-year base salary</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-2">
              <dt className="font-semibold">Trigger</dt>
              <dd className="text-[var(--ink-soft)]">Candidate starts employment</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-2">
              <dt className="font-semibold">Invoice</dt>
              <dd className="text-[var(--ink-soft)]">Net 30 from start date</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-[var(--line)] pb-2">
              <dt className="font-semibold">Clawback</dt>
              <dd className="text-[var(--ink-soft)]">100% if exit within 90 days (for cause / terminate)</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold">Exclusivity</dt>
              <dd className="text-[var(--ink-soft)]">None</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-[var(--ink-soft)]">
            Placement lead:{" "}
            <a
              className="font-semibold text-[var(--magenta)]"
              href={`mailto:${siteConfig.placementEmail}`}
            >
              {siteConfig.placementEmail}
            </a>
          </p>
        </section>
      </div>

      <section
        id="request-intro"
        className="mt-10 rounded-2xl border border-[var(--line)] bg-white/75 p-6"
      >
        <h2 className="font-[family-name:var(--font-display)] text-2xl">Request an intro</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--ink-soft)]">
          Tell us who you want to meet. We email the placement lead and send you a short
          confirmation when notifications are configured; otherwise the request is queued in
          Postgres for follow-up within the SLA.
        </p>
        <div className="mt-5 max-w-xl">
          <IntroForm />
        </div>
      </section>

      <p className="mt-8 text-sm text-[var(--ink-soft)]">
        Attending the end-of-pilot showcase?{" "}
        <Link href="/event" className="font-semibold text-[var(--magenta)] hover:underline">
          RSVP here
        </Link>
        .
      </p>
    </div>
  );
}
