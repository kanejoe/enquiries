"use client"

import { useTags } from "@/lib/hooks/useTags"
import { findRecordsByTagName } from "@/lib/searchArrayOfTags"
import { splitStringBySemicolon } from "@/lib/utils"

import { BadgeCombobox } from "./BadgeCombobox"
import { BadgeIcon } from "./BadgeIcon"
import { TagForm } from "./TagForm"
import { MultiSelectForm } from "./TagMultiSelect"

const data =
  "land registration; vesting certificate; ground rents; Landlord and Tenant (Ground Rents) (No 2) Act 1978; Registration of Title Act 1964; leasehold interest; fee simple acquisition; arbitration vesting certificate; consent vesting certificate; compulsory first registration; merger of interests in property law; mortgages on leasehold interests;covenants in property law;Registration of Deeds and Title Act 2006;adverse possession;property conveyancing;Land and Conveyancing Law Reform Act 2009;estate planning;Ireland property law"

const split = splitStringBySemicolon(data)
// console.log("🚀 ~ split:", split)

const Page = () => {
  const { data: tags } = useTags()
  //   console.log("🚀 ~ Page ~ tags:", tags)
  if (!tags) return <div>Loading...</div>
  const dd = findRecordsByTagName(split, tags)
  console.log("🚀 ~ Page ~ dd:", dd)

  return (
    <div className="container mt-4 flex flex-col gap-y-12">
      <h1 className="font-geistsans text-xl font-semibold">Tags</h1>
      <div className="max-w-64">
        <TagForm />
      </div>
      <div className="flex flex-col gap-y-8">
        <h2 className="font-geistsans text-lg font-semibold">Tags</h2>
        <div className="grid grid-cols-1 gap-2">
          {tags?.map((tag) => (
            <div key={tag.id} className="flex justify-between">
              <BadgeIcon tag={tag} />
            </div>
          ))}
        </div>
        <div className="">
          <BadgeCombobox />
        </div>
        <div className="w-[720px]">
          <MultiSelectForm />
        </div>
      </div>
    </div>
  )
}

export default Page
