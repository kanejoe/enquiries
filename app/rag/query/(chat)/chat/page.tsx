import { nanoid } from "@/lib/utils"

import { Chat } from "./[id]/chat"

export default function IndexPage() {
  const id = nanoid()

  return <Chat id={id} />
}
