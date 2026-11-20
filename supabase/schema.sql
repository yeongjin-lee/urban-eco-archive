-- ============================================================================
-- 도시생태기록소 Supabase 데이터베이스 테이블 & 보안 규칙(RLS)
-- Supabase 대시보드 → SQL Editor → New Query 에 그대로 붙여넣고 Run 하세요.
-- ============================================================================

-- 1. 회원 프로필 테이블 (auth.users와 연결)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null default '시민 기록자',
  email text,
  location_consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "누구나 프로필 조회 가능"
  on public.profiles for select using (true);

create policy "본인 프로필만 수정 가능"
  on public.profiles for update using (auth.uid() = id);

create policy "본인 프로필 생성 가능"
  on public.profiles for insert with check (auth.uid() = id);

-- 2. 녹색제안 테이블
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null default '시민',
  tag text not null,
  title text not null,
  description text not null,
  location text not null,
  likes_count int not null default 0,
  comments_count int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.proposals enable row level security;

create policy "누구나 녹색제안 읽기 가능 (비회원 포함)"
  on public.proposals for select using (true);

create policy "로그인한 사용자만 녹색제안 작성 가능"
  on public.proposals for insert with check (auth.uid() = user_id);

create policy "본인 글만 삭제 가능"
  on public.proposals for delete using (auth.uid() = user_id);

-- 3. 내 생태 기록 테이블 (마이페이지)
create table if not exists public.eco_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null check (category in ('식물', '동물', '공간')),
  title text not null,
  location text not null,
  bookmarked boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.eco_records enable row level security;

create policy "본인 기록만 조회 가능"
  on public.eco_records for select using (auth.uid() = user_id);

create policy "본인 기록만 작성 가능"
  on public.eco_records for insert with check (auth.uid() = user_id);

create policy "본인 기록만 수정 가능"
  on public.eco_records for update using (auth.uid() = user_id);

create policy "본인 기록만 삭제 가능"
  on public.eco_records for delete using (auth.uid() = user_id);
