export const siteConfig = {
  name: "Hult Cohort Showcase",
  cohortName: "Hult Cohort Developer Program",
  term: "Summer 2026 Pilot",
  cohortId: "summer26",
  description:
    "Hiring-partner facing showcase for the Hult Cohort Developer Program — inspect GitHub, deployments, and peer-reviewed builds.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://showcase-raven-dubgub.vercel.app",
  placementEmail:
    process.env.PLACEMENT_LEAD_EMAIL ?? "wolfscotland@gmail.com",
  pmUrl: process.env.PM_PLATFORM_URL ?? "https://pm-raven-dubgub.vercel.app",
  commsUrl:
    process.env.COMMS_PLATFORM_URL ?? "https://comms-raven-dubgub.vercel.app",
  cohortUrl:
    process.env.COHORT_PLATFORM_URL ?? "https://site-nine-rouge-68.vercel.app",
  forthUrl: "https://forth-bice.vercel.app",
  githubOrgHint: "RAVEN-dubgub",
};
