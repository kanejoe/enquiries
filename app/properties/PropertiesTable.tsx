import { cookies } from "next/headers"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { type Database } from "@/lib/database.types"
import { Badge } from "@/components/ui/badge"

import { HighlightedTableCell } from "./_components/HighlightedCellProps"
import { FirstPage, LastPage, NextPage, PreviousPage } from "./NextPrevButtons"

export async function PropertiesTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  //   await new Promise((resolve) => setTimeout(resolve, 2000))

  const supabase = createServerComponentClient<Database>({ cookies })
  const perPage = 7 // max 7 properties per page
  const search =
    typeof searchParams.search === "string" ? searchParams.search : ""

  //
  const searchPattern = `%${search}%`

  // count the total number of properties
  let { data: countEntries, error: countError } = await supabase
    .from("properties")
    .select("id", { count: "exact", head: false })
    .or(`property.ilike.${searchPattern},vendor.ilike.${searchPattern}`)
  // .ilike("property", `%${search}%`)

  let count = countEntries?.length || 0

  const totalPages = Math.ceil(count / perPage)

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1 // default to page 1

  let { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .or(`property.ilike.${searchPattern},vendor.ilike.${searchPattern}`)
    // .ilike("property", searchPattern)
    .order("created_at", { ascending: true })
    .range((page - 1) * perPage, page * perPage - 1)

  const currentSearchParams = new URLSearchParams()
  if (search) currentSearchParams.set("search", search)
  if (page > 1) currentSearchParams.set("page", `${page}`)

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-6 -my-2">
        <div className="inline-block min-w-full px-6 py-2 align-middle">
          <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                    Vendor
                  </th>
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                    Property
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Eircode
                  </th>
                  <th className="relative py-3.5 pl-3 pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {properties && properties.length
                  ? properties.map((data) => (
                      <tr key={data.vendor}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900">
                          {data.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                          {search && data.vendor ? (
                            <HighlightedTableCell
                              dataString={data.vendor}
                              highlight={search}
                            />
                          ) : (
                            data.vendor
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900">
                          <div className="flex space-x-4">
                            <Badge
                              variant="outline"
                              className="rounded-md border-primary"
                            >
                              {data.category}
                            </Badge>
                            <span className="max-w-[500px] truncate font-medium">
                              {search && data.property ? (
                                <HighlightedTableCell
                                  dataString={data.property}
                                  highlight={search}
                                />
                              ) : (
                                data.property
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {data.eircode}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                          <a
                            href="#"
                            className="inline-flex items-center text-secondary-foreground hover:text-secondary-foreground/80"
                          >
                            Edit
                            <ChevronRightIcon className="h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between ">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium ordinal">
            {(page - 1) * perPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium ordinal">
            {Math.min(page * perPage, count).toLocaleString()}
          </span>{" "}
          of{" "}
          <span className="font-semibold ordinal">
            {count.toLocaleString()}
          </span>{" "}
          requisitions
        </p>
        <div className="space-x-2">
          <FirstPage page={page} currentSearchParams={currentSearchParams} />

          <PreviousPage page={page} currentSearchParams={currentSearchParams} />

          <NextPage
            page={page}
            totalPages={totalPages}
            currentSearchParams={currentSearchParams}
          />

          <LastPage
            page={page}
            totalPages={totalPages}
            currentSearchParams={currentSearchParams}
          />
        </div>
      </div>
    </div>
  )
}
