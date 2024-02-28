"use client"

import { nanoid } from "@/lib/utils"

import { Chat } from "./[id]/chat"

export default function IndexPage() {
  const id = nanoid()

  return (
    <div className="">
      <Chat id={id} />
    </div>
  )
}
