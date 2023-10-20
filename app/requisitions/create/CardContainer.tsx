import { FC } from "react"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import { Requisition } from "@/types/RequisitionType"
import { Database } from "@/lib/database.types"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"
import { RecursiveTree } from "@/components/RecursiveTree"

import { RequisitionCard } from "../_components/RequisitionCard"
import { FlattenedTree } from "./FlattenTree"

interface CardContainerProps {}

const CardContainer: FC<CardContainerProps> = async (props) => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")

  // do a if not null check
  const tree = createRequisitionTree(requisitions as unknown as Requisition[])

  const instantHeadingNode = findNodeByReqId(tree, 18)

  return (
    <section className="relative flex w-full flex-col">
      <FlattenedTree tree={tree} />
      {/* {instantHeadingNode ? (
        <div className="sticky top-[100px] z-10" id="card-title">
          <RequisitionCard data={instantHeadingNode} showRootNode={true} />
        </div>
      ) : null}
      {instantHeadingNode ? (
        <>
          <div className="relative top-0 z-0" id="card-body">
            <RecursiveTree node={instantHeadingNode}>
              {(data) => <RequisitionCard data={data} showRootNode={false} />}
            </RecursiveTree>
          </div>
        </>
      ) : null} */}
    </section>
  )
}

export { CardContainer }
