import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { RequisitionForm } from "./[id]/RequisitionForm"
import CreateContainer from "./CreateContainer"

// export const dynamic = "force-dynamic"

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")

  // do a if not null check
  const tree = createRequisitionTree(requisitions as Requisition[])
  const selectedNode = findNodeByReqId(tree, 21)

  return (
    <main className="flex flex-col gap-y-2">
      <section className="">
        <Suspense fallback={<p>Loading...</p>}>
          <div className="w-128">
            <RequisitionForm selectedNode={selectedNode} />
          </div>
          <CreateContainer requisitions={tree} />
        </Suspense>
      </section>
    </main>
  )
}
