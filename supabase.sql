-- Jalankan di Supabase > SQL Editor. Aman diulang (idempotent), jadi jalankan saja walau tabel sudah ada.
create table if not exists public.khitanan_wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  attendance text not null,
  message text not null default '' check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);
alter table public.khitanan_wishes add column if not exists guests integer not null default 1;
alter table public.khitanan_wishes add column if not exists hidden boolean not null default false;
alter table public.khitanan_wishes drop constraint if exists khitanan_wishes_attendance_check;
alter table public.khitanan_wishes add constraint khitanan_wishes_attendance_check check (attendance in ('hadir','tidak','ragu'));
alter table public.khitanan_wishes drop constraint if exists khitanan_wishes_guests_check;
alter table public.khitanan_wishes add constraint khitanan_wishes_guests_check check (guests between 0 and 10);
alter table public.khitanan_wishes enable row level security;

drop policy if exists "tamu boleh baca" on public.khitanan_wishes;
drop policy if exists "tamu boleh kirim" on public.khitanan_wishes;
drop policy if exists "admin boleh hapus" on public.khitanan_wishes;
drop policy if exists "admin boleh ubah" on public.khitanan_wishes;
create policy "tamu boleh baca" on public.khitanan_wishes for select using (hidden = false or auth.role() = 'authenticated');
create policy "tamu boleh kirim" on public.khitanan_wishes for insert with check (hidden = false);
create policy "admin boleh hapus" on public.khitanan_wishes for delete to authenticated using (true);
create policy "admin boleh ubah" on public.khitanan_wishes for update to authenticated using (true) with check (true);

create table if not exists public.khitanan_guests (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  created_at timestamptz not null default now()
);
alter table public.khitanan_guests enable row level security;
drop policy if exists "admin kelola tamu" on public.khitanan_guests;
create policy "admin kelola tamu" on public.khitanan_guests for all to authenticated using (true) with check (true);

do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and tablename='khitanan_wishes') then
    alter publication supabase_realtime add table public.khitanan_wishes;
  end if;
end $$;
