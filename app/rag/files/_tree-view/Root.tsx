import { ReactNode, useReducer } from "react"

import { cn } from "@/lib/utils"

import { RovingTabindexRoot } from "./RovingTabindex"
import { TFolderId, TreeViewContext, treeviewReducer } from "./TreeViewProvider"

type RootProps = {
  children: ReactNode | ReactNode[]
  className?: string
  value: TFolderId | null
  onChange: (id: TFolderId) => void
  initialIds: TFolderId[]
}

export function Root({
  children,
  className,
  value,
  onChange,
  initialIds,
}: RootProps) {
  // Initialize the state with all provided IDs set to true
  const initialState = initialIds.reduce((state, id) => {
    state.set(id, false)
    return state
  }, new Map<TFolderId, boolean>())

  const [open, dispatch] = useReducer(treeviewReducer, initialState)

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
        <div className="">{children}</div>
      </RovingTabindexRoot>
    </TreeViewContext.Provider>
  )
}
