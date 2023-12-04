import { Suspense } from "react"

import { Precedent } from "@/types/RequisitionType"

import { getAllPrecedents } from "./_actions/query"
import { LinkWrapper } from "./_components/LinkWrapper"
// import { PrecedentCard } from "./_components/PrecedentCard"
import { PrecedentBubble } from "./_components/PrecedentBubble"
import { PrecedentList } from "./_components/PrecedentList"

export default async function ServerComponent() {
  return (
    <main className="container font-albertsans">
      <Suspense fallback={<p className="h-6">loading...</p>}>
        <Cards />
      </Suspense>
    </main>
  )
}

async function Cards() {
  let unsortedPrecedents = await getAllPrecedents()
  if (!unsortedPrecedents) {
    return <div>no precedents...</div>
  }

  // Filter out null values before sorting
  const filteredPrecedents = unsortedPrecedents.filter(
    (item): item is Precedent => item !== null
  )
  const precedents = sortPrecedents(filteredPrecedents)

  return (
    <section className="mt-8">
      <ul className="grid grid-cols-3 gap-6">
        {precedents.map((precedent) => {
          return (
            <li key={precedent.id}>
              <LinkWrapper href={`requisitions/${precedent.id}`}>
                <PrecedentBubble precedent={precedent} />
              </LinkWrapper>
            </li>
          )
        })}
      </ul>
      {/* <ul role="list" className="divide-y divide-gray-100">
        {precedents
          // .filter((p) => p?.is_archived === false)
          .map((precedent) => {
            if (precedent !== null) {
              return (
                <li key={precedent.id} className="">
                  <LinkWrapper href={`requisitions/${precedent.id}`}>
                    <PrecedentList precedent={precedent} />
                  </LinkWrapper>
                </li>
              )
            }
          })}
      </ul> */}
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
