import { useReducer, useState } from "react"

import { TFolderId, treeviewReducer } from "./TreeViewProvider"

export const useTreeViewData = () => {
  const [selectedId, selectId] = useState<TFolderId | null>(null)
  //   const { track } = useEventTracking()

  const initialIds: number[] = []
  const initialState = initialIds.reduce((state, id) => {
    state.set(id, false)
    return state
  }, new Map<TFolderId, boolean>())

  const [open, dispatch] = useReducer(treeviewReducer, initialState)
  return {
    open,
    dispatch,
    selectedId,
    selectId,
  }
}
