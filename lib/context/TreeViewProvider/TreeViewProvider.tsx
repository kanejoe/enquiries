import { createContext, type Dispatch } from "react"

import { Tables } from "@/lib/types/database.types"

export type TFolderId = Tables<"folders">["id"]

// TreeViewState is a Map of folder ids to open state (boolean) of a particular Node.
export type TreeViewState = Map<TFolderId, boolean>

export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  CLOSE_MULTIPLE = "CLOSE_MULTIPLE", // New action type for opening all nodes
  OPEN_MULTIPLE = "OPEN_MULTIPLE", // New action type for opening multiple nodes
}

export type TreeViewActions =
  | {
      type: TreeViewActionTypes.OPEN
      id: TFolderId
    }
  | {
      type: TreeViewActionTypes.CLOSE
      id: TFolderId
    }
  | {
      type: TreeViewActionTypes.CLOSE_MULTIPLE
      ids: TFolderId[] // Array of ids
    }
  | {
      type: TreeViewActionTypes.OPEN_MULTIPLE
      ids: TFolderId[] // Array of ids
    }

// treeviewReducer is a reducer that takes in a TreeViewState and a TreeViewAction and returns a new TreeViewState.
export function treeviewReducer(
  state: TreeViewState,
  action: TreeViewActions
): TreeViewState {
  switch (action.type) {
    case TreeViewActionTypes.OPEN:
      return new Map(state).set(action.id, true)

    case TreeViewActionTypes.CLOSE:
      return new Map(state).set(action.id, false)

    case TreeViewActionTypes.CLOSE_MULTIPLE:
      const newStateMultipleClose = new Map(state)
      action.ids.forEach((id) => {
        newStateMultipleClose.set(id, false) // false for close
      })
      return newStateMultipleClose

    case TreeViewActionTypes.OPEN_MULTIPLE:
      const newStateMultiple = new Map(state)
      action.ids.forEach((id) => {
        newStateMultiple.set(id, true) // true for open
      })
      return newStateMultiple

    default:
      throw new Error("Tree Reducer received an unknown action")
  }
}

// TreeViewContextType is the type of the context that is used to provide the TreeView state and dispatch to the TreeView component.
export type TreeViewContextType = {
  open: TreeViewState
  dispatch: Dispatch<TreeViewActions>
  selectedId: TFolderId | null
  selectId: (id: TFolderId) => void
}

//  TreeViewContext is the context that is used to provide the TreeView state and dispatch to the TreeView component.
export const TreeViewContext = createContext<TreeViewContextType>({
  open: new Map<TFolderId, boolean>(),
  dispatch: () => {},
  selectedId: null,
  selectId: () => {},
})
