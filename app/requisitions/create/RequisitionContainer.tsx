import { FC } from "react"

import { EnhancedRequisition, type Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { EmptyReqsView } from "./EmptyReqsView"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"

export const RequisitionContainer: FC = async ({ queries }) => {
  console.log(
    "🚀 ~ file: RequisitionContainer.tsx:12 ~ constRequisitionContainer:FC= ~ queries:",
    queries
  )

  return <div className="">queries</div>
}

//** <div className="overflow-y-auto rounded-t-xl border border-gray-100 ">
// <div className="sticky top-0 z-10 mb-3">
//   {instantHeadingNode ? (
//     <div className="flex flex-row space-x-5 bg-gray-50 px-4 py-4 text-2xl font-semibold uppercase tracking-wide text-gray-700">
//       <div className="">{instantHeadingNode.sequence}</div>
//       <div className="">{instantHeadingNode.query}</div>
//     </div>
//   ) : null}
// </div> */

{
  /* <div className="mt-4"> */
}
//   {requisitionTree &&
//   requisitionTree[0]?.children &&
//   requisitionTree[0].children.length ? (
//     <RequisitionTreeLayout requisitions={requisitionTree} />
//   ) : (
//     <EmptyReqsView requisition={instantHeadingNode} />
//   )}
// </div>
