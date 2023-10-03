import Link from "next/link"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"

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
    <Button asChild variant="outline" className="h-8 w-8 p-0">
      <Link href={`/properties?${newSearchParams}`}>
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button disabled variant="outline" className="h-8 w-8 p-0">
      <span className="sr-only">Go to next page</span>
      <ChevronRightIcon className="h-4 w-4" />
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
    <Button asChild variant="outline" className="h-8 w-8 p-0">
      <Link href={`/properties?${newSearchParams}`}>
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button disabled variant="outline" className="h-8 w-8 p-0">
      <span className="sr-only">Go to previous page</span>
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
  )
}

export function LastPage({
  page,
  totalPages,
  currentSearchParams,
}: {
  page: number
  totalPages: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.set("page", `${totalPages}`)

  return page < totalPages ? (
    <Button asChild variant="outline" className="h-8 w-8 p-0">
      <Link href={`/properties?${newSearchParams}`}>
        <span className="sr-only">Go to next page</span>
        <DoubleArrowRightIcon className="h-4 w-4" />
      </Link>
    </Button>
  ) : (
    <Button disabled variant="outline" className="h-8 w-8 p-0">
      <span className="sr-only">Go to last page</span>
      <DoubleArrowRightIcon className="h-4 w-4" />
    </Button>
  )
}

export function FirstPage({
  page,
  currentSearchParams,
}: {
  page: number
  currentSearchParams: URLSearchParams
}) {
  const newSearchParams = new URLSearchParams(currentSearchParams)
  newSearchParams.delete("page")

  return page > 1 ? (
    <Button asChild variant="outline" className="h-8 w-8 p-0">
      <Link href={`/properties?${newSearchParams}`}>
        <span className="sr-only">Go to first page</span>
        <DoubleArrowLeftIcon className="h-4 w-4" />{" "}
      </Link>
    </Button>
  ) : (
    <Button disabled variant="outline" className="h-8 w-8 p-0">
      <span className="sr-only">Go to first page</span>
      <DoubleArrowLeftIcon className="h-4 w-4" />{" "}
    </Button>
  )
}
