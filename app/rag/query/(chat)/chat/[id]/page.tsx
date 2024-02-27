import { Chat } from "./chat"

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  //   return <Chat id={chat.id} initialMessages={chat.messages} />
  return <div className="">chat with id param</div>
}
