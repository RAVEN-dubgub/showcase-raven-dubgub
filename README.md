# Hult Cohort Showcase (`showcase-raven-dubgub`)

Public vibe-marketing / hiring-partner showcase for the **Hult Cohort Developer Program · Summer 2026 Pilot**.

**Production:** https://showcase-raven-dubgub.vercel.app  
**Partner README:** [PARTNERS.md](./PARTNERS.md)  
**Deploy:** [DEPLOY.md](./DEPLOY.md)

## Features

| Requirement | Implementation |
|-------------|----------------|
| Public homepage | Cohort narrative (≥200 words), no login |
| Student profiles | `/students/[handle]` — GitHub, bio, portfolio links |
| Portfolio links | PM / Comms / Showcase repos + deploy URLs from roster |
| PM integration | `/status` + `/api/pm-status` snapshot + live cohort stats |
| Partners page | `/partners` — hire path, fee model, contact |
| Request intro | Form → Postgres + optional SMTP to placement lead |
| Privacy | Default opt-in; `/api/privacy` opt-out → private placeholder |
| SEO | titles, descriptions, Open Graph, sitemap, robots |
| Event RSVP | `/event` |

## Stack

Next.js 16 · TypeScript · Tailwind 4 · Prisma · PostgreSQL (Neon) · Vercel

## Local setup

```powershell
cd showcase-raven-dubgub
copy .env.example .env
# fill DATABASE_URL
npm install
npx.cmd prisma migrate dev --name init
npm run dev
```

## Scripts

- `npm run dev` — local
- `npm run build` — `prisma generate && next build`
- `npm run db:migrate` — `prisma migrate deploy`

## Agent notes

See [AGENTS.md](./AGENTS.md).
