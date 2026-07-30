import { NextResponse } from "next/server";
import snapshot from "../../../../data/pm-snapshot.json";
import { siteConfig } from "@/lib/site";

export async function GET() {
  let live: unknown = null;
  try {
    const res = await fetch(`${siteConfig.cohortUrl}/api/cohort/stats`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) live = await res.json();
  } catch {
    live = null;
  }
  return NextResponse.json({
    ...snapshot,
    liveCohortStats: live,
    generatedAt: new Date().toISOString(),
  });
}
