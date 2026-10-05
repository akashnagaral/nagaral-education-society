-- Run this in Supabase SQL Editor (free project)

create extension if not exists "pgcrypto";

create table if not exists portal_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  doc_type text not null check (doc_type in ('result', 'notes', 'announcement', 'other')),
  college text not null check (college in ('ntss', 'nes')),
  audience text[] not null default '{}',
  file_name text not null,
  file_path text not null,
  file_url text not null,
  uploaded_by text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

-- If table already existed without expires_at:
alter table portal_documents
  add column if not exists expires_at timestamptz;

update portal_documents
set expires_at = created_at + interval '7 days'
where expires_at is null;

insert into storage.buckets (id, name, public)
values ('portal-docs', 'portal-docs', true)
on conflict (id) do nothing;

alter table portal_documents enable row level security;

drop policy if exists "Public read portal_documents" on portal_documents;
create policy "Public read portal_documents"
  on portal_documents for select
  using (true);

-- Writes go through Next.js API with service role key (bypasses RLS).
-- App auto-deletes rows + storage files older than 7 days on list/upload.
