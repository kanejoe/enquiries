import {
  EnhancedRequisition,
  GetPrecedentResponse,
} from "@/types/RequisitionType"
import { addSiblingToNode } from "@/lib/addSiblingToNode"
import { createRequisitionTree, getHeaderNodes } from "@/lib/tree"
import { findHighestSequenceNodeAtLevelOne } from "@/lib/treeUtils"

import { getPrecedentById } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { AddNewHeaderButton } from "./AddNewHeaderButton"
import { RequisitionHeadingList } from "./RequisitionHeaders"
import { StickyWrapper } from "./StickyWrapper"

interface HeaderWrapperProps {
  headingId: number
}

export async function HeaderWrapper({ headingId }: HeaderWrapperProps) {
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

  const headerNodes = getHeaderNodes(requisitionTree)

  const highestParentNode = findHighestSequenceNodeAtLevelOne(requisitionTree)
  const newNodeData = highestParentNode
    ? addSiblingToNode(highestParentNode)
    : {
        parent_id: null,
        sequence: 3,
        query: "",
        reply: null,
        is_applicable: false,
        has_doc: false,
        is_complete: false,
        is_flagged: false,
        is_required: false,
        children: [],
        siblings: [1],
        sequence_in_levels: [1],
        level: 1,
      }

  if (!headerNodes || !headerNodes.length || !Array.isArray(headerNodes)) {
    return (
      <StickyWrapper>
        <div>nothing to see here</div>
      </StickyWrapper>
    )
  }

  return (
    <StickyWrapper
      footerComponent={<FooterComponent newNodeData={newNodeData} />}
      headerComponent={<HeaderComponent />}
    >
      <RequisitionHeadingList headerNodes={headerNodes} headingId={headingId} />
    </StickyWrapper>
  )
}

const HeaderComponent = () => {
  return (
    <div className="ml-8 flex h-full items-center text-sm font-semibold uppercase tracking-wide text-gray-700">
      Headings
    </div>
  )
}

const FooterComponent = ({
  newNodeData,
}: {
  newNodeData: Omit<EnhancedRequisition, "id">
}) => {
  return (
    <div className="flex h-full items-center justify-center rounded-b-xl bg-gray-50">
      <div className="mb-4">
        <AddNewHeaderButton newNodeData={newNodeData} />
      </div>
    </div>
  )
}
