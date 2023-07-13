type RequisitionHeading = {
  id: string
  status: "pending" | "processing" | "success" | "failed"
  query: string
}

export const headings: RequisitionHeading[] = [
  {
    id: "728ed52f",
    status: "pending",
    query: "Premises",
  },
  {
    id: "489e1d42",
    status: "processing",
    query: "Easements",
  },
]
