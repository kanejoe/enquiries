import { FC } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { RecursiveTree } from "../../_components/RecursiveTree"
import TreeComponent from "../../_components/TreeComponent"
import { RequisitionContainer } from "./RequisitionDetails"

interface HeadingRequisitionProps {
  params: {
    id: string
  }
}

const SingleHeadingRequisitionPage: FC<HeadingRequisitionProps> = async ({
  params: { id },
}) => {
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
    <div className="font-albertsans">
      {instantHeading && (
        <RecursiveTree node={instantHeading}>
          {(data) => <RequisitionContainer data={data} />}
        </RecursiveTree>
      )}
    </div>
  )
}

export default SingleHeadingRequisitionPage
