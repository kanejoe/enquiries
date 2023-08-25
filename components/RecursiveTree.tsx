import type { Requisition } from "@/types/RequisitionType"

interface RecursiveTreeProps {
  node: Requisition
  children: (data: Requisition) => React.ReactNode
}

const RecursiveTree: React.FC<RecursiveTreeProps> = ({ node, children }) => {
  return (
    <>
      {children(node)}
      {node.children &&
        node.children.map((childNode, index) => (
          <RecursiveTree key={index} node={childNode}>
            {children}
          </RecursiveTree>
        ))}
    </>
  )
}

export { RecursiveTree }
