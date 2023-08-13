import type { Requisition } from "@/types/RequisitionType"
import { AtomicRequisitionNode } from "@/components/AtomicRequisitionNode"

interface AtomicReqContainerProps {
  requisitions: Requisition[]
}

export function AtomicReqContainer({ requisitions }: AtomicReqContainerProps) {
  // console.log(
  //   "🚀 ~ file: AtomicReqContainer.tsx:10 ~ AtomicReqContainer ~ requisition:",
  //   requisitions
  // )
  return (
    <>
      <section>
        {/* <AtomicRequisitionHeading headingReq={requisition} /> */}
        <div>{/* <TreeDisplay rootNode={requisition} /> */}</div>

        <pre>{JSON.stringify(requisitions, null, 2)}</pre>
      </section>
    </>
  )
}

const RecursiveTree: React.FC<{ node: Requisition }> = ({ node }) => {
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
