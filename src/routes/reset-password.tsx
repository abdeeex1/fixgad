import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reset-password")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Reset Password — FIXGAD" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setMessage("Password recovery is temporarily unavailable. Please try again later.");
      setLoading(false);
      return;
    }

    let active = true;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      setHasRecoverySession(Boolean(data.session));
      if (error) setMessage(error.message);
      else if (!data.session) {
        setMessage("This password reset link is invalid or has expired. Request a new link and try again.");
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setHasRecoverySession(Boolean(session));
        if (session) setMessage("");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Password recovery is temporarily unavailable. Please try again later.");
      return;
    }
    if (!hasRecoverySession) {
      setMessage("Your reset session has expired. Request a new password reset link.");
      return;
    }
    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setSaving(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setCompleted(true);
    setPassword("");
    setConfirmPassword("");
    setMessage("Your FIXGAD password has been updated successfully.");
  }

  return (
    <main className="admin-page">
      <form className="admin-login" onSubmit={submit}>
        <span className="eyebrow">FIXGAD · Account security</span>
        <h1>{completed ? "Password updated" : "Set a new password"}</h1>

        {loading ? (
          <p role="status">Verifying your secure reset link...</p>
        ) : completed ? (
          <>
            <p className="form-feedback" role="status">{message}</p>
            <a className="admin-primary" href="/admin/early-access">
              Continue to sign in
            </a>
          </>
        ) : !hasRecoverySession ? (
          <>
            <p className="form-feedback error" role="alert">{message}</p>
            <a className="admin-primary" href="/admin/early-access">
              Back to administration sign in
            </a>
          </>
        ) : (
          <>
            <p>Choose a new password for your FIXGAD account.</p>
            <label>
              New password
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <label>
              Confirm new password
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
            {message && (
              <p className="form-feedback error" role="alert">{message}</p>
            )}
            <button type="submit" className="admin-primary" disabled={saving}>
              {saving ? "Updating password..." : "Update password"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
