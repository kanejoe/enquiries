import { createContext, Dispatch } from "react"

import { Tables } from "@/lib/database.types"

export type TFolderId = Tables<"folders">["id"]

// TreeViewState is a Map of ids (string) to open state (boolean) of a particular Node.
export type TreeViewState = Map<TFolderId, boolean>

export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
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

    default:
      throw new Error("Tree Reducer received an unknown action")
  }
}

// TreeViewContextType is the type of the context that is used to provide the TreeView state and dispatch to the TreeView component.
export type TreeViewContextType = {
  open: TreeViewState
  dispatch: Dispatch<TreeViewActions>
  selectedId: string | null
  selectId: (id: TFolderId) => void
}

//  TreeViewContext is the context that is used to provide the TreeView state and dispatch to the TreeView component.
export const TreeViewContext = createContext<TreeViewContextType>({
  open: new Map<TFolderId, boolean>(),
  dispatch: () => {},
  selectedId: null,
  selectId: () => {},
})
