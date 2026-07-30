import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--cream-deep)_70%,transparent)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {siteConfig.cohortName} · {siteConfig.term}. Built for hiring partners —
          inspect the work on GitHub.
        </p>
        <div className="flex flex-wrap gap-4 font-semibold">
          <Link href="/partners" className="hover:text-[var(--magenta)]">
            Hire from cohort
          </Link>
          <a
            href={siteConfig.cohortUrl}
            className="hover:text-[var(--magenta)]"
            target="_blank"
            rel="noreferrer"
          >
            Cohort platform
          </a>
          <a
            href="https://github.com/RAVEN-dubgub/showcase-raven-dubgub"
            className="hover:text-[var(--magenta)]"
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
