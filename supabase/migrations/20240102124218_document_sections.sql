-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector with schema extensions;

create table document_sections (
  id bigint primary key generated always as identity,
  document_id bigint not null references documents (id),
  content text not null, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  openai_embedding vector (1536), -- 1536 works for OpenAI embeddings, change if needed
  isvectorized boolean default false,
  xenova_embedding vector (384) -- 384 works for 'Supabase/gte-small'
);

-- Create an index on the embedding vector
-- create index on document_sections using hnsw (openai_embedding vector_ip_ops);


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table document_sections 
  enable row level security;

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
-- create policy "Users can query their own document sections"
-- on document_sections for select to authenticated using (
--   document_id in (
--     select id
--     from documents
--     where created_by = auth.uid()
--   )
-- );

create policy "All users can query document sections"
on document_sections for select to authenticated using (true);


-- Create a policy to allow authenticated users to update document sections
create policy "Users can update their own document sections"
on document_sections for update to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
) with check (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
);

-- Create a policy to allow authenticated users to delete document sections
create policy "Users can delete their own document sections"
on document_sections for delete to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
);

-- Create a function to get the supabase_url from the vault
create function supabase_url()
returns text
language plpgsql
security definer
as $$
declare
  secret_value text;
begin
  select decrypted_secret into secret_value from vault.decrypted_secrets where name = 'supabase_url';
  return secret_value;
end;
$$;


-- Create a function to get the dimensions of a vector
create or replace function sub_vector(v vector, dimensions int)
returns vector
language plpgsql
immutable
as $$
begin
  if dimensions > vector_dims(v) then
    raise exception 'dimensions must be less than or equal to the vector size';
  end if;

  return (
    with unnormed(elem) as (
      select x from unnest(v::float4[]) with ordinality v(x, ix)
      where ix <= dimensions
    ),
    norm(factor) as (
      select
        sqrt(sum(pow(elem, 2)))
      from
        unnormed
    )
    select
      array_agg(u.elem / r.factor)::vector
    from
      norm r, unnormed u
  );
end;
$$;


-- Create an HNSW index on the document_sections table
-- create index on document_sections
-- using hnsw ((sub_vector(embedding, 512)::vector(512)) vector_ip_ops)
-- with (m = 32, ef_construction = 400);
