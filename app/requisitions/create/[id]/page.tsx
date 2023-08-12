import { FC } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database.types"
import { Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import TreeComponent from "../../_components/TreeComponent"

interface HeadingRequisitionProps {
  params: {
    id: string
  }
}

const SingleHeadingRequisitionPage: FC<HeadingRequisitionProps> = async ({
  params: { id },
}) => {
  console.log("🚀 ~ file: page.tsx:18 ~ id:", id)
  // Extract the ID from the slug
  const slug = id?.split("-")[0] ?? id
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select()

  // do a if not null check
  const tree = createRequisitionTree(requisitions as Requisition[])

  const instantHeading = findNodeByReqId(tree, parseInt(slug))

  return (
    <div>
      <div className="">id: {id}</div>
      <div className="">{JSON.stringify(instantHeading)}</div>
      <div>
        <TreeComponent />
      </div>
    </div>
  )
}

export default SingleHeadingRequisitionPage
