/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */

import { ReactNode, useReducer, useState } from "react"

import { cn } from "@/lib/utils"

import { treeviewReducer } from "./TreeViewProvider"

export const TreeView = ({ treeData }: { treeData: TreeNodeType[] }) => {
  return (
    <Root className="m-8 h-full w-72 border-[1.5px] border-slate-100">
      {treeData.map((node) => (
        <Node node={node} key={node.id} />
      ))}
    </Root>
  )
}

type RootProps = {
  children: ReactNode | ReactNode[]
  className?: string
}

export function Root({ children, className }: RootProps) {
  const [open, dispatch] = useReducer(
    treeviewReducer,
    new Map<string, boolean>()
  )
  return (
    <ul className={cn("flex flex-col overflow-auto", className)}>{children}</ul>
  )
}

export type TreeNodeType = {
  id: number
  folder_name: string
  children?: TreeNodeType[]
  icon?: ReactNode
}

type NodeProps = {
  node: TreeNodeType
}

export function Node({ node: { folder_name, children } }: NodeProps) {
  return (
    <li className="flex cursor-pointer select-none flex-col">
      <div
        className={
          "overflow-hidden text-ellipsis whitespace-nowrap rounded-sm px-1 font-albertsans font-medium"
        }
      >
        {folder_name}
      </div>
      {children?.length ? (
        <ul className="pl-4">
          {children.map((node) => (
            <Node node={node} key={node.id} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
