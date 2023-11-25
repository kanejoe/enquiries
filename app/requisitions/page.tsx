import { Suspense } from "react"

import { getAllPrecedents } from "./_actions/query"
import { PrecedentCard } from "./_components/PrecedentCard"

export default async function ServerComponent() {
  return (
    <main className="flex flex-col gap-y-2 font-albertsans">
      <section className="grid grid-cols-2 gap-4">
        <Suspense fallback={<p className="h-6" />}>
          <Cards />
        </Suspense>
      </section>
    </main>
  )
}

async function Cards() {
  let precedents = await getAllPrecedents()
  console.log("🚀 ~ file: page.tsx:20 ~ Cards ~ precedents:", precedents)

  return (
    <>
      <PrecedentCard />
      <PrecedentCard archived={true} />
    </>
  )
}
