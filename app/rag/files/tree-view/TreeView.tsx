/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */

import { ReactNode, useReducer, useState } from "react"

import { cn } from "@/lib/utils"

import { Node } from "./Node"
import { RovingTabindexRoot } from "./RovingTabindex"
import { TreeViewContext, treeviewReducer } from "./TreeViewProvider"

export const TreeViewApp = ({ treeData }: { treeData: TreeNodeType[] }) => {
  const [selected, select] = useState<string | null>(null)
  return (
    <Root
      className="h-full rounded-lg border-[1.5px] border-slate-100"
      value={selected}
      onChange={select}
    >
      {treeData.map((node) => (
        <Node node={node} key={node.id} />
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

export type TreeNodeType = {
  id: number
  folder_name: string
  children?: TreeNodeType[]
  icon?: ReactNode
}
