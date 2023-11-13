import { EnhancedRequisition, Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"
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

  return (
    <>
      {!headingNode ? (
        <StickyWrapper>
          <div>nothing to see here</div>
        </StickyWrapper>
      ) : (
        <StickyWrapper headerComponent={<HeaderComponent node={headingNode} />}>
          {headingNode ? (
            <RequisitionTreeLayout requisitions={headingNode.children} />
          ) : null}
        </StickyWrapper>
      )}
    </>
  )
}

const HeaderComponent = ({ node }: { node: EnhancedRequisition }) => {
  return (
    <div className="ml-4 flex flex-row space-x-5 px-4 py-4 text-2xl font-semibold uppercase tracking-wide text-gray-700">
      <div className="">{node.sequence}</div>
      <div className="">{node.query}</div>
    </div>
  )
}
