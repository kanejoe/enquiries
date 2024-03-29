import Link from "next/link"
import { format as fdate, parseISO } from "date-fns"

import { Precedent } from "@/types/RequisitionType"
import { cn } from "@/lib/utils"

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

/**
 *
 * @param param0
 * @returns
 */
export function PrecedentList({ precedent }: { precedent: Precedent }) {
  const created_date = parseISO(precedent.created_at)
  // Formatting the date into a string
  const formattedDate = fdate(created_date, "dd MMMM yyyy") // '26 Nov 2022'

  return (
    <div className="flex items-center justify-between gap-x-6 px-2 py-5 hover:bg-gray-50">
      <div className="min-w-0">
        <div className="flex items-start gap-x-3">
          <p
            className={`text-lg leading-6 ${
              precedent.is_archived
                ? "text-gray-400 "
                : "font-semibold text-gray-700"
            }`}
          >
            {precedent.name}
          </p>

          <p
            className={cn(
              precedent.is_archived
                ? statuses.Archived
                : statuses["In progress"],
              "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            )}
          >
            {precedent.is_archived ? "Archived" : "Being Generated"}
          </p>
        </div>
        <div className="">
          <p
            className={`text-base leading-6 ${
              precedent.is_archived ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {precedent.subname}
          </p>
        </div>
        <div className="h-0 w-12 border border-muted"></div>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p className="whitespace-nowrap">
            Created on{" "}
            <time dateTime={precedent?.created_at}>{formattedDate}</time>
          </p>
          {precedent.created_by ? (
            <>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Created by {precedent?.created_by}</p>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <Link
          href={`/requisitions/${precedent.id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
        >
          View
          <span className="sr-only">, {precedent.name}</span>
        </Link>
      </div>
    </div>
  )
}
