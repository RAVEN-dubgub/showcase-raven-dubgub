# Deploy — Showcase (Neon + Vercel)

## 1. Neon

1. Create project `showcase-raven-dubgub` in Neon org.
2. Copy **pooled** connection string (`-pooler`, `?sslmode=require`).

## 2. GitHub

```powershell
gh repo create RAVEN-dubgub/showcase-raven-dubgub --public --source=. --remote=origin --push
```

## 3. Vercel

```powershell
npx.cmd vercel link
npx.cmd vercel env add DATABASE_URL production
npx.cmd vercel env add NEXT_PUBLIC_SITE_URL production
npx.cmd vercel env add PLACEMENT_LEAD_EMAIL production
npx.cmd vercel env add PRIVACY_OPT_OUT_TOKEN production
npx.cmd vercel env add PM_PLATFORM_URL production
npx.cmd vercel env add COMMS_PLATFORM_URL production
npx.cmd vercel --prod
```

After first deploy with `DATABASE_URL`:

```powershell
npx.cmd prisma migrate deploy
```

Or set Vercel build command to: `prisma generate && prisma migrate deploy && next build`

## 4. Optional SMTP

Add `SMTP_*` env vars so intro requests email the placement lead within ~1 minute. Without SMTP, requests still persist in Postgres (`IntroRequest`).

## Smoke test

1. `GET /` → 200, cohort narrative visible
2. `/students/raven-dubgub` → profile + links
3. `/status` → PM snapshot table + live enrolled count
4. `/partners` → fee model + intro form
5. POST intro form → 200 `{ ok: true }`
