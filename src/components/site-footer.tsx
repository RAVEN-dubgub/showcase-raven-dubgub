import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="holo-footer mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        <p className="text-xs leading-relaxed text-slate-500">
          Atmosphere credit:{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Holographic_Interface_by_beeple.jpg"
            className="holo-text-link font-medium"
            target="_blank"
            rel="noreferrer"
          >
            &ldquo;Holographic Interface&rdquo;
          </a>{" "}
          by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Beeple"
            className="holo-text-link font-medium"
            target="_blank"
            rel="noreferrer"
          >
            beeple
          </a>{" "}
          (Mike Winkelmann),{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="holo-text-link font-medium"
            target="_blank"
            rel="noreferrer"
          >
            CC BY 4.0
          </a>
          , via Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}
