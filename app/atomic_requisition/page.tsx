import { CheckCircle, FileText, Flag } from "lucide-react"

import { ReplyForm } from "./reply_form"

export default function AtomicRequisitionPage() {
  return (
    <section className="mt-16">
      <h1 className="text-xl font-semibold">Atomic Requisition</h1>
      <div className="mt-6 rounded p-6">
        {/* <Table /> */}
        <AtomicReq />
      </div>
    </section>
  )
}

function Table() {
  return (
    <div className="w-full border border-gray-100">
      <div className="flex flex-col lg:flex-row space-x-1 items-stretch">
        <div className="lg:w-1/2 flex-grow border-r border-gray-200 border-dashed">
          <div className="flex flex-row ">
            <div className="w-1/12 p-4 font-semibold">(i)</div>
            <div className="w-11/12 p-4">
              if so, state whether by Irish Water mains, on-site domestic septic
              tank or other on-site domestic waste water treatment system, or
              other
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 flex-grow border-l border-gray-200 border-dashed">
          <div className="flex flex-row">
            <div className="hidden lg:block 2xl:w-2/12 p-4 w-3/12 font-semibold">
              2.1.a.(i)
            </div>
            <div className="2xl:w-7/12 p-4 w-9/12">
              <div className="flex flex-col">
                <ReplyForm />
                <div className="2xl:hidden">
                  <SectionOptions />
                </div>
              </div>
            </div>
            <div className="2xl:w-3/12 p-4 hidden 2xl:block">
              <SectionOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionOptions() {
  return (
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
  )
}

function AtomicReq() {
  return (
    <div className="w-full border border-gray-100 p-4">
      <div className="flex flex-col space-y-4">
        <SectionIndicatorLong clauseRef="2.1.(a)" />
        <SectionQuery query='if so, state whether by Irish Water mains, on-site domestic septic tank or other on-site domestic waste water treatment system, or other' />
        <ReplyForm />
        <SectionOptions />
      </div>
    </div>
  )
}

function SectionIndicatorLong({ clauseRef }: { clauseRef: string }) {
  return (
    <div className="font-semibold">
      {clauseRef}
    </div>
  )
}

function SectionIndicatorShort({ clauseRef }: { clauseRef: string }) {
  return (
    <div className="font-semibold">
      {clauseRef}
    </div>
  )
}

function SectionQuery({ query }: { query: string }) {
  return (
    <div className="">{query}</div>
  )
}