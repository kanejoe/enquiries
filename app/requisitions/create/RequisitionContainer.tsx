import { FC } from "react"

import { EnhancedRequisition, type Requisition } from "@/types/RequisitionType"
import { createRequisitionTree, findNodeByReqId } from "@/lib/tree"

import { getRequisitions } from "../_actions/query"
import { ErrorMessage } from "../_components/ErrorMessage"
import { EmptyReqsView } from "./EmptyReqsView"
import { RequisitionTreeLayout } from "./RequisitionTreeLayout"

type RequisitionContainerProps = {
  queries: EnhancedRequisition[]
}

export const RequisitionContainer: FC<RequisitionContainerProps> = async ({
  queries,
}) => {
  return (
    <div className="ml-4 mt-6 flex justify-center">
      <RequisitionTreeLayout requisitions={queries} />
    </div>
  )
}
