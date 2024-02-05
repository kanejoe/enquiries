"use client"

import { useTags } from "@/lib/hooks/useTags"

import { BadgeIcon } from "./BadgeIcon"
import { TagForm } from "./TagForm"

const Page = () => {
  const { data: tags } = useTags()
  //   console.log("🚀 ~ Page ~ tags:", tags)

  return (
    <div className="container mt-4 flex flex-col gap-y-12">
      <h1 className="font-geistsans text-xl font-semibold">Tags</h1>
      <div className="max-w-64">
        <TagForm />
      </div>
      <div className="">
        <h2 className="font-geistsans text-lg font-semibold">Tags</h2>
        <div className="grid grid-cols-1 gap-2">
          {tags?.map((tag) => (
            <div key={tag.id} className="flex justify-between">
              <BadgeIcon tag={tag} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
