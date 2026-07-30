import type { Metadata } from "next";
import { RsvpForm } from "@/components/rsvp-form";

export const metadata: Metadata = {
  title: "Showcase event RSVP",
  description: "RSVP for the end-of-pilot hiring partner showcase.",
};

export default function EventPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl">
        End-of-pilot showcase RSVP
      </h1>
      <p className="mt-3 text-[var(--ink-soft)]">
        Week 8 partner showcase — register to receive calendar details and the live demo
        agenda. Students demo production apps; partners can request intros on-site.
      </p>
      <div className="mt-8 rounded-2xl border border-[var(--line)] bg-white/70 p-6">
        <RsvpForm />
      </div>
    </div>
  );
}
