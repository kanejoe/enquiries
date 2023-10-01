import { cookies } from "next/headers"
import Link from "next/link"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { type Database } from "@/lib/database.types"

export default async function Properties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const perPage = 7 // start at the first property

  // count the total number of properties
  let { data: countEntries, error: countError } = await supabase
    .from("properties")
    .select("id", { count: "exact", head: false })
  let count = countEntries?.length || 0

  const totalPages = Math.ceil(count / perPage)

  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1 &&
    +searchParams.page <= totalPages
      ? +searchParams.page
      : 1 // max 6 properties per page

  let { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: true })
    .range((page - 1) * perPage, page * perPage - 1)

  return (
    <div className="min-h-screen px-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="w-80">
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 pl-10 text-sm focus:border-gray-400 focus:outline-none focus:ring-0"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="ml-16 mt-0 flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary px-3 py-1.5 text-center text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add user
          </button>
        </div>
      </div>
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
      </div>

      <div className="mt-4 flex items-center justify-between ">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium ordinal">
            {(page - 1) * perPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium ordinal">
            {Math.min(page * perPage, count)}
          </span>{" "}
          of{" "}
          <span className="font-semibold ordinal">
            {count.toLocaleString()}
          </span>{" "}
          requisitions
        </p>
        <div className="space-x-2">
          <Link
            href={page > 2 ? `/properties?page=${page - 1}` : "/properties"}
            className={`${
              page === 1 ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
          >
            Previous
          </Link>

          <Link
            href={
              page < totalPages
                ? `/properties?page=${page + 1}`
                : `/properties?/page=${page}`
            }
            className={`${
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            } inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  )
}
