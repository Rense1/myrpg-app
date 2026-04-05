-- ============================================================
-- 001_initial.sql  — RPGステータス育成アプリ 初期スキーマ
-- ============================================================

-- ---- extensions ----
create extension if not exists "uuid-ossp";

-- ============================================================
-- テーブル定義
-- ============================================================

-- characters: キャラクター情報（1ユーザー1キャラ）
create table if not exists public.characters (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  name           text not null,
  parts          jsonb not null default '{}'::jsonb,
  selected_stats text[] not null default array[]::text[],
  stats          jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique(user_id)
);

-- actions: ユーザーが登録した習慣行動
create table if not exists public.actions (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  description text not null default '',
  stat_gains  jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

-- action_logs: 行動実行の記録
create table if not exists public.action_logs (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  action_id   uuid references public.actions(id) on delete set null,
  action_name text not null,
  stat_gains  jsonb not null default '[]'::jsonb,
  logged_at   timestamptz not null default now()
);

-- battle_records: 戦闘履歴
create table if not exists public.battle_records (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  enemy_type text not null check (enemy_type in ('monster', 'boss')),
  enemy_id   integer not null,
  result     text not null check (result in ('win', 'lose')),
  pattern    integer not null check (pattern in (1, 2)),
  battled_at timestamptz not null default now()
);

-- ============================================================
-- updated_at 自動更新トリガー
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger characters_updated_at
  before update on public.characters
  for each row execute function public.handle_updated_at();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table public.characters    enable row level security;
alter table public.actions       enable row level security;
alter table public.action_logs   enable row level security;
alter table public.battle_records enable row level security;

-- ---- characters ----
create policy "characters: own select"
  on public.characters for select
  using (auth.uid() = user_id);

create policy "characters: own insert"
  on public.characters for insert
  with check (auth.uid() = user_id);

create policy "characters: own update"
  on public.characters for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "characters: own delete"
  on public.characters for delete
  using (auth.uid() = user_id);

-- ---- actions ----
create policy "actions: own select"
  on public.actions for select
  using (auth.uid() = user_id);

create policy "actions: own insert"
  on public.actions for insert
  with check (auth.uid() = user_id);

create policy "actions: own update"
  on public.actions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "actions: own delete"
  on public.actions for delete
  using (auth.uid() = user_id);

-- ---- action_logs ----
create policy "action_logs: own select"
  on public.action_logs for select
  using (auth.uid() = user_id);

create policy "action_logs: own insert"
  on public.action_logs for insert
  with check (auth.uid() = user_id);

-- ---- battle_records ----
create policy "battle_records: own select"
  on public.battle_records for select
  using (auth.uid() = user_id);

create policy "battle_records: own insert"
  on public.battle_records for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- インデックス
-- ============================================================
create index if not exists idx_characters_user_id    on public.characters(user_id);
create index if not exists idx_actions_user_id       on public.actions(user_id);
create index if not exists idx_action_logs_user_id   on public.action_logs(user_id);
create index if not exists idx_action_logs_logged_at on public.action_logs(logged_at desc);
create index if not exists idx_battle_records_user   on public.battle_records(user_id);
