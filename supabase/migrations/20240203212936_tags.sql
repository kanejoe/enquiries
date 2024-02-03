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

-- Folders can have many tags
-- Tags can be applied to many folders
-- This is a many-to-many relationship
-- We need a join table to represent this relationship

CREATE TABLE folder_tags (
  folder_id BIGINT NOT NULL,
  tag_id BIGINT NOT NULL,
  PRIMARY KEY (folder_id, tag_id),
  FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

ALTER TABLE folder_tags ENABLE ROW LEVEL SECURITY;

-- Users can only insert folder_tags if they are the creator of the folder
CREATE POLICY select_folder_tags ON folder_tags
FOR SELECT
USING ((SELECT created_by FROM folders WHERE id = folder_id) = auth.uid());

-- This code creates a policy named "delete_folder_tags" on the table "folder_tags" for the DELETE operation.
-- The policy checks if the user executing the DELETE operation is the same user who created the folder associated with the tag.
-- If the user is not the creator, the DELETE operation will be denied
CREATE POLICY delete_folder_tags ON folder_tags
FOR DELETE
USING ((SELECT created_by FROM folders WHERE id = folder_id) = auth.uid());

-- Users can only insert folder_tags if they are the creator of the folder
CREATE POLICY insert_folder_tags ON folder_tags
FOR INSERT
WITH CHECK ((SELECT created_by FROM folders WHERE id = folder_id) = auth.uid());

-- Users can only update folder_tags if they are the creator of the folder
CREATE POLICY update_folder_tags ON folder_tags
FOR UPDATE
USING ((SELECT created_by FROM folders WHERE id = folder_id) = auth.uid());

