import { FC } from "react"

// import { useQuery } from "@tanstack/react-query"

import { Requisition } from "@/types/RequisitionType"
import { supabase } from "@/lib/supabase"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

// import { getAllRequisitionsAction } from "./actions"
// import { RecursiveTree } from "@/components/RecursiveTree"

// import { RequisitionCard } from "../_components/RequisitionCard"
// import { FlattenedTree } from "./FlattenTree"
// import { data } from "./data"
// import NewStructure from "./NewStructure"
import { TreeLayout } from "./TreeLayout"

interface CardContainerProps {}

const CardContainer: FC<CardContainerProps> = async () => {
  // const { data: d, isFetched } = useQuery({
  //   queryKey: ["requisitions"],
  //   queryFn: getAllRequisitionsAction,
  // })
  // console.log(d)

  const { data: requisitions, error } = await supabase
    .from("requisitions")
    .select("*")

  // do a if not null check
  const tree = createRequisitionTree(requisitions as unknown as Requisition[])
  // const instantHeadingNode = findNodeByReqId(tree, 18)

  return (
    <section className="relative flex w-full flex-col">
      {/* <NewStructure requisitions={tree} /> */}
      {tree ? <TreeLayout requisitions={tree} /> : null}
      {/* <FlattenedTree tree={tree} /> */}
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
