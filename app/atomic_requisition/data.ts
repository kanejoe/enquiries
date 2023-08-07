import type { AtomicRequisition } from "@/types/AtomicRequisitionType"

import { AtomicReqs } from "./reqStore"

// Initial state
export const initialState: AtomicReqs = {
  requisitions: [
    {
      reqId: "43FfgaJK",
      clauseRef: "3.",
      query: "Easements and Rights",
      level: 0,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
    {
      reqId: "R43FKLR",
      clauseRef: "3.1",
      query: "",
      reply: "",
      level: 1,
      isFlagged: false,
      isApplicable: false,
      hasDoc: false,
      isComplete: false,
    },
    {
      reqId: "R43FKLadsF",
      clauseRef: "3.2",
      query: "Services",
      reply: "",
      level: 1,
      isApplicable: false,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
    {
      reqId: "R43FKLfdasfF",
      clauseRef: "3.1.a",
      query:
        "Are there any pipes drains sewers wires cables or septic tank on under or over other property which serve the property in sale.",
      reply: "",
      level: 2,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
    {
      reqId: "R43FcvzKLS",
      clauseRef: "3.1.b",
      query:
        "If so, furnish details and evidence of the easement authorising same.",
      reply: "not applicable",
      level: 2,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: true,
    },
    {
      reqId: "R43FKdfdadLSa",
      clauseRef: "3.1.c",
      query:
        "if by on-site domestic septic tank or other on-site domestic waste water treatment system, furnish evidence of registration of the system with Protect Our Water.",
      reply: "",
      level: 2,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
  ],
  headings: [
    {
      reqId: "43FfgaJK",
      clauseRef: "3.",
      query: "Easements and Rights",
      level: 0,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
    {
      reqId: "43dfasfdarqreFJKA",
      clauseRef: "5.",
      query: "Forestry",
      level: 0,
      isApplicable: true,
      isFlagged: false,
      hasDoc: false,
      isComplete: false,
    },
  ],
}

export const testdata1: AtomicRequisition[] = [
  {
    reqId: "XX111",
    parentId: "XX11",
    character: 1,
    query: "Are there any contents included?",
    isApplicable: false,
  },
  {
    reqId: "XX11",
    parentId: "XX1",
    character: 1,
    query: "",
    isApplicable: false,
  },
  {
    reqId: "XX2",
    parentId: "",
    character: 2,
    query: "Water Services/Local Authority",
    isApplicable: false,
  },
  {
    reqId: "XX21",
    parentId: "XX2",
    character: 1,
    query: "Is the property serviced with:",
    isApplicable: false,
  },
  {
    reqId: "XX211",
    parentId: "XX21",
    character: 1,
    query: "Sewerage",
    isApplicable: false,
  },
  {
    reqId: "XX2111",
    parentId: "XX211",
    character: 1,
    query:
      "if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other",
    isApplicable: true,
  },
  {
    reqId: "XX2112",
    parentId: "XX211",
    character: 2,
    query:
      "if by Irish Water mains, furnish evidence of registration with Irish Water",
    isApplicable: true,
  },
  {
    reqId: "XX112",
    parentId: "XX11",
    character: 2,
    query:
      "If so, furnish a list of same and give the Vendor's estimate of value",
    isApplicable: true,
  },
  {
    reqId: "XX1",
    parentId: "",
    character: 1,
    query: "Premises",
    isApplicable: true,
  },
  {
    reqId: "XX3",
    parentId: "",
    character: 3,
    query: "Easements and Rights",
    isApplicable: true,
  },
  {
    reqId: "XX31",
    parentId: "XX3",
    character: 1,
    query: "",
    isApplicable: true,
  },
  {
    reqId: "XX311",
    parentId: "XX31",
    character: 1,
    query:
      "Are there any pipes drains sewers wires cables or septic tank on under or over other property which serve the property in sale",
    isApplicable: true,
  },
]
