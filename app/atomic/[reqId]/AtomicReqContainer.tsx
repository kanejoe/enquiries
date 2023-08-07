import type { AtomicRequisition } from "@/types"

import { transformCharacters } from "@/lib/tree"
import { AtomicRequisitionHeading } from "@/components/AtomicRequisitionHeading"

interface AtomicReqContainerProps {
  requisition: AtomicRequisition
}

export function AtomicReqContainer({ requisition }: AtomicReqContainerProps) {
  return (
    <section>
      <AtomicRequisitionHeading headingReq={requisition} />
      <div>
        <TreeDisplay rootNode={requisition} />
      </div>
    </section>
  )
}

const RecursiveTree: React.FC<{ node: AtomicRequisition }> = ({ node }) => {
  return (
    <>
      {node.query && (
        <div>
          {transformCharacters(node.characters)} {node.query}
        </div>
      )}
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
