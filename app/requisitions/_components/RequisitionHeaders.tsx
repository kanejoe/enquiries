"use client"

import { usePathname } from "next/navigation"

const requisitions = [
  { id: 1, heading: "1", query: "Premises" },
  { id: 2, heading: "2", query: "Easements and Services" },
  { id: 31, heading: "22", query: "Wannabe parliamentarians are" },
]

interface Requisition {
  id: number
  heading: string
  query: string
}

interface Props {
  requisitions?: Requisition[]
}

const RequisitionList: React.FC<Props> = (/*{ requisitions }*/) => {
  const pathname = usePathname()

  return (
    <div className="sticky top-[var(--gap-to-top)]">
      <div className="h-[calc(100vh-8rem)] rounded-xl bg-gray-50 px-4 py-6">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Headings
        </div>
        <ul role="list">
          {requisitions.map((req, index) => (
            <li key={req.id} className="group mb-0.5" title={req.query}>
              {req.id === 2 ? (
                // pathname === "/requisitions/create"
                <ActiveRoute req={req} />
              ) : (
                <DefaultRoute req={req} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RequisitionList

function DefaultRoute({ req }: { req: any }) {
  return (
    <div className="flex flex-row space-x-4 rounded-lg bg-transparent p-2 text-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm">
        <span className="text-sm font-semibold tabular-nums">
          {req.heading}
        </span>
      </div>
      <div className="mt-1.5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-1 font-semibold text-gray-500 transition group-hover:cursor-pointer group-hover:text-gray-700">
        {req.query}
      </div>
      <div className="relative w-1 opacity-0 group-hover:opacity-100">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="motion-safe:group-hover:animate-moveLeftAndRight absolute bottom-2.5 right-0.5 text-gray-500"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  )
}

function ActiveRoute({ req }: { req: any }) {
  return (
    <div className="mb-2 ml-1 flex flex-row space-x-4 rounded-lg bg-white p-2 text-sm shadow">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-secondary-foreground">
        <span className="text-sm font-semibold tabular-nums">
          {req.heading}
        </span>
      </div>
      <div className="mt-0.5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pl-1 pr-1 font-semibold">
        {req.query}
      </div>
      <div className="relative w-1">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-1.5 right-0.5"
        >
          <path
            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  )
}
