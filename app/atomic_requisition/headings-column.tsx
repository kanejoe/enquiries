"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AtomicRequisition = {
  reqId: string
  status: "pending" | "locked"
  query: string
}

export const columns: ColumnDef<AtomicRequisition>[] = [
  {
    accessorKey: "clauseRef",
    header: "",
  },
  {
    accessorKey: "query",
    header: "Heading",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div>{row.original.status}</div>
    },
  },
]
