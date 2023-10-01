"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"

import { Input } from "@/components/ui/input"

export function PropertiesSearchInput() {
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
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
