import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export type NodeState = {
  open: Map<string, boolean> // TreeViewState is a Map of ids (string)
  selectedId: string | null
}

export type NodeActions = {
  openNode: (id: string) => void
  closeNode: (id: string) => void
  selectId: (id: string) => void
}

export type NodeStore = NodeState & NodeActions

// Define the state and actions for your store
const useTreeViewStore = create(
  immer<NodeStore>((set) => ({
    // Initial state
    open: new Map<string, boolean>(),
    selectedId: null,

    // Action to open a node
    openNode: (id: string) =>
      set((state) => {
        state.open.set(id, true)
      }),

    // Action to close a node
    closeNode: (id: string) =>
      set((state) => {
        state.open.set(id, false)
      }),

    // Action to select a node
    selectId: (id: string) =>
      set((state) => {
        state.selectedId = id
      }),
  }))
)

// Use this hook in your components to access and manipulate the tree view state
export default useTreeViewStore
