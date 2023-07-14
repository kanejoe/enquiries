type RequisitionHeading = {
  reqId: string
  clauseRef: string
  query: string
  replyRequired: boolean
}

export const headings: RequisitionHeading[] = [
  {
    reqId: "728ed52f",
    clauseRef: "1.",
    query: "Premises",
    replyRequired: true,
  },
  {
    reqId: "489e1d42",
    clauseRef: "2.",
    query: "Easements",
    replyRequired: true,
  },
  {
    reqId: "489e1d44",
    clauseRef: "35.",
    query: "Local Government (Multi Storey Buildings) Act 1988",
    replyRequired: false,
  },
]
