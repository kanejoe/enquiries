-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector with schema extensions;

create table document_sections (
  id bigint primary key generated always as identity,
  document_id bigint not null references documents (id),
  content text not null, -- corresponds to Document.pageContent
  metadata jsonb, -- corresponds to Document.metadata
  embedding vector (384)-- 1536 works for OpenAI embeddings, change if needed
);

-- Create an index on the embedding vector
-- create index on document_sections using hnsw (embedding vector_ip_ops);

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
create policy "Users can query their own document sections"
on document_sections for select to authenticated using (
  document_id in (
    select id
    from documents
    where created_by = auth.uid()
  )
);

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

-- CREATE POLICY "Allow langchain querying for authenticated users" 
--   ON "public"."document_sections"
-- AS PERMISSIVE FOR SELECT
-- TO authenticated
-- USING (true);

-- General purpose trigger function to generate text embeddings
-- on newly inserted rows.
--
-- Calls an edge function at `/embed` in batches that asynchronously
-- generates the embeddings and stores them on each record.
-- 
-- Trigger is expected to have the format:
--
-- create trigger <trigger_name>
-- after insert on <table_name>
-- referencing new table as inserted
-- for each statement
-- execute procedure private.embed(<content_column>, <embedding_column>);
--
-- Expects 3 arguments: `private.embed(<content_column>, <embedding_column>, <batch_size>)`
-- where the first argument indicates the source column containing the text content,
-- the second argument indicates the destination column to store the embedding,
-- and the third argument indicates the number of records to include in each edge function call.
create function private.embed() 
returns trigger 
language plpgsql
as $$
declare
  content_column text = TG_ARGV[0];
  embedding_column text = TG_ARGV[1];
  batch_size int = TG_ARGV[2];
  batch_count int = ceiling((select count(*) from inserted) / batch_size::float);
  result int;
begin

  for i in 0 .. (batch_count-1) loop
  select
    net.http_post(
      url := supabase_url() || '/functions/v1/embed',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', current_setting('request.headers')::json->>'authorization'
      ),
      body := jsonb_build_object(
        'ids', (select json_agg(ds.id) from (select id from inserted limit batch_size offset i*batch_size) ds),
        'table', TG_TABLE_NAME,
        'contentColumn', content_column,
        'embeddingColumn', embedding_column
      )
    )
  into result;
  end loop;

  return null;
end;
$$;

create trigger embed_document_sections
  after insert on document_sections
  referencing new table as inserted
  for each statement
  execute procedure private.embed(content, embedding, 5);