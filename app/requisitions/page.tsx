import { Suspense } from "react"
import { format as fdate, parseISO } from "date-fns"

import { Precedent } from "@/types/RequisitionType"
import { cn } from "@/lib/utils"

import { getAllPrecedents } from "./_actions/query"
import { PrecedentCard } from "./_components/PrecedentCard"

export default async function ServerComponent() {
  return (
    <main className="container font-albertsans">
      <Suspense fallback={<p className="h-6" />}>
        <Cards />
      </Suspense>
    </main>
  )
}

const statuses = {
  Complete: "text-green-700 bg-green-50 ring-green-600/20",
  "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  Archived: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

async function Cards() {
  let precedents = await getAllPrecedents()
  console.log("🚀 ~ file: page.tsx:27 ~ Cards ~ precedents:", precedents)

  if (!precedents) {
    return <div>loading...</div>
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {precedents
        // .filter((p) => p?.is_archived === false)
        .map((precedent) => {
          if (precedent !== null) {
            const created_date = parseISO(precedent.created_at)
            // Formatting the date into a string
            const formattedDate = fdate(created_date, "dd MMMM yyyy") // '26 Nov 2022'

            return (
              <li
                key={precedent.id}
                className="flex items-center justify-between gap-x-6 py-5 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-lg font-semibold leading-6 text-gray-700">
                      {precedent.name}
                    </p>

                    <p
                      className={cn(
                        precedent.is_archived
                          ? statuses.Archived
                          : statuses.Complete,
                        "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                      )}
                    >
                      {precedent.is_archived ? "Archived" : "Complete"}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-base leading-6 text-gray-600">
                      {precedent.subname}
                    </p>
                  </div>
                  <div className="h-0 w-12 border border-muted"></div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                      Created on{" "}
                      <time dateTime={precedent?.created_at}>
                        {formattedDate}
                      </time>
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="truncate">
                      Created by {precedent?.createdBy}
                    </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <a
                    href={precedent?.href}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  >
                    View project
                    <span className="sr-only">, {precedent.name}</span>
                  </a>
                </div>
              </li>
            )
          }
        })}
    </ul>
  )
}

// Path: app/requisitions/_components/PrecedentCard.tsx
function groupBy(
  array: Precedent[],
  key: keyof Precedent
): Record<string, Precedent[]> {
  return array.reduce(
    (result: Record<string, Precedent[]>, currentValue: Precedent) => {
      // Convert key to string to use as an object index
      const keyValue = String(currentValue[key])

      // Create a new key if it doesn't exist
      ;(result[keyValue] = result[keyValue] || []).push(currentValue)
      return result
    },
    {}
  )
}
