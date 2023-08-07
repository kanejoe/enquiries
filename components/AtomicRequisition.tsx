import { cn } from "@/lib/utils"

import { FlaggedForm } from "./FlaggedForm"
import { HasDocForm } from "./HasDocForm"
import { IsCompleteForm } from "./IsCompleteForm"
import { ReplyForm } from "./ReplyForm"
import { AtomicReq } from "./reqStore"

interface AtomicRequisitionProps {
  requisition: AtomicReq
}

export function AtomicRequisition({ requisition }: AtomicRequisitionProps) {
  if (requisition.isApplicable === false && requisition.query?.trim() === "")
    return null

  return (
    <div className="border-box w-full rounded-md border border-transparent opacity-100 transition focus-within:border focus-within:border-slate-200 focus-within:bg-slate-50 dark:focus-within:bg-slate-800">
      <div className="flex flex-col gap-y-4 px-4 pb-4 pt-2 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          <SectionSpacer level={requisition.level} />
          <SectionIndicator clauseRef={requisition.clauseRef} />
          <SectionQuery
            query={requisition.query}
            level={requisition.level}
            isApplicable={requisition.isApplicable}
          />
        </div>
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          {requisition.isApplicable ? (
            <>
              <SectionReply
                reply={requisition.reply}
                reqId={requisition.reqId}
              />
              <SectionOptions
                isComplete={requisition.isComplete}
                hasDoc={requisition.hasDoc}
                isFlagged={requisition.isFlagged}
                reqId={requisition.reqId}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
