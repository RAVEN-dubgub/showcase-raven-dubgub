import Link from "next/link";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/students", label: "Students" },
  { href: "/status", label: "PM status" },
  { href: "/partners", label: "Partners" },
  { href: "/event", label: "Showcase RSVP" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--cream)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--ink)] group-hover:text-[var(--magenta)]">
            {siteConfig.name}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--ink-soft)]">
            {siteConfig.term}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm font-semibold text-[var(--ink-soft)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-[var(--magenta)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/partners#request-intro"
            className="rounded-full bg-[var(--magenta)] px-3.5 py-1.5 text-white shadow-sm hover:bg-[var(--magenta-dark)] transition-colors"
          >
            Request intro
          </Link>
        </nav>
      </div>
    </header>
  );
}
