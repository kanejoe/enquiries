import { Suspense } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"
// import CreateContainer from "./CreateContainer"
import { RecursiveTree } from "@/components/RecursiveTree"

import { RequisitionCard } from "../_components/RequisitionCard"
import { RequisitionForm } from "./[id]/RequisitionForm"

// export const dynamic = "force-dynamic"

export default async function CreateRequisitionPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section className="">something here until the form is rendered</section>
    </Suspense>
  )
}
