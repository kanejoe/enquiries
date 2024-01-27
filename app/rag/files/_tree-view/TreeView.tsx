/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */
import { ReactNode, useState } from "react"

import { type FoldersType } from "@/types/folders"

import { NewFolderButton } from "./NewFolderButton"
import { Node } from "./Node"
import { NoFoldersEmptyState } from "./NoFoldersEmptyState"
import { Root } from "./Root"

export type TreeNodeType = FoldersType & {
  icon?: ReactNode
}

export const TreeViewApp = ({ treeData }: { treeData: TreeNodeType[] }) => {
  const [selected, select] = useState<string | null>(null)

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
        >
          {treeData.map((node) => (
            <Node node={node} key={node.folder_id} />
          ))}
        </Root>
      </div>
    </div>
  )
}
