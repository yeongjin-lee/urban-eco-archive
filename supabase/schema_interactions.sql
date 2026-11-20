-- ============================================================================
-- 녹색제안 좋아요 · 댓글 · 북마크(저장) DB 테이블 및 보안 규칙(RLS)
-- Supabase → SQL Editor → New Query 에 붙여넣고 Run 하세요.
-- ============================================================================

-- 1. 좋아요 테이블 (한 사람이 같은 글에 중복 좋아요 불가)
create table if not exists public.proposal_likes (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique (proposal_id, user_id)
);

alter table public.proposal_likes enable row level security;

create policy "누구나 좋아요 수 조회 가능"
  on public.proposal_likes for select using (true);

create policy "로그인한 사용자만 좋아요 추가 가능"
  on public.proposal_likes for insert with check (auth.uid() = user_id);

create policy "본인 좋아요만 취소 가능"
  on public.proposal_likes for delete using (auth.uid() = user_id);

-- 2. 북마크(저장) 테이블
create table if not exists public.proposal_bookmarks (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique (proposal_id, user_id)
);

alter table public.proposal_bookmarks enable row level security;

create policy "본인 북마크만 조회 가능"
  on public.proposal_bookmarks for select using (auth.uid() = user_id);

create policy "본인 북마크만 추가 가능"
  on public.proposal_bookmarks for insert with check (auth.uid() = user_id);

create policy "본인 북마크만 삭제 가능"
  on public.proposal_bookmarks for delete using (auth.uid() = user_id);

-- 3. 댓글 테이블
create table if not exists public.proposal_comments (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  author_name text not null default '시민',
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.proposal_comments enable row level security;

create policy "누구나 댓글 조회 가능"
  on public.proposal_comments for select using (true);

create policy "로그인한 사용자만 댓글 작성 가능"
  on public.proposal_comments for insert with check (auth.uid() = user_id);

create policy "본인 댓글만 삭제 가능"
  on public.proposal_comments for delete using (auth.uid() = user_id);
