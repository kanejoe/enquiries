import { useState } from "react"
import { type UseChatHelpers } from "ai/react"

import { Button } from "@/components/ui/button"
import { IconRefresh, IconShare, IconStop } from "@/components/ui/icons"
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom"
import { Spinner } from "@/components/Spinner"

import { FooterText } from "./footer-text"
// import { ChatShareDialog } from "@/components/chat-share-dialog"
import { PromptForm } from "./prompt-form"

// import { shareChat } from "@/app/actions"

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
    <div className="fixed inset-x-0 bottom-0.5 w-full duration-300 ease-in-out animate-in">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-12 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-primary text-primary-foreground"
            >
              <IconStop className="mr-2" />
              Stop generating
              <Spinner className="ml-2 size-4" />
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
        <div className="space-y-4 border-t bg-background bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] px-4 py-2 shadow-lg [&:has(:focus-visible)]:shadow-[#D7EDEA]">
          <PromptForm
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
          <FooterText className="" />
        </div>
      </div>
    </div>
  )
}
