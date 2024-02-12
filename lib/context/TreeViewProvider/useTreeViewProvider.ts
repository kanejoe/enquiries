import { useReducer } from "react"

import { TFolderId, treeviewReducer } from "./TreeViewProvider"

export const useTreeViewProvider = () => {
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
    selectedId: null,
    selectId: (id: TFolderId) => console.log(id),
  }
}
