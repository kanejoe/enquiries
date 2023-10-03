"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { trim } from "string-ts"

import { Input } from "@/components/ui/input"

import { Spinner } from "./_components/Spinner"

export function PropertiesSearchInput({
  search,
  currentSearchParams,
}: {
  search?: string
  currentSearchParams: URLSearchParams
}) {
  const router = useRouter()

  // local state for debouncing
  const [searchValue, setSearchValue] = useState(search || "")
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>() // for debouncing

  // useTransition for spinner
  const [isPending, startTransition] = useTransition()
  const isSearching = isPending || timeOutId

  const newSearchParams = new URLSearchParams(currentSearchParams)

  useEffect(() => {
    setSearchValue(search || "")
  }, [search])

  return (
    <div className="w-80">
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <Input
          type="text"
          name="search"
          autoComplete="off"
          id="propertysearch"
          className="block w-full rounded-md border-gray-300 pl-10 text-sm focus:ring-primary focus-visible:ring-primary "
          placeholder="Search by Client or Property..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            clearTimeout(timeOutId)
            const id = setTimeout(() => {
              startTransition(() => {
                if (trim(e.target.value) === "") {
                  newSearchParams.delete("search")
                  router.push(`/properties?${newSearchParams}`)
                } else {
                  newSearchParams.set("search", e.target.value)
                  router.push(`/properties?${newSearchParams}`)
                }
                setTimeOutId(undefined)
              })
            }, 500)
            setTimeOutId(id)
          }}
        />
        {search && (
          <span
            onClick={(e) => {
              startTransition(() => {
                newSearchParams.delete("search")
                router.push(`/properties?${newSearchParams}`)
              })
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        )}
        {isSearching && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
            <Spinner
              className="h-5 w-5 animate-spin text-gray-600"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  )
}
