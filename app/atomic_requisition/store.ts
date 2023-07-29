import { create } from "zustand"

type State = {
  reqId: string
  clauseRef: string
  query?: string
  reply?: string
  level: number
  replyRequired: boolean
}

type Action = {
  updateQuery: (query: State["query"]) => void
  updateReply: (reply: State["reply"]) => void
  updateReplyRequired: (reply: State["replyRequired"]) => void
}

// Create your store, which includes both state and (optionally) actions
const useStore = create<State & Action>((set) => ({
  reqId: "R43FKLF",
  clauseRef: "3.",
  query: "Easements and Rights",
  reply: "",
  level: 0,
  replyRequired: true,
  updateQuery: (query) => set(() => ({ query })),
  updateReply: (reply) => set(() => ({ reply })),
  updateReplyRequired: (replyRequired) => set(() => ({ replyRequired })),
}))
