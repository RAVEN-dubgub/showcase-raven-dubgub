"use client";

import { FormEvent, useState } from "react";

type Props = {
  defaultStudents?: string;
};

export function IntroForm({ defaultStudents = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [notified, setNotified] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setNotified(false);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/intro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setNotified(Boolean(data.notified));
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Request failed");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Partner name
          <input
            name="partnerName"
            required
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Company
          <input
            name="company"
            required
            className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        Work email
        <input
          name="email"
          type="email"
          required
          className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Student handle(s)
        <input
          name="studentHandles"
          required
          defaultValue={defaultStudents}
          placeholder="raven-dubgub, gge513"
          className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 font-normal"
          placeholder="Roles, timeline, and what you want to evaluate on GitHub."
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="justify-self-start rounded-full bg-[var(--magenta)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--magenta-dark)] disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Request intro"}
      </button>
      {status === "ok" && (
        <p className="text-sm font-medium text-[var(--sage)]">
          {notified
            ? "Received — placement lead notified by email. Check your inbox for confirmation."
            : "Received and saved — we will follow up within 24 hours."}
        </p>
      )}
      {status === "err" && (
        <p className="text-sm font-medium text-[var(--magenta)]">{error}</p>
      )}
    </form>
  );
}
