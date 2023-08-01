"use client"

import { CheckCircle, FileText, Flag } from "lucide-react"

import { cn } from "@/lib/utils"

import { DetailsCard } from "./detail_card"
import { DropdownMenuOpts } from "./DropdownOpts"
import { Footer } from "./Footer"
import { ReqHeadingDataTable } from "./heading-page"
import { IsApplicableSwitchForm } from "./IsApplicableSwitch"
import { ReplyForm } from "./ReplyForm"
import { AtomicReq, useAtomicReqStore } from "./reqStore"

/**
 *
 * @returns
 */
export default function AtomicRequisitionPage() {
  const requisitions = useAtomicReqStore((state) => state.requisitions)
  const headings = useAtomicReqStore((state) => state.headings)

  const headingReq = requisitions.find((req) => req.level === 0)
  const bodyReqs = requisitions.filter((req) => req.level !== 0)

  return (
    <section className="mt-4 lg:flex lg:gap-x-8">
      <div className="mt-8 hidden lg:block lg:w-1/5">
        <div className="flex flex-col gap-y-6">
          <DetailsCard />
          <ReqHeadingDataTable headings={headings} />
        </div>
      </div>
      <div className="lg:w-4/5">
        <div className="mt-6 flex flex-col rounded p-6 dark:bg-slate-950">
          <AtomicRequisitionHeading {...headingReq} />
          <SectionContainer
            bodyReqs={bodyReqs}
            isApplicable={headingReq.isApplicable}
          />
          <Footer />
        </div>
      </div>
    </section>
  )
}

interface AtomicRequisitionHeadingProps {
  headingReq: AtomicReq
}

function AtomicRequisitionHeading({ ...headingReq }) {
  return (
    <div className="mb-6 w-full group-disabled:opacity-10">
      <div className="flex flex-col justify-between border-b border-dotted pb-2 lg:flex-row">
        <div className="mb-4 mt-1 basis-3/5">
          <div className="ml-0.5 inline-flex justify-center ">
            <div className="mr-4 text-lg font-bold">{headingReq.clauseRef}</div>
            <div className="text-lg font-bold uppercase">
              {headingReq.query}
            </div>
          </div>
        </div>
        <div className="flex flex-initial justify-between lg:min-w-[360px]">
          <div className="mr-2 flex place-content-end place-items-center pr-2">
            <IsApplicableSwitchForm {...headingReq} />
          </div>
          <div className="flex flex-none place-items-center justify-center border-0">
            <DropdownMenuOpts />
          </div>
        </div>
      </div>
    </div>
  )
}

interface AtomicRequisitionProps {
  requisition: AtomicReq
}

function AtomicRequisition({ requisition }: AtomicRequisitionProps) {
  return (
    <div className="border-box w-full rounded-md opacity-100 transition focus-within:border focus-within:border-slate-200 focus-within:bg-slate-50 dark:focus-within:bg-slate-800">
      <div className="flex flex-col gap-y-4 px-4 pb-4 pt-2 lg:flex-row lg:items-start lg:gap-x-6 lg:gap-y-0 lg:p-4">
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          <SectionSpacer level={requisition.level} />
          <SectionIndicator clauseRef={requisition.clauseRef} />
          <SectionQuery query={requisition.query} />
        </div>
        <div className="lg:flex lg:w-1/2 lg:flex-row">
          {requisition.replyRequired ? (
            <>
              <SectionReply
                reply={requisition.reply}
                reqId={requisition.reqId}
              />
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

function SectionContainer({
  bodyReqs,
  isApplicable,
}: {
  bodyReqs: AtomicRequisitionProps[]
  isApplicable: boolean
}) {
  const fieldsetCSS = cn(
    "group transition delay-200",
    { "opacity-100": isApplicable },
    { "opacity-50 bg-slate-50": !isApplicable }
  )
  return (
    <section className="">
      <fieldset className={fieldsetCSS} disabled={!isApplicable}>
        {bodyReqs.map((requisition) => {
          return <AtomicRequisition requisition={requisition} />
        })}
      </fieldset>
    </section>
  )
}
