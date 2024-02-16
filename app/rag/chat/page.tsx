import { Chat } from "@/lib/components/Chat"
import { ChatV0 } from "@/lib/components/ChatV0"
import { nanoid } from "@/lib/utils"

export default function IndexPage() {
  const id = nanoid()

  return <Chat id={id} />
  // return <ChatV0 />
}
