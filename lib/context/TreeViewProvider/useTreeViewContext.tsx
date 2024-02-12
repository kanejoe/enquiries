import { useContext } from "react"

import { TreeViewContext, TreeViewContextType } from "./TreeViewProvider"

export const useTreeViewContext = (): TreeViewContextType => {
  const context = useContext(TreeViewContext)

  if (context === undefined) {
    console.log("useTreeViewContext error")
    throw new Error("useTreeViewContext must be used inside TreeViewProvider")
  }

  return context
}
