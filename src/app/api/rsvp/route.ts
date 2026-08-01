import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyRsvp } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const row = await prisma.eventRsvp.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || null,
        role: body.role || null,
      },
    });
    let notified = false;
    let confirmed = false;
    try {
      const result = await notifyRsvp(body);
      notified = result.lead;
      confirmed = result.confirm;
    } catch (err) {
      console.error("[rsvp] notify failed", err);
    }
    return NextResponse.json({ ok: true, id: row.id, notified, confirmed });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message ?? "Invalid" }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to save RSVP" }, { status: 500 });
  }
}
