import { useContext } from "react"

import { findParentIds } from "@/lib/helpers/findParentIds"
import { Button } from "@/components/ui/button"

import { Node } from "./Node"
import { TreeNodeType } from "./TreeView"
import { TreeViewActionTypes, TreeViewContext } from "./TreeViewProvider"

export function NodeWrapper({ treeData }: { treeData: TreeNodeType[] }) {
  const { open, dispatch, selectId, selectedId } = useContext(TreeViewContext)

  const idsToOpen = findParentIds(treeData, 3)

  return (
    <div className="space-y-4">
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          dispatch({ type: TreeViewActionTypes.CLOSE_ALL })
        }}
      >
        Close All
      </Button>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          dispatch({ type: TreeViewActionTypes.OPEN_ALL })
        }}
      >
        Open All
      </Button>
      <Button
        variant={"secondary"}
        size={"sm"}
        onClick={() => {
          dispatch({ type: TreeViewActionTypes.CLOSE_ALL })
          dispatch({ type: TreeViewActionTypes.OPEN_MULTIPLE, ids: idsToOpen })
        }}
      >
        Open Multiple
      </Button>
      <div className="">
        {treeData.map((node) => (
          <Node node={node} key={node.folder_id} />
        ))}
      </div>
    </div>
  )
}
