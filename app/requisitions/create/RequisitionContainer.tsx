import { FC } from "react"

import { EnhancedRequisition, type Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { EmptyReqsView } from "./EmptyReqsView"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"

export const RequisitionContainer: FC = async () => {
  let requisitions: Requisition[]
  try {
    requisitions = await getRequisitions()
  } catch (error: unknown) {
    console.error(error)
    return <ErrorMessage message={(error as Error).message} />
  }

  const requisitionTree = createRequisitionTree(
    requisitions as EnhancedRequisition[]
  )

  const instantHeadingNode = findNodeByReqId(requisitionTree, 18)

  if (!requisitions) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="sticky top-[var(--gap-to-top)] mt-2">
        <div className="h-[calc(100vh-8rem)] overflow-y-auto rounded-t-xl border border-gray-100 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <div className="sticky top-0 z-10 mb-3">
            {instantHeadingNode ? (
              <div className="flex flex-row space-x-5 bg-gray-50 px-4 py-4 text-2xl font-semibold uppercase tracking-wide text-gray-700">
                <div className="">{instantHeadingNode.sequence}</div>
                <div className="">{instantHeadingNode.query}</div>
              </div>
            ) : null}
          </div>
          {requisitionTree &&
          requisitionTree[0]?.children &&
          requisitionTree[0].children.length ? (
            <RequisitionTreeLayout requisitions={requisitionTree} />
          ) : (
            <EmptyReqsView requisition={instantHeadingNode} />
          )}
        </div>
      </div>
    </>
  )
}
