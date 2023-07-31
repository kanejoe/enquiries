import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type State = {
  reqId: string
  clauseRef: string
  query?: string
  reply?: string
  level: number
  replyRequired: boolean
  isApplicable: boolean
}

type Action = {
  updateQuery: (query: State["query"]) => void
  updateReply: (reply: State["reply"]) => void
  updateReplyRequired: (reply: State["replyRequired"]) => void
  updateIsApplicable: (reply: State["isApplicable"]) => void
}

// Create your store, which includes both state and (optionally) actions
export const useReqStore = create<State & Action>((set) => ({
  reqId: "R43FKLF",
  clauseRef: "3.",
  query: "Easements and Rights",
  reply: "",
  level: 0,
  replyRequired: true,
  isApplicable: false,
  updateQuery: (query) => set(() => ({ query })),
  updateReply: (reply) => set(() => ({ reply })),
  updateReplyRequired: (replyRequired) => set(() => ({ replyRequired })),
  updateIsApplicable: (isApplicable) => set(() => ({ isApplicable })),
}))

type RequisitionStore = {
  requisitions: State[]
  addRequisition: (newRequisition: State) => void
  editRequisitionIsApplicable: (reqId: string, isApplicable: boolean) => void
}

const useRequisitionStore = create(
  immer<RequisitionStore>((set) => ({
    requisitions: [],
    addRequisition: (newRequisition) =>
      set((state) => ({
        requisitions: [...state.requisitions, newRequisition],
      })),
    editRequisitionIsApplicable: (reqId, isApplicable) =>
      set((state) => {
        state.requisitions[reqId].isApplicable = isApplicable
      }),
  }))
)
