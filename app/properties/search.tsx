"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

import { Input } from "@/components/ui/input"

import { Spinner } from "./_components/Spinner"

export function PropertiesSearchInput({ search }: { search?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

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
          id="propertysearch"
          className="block w-full rounded-md border-gray-300 pl-10 text-sm focus:ring-primary focus-visible:ring-primary"
          placeholder="Search..."
          defaultValue={search}
          onChange={(e) => {
            startTransition(() => {
              if (e.target.value === "") {
                router.push(`/properties`)
              } else {
                router.push(`/properties?search=${e.target.value}`)
              }
            })
          }}
        />
        {search && (
          <span
            onClick={(e) => {
              startTransition(() => {
                router.push(`/properties`)
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
        {isPending && (
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
