import { TreeViewActionTypes } from "@/lib/context/TreeViewProvider/TreeViewProvider"
import { useTreeViewContext } from "@/lib/context/TreeViewProvider/useTreeViewContext"
import { findParentIds } from "@/lib/helpers/findParentIds"
import { useFolders } from "@/lib/hooks/useFolders"
import { Button } from "@/components/ui/button"
import LoadingSkeleton from "@/components/LoadingSkeleton"

import { Node } from "./Node"
import { TreeNodeType } from "./TreeView"

export function NodeWrapper({ treeData }: { treeData: TreeNodeType[] }) {
  const { open, dispatch, selectId, selectedId } = useTreeViewContext()
  const folderQuery = useFolders()

  if (folderQuery.isLoading) {
    return <LoadingSkeleton />
  }

  const allFolderIds = folderQuery.data?.map((folder) => folder.id) ?? []

  return (
    <div className="space-y-4">
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          dispatch({
            type: TreeViewActionTypes.CLOSE_MULTIPLE,
            ids: allFolderIds,
          })
        }}
      >
        Close All
      </Button>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          dispatch({
            type: TreeViewActionTypes.OPEN_MULTIPLE,
            ids: allFolderIds,
          })
        }}
      >
        Open All
      </Button>

      <div className="">
        {treeData.map((node) => (
          <Node node={node} key={node.folder_id} />
        ))}
      </div>
    </div>
  )
}
