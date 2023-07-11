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
  replyRequired: true,
}
const req1 = {
  reqId: "R43FKLF",
  clauseRef: "2.1",
  query: "Is the property serviced with:",
  reply: "not applicable",
  level: 1,
  replyRequired: false,
}
const req0 = {
  reqId: "43FJK",
  clauseRef: "2.",
  query: "Water Services/Local Authority",
  level: 0,
  reqIsApplicable: false,
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
      <div className="mt-6 flex flex-col rounded p-6">
        {req0.level === 0 ? (
          <AtomicRequisitionHeading
            reqId={req0.reqId}
            clauseRef={req0.clauseRef}
            query={req0.query}
            level={req0.level}
            reqIsApplicable={req0.reqIsApplicable}
          />
        ) : null}
        <AtomicRequisition
          reqId={req1.reqId}
          clauseRef={req1.clauseRef}
          query={req1.query}
          reply={req1.reply}
          level={req1.level}
          replyRequired={req1.replyRequired}
        />
        <AtomicRequisition
          reqId={req.reqId}
          clauseRef={req.clauseRef}
          query={req.query}
          reply={req.reply}
          level={req.level}
          replyRequired={req.replyRequired}
        />
      </div>
    </section>
  )
}

function AtomicRequisitionHeading({
  reqId,
  clauseRef,
  query,
  level,
  reqIsApplicable,
}: {
  reqId: string
  clauseRef: string
  query: string
  level: number
  reqIsApplicable: boolean
}) {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="mr-4 text-lg font-bold">{clauseRef}</div>
        <div className="text-lg font-bold uppercase">{query}</div>
      </div>
    </div>
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
    <div className="border-box w-full rounded-md focus-within:border-x-2 focus-within:border-slate-300 focus-within:bg-slate-50">
      <div className="flex flex-col gap-y-4 px-4 pb-4 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          <SectionSpacer level={level} />
          <SectionIndicator clauseRef={clauseRef} />
          <SectionQuery query={query} />
        </div>
        <div className="lg:flex lg:w-1/2 lg:flex-row">
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
    "lg:w-[4px]": level === 1,
    "lg:w-[18px]": level === 2,
    "lg:w-[36px]": level === 3,
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

function SectionQuery({ query }: { query: string }) {
  return <div className="lg:w-9/12">{query}</div>
}

function SectionReply({ reply, reqId }: { reply?: string; reqId: string }) {
  return (
    <div className="lg:mr-6 lg:w-9/12">
      <ReplyForm reply={reply} reqId={reqId} />
    </div>
  )
}

function SectionOptions() {
  return (
    <div className="shrink-0 lg:w-[84px]">
      <div className="mt-3 flex flex-row space-x-4">
        <CheckCircle
          size={20}
          color="black"
          className="fill-teal-300 transition hover:cursor-pointer hover:fill-teal-100"
          strokeWidth={1.15}
        />
        <FileText
          size={20}
          color="black"
          strokeWidth={1.25}
          className="fill-teal-300 transition hover:cursor-pointer hover:fill-teal-100"
        />
        <Flag
          size={20}
          strokeWidth={1.75}
          className="fill-red-500 text-gray-900 transition hover:cursor-pointer hover:fill-red-100 dark:text-gray-300"
        />
      </div>
    </div>
  )
}
