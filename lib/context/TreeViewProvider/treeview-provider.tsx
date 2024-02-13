"use client"

import { type ReactNode } from "react"

import { TreeViewContext } from "./TreeViewProvider"
import { useTreeViewData } from "./useTreeViewData"

export const TreeViewContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const { open, dispatch, selectedId, selectId } = useTreeViewData()

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedId,
        selectId,
      }}
    >
      {children}
    </TreeViewContext.Provider>
  )
}
