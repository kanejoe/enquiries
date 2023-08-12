import type { Requisition } from "@/types/RequisitionType"
import { getHeaderNodes } from "@/lib/tree"

import { HeadingScrollArea } from "../_components/HeadingScrollArea"

interface CreateContainerProps {
  requisitions: Requisition[]
}

const CreateContainer: React.FC<CreateContainerProps> = ({ requisitions }) => {
  const headers = getHeaderNodes(requisitions)
  return (
    <div className="container">
      <div className="mt-4 flex flex-col gap-y-6">
        <HeadingScrollArea headers={headers} />
      </div>
    </div>
  )
}

export default CreateContainer
