import { useCallback, useEffect, useState } from "react";
import { supabase, TABLE } from "./supabase";

export type Attendance = "hadir" | "tidak" | "ragu";
export interface Wish { id: string; name: string; attendance: Attendance; guests: number; message: string; hidden: boolean; created_at: string }
export const STATUS: Record<Attendance, string> = { hadir: "Hadir", tidak: "Berhalangan", ragu: "Masih ragu" };

/** Ambil ucapan dan muat ulang otomatis tiap ada perubahan (realtime). all=true untuk admin (termasuk yang disembunyikan). */
export function useWishes(all = false) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    if (!supabase) return;
    let q = supabase.from(TABLE).select("*");
    if (!all) q = q.eq("hidden", false);
    const { data, error: err } = await q.order("created_at", { ascending: false }).limit(500);
    if (err) setError(err.message); else { setError(""); setWishes(data as Wish[]); }
  }, [all]);
  useEffect(() => {
    const sb = supabase;
    if (!sb) return;
    void load();
    const ch = sb.channel(`wishes-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, () => void load())
      .subscribe();
    return () => { void sb.removeChannel(ch); };
  }, [load]);
  return { wishes, error, reload: load };
}

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
