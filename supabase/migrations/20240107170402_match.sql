-- Matches document sections using vector similarity search on embeddings
--
-- Returns a setof document_sections so that we can use PostgREST resource embeddings (joins with other tables)
-- Additional filtering like limits can be chained to this function call
create or replace function match_document_sections(embedding vector(1536), match_threshold float)
returns setof document_sections
language plpgsql
as $$
#variable_conflict use_variable
begin
  return query
  select *
  from document_sections

  -- The inner product is negative, so we negate match_threshold
  -- where document_sections.openai_embedding <#> embedding < -match_threshold
  where document_sections.openai_embedding <#> embedding

  -- Our embeddings are normalized to length 1, so cosine similarity
  -- and inner product will produce the same query results.
  -- Using inner product which can be computed faster.
  --
  -- For the different distance functions, see https://github.com/pgvector/pgvector
  order by document_sections.openai_embedding <#> embedding;
end;
$$;


/*
  Function: match_documents_cosine
  
  Description: This function calculates the cosine similarity between a query embedding and the embeddings of documents stored in the 'document_sections' table. It returns the top 'match_count' documents that have a similarity score greater than 'match_threshold'.
  
  Parameters:
    - query_embedding: The embedding vector of the query document.
    - match_threshold: The minimum similarity score required for a document to be considered a match.
    - match_count: The maximum number of matching documents to return.
  
  Returns:
    - id: The ID of the matching document.
    - content: The content of the matching document.
    - similarity: The cosine similarity score between the query document and the matching document.
*/

create or replace function match_documents_cosine (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    document_sections.id,
    document_sections.content,
    1 - (document_sections.openai_embedding <=> query_embedding) as similarity
  from document_sections
  -- where document_sections.openai_embedding <=> query_embedding < 1 - match_threshold
  order by document_sections.openai_embedding <=> query_embedding
  limit match_count;
$$;


/**
 * This SQL function, `match_documents`, is used to find matching documents based on a query embedding.
 * It takes in a query embedding, match threshold, and match count as parameters.
 * The function returns a table with the following columns:
 * - id: The ID of the document section
 * - document_id: The ID of the document
 * - content: The content of the document section
 * - metadata: The metadata of the document section in JSONB format
 * - similarity: The similarity score between the query embedding and the document section's OpenAI embedding
 *
 * The function calculates the similarity score between the query embedding and each document section's OpenAI embedding.
 * It then filters the results based on the match threshold and returns the top `match_count` matches.
 * The results are ordered by the similarity score in ascending order.
 */
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  document_id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    document_sections.id,
    document_sections.document_id,
    document_sections.content,
    document_sections.metadata,
    document_sections.openai_embedding <#> query_embedding as similarity
  from document_sections
  -- where document_sections.openai_embedding <#> query_embedding > match_threshold
  -- order by similarity asc
  order by document_sections.openai_embedding <#> query_embedding
  limit match_count;
$$;
