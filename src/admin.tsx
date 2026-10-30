import { StrictMode, useCallback, useEffect, useState, type FormEvent } from "react";
import { createRoot } from "react-dom/client";
import type { Session } from "@supabase/supabase-js";
import { GUESTS, supabase, TABLE } from "./supabase";
import { fmtTime, STATUS, useWishes, type Attendance, type Wish } from "./wishes";
import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase!.auth.signInWithPassword({ email, password: pass });
    if (error) setErr(error.message === "Invalid login credentials" ? "Email atau password salah, atau akun admin belum dibuat." : error.message);
  };
  return (
    <form className="rsvp" onSubmit={submit}>
      <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password<input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} /></label>
      <button className="btn" type="submit">Masuk</button>
      {err && <p className="note bad" role="alert">{err}</p>}
    </form>
  );
}

const Stat = ({ n, label, tone }: { n: number; label: string; tone: string }) => <div className={`stat ${tone}`}><b>{n}</b><span>{label}</span></div>;

function Responses() {
  const { wishes, error, reload } = useWishes(true);
  const [q, setQ] = useState("");
  const [f, setF] = useState<"all" | Attendance>("all");
  const n = (a: Attendance) => wishes.filter((w) => w.attendance === a).length;
  const tamu = wishes.filter((w) => w.attendance === "hadir").reduce((s, w) => s + w.guests, 0);
  const shown = wishes.filter((w) => (f === "all" || w.attendance === f) && `${w.name} ${w.message}`.toLowerCase().includes(q.toLowerCase()));
  const toggle = async (w: Wish) => { await supabase!.from(TABLE).update({ hidden: !w.hidden }).eq("id", w.id); void reload(); };
  const remove = async (w: Wish) => {
    if (!window.confirm(`Hapus respon dari ${w.name}?`)) return;
    await supabase!.from(TABLE).delete().eq("id", w.id);
    void reload();
  };
  const exportCsv = () => {
    const esc = (s: string | number) => `"${String(s).replace(/"/g, '""')}"`;
    const rows = [["Waktu", "Nama", "Status", "Jumlah tamu", "Ucapan"], ...wishes.map((w) => [w.created_at, w.name, STATUS[w.attendance], w.guests, w.message])];
    const url = URL.createObjectURL(new Blob([rows.map((r) => r.map(esc).join(",")).join("\n")], { type: "text/csv" }));
    Object.assign(document.createElement("a"), { href: url, download: "respon-rafi.csv" }).click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="stats">
        <Stat n={wishes.length} label="Total respon" tone="t1" /><Stat n={n("hadir")} label="Hadir" tone="t2" />
        <Stat n={tamu} label="Total tamu hadir" tone="t1" /><Stat n={n("ragu")} label="Masih ragu" tone="t3" />
        <Stat n={n("tidak")} label="Tidak hadir" tone="t4" /><Stat n={wishes.filter((w) => w.message).length} label="Ucapan" tone="t5" />
      </div>
      <div className="toolbar">
        <input placeholder="Cari nama / ucapan..." value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={f} onChange={(e) => setF(e.target.value as "all" | Attendance)}>
          <option value="all">Semua</option><option value="hadir">Hadir</option><option value="ragu">Masih ragu</option><option value="tidak">Tidak hadir</option>
        </select>
        <button className="btn ghost" onClick={() => void reload()}>Muat ulang</button>
        <button className="btn ghost" onClick={exportCsv}>Ekspor CSV</button>
      </div>
      {error && <p className="note bad">{error}</p>}
      <div className="tbl"><table>
        <thead><tr><th>Nama</th><th>Status</th><th>Tamu</th><th>Ucapan</th><th>Waktu</th><th /></tr></thead>
        <tbody>{shown.map((w) => (
          <tr key={w.id} className={w.hidden ? "dim" : ""}>
            <td>{w.name}</td><td><span className={`pill ${w.attendance}`}>{STATUS[w.attendance]}</span></td><td>{w.guests}</td>
            <td className="msg">{w.message}</td><td>{fmtTime(w.created_at)}</td>
            <td className="acts"><button className="btn ghost sm" onClick={() => void toggle(w)}>{w.hidden ? "Tampilkan" : "Sembunyikan"}</button><button className="btn ghost sm" onClick={() => void remove(w)}>Hapus</button></td>
          </tr>))}
        </tbody>
      </table>{shown.length === 0 && <p className="empty">Belum ada respon.</p>}</div>
    </>
  );
}

