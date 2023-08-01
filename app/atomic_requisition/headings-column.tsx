"use client"

import { ColumnDef } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AtomicRequisition = {
  reqId: string
  query: string
  clauseRef: string
  replyRequired: boolean
  isApplicable: boolean
}

export const columns: ColumnDef<AtomicRequisition>[] = [
  {
    accessorKey: "query",
    header: "Requisition Heading",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row">
          <div className="mr-1 w-6 flex-none tabular-nums">
            {row.original.clauseRef}
          </div>
          <div
            className={`${
              row.original.isApplicable === true ? "" : "line-through"
            }`}
          >
            {row.original.query}
          </div>
        </div>
      )
    },
  },
]
