CREATE OR REPLACE FUNCTION get_documents_by_chat_query(chat_query_id_param BIGINT)
RETURNS TABLE(
    document_id BIGINT,
    document_name TEXT,
    file_extension TEXT,
    folder_id BIGINT,
    storage_object_id UUID,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY 
    SELECT DISTINCT
        d.id,
        d.name,
        d.file_extension,
        d.folder_id,
        d.storage_object_id,
        d.created_by,
        d.created_at
    FROM
        chat_query_document_section cqds
    JOIN document_sections ds ON cqds.document_section_id = ds.id
    JOIN documents d ON ds.document_id = d.id
    WHERE
        cqds.chat_query_id = chat_query_id_param;
END; $$
LANGUAGE plpgsql;
