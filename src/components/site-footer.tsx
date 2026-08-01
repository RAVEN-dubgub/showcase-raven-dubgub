import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="holo-footer mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {siteConfig.cohortName} · {siteConfig.term}. Built for hiring partners —
          inspect the work on GitHub.
        </p>
        <div className="flex flex-wrap gap-4 font-semibold">
          <Link href="/partners" className="holo-text-link">
            Hire from cohort
          </Link>
          <a
            href={siteConfig.cohortUrl}
            className="holo-text-link"
            target="_blank"
            rel="noreferrer"
          >
            Cohort platform
          </a>
          <a
            href="https://github.com/RAVEN-dubgub/showcase-raven-dubgub"
            className="holo-text-link"
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
