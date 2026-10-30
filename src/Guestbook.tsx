import { useState, type FormEvent } from "react";
import { useGuest } from "./hooks";
import { supabase, TABLE } from "./supabase";
import { fmtTime, STATUS, useWishes, type Attendance } from "./wishes";

export function Guestbook() {
  const guest = useGuest("");
  const { wishes, error } = useWishes();
  const [name, setName] = useState(guest);
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "fail">("idle");
  const [why, setWhy] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) { setWhy("Supabase belum dikonfigurasi (.env)."); return setState("fail"); }
    setState("sending");
    const { error: err } = await supabase.from(TABLE).insert({ name: name.trim(), attendance, guests: attendance === "hadir" ? guests : 0, message: message.trim() });
    if (err) { setWhy(err.message); return setState("fail"); }
    setMessage("");
    setState("done");
  };

  const hadir = wishes.filter((w) => w.attendance === "hadir");
  return (
    <>
      <form className="rsvp" onSubmit={submit}>
        <label>Nama<input required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
        <label>Kehadiran
          <select value={attendance} onChange={(e) => setAttendance(e.target.value as Attendance)}>
            <option value="hadir">Insya Allah hadir</option>
            <option value="ragu">Masih ragu</option>
            <option value="tidak">Maaf, belum bisa hadir</option>
          </select>
        </label>
        {attendance === "hadir" && (
          <label>Jumlah tamu yang hadir
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1} orang</option>)}
            </select>
          </label>
        )}
        <label>Ucapan dan doa<textarea rows={3} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
        <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Mengirim..." : "Kirim ucapan"}</button>
        {state === "done" && <p className="note ok" role="status">Terima kasih, ucapan Anda sudah masuk.</p>}
        {state === "fail" && <p className="note bad" role="alert">Gagal mengirim: {why}</p>}
      </form>
      <p className="tally">{hadir.reduce((n, w) => n + w.guests, 0)} tamu akan hadir</p>
      {error && <p className="note bad">Ucapan belum bisa dimuat: {error}</p>}
      <ul className="wishes">
        {wishes.map((w) => (
          <li key={w.id}>
            <b>{w.name}</b> <span className={`pill ${w.attendance}`}>{STATUS[w.attendance]}</span>
            {w.message && <p>{w.message}</p>}
            <small>{fmtTime(w.created_at)}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
