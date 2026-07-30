import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getParticipant } from "@/lib/roster";

const schema = z.object({
  handle: z.string().min(1).max(80),
  reason: z.string().max(500).optional(),
  token: z.string().min(1),
});

export async function POST(req: Request) {
  const secret = process.env.PRIVACY_OPT_OUT_TOKEN;
  if (!secret) {
    return NextResponse.json({ error: "Opt-out token not configured" }, { status: 503 });
  }
  try {
    const body = schema.parse(await req.json());
    if (body.token !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!getParticipant(body.handle)) {
      return NextResponse.json({ error: "Unknown handle" }, { status: 404 });
    }
    await prisma.privacyOptOut.upsert({
      where: { handle: body.handle.toLowerCase() },
      create: {
        handle: body.handle.toLowerCase(),
        reason: body.reason,
      },
      update: { reason: body.reason },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Invalid" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
