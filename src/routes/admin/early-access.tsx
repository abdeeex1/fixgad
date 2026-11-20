import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

type Registration = {
  id: string;
  full_name: string;
  email: string;
  city: string;
  user_type: "customer" | "hrayfi";
  status: "pending" | "contacted" | "accepted" | "closed";
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
      .select("id,full_name,email,city,user_type,status,created_at,updated_at")
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
          .select("id,full_name,email,city,user_type,status,created_at,updated_at")
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
    const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const rows = [
      ["Full name", "Email", "City", "User type", "Status", "Registered at"],
      ...filtered.map((item) => [
        item.full_name,
        item.email,
        item.city,
        item.user_type,
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
    return matchesSearch && matchesType;
  });

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
        <form className="admin-login" onSubmit={login}>
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
            Sign in
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
                  <select
                    value={item.status}
                    onChange={(event) =>
                      void updateStatus(item.id, event.target.value as Registration["status"])
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="accepted">Accepted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={6}>No registrations match this view.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
