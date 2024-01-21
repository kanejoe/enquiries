/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */

import { ReactNode, useReducer, useState } from "react"

import { type FoldersType } from "@/types/folders"
import { cn } from "@/lib/utils"

import { Node } from "./Node"
import { NoFoldersEmptyState } from "./NoFoldersEmptyState"
import { RovingTabindexRoot } from "./RovingTabindex"
import { TreeViewContext, treeviewReducer } from "./TreeViewProvider"

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
    <Root
      className="h-full rounded-lg border-[1.5px] border-slate-100"
      value={selected}
      onChange={select}
    >
      {treeData.map((node) => (
        <Node node={node} key={node.folder_id} />
      ))}
    </Root>
  )
}

type RootProps = {
  children: ReactNode | ReactNode[]
  className?: string
  value: string | null
  onChange: (id: string) => void
}

export function Root({
  children,
  className,
  value,
  onChange,
  // label,
}: RootProps) {
  const [open, dispatch] = useReducer(
    treeviewReducer,
    new Map<string, boolean>()
  )

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedId: value,
        selectId: onChange,
      }}
    >
      <RovingTabindexRoot
        as="ul"
        className={cn("flex flex-col overflow-auto", className)}
      >
        {children}
      </RovingTabindexRoot>
    </TreeViewContext.Provider>
  )
}
