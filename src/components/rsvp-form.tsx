"use client";

import { FormEvent, useState } from "react";

export function RsvpForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [notified, setNotified] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setNotified(false);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "RSVP failed");
      setNotified(Boolean(data.notified));
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
        <label className="grid gap-1 text-sm font-semibold text-slate-200">
          Name
          <input
            name="name"
            required
            className="holo-input px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-200">
          Email
          <input
            name="email"
            type="email"
            required
            className="holo-input px-3 py-2 font-normal"
          />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold text-slate-200">
          Company
          <input
            name="company"
            className="holo-input px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-slate-200">
          Role
          <input
            name="role"
            className="holo-input px-3 py-2 font-normal"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="holo-btn-primary justify-self-start px-5 py-2.5 text-sm"
      >
        {status === "loading" ? "Saving…" : "RSVP for showcase"}
      </button>
      {status === "ok" && (
        <p className="text-sm font-medium text-emerald-300">
          {notified
            ? "You’re on the list — confirmation email sent."
            : "You’re on the list — we saved your RSVP."}
        </p>
      )}
      {status === "err" && (
        <p className="text-sm font-medium text-rose-300">{error}</p>
      )}
    </form>
  );
}
