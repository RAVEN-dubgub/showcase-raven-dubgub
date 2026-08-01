import type { Metadata } from "next";
import { RsvpForm } from "@/components/rsvp-form";

export const metadata: Metadata = {
  title: "Showcase event RSVP",
  description: "RSVP for the end-of-pilot hiring partner showcase.",
};

export default function EventPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-50">
        End-of-pilot showcase RSVP
      </h1>
      <p className="mt-3 text-slate-300">
        Week 8 partner showcase — register to receive calendar details and the live demo
        agenda. Students demo production apps; partners can request intros on-site.
      </p>
      <div className="jarvis-panel mt-8 p-6">
        <div className="relative z-[1]">
          <RsvpForm />
        </div>
      </div>
    </div>
  );
}
