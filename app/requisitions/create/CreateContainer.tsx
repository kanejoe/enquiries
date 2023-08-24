import type { Requisition } from "@/types/RequisitionType"

// import { getHeaderNodes } from "@/lib/tree"

interface CreateContainerProps {
  requisitions: Requisition[]
}

const CreateContainer: React.FC<CreateContainerProps> = ({ requisitions }) => {
  // const headers = getHeaderNodes(requisitions)
  return (
    <div className="container">
      <div className="mt-4 flex flex-col gap-y-6">
        <pre className="text-xs">{JSON.stringify(requisitions, null, 2)}</pre>
      </div>
    </div>
  )
}

export default CreateContainer
