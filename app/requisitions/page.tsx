import { FC, Suspense } from "react"
import {
  ArrowRightIcon,
  CaretDownIcon,
  CaretRightIcon,
} from "@radix-ui/react-icons"
import { Options } from "use-debounce"

import { Precedent } from "@/types/RequisitionType"

import { getAllPrecedents } from "./_actions/query"
import { LinkWrapper } from "./_components/LinkWrapper"
import { PrecedentBubble } from "./_components/PrecedentBubble"

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
      <header className="my-4">
        <h1 className="text-2xl font-semibold">
          Precedent Templates and Requisitions
        </h1>
        <h2 className="text-lg">Select a precedent</h2>
      </header>
      <section className="grid grid-cols-6 gap-8">
        <aside className="">
          <PrecedentAside />
        </aside>
        <article className="col-span-5">
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

// Define a type for the option items
type Option = {
  label: string
  value: string
}

const PrecedentAside: FC = () => {
  const options: Option[] = [
    { label: "All Templates", value: "all" },
    { label: "Active Only", value: "active" },
  ]

  return (
    <div className="">
      <h3 className="mb-4 ml-2 flex justify-evenly rounded-lg bg-gray-50  p-2">
        <CaretDownIcon className="mt-1" />
        <div className="text-base font-semibold">Filter Options</div>
      </h3>

      <ul className="font-sansserif ml-2 flex flex-col gap-y-4 border-l">
        {options.map((option: Option, index) => {
          return (
            <li
              key={index}
              className="group flex justify-between rounded-r-lg border-transparent py-2 pl-2 transition duration-300 hover:cursor-pointer hover:border-l-4 hover:border-primary hover:bg-gray-50 hover:font-semibold"
            >
              <div className="">{option.label}</div>
              <div className="invisible group-hover:visible">
                <CaretRightIcon className="mt-1 h-4 w-4" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
