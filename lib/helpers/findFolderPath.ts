import { TFolder } from "../types/TableTypes"

type TFolderRestricted = Omit<TFolder, "created_at" | "created_by">

export function findFolderPath(
  folders: TFolderRestricted[],
  id: TFolder["id"]
): TFolder["id"][] {
  // Helper function to recursively find the path
  const findParentPath = (currentId: number, acc: number[]): number[] => {
    // Find the current folder by ID
    const folder = folders.find((folder) => folder.id === currentId)
    if (!folder) return acc // If the folder is not found, return the accumulator
    acc.unshift(folder.id) // Add the current folder ID to the start of the accumulator
    if (folder.parent_folder_id === null) return acc // If there's no parent, return the path
    return findParentPath(folder.parent_folder_id, acc) // Otherwise, continue with the parent
  }

  return findParentPath(id, [])
}
