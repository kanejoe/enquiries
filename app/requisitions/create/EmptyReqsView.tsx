import { PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export function EmptyReqsView() {
  return (
    <div className="flex h-[calc(100vh-16rem)] flex-col">
      <div className="flex  h-full items-center justify-center text-gray-500">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-base font-semibold text-gray-900">
            No Queries
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new requisition or query.
          </p>
          <div className="mt-6">
            <Button
              variant="default"
              className="will-change-transform active:translate-y-1"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add New Query
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
