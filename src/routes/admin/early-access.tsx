import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  full_name: string;
  email: string;
  city: string;
  user_type: "customer" | "hrayfi";
  phone?: string | null;
  preferred_language?: string | null;
  primary_trade?: string | null;
  custom_profession?: string | null;
  additional_trades?: string[] | null;
  experience_years?: number | null;
  service_description?: string | null;
  admin_notes?: string | null;
  status: "new" | "pending_review" | "approved" | "rejected" | "contacted" | "pending" | "accepted" | "closed";
  created_at: string;
  updated_at: string;
};

export const Route = createFileRoute("/admin/early-access")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Early Access Administration — FIXGAD" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminEarlyAccess,
});

function AdminEarlyAccess() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "customer" | "hrayfi">("all");
  const [tradeFilter, setTradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortNewest, setSortNewest] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  async function checkAuthorization() {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      setLoading(false);
      return;
    }
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setAuthorized(false);
      setLoading(false);
      return;
    }
    const { data: admin } = await supabase
      .from("early_access_admins")
      .select("user_id")
      .eq("user_id", data.session.user.id)
      .maybeSingle();
    setAuthorized(Boolean(admin));
    setLoading(false);
    if (admin) await loadRegistrations();
  }

  async function loadRegistrations() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("early_access_registrations")
      .select("id,full_name,email,phone,city,preferred_language,user_type,primary_trade,custom_profession,additional_trades,experience_years,service_description,admin_notes,status,created_at,updated_at")
      .order("created_at", { ascending: false });
    if (error) {
      setMessage(error.message);
      return;
    }
    setRegistrations((data ?? []) as Registration[]);
  }

  useEffect(() => {
    let cancelled = false;
    async function initialize() {
      if (!supabase) {
        if (!cancelled) {
          setMessage("Supabase is not configured.");
          setLoading(false);
        }
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      const { data: admin } = await supabase
        .from("early_access_admins")
        .select("user_id")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      if (cancelled) return;
      setAuthorized(Boolean(admin));
      setLoading(false);
      if (admin) {
        const { data: rows, error } = await supabase
          .from("early_access_registrations")
          .select("id,full_name,email,phone,city,preferred_language,user_type,primary_trade,custom_profession,additional_trades,experience_years,service_description,admin_notes,status,created_at,updated_at")
          .order("created_at", { ascending: false });
        if (!cancelled) {
          if (error) setMessage(error.message);
          else setRegistrations((rows ?? []) as Registration[]);
        }
      }
    }
    void initialize();
    return () => {
      cancelled = true;
    };
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }
    await checkAuthorization();
  }

  async function logout() {
    await supabase?.auth.signOut();
    setAuthorized(false);
    setRegistrations([]);
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !email.trim()) return;
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "https://fixgad.app/reset-password",
    });
    setLoading(false);
    setMessage(
      error
        ? error.message
        : "If this account exists, a password reset link has been sent.",
    );
  }

  async function updateStatus(id: string, status: Registration["status"]) {
    if (!supabase) return;
    const { error } = await supabase
      .from("early_access_registrations")
      .update({ status })
      .eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    setRegistrations((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function exportCsv() {
    const escape = (value: string) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const rows = [
      [
        "Full name",
        "Email",
        "Phone",
        "City",
        "Preferred language",
        "User type",
        "Primary trade",
        "Custom profession",
        "Additional trades",
        "Experience years",
        "Service description",
        "Status",
        "Registered at",
      ],
      ...filtered.map((item) => [
        item.full_name,
        item.email,
        item.phone,
        item.city,
        item.preferred_language,
        item.user_type,
        item.primary_trade,
        item.custom_profession,
        (item.additional_trades ?? []).join("; "),
        item.experience_years,
        item.service_description,
        item.status,
        item.created_at,
      ]),
    ];
    const csv = rows.map((row) => row.map(escape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "fixgad-early-access.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = registrations.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.full_name.toLowerCase().includes(normalizedSearch) ||
      item.email.toLowerCase().includes(normalizedSearch);
    const matchesType = typeFilter === "all" || item.user_type === typeFilter;
    const profession = item.custom_profession || item.primary_trade || "";
    const matchesTrade =
      tradeFilter === "all" || profession.toLowerCase() === tradeFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesType && matchesTrade && matchesStatus;
  }).sort((a, b) =>
    sortNewest
      ? b.created_at.localeCompare(a.created_at)
      : a.created_at.localeCompare(b.created_at),
  );
  const tradeNames = Array.from(
    new Set(
      registrations
        .filter((item) => item.user_type === "hrayfi")
        .map((item) => item.custom_profession || item.primary_trade)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort();
  const customerCount = registrations.filter((item) => item.user_type === "customer").length;
  const hrayfiCount = registrations.filter((item) => item.user_type === "hrayfi").length;
  const newCount = registrations.filter(
    (item) => item.status === "new" || item.status === "pending",
  ).length;

  if (loading) {
    return (
      <main className="admin-page">
        <p>Loading...</p>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="admin-page">
        <form className="admin-login" onSubmit={showPasswordReset ? resetPassword : login}>
          <span className="eyebrow">FIXGAD · Administration</span>
          <h1>Early access administration</h1>
          <p>Authorized personnel only.</p>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {message && (
            <p className="form-feedback error" role="alert">
              {message}
            </p>
          )}
          <button type="submit" className="admin-primary">
            {showPasswordReset ? "Send reset link" : "Sign in"}
          </button>
          <button
            type="button"
            className="admin-secondary"
            onClick={() => {
              setShowPasswordReset((current) => !current);
              setMessage("");
            }}
          >
            {showPasswordReset ? "Back to sign in" : "Forgot password?"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">FIXGAD · Administration</span>
          <h1>Early Access Registrations</h1>
        </div>
        <button type="button" className="admin-secondary" onClick={logout}>
          Sign out
        </button>
      </div>
      <div className="admin-stats" aria-label="Registration summary">
        <article><strong>{registrations.length}</strong><span>Total registrations</span></article>
        <article><strong>{customerCount}</strong><span>Customers</span></article>
        <article><strong>{hrayfiCount}</strong><span>Hrayfis</span></article>
        <article><strong>{newCount}</strong><span>New</span></article>
      </div>
      <div className="admin-toolbar">
        <input
          type="search"
          placeholder="Search name or email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search registrations"
        />
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as "all" | "customer" | "hrayfi")}
        >
          <option value="all">All user types</option>
          <option value="customer">Customers</option>
          <option value="hrayfi">Hrayfis</option>
        </select>
        <select
          value={tradeFilter}
          onChange={(event) => setTradeFilter(event.target.value)}
          aria-label="Filter by trade"
        >
          <option value="all">All trades</option>
          {tradeNames.map((trade) => (
            <option key={trade} value={trade}>{trade}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="pending_review">Pending review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="contacted">Contacted</option>
          <option value="pending">Pending (legacy)</option>
          <option value="accepted">Accepted (legacy)</option>
          <option value="closed">Closed (legacy)</option>
        </select>
        <select
          value={sortNewest ? "newest" : "oldest"}
          onChange={(event) => setSortNewest(event.target.value === "newest")}
          aria-label="Sort registrations"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <button type="button" className="admin-primary" onClick={exportCsv}>
          Export CSV
        </button>
      </div>
      {message && (
        <p className="form-feedback error" role="alert">
          {message}
        </p>
      )}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Type</th>
              <th>Profession / experience</th>
              <th>Status</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{item.user_type === "hrayfi" ? "Hrayfi" : "Customer"}</td>
                <td>
                  {item.user_type === "hrayfi"
                    ? `${item.custom_profession || item.primary_trade || "Not specified"}${
                        item.experience_years != null
                          ? ` · ${item.experience_years} years`
                          : ""
                      }`
                    : "—"}
                </td>
                <td>
                  <select
                    value={item.status}
                    onChange={(event) =>
                      void updateStatus(item.id, event.target.value as Registration["status"])
                    }
                  >
                    <option value="new">New</option>
                    <option value="pending_review">Pending review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={7}>No registrations match this view.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
