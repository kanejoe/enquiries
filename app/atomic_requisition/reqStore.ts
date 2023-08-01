import { produce } from "immer"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Define a single req type
interface AtomicReq {
  reqId: string
  clauseRef: string
  query?: string
  reply?: string
  level: number
  replyRequired: boolean
  isApplicable: boolean
}

// Define actions
interface AtomicReqActions {
  patchIsApplicable: (
    reqId: AtomicReq["reqId"],
    isApplicable: AtomicReq["isApplicable"]
  ) => void
}

// Define the store's state shape
interface AtomicReqState {
  requisitions: AtomicReq[]
  actions: AtomicReqActions
}

const useAtomicReqStore = create<AtomicReqState>((set) => ({
  requisitions: [],
  // ⬇️ separate "namespace" for actions
  actions: {
    patchIsApplicable: (reqId, isApplicable) =>
      set(
        produce((draft) => {
          // Logic goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.isApplicable = isApplicable
        })
      ),
  },
}))
