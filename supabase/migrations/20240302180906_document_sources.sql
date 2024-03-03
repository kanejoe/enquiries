CREATE TABLE IF NOT EXISTS chat_query_document_section (
    chat_query_id BIGINT NOT NULL REFERENCES chat_queries(id),
    document_section_id BIGINT NOT NULL REFERENCES document_sections(id),
    created_by uuid not null references auth.users (id) default auth.uid(),
    created_at timestamp with time zone not null default now(),
    PRIMARY KEY (chat_query_id, document_section_id)
);

-- Index on chat_query_id
CREATE INDEX IF NOT EXISTS idx_chat_query_id ON chat_query_document_section(chat_query_id);

-- Index on document_section_id
CREATE INDEX IF NOT EXISTS idx_document_section_id ON chat_query_document_section(document_section_id);

-- Enable row-level security on the chat_query_document_section table
ALTER TABLE chat_query_document_section ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to insert rows into chat_query_document_section
-- Assumes there's a mechanism to capture auth.uid() as the user making the insert
CREATE POLICY "Users can insert chat_query_document_section"
ON chat_query_document_section FOR INSERT TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Create a policy to allow users to select (query) their own rows
CREATE POLICY "Users can query their own chat_query_document_section"
ON chat_query_document_section FOR SELECT TO authenticated
USING (auth.uid() = created_by);

-- Create a policy to allow users to update their own rows
CREATE POLICY "Users can update their own chat_query_document_section"
ON chat_query_document_section FOR UPDATE TO authenticated
USING (auth.uid() = created_by);

-- Create a policy to allow users to delete their own rows
CREATE POLICY "Users can delete their own chat_query_document_section"
ON chat_query_document_section FOR DELETE TO authenticated
USING (auth.uid() = created_by);
