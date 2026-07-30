import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyPlacementLead } from "@/lib/mail";

const schema = z.object({
  partnerName: z.string().min(1).max(120),
  company: z.string().min(1).max(160),
  email: z.string().email().max(200),
  studentHandles: z.string().min(1).max(400),
  message: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const row = await prisma.introRequest.create({ data: body });
    let notified = false;
    try {
      notified = await notifyPlacementLead(body);
      if (notified) {
        await prisma.introRequest.update({
          where: { id: row.id },
          data: { notified: true },
        });
      }
    } catch (err) {
      console.error("[intro] notify failed", err);
    }
    return NextResponse.json({ ok: true, id: row.id, notified });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Invalid" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json(
      { error: "Unable to store intro request. Check DATABASE_URL." },
      { status: 500 }
    );
  }
}
