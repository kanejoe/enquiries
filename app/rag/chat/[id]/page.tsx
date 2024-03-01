import { Suspense } from "react"
import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { type Message } from "ai"

import { getChatQueryByMessageId } from "@/lib/supabase-funcs/supabase.server"
import { ChatHistory } from "@/components/chat/chat-history"
import { Chat } from "@/components/chat/chat-intro"
import { Spinner } from "@/components/Spinner"

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const chat = await getChatQueryByMessageId(params.id)
  return {
    title: chat?.title ?? "Chat",
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await getChatQueryByMessageId(params.id)
  // console.log("🚀 ~ ChatPage ~ chat:", chat)

  if (!chat) {
    notFound()
  }

  const messages = chat.messages as unknown as Message[] // Direct type assertion

  return (
    <Suspense fallback={<Loading />}>
      <Chat
        id={chat.message_id}
        initialMessages={messages}
        title={chat.title}
      />
      {/* <ChatHistory /> */}
    </Suspense>
  )
}

function Loading() {
  return (
    <div className="mt-16 flex h-full grow items-center justify-center">
      <Spinner className="w-8 animate-spin" />
    </div>
  )
}
