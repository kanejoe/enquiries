
CREATE TABLE folders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  folder_name TEXT NOT NULL,
  parent_folder_id BIGINT REFERENCES folders(id) ON DELETE CASCADE,
  created_by UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

alter table folders enable row level security;

create policy "Users can insert folders"
on folders for insert to authenticated with check (
  auth.uid() = created_by
);

create policy "Users can query their own folders"
on folders for select to authenticated using (
  auth.uid() = created_by
);
