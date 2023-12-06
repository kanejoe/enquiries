import { Suspense } from "react"
import { z } from "zod"

import { Precedent } from "@/types/RequisitionType"

import { getAllPrecedents } from "./_actions/query"
import { LinkWrapper } from "./_components/LinkWrapper"
import { MotionWrapper } from "./_components/MotionWrapper"
import { PrecedentAside } from "./_components/PrecedentAside"
import { PrecedentBubble } from "./_components/PrecedentBubble"
import { FilterOptions, filterPrecedents } from "./filters"

export default async function ServerComponent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const paramsSchema = z.object({
    filter: z.string().optional(),
  })
  const parsedParamsObject = paramsSchema.safeParse(searchParams)
  const searchParamsParsed = !parsedParamsObject.success
    ? {}
    : parsedParamsObject.data

  // search url param
  const filter =
    typeof searchParamsParsed.filter === "string"
      ? searchParamsParsed.filter
      : ""

  // store all the properties in a map
  const currentSearchParams = new URLSearchParams()
  if (filter) currentSearchParams.set("filter", filter)

  return (
    <main className="container font-albertsans">
      <Suspense fallback={<p className="h-6">loading...</p>}>
        <Cards currentSearchParams={currentSearchParams} />
      </Suspense>
    </main>
  )
}

async function Cards({
  currentSearchParams,
}: {
  currentSearchParams: URLSearchParams
}) {
  // Fetch all precedents from a data source
  const fetchedPrecedents = await getAllPrecedents()
  if (!fetchedPrecedents) {
    return <div>No precedents available...</div>
  }

  // Remove any null values from the fetched data
  const nonNullPrecedents = fetchedPrecedents.filter(
    (precedent): precedent is Precedent => precedent !== null
  )

  // Sort the non-null precedents for further processing
  const sortedPrecedents = sortPrecedents(nonNullPrecedents)

  // Retrieve the current filter parameter from search params
  const currentFilter = currentSearchParams.get("filter") ?? "all"

  let filterOptions: FilterOptions

  if (currentFilter === "all" || currentFilter === "active") {
    filterOptions = { filterType: currentFilter }
  } else {
    // Assuming currentFilter holds the name of the creator for the 'createdBy' filter
    filterOptions = { filterType: "createdBy", createdBy: currentFilter }
  }

  const displayPrecedents = filterPrecedents(sortedPrecedents, filterOptions)

  return (
    <section className="mt-8">
      <header className="my-8">
        <h1 className="text-2xl font-semibold">
          Precedent Templates and Requisitions
        </h1>
        <h2 className="text-lg">Select a precedent</h2>
      </header>
      <section className="grid grid-cols-6 gap-12">
        <aside className="">
          <PrecedentAside currentSearchParams={currentSearchParams} />
        </aside>
        <article className="col-span-5">
          <ul className="grid grid-cols-3 gap-8">
            {displayPrecedents.map((precedent) => {
              return (
                <MotionWrapper key={precedent.id}>
                  <LinkWrapper href={`requisitions/${precedent.id}`}>
                    <PrecedentBubble precedent={precedent} />
                  </LinkWrapper>
                </MotionWrapper>
              )
            })}
          </ul>
        </article>
      </section>
    </section>
  )
}

function sortPrecedents(precedents: Precedent[]): Precedent[] {
  return precedents.sort((a, b) => {
    // First, sort by archived status
    if (a.is_archived === b.is_archived) {
      // If both have the same archived status, sort by date
      // Convert dates to timestamps for comparison
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()

      // Sort in descending order
      return dateB - dateA
    } else {
      // Place non-archived items before archived items
      return a.is_archived ? 1 : -1
    }
  })
}
