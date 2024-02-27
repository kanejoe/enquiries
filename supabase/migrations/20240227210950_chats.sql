-- Create chat_queries Table
CREATE TABLE IF NOT EXISTS chat_queries (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message_id VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    path TEXT NOT NULL,
    messages JSONB NOT NULL,
    created_by uuid not null references auth.users (id) default auth.uid(),
    created_at timestamp with time zone not null default now()
);

-- Optional: Indexes for optimizing queries
-- Create an index on message_id if you will frequently query by this field
CREATE INDEX IF NOT EXISTS idx_chat_queries_message_id ON chat_queries(message_id);

-- Create a GIN index on messages if you plan to perform complex queries on the JSONB column
CREATE INDEX IF NOT EXISTS idx_chat_queries_messages ON chat_queries USING GIN(messages);


-- Enable row-level security on the chat_queries table
ALTER TABLE chat_queries ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to insert rows into chat_queries
-- Assumes there's a mechanism to capture auth.uid() as the user making the insert
CREATE POLICY "Users can insert chat_queries"
ON chat_queries FOR INSERT TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Create a policy to allow users to select (query) their own rows
CREATE POLICY "Users can query their own chat_queries"
ON chat_queries FOR SELECT TO authenticated
USING (auth.uid() = created_by);

-- Create a policy to allow users to update their own rows
CREATE POLICY "Users can update their own chat_queries"
ON chat_queries FOR UPDATE TO authenticated
USING (auth.uid() = created_by);

-- Create a policy to allow users to delete their own rows
CREATE POLICY "Users can delete their own chat_queries"
ON chat_queries FOR DELETE TO authenticated
USING (auth.uid() = created_by);
