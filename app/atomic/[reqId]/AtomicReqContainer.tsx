import { type AtomicRequisition } from "@/types"

import { AtomicRequisitionHeading } from "@/components/AtomicRequisitionHeading"
import { AtomicRequisitionNode } from "@/components/AtomicRequisitionNode"

interface AtomicReqContainerProps {
  requisition: AtomicRequisition
}

export function AtomicReqContainer({ requisition }: AtomicReqContainerProps) {
  return (
    <>
      <section>
        <AtomicRequisitionHeading headingReq={requisition} />
        <div>
          <TreeDisplay rootNode={requisition} />
        </div>
      </section>
    </>
  )
}

const RecursiveTree: React.FC<{ node: AtomicRequisition }> = ({ node }) => {
  return (
    <>
      {node.query && <AtomicRequisitionNode node={node} />}
      {node.children &&
        node.children.map((childNode, index) => (
          <RecursiveTree key={index} node={childNode} />
        ))}
    </>
  )
}

const TreeDisplay: React.FC<{ rootNode: AtomicRequisition }> = ({
  rootNode,
}) => {
  return (
    <div>
      {rootNode.children &&
        rootNode.children.map((child, index) => (
          <RecursiveTree key={index} node={child} />
        ))}
    </div>
  )
}
