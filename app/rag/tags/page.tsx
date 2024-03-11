"use client"

import { useChats } from "@/lib/hooks/use-chats"
import { useDocumentsWithTags, useTags } from "@/lib/hooks/use-tags"
import {
  filterOutFoundTags,
  findRecordsByTagName,
} from "@/lib/searchArrayOfTags"
import { splitStringBySemicolon } from "@/lib/utils"

import { ChatHistoryDialog } from "@/components/chat/chat-history-dialog"
import { BadgeCombobox } from "./BadgeCombobox"
import { BadgeIcon } from "./BadgeIcon"
import { ChatDropDown } from "./chat-dropdown"
import { ExistingTags } from "./ExistingTags"
import { PotentialTag } from "./PotentialTag"
import { TagForm } from "./TagForm"
import { MultiSelectForm } from "./TagMultiSelect"

const data =
  "land registration; vesting certificate; ground rents; Landlord and Tenant (Ground Rents) (No 2) Act 1978; Registration of Title Act 1964; leasehold interest; fee simple acquisition; arbitration vesting certificate; consent vesting certificate; compulsory first registration; merger of interests in property law; mortgages on leasehold interests;covenants in property law;Registration of Deeds and Title Act 2006;adverse possession;property conveyancing;Land and Conveyancing Law Reform Act 2009;estate planning;Ireland property law"

const split = splitStringBySemicolon(data)
// console.log("🚀 ~ split:", split)

const Page = () => {
  const { data: tags } = useTags()
  const { data: dtags } = useDocumentsWithTags()
  const { data: chats, isLoading } = useChats()

  if (!tags) return <div>Loading...</div>
  const existingTags = findRecordsByTagName(split, tags)
  const potentialTags = filterOutFoundTags(split, tags)

  return (
    <div className="container mt-4 flex flex-col gap-y-12">
      <h1 className="font-geistsans text-xl font-semibold">Tags</h1>

      <ChatDropDown chats={chats ?? []} isLoading={isLoading} />
      <ChatHistoryDialog chats={chats ?? []} />

      <div className="">
        {existingTags.length > 0 && (
          <div className="flex flex-col gap-y-4">
            <h2 className="font-geistsans text-lg font-semibold">
              Existing Tags
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {existingTags?.map((tag) => (
                <div key={tag.id} className="flex justify-between">
                  <ExistingTags tag={tag} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="">
        {potentialTags.length > 0 && (
          <div className="flex flex-col gap-y-4">
            <h2 className="font-geistsans text-lg font-semibold">
              Potential Tags
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-4">
              {potentialTags?.map((tag) => {
                let uuid = self.crypto.randomUUID()
                return (
                  <div key={uuid} className="flex justify-between">
                    <PotentialTag tag_name={tag} documentId={2} />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
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
