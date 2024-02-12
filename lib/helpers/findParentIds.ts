import { TFoldersExtended } from "../types/TableTypes"

type TFolderId = TFoldersExtended["folder_id"]

export function findParentIds(
  data: TFoldersExtended[],
  targetId: number
): number[] {
  const hierarchyIds: number[] = []

  function findAndCollectParentIds(
    currentData: TFoldersExtended[],
    currentId: number
  ): boolean {
    for (const folder of currentData) {
      if (folder.folder_id === currentId) {
        hierarchyIds.push(folder.folder_id) // Add the folder ID itself
        if (folder.parent_folder_id !== null) {
          findAndCollectParentIds(data, folder.parent_folder_id) // Recursively find parents
        }
        return true
      }

      const foundInChildren = findAndCollectParentIds(
        folder.children,
        currentId
      )
      if (foundInChildren) {
        // If found in children, add this parent ID to the path
        return true
      }
    }
    return false
  }

  findAndCollectParentIds(data, targetId)
  return hierarchyIds
}
