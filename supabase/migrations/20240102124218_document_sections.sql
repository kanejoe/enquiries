-- Enable the pgvector extension to work with embedding vectors
create extension vector;

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

-- Create a trigger to process new documents when they're inserted.
create function private.handle_storage_update()
returns trigger
language plpgsql
as $$
declare
  document_id bigint;
  result int;
begin
  insert into documents (name, storage_object_id, created_by)
    values (new.path_tokens[2], new.id, new.owner)
    returning id into document_id;

  return null;
end;
$$;

create trigger on_file_upload
  after insert on storage.objects
  for each row
  execute procedure private.handle_storage_update();