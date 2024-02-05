-- Timestamp: 2024-02-03 21:29:36
CREATE TABLE tags (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag_name TEXT NOT NULL,
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

alter table tags enable row level security;

create policy "Users can insert tags"
on tags for insert to authenticated with check (
  auth.uid() = created_by
);

create policy "Users can query their own tags"
on tags for select to authenticated using (
  auth.uid() = created_by
);

create policy "Users can update their own tags"
on tags for update to authenticated using (
  auth.uid() = created_by
);

create policy "Users can delete their own tags"
on tags for delete to authenticated using (
  auth.uid() = created_by
);

-- Documents can have many tags
-- Tags can be applied to many documents
-- This is a many-to-many relationship
-- We need a join table to represent this relationship

CREATE TABLE document_tags (
  document_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (document_id, tag_id),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

ALTER TABLE document_tags ENABLE ROW LEVEL SECURITY;

-- Users can only insert document_tags if they are the creator of the document
CREATE POLICY select_document_tags ON document_tags
FOR SELECT
USING ((SELECT created_by FROM documents WHERE id = document_id) = auth.uid());

-- This code creates a policy named "delete_document_tags" on the table "document_tags" for the DELETE operation.
-- The policy checks if the user executing the DELETE operation is the same user who created the document associated with the tag.
-- If the user is not the creator, the DELETE operation will be denied
CREATE POLICY delete_document_tags ON document_tags
FOR DELETE
USING ((SELECT created_by FROM documents WHERE id = document_id) = auth.uid());

-- Users can only insert document_tags if they are the creator of the documents
CREATE POLICY insert_document_tags ON document_tags
FOR INSERT
WITH CHECK ((SELECT created_by FROM documents WHERE id = document_id) = auth.uid());

-- Users can only update document_tags if they are the creator of the documents
CREATE POLICY update_document_tags ON document_tags
FOR UPDATE
USING ((SELECT created_by FROM documents WHERE id = document_id) = auth.uid());


-- This function returns all documents with their associated tags
CREATE OR REPLACE FUNCTION public.get_documents_with_tags()
RETURNS TABLE (
    id BIGINT,
    name TEXT,
    folder_id BIGINT,
    storage_object_id UUID,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    tags JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        d.id AS id,
        d.name AS name,
        d.folder_id,
        d.storage_object_id,
        d.created_by AS created_by,
        d.created_at AS created_at,
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'id', t.id,
                'tag_name', t.tag_name,
                'created_by', t.created_by,
                'created_at', t.created_at
            )
        ) AS tags
    FROM public.documents d
    LEFT JOIN public.document_tags dt ON d.id = dt.document_id
    LEFT JOIN public.tags t ON dt.tag_id = t.id
    GROUP BY d.id
    ORDER BY d.id;
END; $$
LANGUAGE plpgsql STABLE;


CREATE OR REPLACE FUNCTION public.get_tags_with_documents()
RETURNS TABLE (
    id BIGINT,
    tag_name TEXT,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE,
    documents JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id AS id,
        t.tag_name,
        t.created_by AS created_by,
        t.created_at AS created_at,
        JSONB_AGG(
            JSONB_BUILD_OBJECT(
                'document_id', d.id,
                'document_name', d.name,
                'folder_id', d.folder_id,
                'storage_object_id', d.storage_object_id,
                'document_created_by', d.created_by,
                'document_created_at', d.created_at
            ) ORDER BY d.id
        ) FILTER (WHERE d.id IS NOT NULL) AS documents
    FROM public.tags t
    LEFT JOIN public.document_tags dt ON t.id = dt.tag_id
    LEFT JOIN public.documents d ON dt.document_id = d.id
    GROUP BY t.id
    ORDER BY t.id;
END; $$
LANGUAGE plpgsql STABLE;
