/**
 * Organizes the initial data into a hierarchical folder structure.
 *
 * @param initialData An array of objects representing the initial data.
 * @returns An array of Folder objects representing the organized folder structure.
 */
export interface Document {
  document_name: string | null
  document_id: number | null
}

export interface FolderType {
  folder_id: number
  folder_name: string
  parent_folder_id: number | null
  children: FolderType[]
  documents: Document[]
}

interface InputData
  extends Pick<FolderType, "folder_id" | "folder_name" | "parent_folder_id">,
    Document {}

function organizeFolders(initialData: InputData[]): FolderType[] {
  const folders: { [key: number]: FolderType } = {}

  for (const item of initialData) {
    // Ensure the folder exists in the folders dictionary
    if (!folders[item.folder_id]) {
      folders[item.folder_id] = {
        folder_id: item.folder_id,
        folder_name: item.folder_name,
        parent_folder_id: item.parent_folder_id,
        children: [],
        documents: [],
      }
    }
    // Now that we're sure the folder exists, access it safely
    const folder = folders[item.folder_id]

    // If the item has document data, add it to the folder's documents
    if (folder && item.document_id !== null) {
      folder.documents.push({
        document_id: item.document_id,
        document_name: item.document_name,
      })
    }
  }

  // Organize folders into a hierarchy
  const rootFolders: FolderType[] = []
  Object.values(folders).forEach((folder) => {
    if (folder.parent_folder_id === null) {
      rootFolders.push(folder)
    } else {
      const parentFolder = folders[folder.parent_folder_id]
      if (parentFolder) {
        parentFolder.children.push(folder)
      }
    }
  })

  return rootFolders
}

export { organizeFolders }
