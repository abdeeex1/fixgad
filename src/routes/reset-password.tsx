import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reset-password")({
  staticData: { sitemap: false },
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return;
    }
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    setMessage(error ? error.message : "Your password has been updated.");
  }

  return (
    <main className="admin-page">
      <form className="admin-login" onSubmit={submit}>
        <span className="eyebrow">FIXGAD · Account</span>
        <h1>Set a new password</h1>
        <label>
          New password
          <input
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {message && (
          <p className="form-feedback" role="status">
            {message}
          </p>
        )}
        <button type="submit" className="admin-primary" disabled={loading}>
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </main>
  );
}