interface Guest { id: string; name: string }

function Guests() {
  const { wishes } = useWishes(true);
  const [list, setList] = useState<Guest[]>([]);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("");
  const load = useCallback(async () => {
    const { data } = await supabase!.from(GUESTS).select("*").order("name");
    setList((data ?? []) as Guest[]);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const filled = new Set(wishes.map((w) => w.name.trim().toLowerCase()));
  const done = list.filter((g) => filled.has(g.name.trim().toLowerCase())).length;
  const link = (g: Guest) => `${window.location.origin}/?to=${encodeURIComponent(g.name)}`;
  const add = async () => {
    const rows = text.split("\n").map((s) => s.trim().slice(0, 60)).filter(Boolean).map((name) => ({ name }));
    if (!rows.length) return;
    await supabase!.from(GUESTS).insert(rows);
    setText("");
    void load();
  };
  const copy = (g: Guest) => { void navigator.clipboard?.writeText(link(g)).then(() => { setCopied(g.id); window.setTimeout(() => setCopied(""), 1500); }); };
  const wa = (g: Guest) => `https://wa.me/?text=${encodeURIComponent(`Assalamu’alaikum ${g.name}, kami mengundang Anda ke tasyakuran khitanan putra kami. Detail undangan: ${link(g)}`)}`;
  return (
    <>
      <div className="stats"><Stat n={list.length} label="Tamu diundang" tone="t1" /><Stat n={done} label="Sudah mengisi" tone="t2" /><Stat n={list.length - done} label="Belum mengisi" tone="t3" /></div>
      <div className="addbox">
        <textarea rows={3} placeholder={"Satu nama per baris\nBudi Santoso\nIbu Siti"} value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn" onClick={() => void add()}>Tambah tamu</button>
      </div>
      <div className="tbl"><table>
        <thead><tr><th>Nama</th><th>Status</th><th>Link undangan</th><th /></tr></thead>
        <tbody>{list.map((g) => (
          <tr key={g.id}>
            <td>{g.name}</td>
            <td><span className={`pill ${filled.has(g.name.trim().toLowerCase()) ? "hadir" : "ragu"}`}>{filled.has(g.name.trim().toLowerCase()) ? "Sudah mengisi" : "Belum"}</span></td>
            <td className="msg">{link(g)}</td>
            <td className="acts">
              <button className="btn ghost sm" onClick={() => copy(g)}>{copied === g.id ? "Tersalin" : "Salin"}</button>
              <a className="btn ghost sm" href={wa(g)} target="_blank" rel="noopener">WhatsApp</a>
              <button className="btn ghost sm" onClick={async () => { await supabase!.from(GUESTS).delete().eq("id", g.id); void load(); }}>Hapus</button>
            </td>
          </tr>))}
        </tbody>
      </table>{list.length === 0 && <p className="empty">Belum ada tamu. Tambahkan nama di atas.</p>}</div>
    </>
  );
}

function Dashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<"resp" | "guests">("resp");
  return (
    <>
      <div className="adminbar"><b>Admin · Khitanan Rafi</b><span>{email}</span><button className="btn ghost sm" onClick={() => void supabase!.auth.signOut()}>Keluar</button></div>
      <div className="tabs">
        <button className={tab === "resp" ? "on" : ""} onClick={() => setTab("resp")}>Konfirmasi & Ucapan</button>
        <button className={tab === "guests" ? "on" : ""} onClick={() => setTab("guests")}>Daftar Tamu & Link</button>
      </div>
      {tab === "resp" ? <Responses /> : <Guests />}
    </>
  );
}

function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    const sb = supabase;
    if (!sb) return;
    void sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  return (
    <div className="admin">
      {!supabase ? <p className="note bad">Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env dulu.</p>
        : session === undefined ? <p>Memuat...</p>
        : session ? <Dashboard email={session.user.email ?? ""} /> : <div className="wrap"><h2>Admin</h2><Login /></div>}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><Admin /></StrictMode>);
