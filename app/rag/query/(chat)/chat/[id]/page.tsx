import { Suspense } from "react"
import { notFound, redirect } from "next/navigation"
import { type Message } from "ai"

import { getChatQueryByMessageId } from "@/lib/supabase-funcs/supabase.server"
import { Spinner } from "@/components/Spinner"

import { Chat } from "./chat"

export interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await getChatQueryByMessageId(params.id)

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
