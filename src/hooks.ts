import { useEffect, useMemo, useState } from "react";

export interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

export function useCountdown(target: string): TimeLeft {
  const end = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const s = Math.max(0, Math.floor((end - now) / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24, minutes: Math.floor(s / 60) % 60, seconds: s % 60 };
}

/** Nama tamu dari ?to=Nama. React meng-escape teks, jadi aman dari XSS. */
export function useGuest(fallback = "Tamu Undangan"): string {
  return useMemo(() => (new URLSearchParams(window.location.search).get("to")?.trim() || fallback).slice(0, 60), [fallback]);
}

export const toGCalDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
