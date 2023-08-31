import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"
import { RecursiveTree } from "@/components/RecursiveTree"

import { RequisitionCard } from "../_components/RequisitionCard"

async function RequisitionCardList() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")

  // do a if not null check
  const tree = createRequisitionTree(requisitions as Requisition[])
  const instantHeadingNode = findNodeByReqId(tree, 18)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="w-full">
        {instantHeadingNode ? (
          <div className="flex flex-col">
            <section className="sticky top-[100px] z-0">
              <RequisitionCard data={instantHeadingNode} showRootNode={true} />
            </section>
            <RecursiveTree node={instantHeadingNode}>
              {(data) => <RequisitionCard data={data} showRootNode={false} />}
            </RecursiveTree>
          </div>
        ) : null}
      </section>
    </Suspense>
  )
}

export { RequisitionCardList }
