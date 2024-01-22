create table download_stats (
  id bigint primary key generated always as identity,
  document_id bigint references documents(id),
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamp with time zone not null default now()
);

alter table download_stats enable row level security;

create policy "Users can insert download_stats"
on download_stats for insert to authenticated with check (
  auth.uid() = created_by
);

create policy "Users can query their own download_stats"
on download_stats for select to authenticated using (
  auth.uid() = created_by
);
