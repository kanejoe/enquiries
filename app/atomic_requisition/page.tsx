import { CheckCircle, FileText, Flag } from "lucide-react"

import { AtomicRequisitionProps } from "@/types/AtomicRequisition"
import { cn } from "@/lib/utils"

import { req, req0, req1 } from "./data"
import { DetailsCard } from "./detail_card"
import { DropdownMenuOpts } from "./DropdownOpts"
import { Footer } from "./Footer"
import { ReqHeadingDataTable } from "./heading-page"
import { IsApplicableSwitch } from "./IsApplicableSwitch"
import { ReplyForm } from "./ReplyForm"

/**
 *
 * @returns
 */
export default function AtomicRequisitionPage() {
  return (
    <section className="mt-4 lg:flex lg:gap-x-8">
      <div className="mt-8 hidden lg:block lg:w-1/5">
        <div className="flex flex-col gap-y-6">
          <DetailsCard />
          <ReqHeadingDataTable />
        </div>
      </div>
      <div className="lg:w-4/5">
        <div className="mt-6 flex flex-col rounded p-6 dark:bg-slate-950">
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
          <Footer />
        </div>
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
    <div className="mb-6 w-full">
      <div className="flex flex-col justify-between border-b border-dotted pb-2 lg:flex-row">
        <div className="mb-4 mt-1 basis-2/3">
          <div className="ml-0.5 inline-flex justify-center ">
            <div className="mr-4 text-lg font-bold">{clauseRef}</div>
            <div className="text-lg font-bold uppercase">{query}</div>
          </div>
        </div>
        <div className="flex basis-1/3 justify-between border-0">
          <div className="mr-2 flex place-content-end place-items-center pr-2">
            <IsApplicableSwitch />
          </div>
          <div className="flex place-items-center justify-center border-0">
            <DropdownMenuOpts />
          </div>
        </div>
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
    <div className="border-box w-full rounded-md opacity-100 transition focus-within:border-x-2 focus-within:border-slate-300 focus-within:bg-slate-50 dark:focus-within:bg-slate-800">
      <div className="flex flex-col gap-y-4 px-4 pb-4 pt-2 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
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

function SectionOptions() {
  return (
    <div className="shrink-0 lg:w-[96px]">
      <div className="mt-3 flex flex-row space-x-4">
        <CheckCircle
          size={28}
          // color="black"
          className="fill-teal-300 stroke-black transition hover:cursor-pointer hover:fill-white dark:fill-teal-800 dark:stroke-slate-100"
          strokeWidth={1.25}
        />
        <FileText
          size={28}
          color="black"
          strokeWidth={1.25}
          className="fill-teal-300 transition hover:cursor-pointer hover:fill-white dark:stroke-slate-800"
        />
        <Flag
          size={28}
          strokeWidth={1.75}
          className="fill-red-500 text-gray-900 transition hover:cursor-pointer hover:fill-red-100 dark:text-gray-300"
        />
      </div>
    </div>
  )
}
