import { cookies } from "next/headers"
import Link from "next/link"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { type Database } from "@/lib/database.types"
import { Button } from "@/components/ui/button"

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

  // count the total number of properties
  let { data: countEntries, error: countError } = await supabase
    .from("properties")
    .select("id", { count: "exact", head: false })
    .ilike("property", `%${search}%`)
  // .ilike("vendor", `%${search}%`)

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
    .ilike("property", `%${search}%`)
    // .ilike("vendor", `%${search}%`)
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
                          {data.vendor}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900">
                          {data.property}
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
          <PreviousPage page={page} currentSearchParams={currentSearchParams} />

          <NextPage
            page={page}
            totalPages={totalPages}
            currentSearchParams={currentSearchParams}
          />
        </div>
      </div>
    </div>
  )
}

function NextPage({
  page,
  totalPages,
  currentSearchParams,
}: {
  page: number
  totalPages: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.set("page", `${page + 1}`)

  return page < totalPages ? (
    <Link
      href={`/properties?${newSearchParams}`}
      className=" inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Next
    </Link>
  ) : (
    <Button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Next
    </Button>
  )
}
function PreviousPage({
  page,
  currentSearchParams,
}: {
  page: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`)
  } else {
    newSearchParams.delete("page")
  }

  return page > 1 ? (
    <Link
      href={`/properties?${newSearchParams}`}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Previous
    </Link>
  ) : (
    <Button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50"
    >
      Previous
    </Button>
  )
}
