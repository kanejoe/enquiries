import Link from "next/link"

import { Button } from "@/components/ui/button"

export function NextPage({
  page,
  totalPages,
  currentSearchParams,
}: {
  page: number
  totalPages: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.set("page", `${page + 1}`)

  return page < totalPages ? (
    <Link
      href={`/properties?${newSearchParams}`}
      className=" inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Next
    </Link>
  ) : (
    <Button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Next
    </Button>
  )
}

export function PreviousPage({
  page,
  currentSearchParams,
}: {
  page: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`)
  } else {
    newSearchParams.delete("page")
  }

  return page > 1 ? (
    <Link
      href={`/properties?${newSearchParams}`}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
    >
      Previous
    </Link>
  ) : (
    <Button
      disabled
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 opacity-50"
    >
      Previous
    </Button>
  )
}
