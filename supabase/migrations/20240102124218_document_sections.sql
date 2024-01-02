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

