type Folder = {
  id: number
  folder_name: string
  parent_folder_id: number | null
}

type FolderWithFullName = {
  id: number
  full_name: string
}

function buildFolderPath(folders: Folder[]): FolderWithFullName[] {
  const folderMap = new Map<number, Folder>()
  folders.forEach((folder) => folderMap.set(folder.id, folder))

  const buildFullName = (folder: Folder): string => {
    if (folder.parent_folder_id == null) {
      return folder.folder_name
    } else {
      const parentFolder = folderMap.get(folder.parent_folder_id)
      if (parentFolder) {
        return `${buildFullName(parentFolder)} / ${folder.folder_name}`
      }
      return folder.folder_name // Fallback if parent not found
    }
  }

  return folders.map((folder) => ({
    id: folder.id,
    full_name: buildFullName(folder),
  }))
}

export { buildFolderPath }
