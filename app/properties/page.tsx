import { Suspense } from "react"
import { trim } from "string-ts"

import { Spinner } from "./_components/Spinner"
import { PropertiesTable } from "./PropertiesTable"
import { PropertiesSearchInput } from "./SearchInput"
import { StatusFilter } from "./StatusFilter"

export default async function Properties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // search url param
  const search =
    typeof searchParams.search === "string" ? searchParams.search : ""

  // search pattern for category
  const categoryPattern =
    typeof searchParams.category === "string" ? searchParams.category : ""

  // url search params
  const currentSearchParams = new URLSearchParams()
  if (search) currentSearchParams.set("search", search)
  if (categoryPattern && trim(categoryPattern).trim() !== "") {
    currentSearchParams.set("category", `${categoryPattern}`)
  }

  return (
    <div className="min-h-screen px-8 pt-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-8">
          <PropertiesSearchInput
            search={search}
            currentSearchParams={currentSearchParams}
          />
          <StatusFilter />
        </div>
        <div className="ml-16 mt-0 flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary px-3 py-1.5 text-center text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add Set
          </button>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <PropertiesTable searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

function Loading() {
  return (
    <div className="mt-16 flex h-full grow items-center justify-center">
      <Spinner className="w-8 animate-spin" />
    </div>
  )
}
