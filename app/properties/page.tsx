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
  const { page } = searchParams
  const PAGE = typeof page === "string" ? +page : 1 // max 6 properties per page
  const LIMIT = 6 // start at the first property

  const supabase = createServerComponentClient<Database>({ cookies })
  let { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .range(PAGE * LIMIT, PAGE * LIMIT + LIMIT - 1)

  return (
    <div className="min-h-screen bg-gray-50 px-8 pt-12">
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

      <div className="">
        <Link href={`/properties?page=${PAGE + 1}`} className="">
          Next
        </Link>
      </div>
    </div>
  )
}
