import { useEffect, useRef, useState } from "react";
import { config as c } from "./config";
import { toGCalDate, useCountdown, useGuest } from "./hooks";
import { Guestbook } from "./Guestbook";
import { Elephant, Leaf, Lion, Monkey, Orangutan, Sloth, Vine } from "./animals";

function Portrait() {
  const [ok, setOk] = useState(true);
  return (
    <div className="frame">
      {ok ? <img src={c.photo} alt={`Foto ${c.nickname}`} onError={() => setOk(false)} /> : <Lion className="frame-fallback" />}
    </div>
  );
}

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <div className="gallery">
        {c.gallery.map((src, i) => (
          <button key={src} className="snap" onClick={() => setOpen(i)} aria-label={`Perbesar foto ${i + 1}`}>
            <img src={src} alt={`Foto keluarga ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <img src={c.gallery[open]} alt={`Foto keluarga ${open + 1}`} />
          <button className="btn ghost" onClick={() => setOpen(null)}>Tutup</button>
        </div>
      )}
    </>
  );
}

function Countdown() {
  const t = useCountdown(c.event.start);
  const cells: ReadonlyArray<readonly [number, string]> = [[t.days, "Hari"], [t.hours, "Jam"], [t.minutes, "Menit"], [t.seconds, "Detik"]];
  return (
    <div className="cd" role="timer">
      {cells.map(([n, label]) => (
        <div key={label}><b>{String(n).padStart(2, "0")}</b><span>{label}</span></div>
      ))}
    </div>
  );
}

function Gift() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard?.writeText(c.gift.number).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className="gift">
      <b>{c.gift.bank}</b>
      <span className="num">{c.gift.number}</span>
      <span>a.n. {c.gift.holder}</span>
      <button className="btn ghost" onClick={copy}>{copied ? "Tersalin" : "Salin nomor"}</button>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [music, setMusic] = useState<"off" | "on" | "missing">("off");
  const audio = useRef<HTMLAudioElement>(null);
  const guest = useGuest();

  useEffect(() => { document.body.style.overflow = open ? "" : "hidden"; }, [open]);

  const enter = () => {
    setOpen(true);
    window.scrollTo(0, 0);
    if (audio.current) audio.current.volume = 0.5;
    audio.current?.play().then(() => setMusic("on")).catch(() => undefined);
  };
  const toggleMusic = () => {
    const a = audio.current;
    if (!a) return;
    if (music === "on") { a.pause(); setMusic("off"); } else { a.play().then(() => setMusic("on")).catch(() => setMusic("missing")); }
  };

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Tasyakuran Khitanan ${c.nickname}`)}&dates=${toGCalDate(c.event.start)}/${toGCalDate(c.event.end)}&location=${encodeURIComponent(c.event.mapsQuery)}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.event.mapsQuery)}`;

  return (
    <>
      <div className={`cover${open ? " open" : ""}`} aria-hidden={open}>
        <Vine className="vine" /><Monkey className="monkey" />
        <p className="cover-kicker">Tasyakuran Khitanan</p>
        <h1>{c.nickname}</h1>
        <div className="guest"><small>Kepada Yth. Bapak/Ibu/Saudara/i</small><b>{guest}</b></div>
        <button className="btn" onClick={enter}>Buka undangan</button>
        <div className="peek" aria-hidden="true">
          <Orangutan /><Lion /><Elephant /><Sloth />
        </div>
      </div>

      <main>
        <header className="hero">
          <Vine className="vine" /><Leaf className="leaf bay" />
          <p className="tag">Tasyakuran Khitanan</p>
          <Portrait />
          <h1>{c.fullName}</h1>
          <div className="torn" aria-hidden="true">
            <Orangutan className="a a1" /><Lion className="a a2" /><Elephant className="a a3" /><Sloth className="a a4" />
          </div>
        </header>

        <section className="wrap">
          <h2>Assalamu’alaikum Wr. Wb.</h2>
          <p>Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan mendoakan putra kami yang akan dikhitan.</p>
          <p className="parents">Putra dari<br /><b>{c.parents}</b></p>
        </section>

        <section className="wrap">
          <div className="ayat">
            <p className="ar" lang="ar" dir="rtl">{c.ayat.arab}</p>
            <p>{c.ayat.arti}</p>
            <small>{c.ayat.sumber}</small>
          </div>
        </section>

        <section className="wrap">
          <h2>Hitung mundur menuju hari bahagia</h2>
          <Countdown />
        </section>

        <section className="wrap">
          <article className="ticket">
            <p className="ticket-top">Walimatul Khitan</p>
            <h2>{c.event.dateLabel}</h2>
            <p>{c.event.timeLabel}</p>
            <hr />
            <h2>{c.event.venue}</h2>
            <p>{c.event.address}</p>
            <p className="ent">{c.event.entertainment}</p>
            <div className="actions">
              <a className="btn ghost" href={maps} target="_blank" rel="noopener">Buka peta</a>
              <a className="btn ghost" href={gcal} target="_blank" rel="noopener">Simpan ke kalender</a>
            </div>
          </article>
        </section>

        <section className="wrap">
          <h2>Momen keluarga kami</h2>
          <Gallery />
        </section>

        <section className="wrap">
          <h2>Dompet digital</h2>
          <p>Doa restu Anda sudah cukup bagi kami. Jika ingin berbagi tanda kasih, dapat melalui:</p>
          <Gift />
        </section>

        <section className="wrap">
          <h2>Ucapan dan konfirmasi kehadiran</h2>
          <Guestbook />
        </section>

        <footer>
          <div className="row" aria-hidden="true"><Lion /><Sloth /><Orangutan /><Elephant /></div>
          <h2>Terima kasih</h2>
          <p>Kehadiran dan doa Anda sangat berarti bagi kami. Wassalamu’alaikum Wr. Wb.</p>
          <p><b>Keluarga besar {c.fullName}</b></p>
          <a className="adminlink" href="/admin.html">Admin</a>
        </footer>
      </main>

      <audio ref={audio} src={c.music} loop onError={() => setMusic("missing")} />
      {open && music !== "missing" && (
        <button className="music" onClick={toggleMusic} aria-label={music === "on" ? "Matikan musik" : "Nyalakan musik"} aria-pressed={music === "on"}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9z" />{music === "on" ? <path d="M17 8c2 2 2 6 0 8" /> : <path d="M17 9l4 6M21 9l-4 6" />}
          </svg>
        </button>
      )}
    </>
  );
}
