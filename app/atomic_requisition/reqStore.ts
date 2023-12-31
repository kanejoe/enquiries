import { produce } from "immer"
import { create } from "zustand"

import { testdata1 as initialState } from "./data"

// Define a single req type
export interface AtomicReq {
  reqId: string
  clauseRef: string
  query?: string
  reply?: string
  level: number
  isApplicable: boolean
  isFlagged: boolean
  hasDoc: boolean
  isComplete: boolean
}

export interface AtomicReqs {
  requisitions: AtomicRequisitions[]
}

// Define actions
interface AtomicReqActions {
  patchIsApplicable: (
    reqId: AtomicReq["reqId"],
    isApplicable: AtomicReq["isApplicable"]
  ) => void
  patchIsFlagged: (
    reqId: AtomicReq["reqId"],
    isFlagged: AtomicReq["isFlagged"]
  ) => void
  patchHasDoc: (reqId: AtomicReq["reqId"], hasDoc: AtomicReq["hasDoc"]) => void
  patchIsComplete: (
    reqId: AtomicReq["reqId"],
    isComplete: AtomicReq["isComplete"]
  ) => void
  markAllComplete: () => void
  markAllInComplete: () => void
  patchReply: (reqId: AtomicReq["reqId"], reply: AtomicReq["reply"]) => void
}

// Define the store's state shape
export interface AtomicReqState {
  requisitions: AtomicReq[]
  actions: AtomicReqActions
}

export const useAtomicReqStore = create<AtomicReqState>((set) => ({
  requisitions: initialState,
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
    patchIsFlagged: (reqId, isFlagged) =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.isFlagged = isFlagged
        })
      ),
    patchHasDoc: (reqId, hasDoc) =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.hasDoc = hasDoc
        })
      ),
    patchIsComplete: (reqId, isComplete) =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.isComplete = isComplete
        })
      ),
    markAllComplete: () =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisitions = draft.requisitions.filter(
            (el: AtomicReq) => el.level !== 0
          )
          atomicRequisitions.forEach((element: AtomicReq) => {
            element.isComplete = true
          })
        })
      ),
    markAllInComplete: () =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisitions = draft.requisitions.filter(
            (el: AtomicReq) => el.level !== 0
          )
          atomicRequisitions.forEach((element: AtomicReq) => {
            element.isComplete = false
          })
        })
      ),
    patchReply: (reqId, reply) =>
      set(
        produce((draft) => {
          // Logic for `requisition` goes here
          const atomicRequisition = draft.requisitions.find(
            (el: AtomicReq) => el.reqId === reqId
          )
          atomicRequisition.reply = reply
          atomicRequisition.isComplete = true // this is triggering automatically
        })
      ),
  },
}))
