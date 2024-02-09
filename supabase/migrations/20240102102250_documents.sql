
create table documents (
  id bigint primary key generated always as identity,
  name text not null,
  file_extension text not null,
  folder_id bigint references folders(id) on delete cascade,
  storage_object_id uuid not null references storage.objects (id),
  created_by uuid not null references auth.users (id) default auth.uid(),
  created_at timestamp with time zone not null default now()
);


create view documents_with_storage_path_and_created_by_email
with (security_invoker=true)
as
  select 
    documents.*, 
    storage.objects.name as storage_object_path,
    profiles.email as created_by_email
  from documents
  join storage.objects
    on storage.objects.id = documents.storage_object_id
  join profiles
    on profiles.id = documents.created_by;    


create view folders_with_documents
with (security_invoker=true)
as
  select 
    folders.id as folder_id,
    folders.folder_name,
    folders.parent_folder_id,
    documents.name as document_name,
    documents.id as document_id,
    documents.created_at as document_created_at,
    storage.objects.id as storage_object_id,
    storage.objects.name as storage_object_path
  from folders
  left outer join documents
    on folders.id = documents.folder_id
  left outer join storage.objects
    on storage.objects.id = documents.storage_object_id;

alter table documents enable row level security;

create policy "Users can insert documents"
on documents for insert to authenticated with check (
  auth.uid() = created_by
);

create policy "Users can update documents"
on documents for update to authenticated using (
  auth.uid() = created_by
);

create policy "Users can query their own documents"
on documents for select to authenticated using (
  auth.uid() = created_by
);

create policy "Users can delete their own documents"
on documents for delete to authenticated using (
  auth.uid() = created_by
);


-- Create a trigger to process new documents when they're inserted.
create function private.handle_storage_update()
returns trigger
language plpgsql
as $$
declare
  document_id bigint;
  file_name text;
  file_extension text;
  result int;
begin
  -- Extract file name from new.path_tokens[2]
  file_name := new.path_tokens[2];
  
  -- Extract the file extension from the file name
  file_extension := regexp_replace(file_name, '.*\.', '', 'g');

  insert into documents (name, storage_object_id, created_by, file_extension)
    values (new.path_tokens[2], new.id, new.owner, file_extension)
    returning id into document_id;

  return null;
end;
$$;

create trigger on_file_upload
  after insert on storage.objects
  for each row
  execute procedure private.handle_storage_update();

    -- select
  --   net.http_post(
  --     url := supabase_url() || '/functions/v1/process',
  --     headers := jsonb_build_object(
  --       'Content-Type', 'application/json',
  --       'Authorization', current_setting('request.headers')::json->>'authorization'
  --     ),
  --     body := jsonb_build_object(
  --       'document_id', document_id
  --     )
  --   )
  -- into result;