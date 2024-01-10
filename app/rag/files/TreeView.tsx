/**
 * https://www.joshuawootonn.com/react-treeview-component
 * The Root component holds an initial ul wrapping the root nodes.
 */

import { ReactNode, useState } from "react"

import { cn } from "@/lib/utils"

export const TreeView = ({ treeData }: { treeData: TreeNodeType[] }) => {
  const [selected, select] = useState<string | null>(null)

  return (
    <Root
      className="m-8 h-full w-72 border-[1.5px] border-slate-100"
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
  onChange: (value: string | null) => void
}

export function Root({ children, className }: RootProps) {
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
