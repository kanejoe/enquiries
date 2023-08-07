import type { AtomicRequisition } from "@/types"

import { AtomicRequisitionHeading } from "@/components/AtomicRequisitionHeading"

interface AtomicReqContainerProps {
  requisition: AtomicRequisition
}

export function AtomicReqContainer({ requisition }: AtomicReqContainerProps) {
  return (
    <section>
      <AtomicRequisitionHeading headingReq={requisition} />
    </section>
  )
}
