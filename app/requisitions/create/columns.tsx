"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Requisition } from "@/types/RequisitionType"
import { transformSequenceArray } from "@/lib/tree"
import { cn } from "@/lib/utils"

import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Requisition>[] = [
  {
    id: "id",
    header: "Query",
    cell: ({ row }) => {
      const { level, sequence_in_levels } = row.original
      return (
        <div className="flex w-full flex-row text-base">
          <div
            className={cn({
              "shrink-0": true,
              "": level === 1,
              "w-[16px]": level === 2,
              "w-[32px]": level === 3,
              "w-[48px]": level === 4,
              "w-[60px]": level === 5,
            })}
          >
            &nbsp;
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-semibold">
              {transformSequenceArray(sequence_in_levels)}
            </div>
            <div className="">{row.original.query}</div>
          </div>
        </div>
      )
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div className="max-w-[40px]">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
]
