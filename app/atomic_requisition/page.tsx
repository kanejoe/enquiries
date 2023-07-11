import { CheckCircle, FileText, Flag } from "lucide-react"

import { ReplyForm } from "./reply_form"

const req = {
  reqId: "R43FKLF",
  clauseRef: "2.1.(a)",
  query:
    "if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other",
  reply: "not applicable",
  level: 2,
}

interface AtomicRequisitionProps {
  reqId: string
  clauseRef: string
  query: string
  reply?: string
  level?: string
}

export default function AtomicRequisitionPage() {
  return (
    <section className="mt-16">
      <h1 className="text-xl font-semibold">Atomic Requisition</h1>
      <div className="mt-6 rounded p-6">
        <AtomicRequisition
          reqId={req.reqId}
          clauseRef={req.clauseRef}
          query={req.query}
          reply={req.reply}
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
}: AtomicRequisitionProps) {
  return (
    <div className="w-full border border-gray-100 p-4">
      <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:gap-x-6 lg:flex-row lg:items-start">
        <SectionIndicatorLong clauseRef={clauseRef} />
        <SectionQuery query={query} />
        <SectionReply reply={reply} reqId={reqId} />
        <SectionOptions />
      </div>
    </div>
  )
}

function SectionIndicatorLong({ clauseRef }: { clauseRef: string }) {
  return (
    <div className="lg:w-[48px] shrink-0">
      <div className="font-semibold">{clauseRef}</div>
    </div>
  )
}

function SectionQuery({ query }: { query: string }) {
  return <div className="lg:w-5/12">{query}</div>
}

function SectionReply({ reply, reqId }: { reply?: string; reqId: string }) {
  return (
    <div className="lg:w-5/12">
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
