"use client"

import { FC } from "react"
import { usePathname, useRouter } from "next/navigation"

import { type EnhancedRequisition } from "@/types/RequisitionType"

type PartialReq = Pick<
  EnhancedRequisition,
  "id" | "sequence" | "query" | "is_applicable"
>

interface RequisitionHeadingListProps {
  headerNodes: PartialReq[]
  headingId?: EnhancedRequisition["id"]
}

export const RequisitionHeadingList: FC<RequisitionHeadingListProps> = ({
  headerNodes,
  headingId,
}) => {
  return (
    <div className="h-full bg-gray-50 px-4 py-4">
      <ul role="list">
        {headerNodes.map((req, index) => (
          <li key={req.id} className="group mb-0.5" title={req.query ?? ""}>
            {req.id === headingId ? (
              <ActiveRoute req={req} />
            ) : (
              <InactiveRoute req={req} />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function InactiveRoute({ req }: { req: PartialReq }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    // Use the `push` method with the desired URL and search parameter
    router.push(`${pathname}?h=${req.id}`)
  }

  return (
    <div
      className="flex flex-row space-x-4 rounded-lg bg-transparent p-2 text-sm"
      onClick={handleClick}
    >
      <div className="ml- flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm">
        <span className="text-sm font-semibold tabular-nums">
          {req.sequence}
        </span>
      </div>
      <div className="mt-1.5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-1 text-gray-500 transition group-hover:cursor-pointer group-hover:text-gray-700">
        {req.query}
      </div>
      <div className="relative w-1 opacity-0 group-hover:opacity-100">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-2.5 right-0.5 text-gray-500 motion-safe:group-hover:animate-moveLeftAndRight"
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

function ActiveRoute({ req }: { req: PartialReq }) {
  return (
    <div className="mb-2 ml-1 flex flex-row space-x-4 rounded-lg bg-white p-2 text-sm shadow">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-secondary-foreground">
        <span className="text-sm font-semibold tabular-nums">
          {req.sequence}
        </span>
      </div>
      <div className="mt-1.5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pl-1 pr-1 font-semibold">
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
