import { AtomicRequisitionProps } from "@/types/AtomicRequisition"

export const headings: AtomicRequisitionProps[] = [
  {
    reqId: "728ed52f",
    clauseRef: "1.",
    query: "Premises",
    replyRequired: true,
    level: 0,
  },
  {
    reqId: "489e1d42",
    clauseRef: "2.",
    query: "Easements",
    replyRequired: true,
    level: 0,
  },
  {
    reqId: "489e1d44",
    clauseRef: "35.",
    query: "Local Government (Multi Storey Buildings) Act 1988",
    replyRequired: false,
    level: 0,
  },
]

export const req = {
  reqId: "R43FKLF",
  clauseRef: "2.1.(a)",
  query:
    "if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other",
  reply: "not applicable",
  level: 2,
  replyRequired: true,
}

export const req1 = {
  reqId: "R43FKLF",
  clauseRef: "3.1.a",
  query:
    "Are there any pipes drains sewers wires cables or septic tank on under or over other property which serve the property in sale.",
  reply: "not applicable",
  level: 2,
  replyRequired: true,
}

export const req0 = {
  reqId: "43FJK",
  clauseRef: "3.",
  query: "Easements and Rights",
  level: 0,
  reqIsApplicable: false,
}
