import { CheckCircle, FileText, Flag } from "lucide-react"

import { cn } from "@/lib/utils"

import { ReplyForm } from "./reply_form"

const req = {
  reqId: "R43FKLF",
  clauseRef: "2.1.(a)",
  query:
    "if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other",
  reply: "not applicable",
  level: 2,
  replyReqired: true,
}
const req1 = {
  reqId: "R43FKLF",
  clauseRef: "2.1",
  query: "mains or something else",
  reply: "not applicable",
  level: 1,
  replyReqired: true,
}

interface AtomicRequisitionProps {
  reqId: string
  clauseRef: string
  query: string
  reply?: string
  level: number
  replyRequired: boolean
}

export default function AtomicRequisitionPage() {
  return (
    <section className="mt-16">
      <h1 className="text-xl font-semibold">Atomic Requisition</h1>
      <div className="mt-6 rounded p-6 flex flex-col">
        <AtomicRequisition
          reqId={req1.reqId}
          clauseRef={req1.clauseRef}
          query={req1.query}
          reply={req1.reply}
          level={req1.level}
          replyRequired={req1.replyReqired}
        />
        <AtomicRequisition
          reqId={req.reqId}
          clauseRef={req.clauseRef}
          query={req.query}
          reply={req.reply}
          level={req.level}
          replyRequired={req.replyReqired}
        />
      </div>
    </section>
  )
}

function AtomicRequisition({
  reqId,
  clauseRef,
  query,
  reply,
  level,
  replyRequired,
}: AtomicRequisitionProps) {
  return (
    <div className="w-full p-4 focus-within:bg-slate-50 focus-within:border-x-2 focus-within:border-slate-300 border-box rounded-md">
      <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:gap-x-6 lg:flex-row lg:items-start">
        <div className="lg:w-1/2 lg:flex lg:flex-row">
          <SectionSpacer level={level} />
          <SectionIndicator clauseRef={clauseRef} />
          <SectionQuery query={query} />
        </div>
        <div className="lg:w-1/2 lg:flex lg:flex-row">
          {replyRequired ? (
            <>
              <SectionReply reply={reply} reqId={reqId} />
              <SectionOptions />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function SectionSpacer({ level }: { level: number }) {
  const spacer_class = cn({
    "lg:w-[0px]": level === 1,
    "lg:w-[18px]": level === 2,
    "lg:w-[36px]": level === 3,
  })
  return <div className={spacer_class}> &nbsp; </div>
}

function SectionIndicator({ clauseRef }: { clauseRef: string }) {
  return (
    <div className="lg:w-[48px] shrink-0">
      <div className="font-semibold">{clauseRef}</div>
    </div>
  )
}

function SectionQuery({ query }: { query: string }) {
  return <div className="lg:w-9/12 px-4">{query}</div>
}

function SectionReply({ reply, reqId }: { reply?: string; reqId: string }) {
  return (
    <div className="lg:w-9/12 px-4">
      <ReplyForm reply={reply} reqId={reqId} />
    </div>
  )
}

function SectionOptions() {
  return (
    <div className="lg:w-[84px] shrink-0">
      <div className="flex flex-row space-x-4 mt-3">
        <CheckCircle
          size={20}
          color="black"
          className="fill-teal-300 hover:cursor-pointer hover:fill-teal-100 transition"
          strokeWidth={1.15}
        />
        <FileText
          size={20}
          color="black"
          strokeWidth={1.25}
          className="fill-teal-300 hover:cursor-pointer hover:fill-teal-100 transition"
        />
        <Flag
          size={20}
          strokeWidth={1.75}
          className="fill-red-500 hover:fill-red-100 hover:cursor-pointer transition dark:text-gray-300 text-gray-900"
        />
      </div>
    </div>
  )
}
