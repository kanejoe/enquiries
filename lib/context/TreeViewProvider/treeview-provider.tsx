"use client"

import { type ReactNode } from "react"

import { TreeViewContext } from "./TreeViewProvider"
import { useTreeViewProvider } from "./useTreeViewProvider"

export const TreeViewContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const { open, dispatch, selectedId, selectId } = useTreeViewProvider()

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
