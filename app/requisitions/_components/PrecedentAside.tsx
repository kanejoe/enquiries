"use client"

import { FC, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons"

// Define a type for the option items
type Option = {
  label: string
  value: string
}

interface PrecedentAsideProps {
  currentSearchParams: URLSearchParams
}

export const PrecedentAside: FC<PrecedentAsideProps> = ({
  currentSearchParams,
}) => {
  const router = useRouter()

  const options: Option[] = [
    { label: "All Templates", value: "all" },
    { label: "Active Only", value: "active" },
  ]

  const newSearchParams = new URLSearchParams(currentSearchParams)
  const currentActiveLink = newSearchParams.get("filter") ?? "all"

  const handleClick = (value: string) => (e: MouseEvent<HTMLLIElement>) => {
    if (e) e.preventDefault()
    newSearchParams.set("filter", value)
    if (value === "all") newSearchParams.delete("filter")
    router.push(`/requisitions?${newSearchParams}`)
  }

  return (
    <div className="">
      <h3 className="mb-4 ml-2 flex justify-evenly rounded-lg bg-gray-50  p-2">
        <CaretDownIcon className="mt-1" />
        <div className="text-base font-semibold">Filter Options</div>
      </h3>

      <ul className="font-sansserif ml-2 flex flex-col gap-y-4 border-l">
        {options.map((option: Option, index) => {
          return (
            <li
              onClick={handleClick(option.value)}
              key={index}
              className={`group flex justify-between rounded-r-lg  py-2 pl-2 transition duration-500 hover:cursor-pointer hover:bg-gray-50 hover:font-semibold ${
                currentActiveLink === option.value
                  ? "border-l-4 border-primary bg-gray-50 font-semibold"
                  : "border-transparent text-gray-500"
              }`}
            >
              <div className="">{option.label}</div>
              <div
                className={`${
                  currentActiveLink === option.value ? "visible" : "invisible"
                }`}
              >
                <CaretRightIcon className="mt-1 h-4 w-4" />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
