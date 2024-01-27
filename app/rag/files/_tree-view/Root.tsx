import { ReactNode, useReducer } from "react"

import { cn } from "@/lib/utils"

import { RovingTabindexRoot } from "./RovingTabindex"
import { TreeViewContext, treeviewReducer } from "./TreeViewProvider"

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
