import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findRootNodeBySequence } from "@/lib/tree"

import { RequisitionContainer } from "./RequisitionContainer"

export const dynamic = "force-dynamic"

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies })

  const { data: requisitions, error } = await supabase
    .from<Requisition>("requisitions")
    .select()

  const tree = createRequisitionTree(requisitions)
  console.log("🚀 ~ file: page.tsx:17 ~ ServerComponent ~ tree:", tree)
  const subtree = findRootNodeBySequence(tree, 1)
  console.log("🚀 ~ file: page.tsx:17 ~ ServerComponent ~ subtree:", subtree)

  return (
    <main className="flex flex-col gap-y-2">
      <section>{/* <RequisitionContainer requisition={subtree} /> */}</section>
    </main>
  )
}
