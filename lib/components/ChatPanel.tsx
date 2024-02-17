import { useState } from "react"
import { type UseChatHelpers } from "ai/react"

import { ButtonScrollToBottom } from "@/lib/components/button-scroll-to-bottom"
// import { ChatShareDialog } from "@/components/chat-share-dialog"
import { ChatPromptForm } from "@/lib/components/ChatPromptForm"
import { IconRefresh, IconShare, IconStop } from "@/lib/components/ui/Icons"
import { Button } from "@/components/ui/button"

// import { shareChat } from "@/app/actions"

import { FooterText } from "./ChatFooter"

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string
  title?: string
}

export function ChatPanel({
  id,
  title,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  return (
    <div className="w-full pt-2 dark:border-white/20 md:w-[calc(100%-.5rem)] md:border-transparent md:pt-0 md:dark:border-transparent">
      <ButtonScrollToBottom />
      <div className="">
        <div className="flex h-12 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length >= 2 && (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => reload()}>
                  <IconRefresh className="mr-2" />
                  Regenerate response
                </Button>
                {id && title ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShareDialogOpen(true)}
                    >
                      <IconShare className="mr-2" />
                      Share
                    </Button>
                    {/* <ChatShareDialog
                      open={shareDialogOpen}
                      onOpenChange={setShareDialogOpen}
                      onCopy={() => setShareDialogOpen(false)}
                      shareChat={shareChat}
                      chat={{
                        id,
                        title,
                        messages,
                      }}
                    /> */}
                  </>
                ) : null}
              </div>
            )
          )}
        </div>
        <div className="w-[calc(100%-.5rem)] pt-2 dark:border-white/20 md:border-transparent md:pt-0 md:dark:border-transparent">
          <ChatPromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="mt-2 hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
