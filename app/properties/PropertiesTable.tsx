import { format, parseISO } from "date-fns"
import { trim } from "string-ts"

import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"

import { HighlightedTableCell } from "./_components/HighlightedCellProps"
import { CategoryBadge, ClearCategoryBadge } from "./CategoryBadge"
import { FirstPage, LastPage, NextPage, PreviousPage } from "./NextPrevButtons"
import { PropertiesTableRowActions } from "./PropertiesTableRowActions"
import { PropertyTableColumnHeader } from "./PropertyTableHeader"
import { StatusBadge } from "./Status"

export async function PropertiesTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  //   await new Promise((resolve) => setTimeout(resolve, 2000))

  const perPage = 8 // max 8 properties per page
  const search =
    typeof searchParams.search === "string" ? searchParams.search : ""

  // search pattern for ilike
  const searchPattern = `%${search}%`

  // search pattern for category
  const categoryPattern =
    typeof searchParams.category === "string" ? searchParams.category : ""

  // count the total number of properties
  let supabaseCountQuery = supabase
    .from("properties")
    .select("id", { count: "exact", head: false })
    .or(`property.ilike.${searchPattern},vendor.ilike.${searchPattern}`)

  if (categoryPattern && trim(categoryPattern).trim() !== "") {
    supabaseCountQuery = supabaseCountQuery.filter(
      "category",
      "eq",
      categoryPattern
    )
  }

  let { data: countEntries, error: countError } = await supabaseCountQuery

  let count = countEntries?.length || 0

  const totalPages = Math.ceil(count / perPage)

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1 // default to page 1

  // query search results
  let query = supabase
    .from("properties")
    .select("*")
    .or(`property.ilike.${searchPattern},vendor.ilike.${searchPattern}`)
    .order("created_at", { ascending: true })
    .range((page - 1) * perPage, page * perPage - 1)

  if (categoryPattern && categoryPattern.trim() !== "") {
    query = query.filter("category", "eq", categoryPattern)
  }

  let { data: properties, error } = await query

  // store all the properties in a map
  const currentSearchParams = new URLSearchParams()
  if (search) currentSearchParams.set("search", search)
  if (page > 1) currentSearchParams.set("page", `${page}`)
  if (categoryPattern && trim(categoryPattern).trim() !== "") {
    currentSearchParams.set("category", `${categoryPattern}`)
  }

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
                    <PropertyTableColumnHeader
                      title="Created"
                      columnName="created_at"
                      currentSearchParams={currentSearchParams}
                    />
                  </th>
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                    Client
                  </th>
                  <th className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                    <span className="space-x-4">
                      {categoryPattern ? (
                        <ClearCategoryBadge
                          currentSearchParams={currentSearchParams}
                        />
                      ) : null}
                      <span className="">Property</span>
                    </span>
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {properties && properties.length
                  ? properties.map((data) => (
                      <tr
                        key={data.vendor}
                        className="delay-50 transition hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900">
                          {data.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-xs text-gray-700">
                          <Badge
                            variant="secondary"
                            className="rounded-sm px-1 font-normal"
                          >
                            {format(parseISO(data.created_at), "d MMM yyyy")}
                          </Badge>
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
                            {data.category ? (
                              <div className="min-w-[100px]">
                                <CategoryBadge
                                  category={data.category}
                                  currentSearchParams={currentSearchParams}
                                />
                              </div>
                            ) : null}

                            <span className="max-w-[500px] truncate font-medium">
                              {search && data.property ? (
                                <HighlightedTableCell
                                  dataString={data.property}
                                  highlight={search}
                                />
                              ) : (
                                data.property
                              )}
                              {data.eircode && (
                                <span className="ml-2 text-sm text-gray-500">
                                  {data.eircode}
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          {data.status ? (
                            <StatusBadge statusText={data.status} />
                          ) : null}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                          <PropertiesTableRowActions />
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
          requisitions <span className="mx-1"> // Page {page}</span>
          {/* {categoryPattern ? (
            <span className="m-1"> Category: {categoryPattern}</span>
          ) : null} */}
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
