import { ReactNode, useReducer } from "react"

import {
  TFolderId,
  TreeViewContext,
  treeviewReducer,
} from "@/lib/context/TreeViewProvider/TreeViewProvider"
import { cn } from "@/lib/utils"

import { RovingTabindexRoot } from "./RovingTabindex"

type RootProps = {
  children: ReactNode | ReactNode[]
  className?: string
}

export function Root({ children, className }: RootProps) {
  return (
    <RovingTabindexRoot
      as="ul"
      className={cn("flex flex-col overflow-auto", className)}
    >
      {children}
    </RovingTabindexRoot>
  )
}
