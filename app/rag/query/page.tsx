import { nanoid } from "@/lib/utils"

import { Chat } from "./chat"

export default function IndexPage() {
  const id = nanoid()

  return <Chat id={id} />
}
