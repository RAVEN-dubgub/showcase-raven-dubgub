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

## 4. Email notifications (required for partner confirmation)

Intro + RSVP persist to Neon always. **Email** needs one of the paths below so
`POST /api/intro` returns `{ notified: true }` and partners get a confirmation inbox message.

### Preferred — Resend (free, no SMTP purchase)

1. Sign up at https://resend.com/signup with **wolfscotland@gmail.com**
2. **API Keys** → Create API Key → copy `re_…`
3. Add to Vercel (production + preview):

```powershell
# paste re_… when prompted
npx.cmd vercel env add RESEND_API_KEY production
npx.cmd vercel env add RESEND_API_KEY preview
echo onboarding@resend.dev | npx.cmd vercel env add EMAIL_FROM production
echo onboarding@resend.dev | npx.cmd vercel env add EMAIL_FROM preview
npx.cmd vercel --prod
```

4. Smoke-test:

```powershell
Invoke-RestMethod -Method POST -Uri "https://showcase-raven-dubgub.vercel.app/api/intro" `
  -ContentType "application/json" `
  -Body '{"partnerName":"Smoke","company":"Test Co","email":"wolfscotland@gmail.com","studentHandles":"raven-dubgub","message":"notification smoke test"}'
```

Expect `{ ok: true, notified: true, confirmed: true }` (with onboarding domain,
`confirmed` is true only when the submitter email is the Resend account email).

**Verified domain (optional, for confirming any partner email):** Resend → Domains →
add your domain → set DNS → set `EMAIL_FROM` to e.g. `intros@yourdomain.com`.

### Fallback — Gmail SMTP (app password)

1. Google Account → Security → 2-Step Verification → App passwords → create one for Mail
2. Vercel env:

| Var | Value |
|-----|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_SECURE` | `false` |
| `SMTP_USER` | `wolfscotland@gmail.com` |
| `SMTP_PASS` | *(16-char app password — not your login password)* |
| `SMTP_FROM` | `wolfscotland@gmail.com` |

Leave `RESEND_API_KEY` unset so SMTP is used. Redeploy after adding env vars.

## Smoke test

1. `GET /` → 200, cohort narrative visible
2. `/work` → week · project · live URL table
3. `/students/raven-dubgub` → profile + links
4. `/status` → PM snapshot table + live enrolled count
5. `/partners` → fee model + intro form
6. POST intro form → 200 `{ ok: true, notified: true }` when email is configured
