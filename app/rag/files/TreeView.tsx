/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */

import { ReactNode, useContext, useReducer, useState } from "react"

import { cn } from "@/lib/utils"

import {
  TreeViewActionTypes,
  TreeViewContext,
  treeviewReducer,
} from "./TreeViewProvider"

export const TreeViewApp = ({ treeData }: { treeData: TreeNodeType[] }) => {
  const [selected, select] = useState<string | null>(null)
  return (
    <Root
      className="m-8 h-full w-72 border-[1.5px] border-slate-100 font-albertsans"
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

export function Root({ children, className, value, onChange }: RootProps) {
  const [open, dispatch] = useReducer(
    treeviewReducer,
    new Map<string, boolean>()
  )

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
      }}
    >
      <ul className={cn("flex flex-col", className)}>{children}</ul>
    </TreeViewContext.Provider>
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

export function Node({ node: { id, folder_name, children } }: NodeProps) {
  const { open, dispatch } = useContext(TreeViewContext)
  const isOpen = open.get(id.toString())

  return (
    <li className="flex cursor-pointer select-none flex-col">
      <div
        className={
          "flex items-center space-x-2 font-mono font-medium rounded-sm px-1"
        }
        onClick={() => {
          open.get(id.toString())
            ? dispatch({ type: TreeViewActionTypes.CLOSE, id: id.toString() })
            : dispatch({ type: TreeViewActionTypes.OPEN, id: id.toString() })
        }}
      >
        {
          children && children.length
            ? <Arrow className="h-4 w-4 shrink-0 text-gray-500" open={isOpen} />
            : <span className="h-4 w-4 shrink-0" />
        }
        <span className="text-ellipsis whitespace-nowrap overflow-hidden">{folder_name}</span>
      </div>
      {children?.length && open.get(id.toString()) ? (
        <ul className="pl-4">
          {children.map((node) => (
            <Node node={node} key={node.id} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

type IconProps = { open?: boolean; className?: string }

export function Arrow({ open, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={cn(
        "origin-center",
        open ? "rotate-90" : "rotate-0",
        className
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  )
}
