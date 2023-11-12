import { EnhancedRequisition, Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { RequisitionContainer } from "./RequisitionContainer"
import { StickyWrapper } from "./StickyWrapper"

interface QueryWrapperProps {
  headingId: number
}

export async function QueryWrapper({ headingId }: QueryWrapperProps) {
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
  const headingNode = findNodeByReqId(requisitionTree, headingId)
  console.log(
    "🚀 ~ file: QueryWrapper.tsx:26 ~ QueryWrapper ~ headingNode:",
    headingNode
  )

  return (
    <div>
      <StickyWrapper>
        <RequisitionContainer queries={headingNode.children} />
      </StickyWrapper>
    </div>
  )
}
