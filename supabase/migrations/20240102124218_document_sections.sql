-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector with schema extensions;

create table document_sections (
  id bigint primary key generated always as identity,
  document_id bigint not null references documents (id),
  content text not null,
  embedding vector (384)
);

-- Create an index on the embedding vector
-- create index on document_sections using hnsw (embedding vector_ip_ops);

-- Enable row level security
alter table document_sections enable row level security;

-- Create a policy to allow authenticated users to insert document sections
create policy "Users can insert document sections"
on document_sections for insert to authenticated with check (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
);

-- Create a policy to allow authenticated users to query document sections
create policy "Users can query their own document sections"
on document_sections for select to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
);
