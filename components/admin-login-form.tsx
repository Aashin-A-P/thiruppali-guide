"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("Invalid username or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-lg border border-maroon/10 bg-white p-6 shadow-soft">
      <div>
        <label className="text-sm font-bold text-ink/75" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          defaultValue="admin"
          className="mt-2 w-full rounded-md border border-maroon/15 px-4 py-3 outline-none focus:border-maroon"
        />
      </div>
      <div>
        <label className="text-sm font-bold text-ink/75" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="mt-2 w-full rounded-md border border-maroon/15 px-4 py-3 outline-none focus:border-maroon"
        />
      </div>
      {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-5 py-3 text-sm font-bold text-white shadow-soft disabled:opacity-60"
      >
        <Lock className="h-4 w-4" />
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
