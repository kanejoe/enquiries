import type {
  EnhancedRequisition,
  GetPrecedentResponse,
  Precedent,
  Requisition,
} from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"
import { countRequiredNodes } from "@/lib/treeUtils"

import { getPrecedentById } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { EditHeadingComponent } from "./EditHeadingComponent"
import { EmptyReqsView } from "./EmptyReqsView"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"
import { StickyWrapper } from "./StickyWrapper"

interface QueryWrapperProps {
  headingId: number
}

export async function QueryWrapper({ headingId }: QueryWrapperProps) {
  let precedent: GetPrecedentResponse
  try {
    precedent = await getPrecedentById()
  } catch (error: unknown) {
    console.error(error)
    return <ErrorMessage message={(error as Error).message} />
  }

  const requisitionTree = createRequisitionTree(
    precedent.requisitions as EnhancedRequisition[]
  )
  const headingNode = findNodeByReqId(requisitionTree, headingId)
  const onlyHeading = headingNode?.children?.length === 0 ? true : false

  return (
    <>
      {!headingNode ? (
        <StickyWrapper>
          <div>nothing to see here</div>
        </StickyWrapper>
      ) : (
        <StickyWrapper headerComponent={<HeaderComponent node={headingNode} />}>
          {onlyHeading ? (
            <EmptyReqsView requisition={headingNode} />
          ) : (
            <RequisitionTreeLayout requisitions={headingNode.children} />
          )}
        </StickyWrapper>
      )}
    </>
  )
}

const HeaderComponent = ({ node }: { node: EnhancedRequisition }) => {
  const noOfRequiredNodes = countRequiredNodes(node.children)

  return (
    <div className="flex w-full  flex-row text-gray-800">
      {/* <!-- Fixed width left column --> */}
      <div className="flex w-24 flex-shrink-0 justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-semibold tabular-nums text-secondary-foreground ring ring-primary/25">
          {node.sequence}
        </div>
      </div>

      {/* <!-- Middle column that grows and truncates text --> */}
      <div className="ml-4 flex flex-grow items-center text-base font-semibold uppercase">
        <p className="line-clamp-2">{node.query}</p>
      </div>

      {/* <!-- Third column fixed width --> */}
      <div className="flex h-full w-32 flex-shrink-0 flex-col items-center justify-center">
        <p className="text-sm font-semibold leading-4 tracking-wider text-gray-400 small-caps">
          Queries
        </p>
        <p className="flex items-baseline">
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-primary [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
            {noOfRequiredNodes}
          </span>
        </p>
      </div>

      {/* <!-- Fixed width right column --> */}
      <div className="flex w-12 flex-shrink-0 items-center justify-center">
        <EditHeadingComponent node={node} />
      </div>
    </div>
  )
}
