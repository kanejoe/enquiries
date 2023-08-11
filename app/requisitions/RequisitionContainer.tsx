import type { Requisition } from "@/types/RequisitionType"
import { AtomicRequisitionHeading } from "@/components/AtomicRequisitionHeading"
import { AtomicRequisitionNode } from "@/components/AtomicRequisitionNode"

interface RequisitionContainerProps {
  requisition: Requisition
}

export function RequisitionContainer({
  requisition,
}: RequisitionContainerProps) {
  return (
    <>
      <section>
        {/* <AtomicRequisitionHeading headingReq={requisition} /> */}
        <div>
          <TreeDisplay rootNode={requisition} />
        </div>
        {/* <pre>{JSON.stringify(requisition, null, 2)}</pre> */}
      </section>
    </>
  )
}

const RecursiveTree: React.FC<{ node: Requisition }> = ({ node }) => {
  return (
    <>
      {/* {node.query && <AtomicRequisitionNode node={node} />} */}
      {node.children &&
        node.children.map((childNode, index) => (
          <RecursiveTree key={index} node={childNode} />
        ))}
    </>
  )
}

const TreeDisplay: React.FC<{ rootNode: Requisition }> = ({ rootNode }) => {
  return (
    <div>
      {rootNode.children &&
        rootNode.children.map((child, index) => (
          <RecursiveTree key={index} node={child} />
        ))}
    </div>
  )
}
