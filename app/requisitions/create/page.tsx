import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { createRequisitionTree } from "@/lib/tree"

import CreateContainer from "./CreateContainer"

export const dynamic = "force-dynamic"

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select()

  // do a if not null check
  const tree = createRequisitionTree(requisitions as Requisition[])

  return (
    <main className="flex flex-col gap-y-2">
      <section className="">
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <CreateContainer requisitions={tree} />
        {/* </Suspense> */}
      </section>
    </main>
  )
}
