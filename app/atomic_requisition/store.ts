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
  updateQuery: (firstName: State["query"]) => void
  updateReply: (lastName: State["reply"]) => void
}

// Create your store, which includes both state and (optionally) actions
const useStore = create<State & Action>((set) => ({
  reqId: "R43FKLF",
  clauseRef: "2.1.(a)",
  query:
    "if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other",
  reply: "not applicable",
  level: 2,
  replyRequired: true,
  updateQuery: (query) => set(() => ({ query: query })),
  updateReply: (reply) => set(() => ({ reply: reply })),
}))
