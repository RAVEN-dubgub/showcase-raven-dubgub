# Agent workflow — Cohort Showcase

## Stack

- Next.js 16 App Router + TypeScript + Tailwind 4
- Prisma + PostgreSQL (Neon)
- Vercel deploy
- Roster: `data/roster.json` (submission/PR-derived)
- PM snapshot: `data/pm-snapshot.json` + live `/api/cohort/stats`

## Conventions

- Branch for cohort submission: `participants/summer26/phase-1-project-3/raven-dubgub`
- PR title: `[Project 3] Submission — raven-dubgub`
- Partner-facing doc: `PARTNERS.md`
- Never commit `.env` / secrets

## Identity

Placement / ops email convention matches PM/Comms: `wolfscotland@gmail.com` unless `PLACEMENT_LEAD_EMAIL` overrides.

## Do not

- Hardcode fake PM status (lorem) — refresh `data/pm-snapshot.json`
- Expose SMTP credentials
- Drop privacy opt-out behavior
