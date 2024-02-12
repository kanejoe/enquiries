import { createContext, Dispatch } from "react"

import { Tables } from "@/lib/database.types"

export type TFolderId = Tables<"folders">["id"]

// TreeViewState is a Map of folder ids to open state (boolean) of a particular Node.
export type TreeViewState = Map<TFolderId, boolean>

export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
  OPEN_ALL = "OPEN_ALL", // New action type for opening all nodes
  CLOSE_ALL = "CLOSE_ALL", // New action type for opening all nodes
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
      type: TreeViewActionTypes.OPEN_ALL // No id needed for opening all nodes
    }
  | {
      type: TreeViewActionTypes.CLOSE_ALL // No id needed for closing all nodes
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

    case TreeViewActionTypes.OPEN_ALL:
      const newStateOpen = new Map(state)
      for (let key of newStateOpen.keys()) {
        newStateOpen.set(key, true)
      }
      return newStateOpen

    case TreeViewActionTypes.CLOSE_ALL:
      const newStateClose = new Map(state)
      for (let key of newStateClose.keys()) {
        newStateClose.set(key, false)
      }
      return newStateClose

    case TreeViewActionTypes.OPEN_MULTIPLE:
      const newStateMultiple = new Map(state)
      action.ids.forEach((id) => {
        newStateMultiple.set(id, true)
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
