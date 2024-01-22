/**
 * Organizes the initial data into a hierarchical folder structure.
 *
 * @param initialData An array of objects representing the initial data.
 * @returns An array of Folder objects representing the organized folder structure.
 */
import type { DocumentsType, FoldersType } from "@/types/folders"

interface InputData
  extends Pick<FoldersType, "folder_id" | "folder_name" | "parent_folder_id">,
    DocumentsType {}

/**
 * Organizes the initial data into a hierarchical folder structure.
 *
 * @param initialData An array of objects representing the initial data.
 * @returns An array of Folder objects representing the organized folder structure.
 */
function organizeFolders(initialData: InputData[]): FoldersType[] {
  const folders: { [key: number]: FoldersType } = {}

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
  const rootFolders: FoldersType[] = []
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

/**
 * Searches for folders and documents by name.
 *
 * @param data An array of Folder objects representing the folder structure.
 * @param searchTerm The search term to match against folder and document names.
 * @returns An array of matching Folder and Document objects.
 */
function searchFolders(
  data: FoldersType[],
  searchTerm: string
): (FoldersType | DocumentsType)[] {
  let results: (FoldersType | DocumentsType)[] = []
  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  // Helper function to search recursively in folders and documents
  function searchInFolder(folder: FoldersType) {
    if (folder.folder_name?.toLowerCase().includes(lowerCaseSearchTerm)) {
      results.push(folder)
    }

    for (const child of folder.children) {
      searchInFolder(child)
    }

    for (const doc of folder.documents) {
      if (doc.document_name?.toLowerCase().includes(lowerCaseSearchTerm)) {
        results.push(doc)
      }
    }
  }

  // Starting the search from the root folders
  for (const folder of data) {
    searchInFolder(folder)
  }

  return results
}

export { organizeFolders, searchFolders }
