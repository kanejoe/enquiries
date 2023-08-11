import type { Requisition } from "@/types/RequisitionType"

import { EditRequisitionForm } from "./EditRequisitionForm"
import { Thread } from "./form"

interface CreateContainerProps {
  requisitions: Requisition[]
}

const CreateContainer: React.FC<CreateContainerProps> = ({ requisitions }) => {
  return (
    <div className="container">
      <div className="mt-4 flex flex-col gap-y-6">
        {requisitions?.map((node) => {
          return <Thread key={node.id} requisition={node} />
        })}
      </div>
    </div>
  )
}

export default CreateContainer
