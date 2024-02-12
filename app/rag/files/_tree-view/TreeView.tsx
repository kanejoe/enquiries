/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */
import { ReactNode, useState } from "react"

import { type FoldersType } from "@/types/folders"

import { NewFolderButton } from "./NewFolderButton"
import { NodeWrapper } from "./NodeWrapper"
import { NoFoldersEmptyState } from "./NoFoldersEmptyState"
import { Root } from "./Root"
import { TFolderId } from "./TreeViewProvider"

export type TreeNodeType = FoldersType & {
  icon?: ReactNode
}

export const TreeViewApp = ({ treeData }: { treeData: TreeNodeType[] }) => {
  const [selected, select] = useState<TFolderId | null>(null)
  const folderIds = extractFolderIds(treeData)

  if (!treeData || treeData.length === 0)
    return (
      <div className="grid h-full items-center justify-center rounded-lg border-[1.5px] border-slate-100">
        <NoFoldersEmptyState />
      </div>
    )

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between">
        <div className="">
          <NewFolderButton />
        </div>
        <div className="">search box</div>
      </div>
      <div className="">
        <Root
          className="h-full rounded-lg border-[1.5px] border-slate-100"
          value={selected}
          onChange={select}
          initialIds={folderIds}
        >
          <NodeWrapper treeData={treeData} />
        </Root>
      </div>
    </div>
  )
}

function extractFolderIds(
  data: FoldersType[],
  ids: TFolderId[] = []
): TFolderId[] {
  for (const item of data) {
    ids.push(item.folder_id) // Add the current folder's ID
    if (item.children && item.children.length) {
      extractFolderIds(item.children, ids) // Recursively process children
    }
  }
  return ids
}
