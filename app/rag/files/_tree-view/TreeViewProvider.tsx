import { createContext, Dispatch } from "react"

// TreeViewState is a Map of ids (string) to open state (boolean) of a particular Node.
export type TreeViewState = Map<string, boolean>

export enum TreeViewActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export type TreeViewActions =
  | {
      type: TreeViewActionTypes.OPEN
      id: string
    }
  | {
      type: TreeViewActionTypes.CLOSE
      id: string
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
  selectId: (id: string) => void
}

//  TreeViewContext is the context that is used to provide the TreeView state and dispatch to the TreeView component.
export const TreeViewContext = createContext<TreeViewContextType>({
  open: new Map<string, boolean>(),
  dispatch: () => {},
  selectedId: null,
  selectId: () => {},
})
