import { Suspense } from "react"

import { Spinner } from "./_components/Spinner"
import { PropertiesTable } from "./PropertiesTable"
import { PropertiesSearchInput } from "./search"

export default async function Properties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : ""

  const currentSearchParams = new URLSearchParams()
  if (search) currentSearchParams.set("search", search)

  return (
    <div className="min-h-screen px-8 pt-12">
      <div className="flex items-center justify-between">
        <PropertiesSearchInput search={search} />
        <div className="ml-16 mt-0 flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary px-3 py-1.5 text-center text-sm font-semibold leading-6  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add user
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
