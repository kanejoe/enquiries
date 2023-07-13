type RequisitionHeading = {
  reqId: string
  clauseRef: string
  status: "pending" | "locked"
  query: string
}

export const headings: RequisitionHeading[] = [
  {
    reqId: "728ed52f",
    clauseRef: "1.",
    status: "pending",
    query: "Premises",
  },
  {
    reqId: "489e1d42",
    clauseRef: "2.",
    status: "locked",
    query: "Easements",
  },
]
