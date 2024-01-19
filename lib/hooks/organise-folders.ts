/**
 * Organizes the initial data into a hierarchical folder structure.
 *
 * @param initialData An array of objects representing the initial data.
 * @returns An array of Folder objects representing the organized folder structure.
 */
interface Document {
  document_name: string | null
  document_id: number | null
}

interface Folder {
  folder_id: number
  folder_name: string
  parent_folder_id: number | null
  children: Folder[]
  documents: Document[]
}

interface InputData
  extends Pick<Folder, "folder_id" | "folder_name" | "parent_folder_id">,
    Document {}

function organizeFolders(initialData: InputData[]): Folder[] {
  const folders: { [key: number]: Folder } = {}

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
  const rootFolders: Folder[] = []
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
