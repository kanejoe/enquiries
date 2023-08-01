import { produce } from "immer"
import { create } from "zustand"

import { initialState } from "./data"

// Define a single req type
export interface AtomicReq {
  reqId: string
  clauseRef: string
  query?: string
  reply?: string
  level: number
  replyRequired: boolean
  isApplicable: boolean
}
export interface AtomicReqs {
  requisitions: AtomicReq[]
  headings: AtomicReq[]
}

// Define actions
interface AtomicReqActions {
  patchIsApplicable: (
    reqId: AtomicReq["reqId"],
    isApplicable: AtomicReq["isApplicable"]
  ) => void
}

// Define the store's state shape
export interface AtomicReqState {
  requisitions: AtomicReq[]
  headings: AtomicReq[]
  actions: AtomicReqActions
}

export const useAtomicReqStore = create<AtomicReqState>((set) => ({
  requisitions: initialState.requisitions,
  headings: initialState.headings,
  // ⬇️ separate "namespace" for actions
  actions: {
    patchIsApplicable: (reqId, isApplicable) =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.isApplicable = isApplicable

          // Logic for `heading` goes here
          const atomicHeading = draft.headings.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicHeading.isApplicable = isApplicable
        })
      ),
  },
}))
