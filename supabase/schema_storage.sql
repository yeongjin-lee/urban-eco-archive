-- ============================================================================
-- 사진 업로드(Storage) 기능을 위한 추가 SQL
-- Supabase → SQL Editor → New Query 에 붙여넣고 Run 하세요.
-- ============================================================================

-- 1. 기존 테이블에 사진 주소(image_url) 칸 추가
alter table public.proposals add column if not exists image_url text;
alter table public.eco_records add column if not exists image_url text;

-- 2. 사진 저장용 버킷(eco-images) 생성 (누구나 보기 가능)
insert into storage.buckets (id, name, public)
values ('eco-images', 'eco-images', true)
on conflict (id) do nothing;

-- 3. 저장소 보안 규칙: 누구나 사진 보기 가능, 로그인한 사용자만 업로드 가능
create policy "누구나 생태 사진 조회 가능"
  on storage.objects for select
  using (bucket_id = 'eco-images');

create policy "로그인한 사용자만 사진 업로드 가능"
  on storage.objects for insert
  with check (bucket_id = 'eco-images' and auth.role() = 'authenticated');
