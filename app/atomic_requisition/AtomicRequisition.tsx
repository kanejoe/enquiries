import { CheckCircle, FileText } from "lucide-react"

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
    <div className="border-box w-full rounded-md opacity-100 transition focus-within:border focus-within:border-slate-200 focus-within:bg-slate-50 dark:focus-within:bg-slate-800">
      <div className="flex flex-col gap-y-4 px-4 pb-4 pt-2 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          <SectionSpacer level={requisition.level} />
          <SectionIndicator clauseRef={requisition.clauseRef} />
          <SectionQuery query={requisition.query} />
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

function SectionSpacer({ level }: { level: number }) {
  const spacer_class = cn({
    "hidden lg:block": true,
    "lg:w-[2px]": level === 1,
    "lg:w-[12px]": level === 2,
    "lg:w-[20px]": level === 3,
  })
  return <div className={spacer_class}> &nbsp; </div>
}

function SectionIndicator({ clauseRef }: { clauseRef: string }) {
  return (
    <div className="shrink-0 lg:mr-6 lg:min-w-[48px]">
      <div className="font-semibold">{clauseRef}</div>
    </div>
  )
}

function SectionQuery({ query }: { query?: string }) {
  return <div className="lg:w-9/12">{query}</div>
}

function SectionReply({ reply, reqId }: { reply?: string; reqId: string }) {
  return (
    <div className="lg:mr-6 lg:w-9/12">
      <ReplyForm reply={reply} reqId={reqId} />
    </div>
  )
}

interface SectionOptionProps {
  isComplete: AtomicReq["isComplete"]
  isFlagged: AtomicReq["isFlagged"]
  hasDoc: AtomicReq["hasDoc"]
  reqId: AtomicReq["reqId"]
}

function SectionOptions({
  isComplete,
  isFlagged,
  hasDoc,
  reqId,
}: SectionOptionProps) {
  return (
    <div className="shrink-0 lg:w-[96px]">
      <div className="mt-3 flex flex-row space-x-4 pr-4">
        <IsCompleteForm isComplete={isComplete} reqId={reqId} />
        <HasDocForm hasDoc={hasDoc} reqId={reqId} />
        <FlaggedForm isFlagged={isFlagged} reqId={reqId} />
      </div>
    </div>
  )
}
