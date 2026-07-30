"use client";

import { FormEvent, useState } from "react";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "RSVP failed");
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "RSVP failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Name
          <input
            name="name"
            required
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Company
          <input
            name="company"
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Role
          <input
            name="role"
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="justify-self-start rounded-full bg-[var(--sage)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Saving…" : "RSVP for showcase"}
      </button>
      {status === "ok" && (
        <p className="text-sm font-medium text-[var(--sage)]">You&apos;re on the list.</p>
      )}
      {status === "err" && (
        <p className="text-sm font-medium text-[var(--magenta)]">{error}</p>
      )}
    </form>
  );
}
