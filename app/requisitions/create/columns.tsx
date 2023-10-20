"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Requisition } from "@/types/RequisitionType"

import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Requisition>[] = [
  {
    id: "id",
    header: "@",
    cell: ({ row }) => {
      return <div className="w-[360px]">{row.original.query}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
