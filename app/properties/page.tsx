import { Suspense } from "react"
import { trim } from "string-ts"
import { z } from "zod"

import { Spinner } from "./_components/Spinner"
import { ProfileForm } from "./NewPropertyForm"
import { PropertiesTable } from "./PropertiesTable"
import { PropertiesSearchInput } from "./SearchInput"
import { StatusFilter } from "./StatusFilter"

export default async function Properties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const paramsSchema = z.object({
    page: z.coerce.number().optional(),
    category: z.string().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
  })
  const parsedParamsObject = paramsSchema.safeParse(searchParams)

  const searchParamsParsed = !parsedParamsObject.success
    ? {}
    : parsedParamsObject.data

  // search url param
  const search =
    typeof searchParamsParsed.search === "string"
      ? searchParamsParsed.search
      : ""

  // search pattern for category
  const categoryPattern =
    typeof searchParamsParsed.category === "string"
      ? searchParamsParsed.category
      : ""

  // url search params
  const currentSearchParams = new URLSearchParams()
  if (search) currentSearchParams.set("search", search)
  if (categoryPattern && trim(categoryPattern).trim() !== "") {
    currentSearchParams.set("category", `${categoryPattern}`)
  }

  // sort params
  const sort =
    typeof currentSearchParams.sort === "string" ? currentSearchParams.sort : ""

  // if (parsedParamsObject.success)
  // console.log("🚀 ~ file: page.tsx:50 ~ sort:", parsedParamsObject.data)

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

      <div className="my-12 w-1/3">
        <ProfileForm />
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
