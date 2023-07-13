"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AtomicRequisition = {
  id: string
  status: "pending" | "processing" | "success" | "failed"
  query: string
}

export const columns: ColumnDef<AtomicRequisition>[] = [
  {
    accessorKey: "query",
    header: "Heading",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
