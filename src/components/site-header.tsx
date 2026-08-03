"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "/students", label: "Students" },
  { href: "/work", label: "Work index" },
  { href: "/status", label: "PM status" },
  { href: "/partners", label: "Partners" },
  { href: "/event", label: "Showcase RSVP" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="holo-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex flex-col leading-tight">
            <span className="holo-brand text-base tracking-tight sm:text-lg">
              {siteConfig.name}
            </span>
            <span className="jarvis-metric-label text-[10px]">
              {siteConfig.term}
            </span>
          </span>
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 text-sm"
          aria-label="Main navigation"
        >
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`holo-nav-link ${active ? "text-cyan-300" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/partners#request-intro"
            className="holo-btn-primary ml-1 px-3.5 py-1.5 text-sm"
          >
            Request intro
          </Link>
        </nav>
      </div>
    </header>
  );
}
