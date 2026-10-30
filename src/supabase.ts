import { createClient } from "@supabase/supabase-js";

const clean = (s?: string) => (s ?? "").trim().replace(/^["']|["']$/g, "");
/** Ambil origin saja, jadi path seperti /rest/v1/ yang ikut tertempel tidak merusak request. */
const origin = (raw?: string) => { try { return new URL(clean(raw)).origin; } catch { return ""; } };

const url = origin(import.meta.env.VITE_SUPABASE_URL as string | undefined);
const key = clean(import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

/** null kalau .env belum diisi, supaya halaman tetap tampil tanpa error. */
export const supabase = url && key ? createClient(url, key) : null;
export const TABLE = "khitanan_wishes";
export const GUESTS = "khitanan_guests";
