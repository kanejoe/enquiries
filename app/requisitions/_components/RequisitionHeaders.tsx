import React from "react"

const requisitions = [
  { id: 1, heading: "1", query: "Query Premises" },
  { id: 2, heading: "2", query: "Query Services" },
  { id: 31, heading: "99", query: "wannabe parliamentarians are" },
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
  return (
    <div className="sticky top-[var(--gap-to-top)]">
      <div className="h-[calc(100vh-8rem)] rounded-xl bg-gray-50 px-4 py-6">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Headings
        </div>
        <ul>
          {requisitions.map((req, index) => (
            <li
              key={req.id}
              className={`flex flex-row space-x-4 rounded bg-white p-2 text-sm ${
                index !== 0 && index !== requisitions.length - 1 ? "my-4" : ""
              }`}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white">
                <span className="text-sm font-semibold tabular-nums">
                  {req.heading}
                </span>
              </div>
              <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-1 font-semibold">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RequisitionList
