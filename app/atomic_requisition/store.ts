import { create } from "zustand"
import { devtools } from "zustand/middleware"

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
