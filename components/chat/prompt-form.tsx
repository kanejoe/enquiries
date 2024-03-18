import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { UseChatHelpers } from "ai/react"
import Textarea from "react-textarea-autosize"

import { useEnterSubmit } from "@/lib/hooks/use-enter-submit"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconArrowElbow, IconPlus } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput("")
        onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  router.refresh()
                  router.push("/rag/chat")
                }}
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "absolute left-0 top-4 size-8 rounded-full bg-background p-0 sm:left-4"
                )}
              >
                <IconPlus />
                <span className="sr-only">New Chat</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question."
          spellCheck={false}
          className="flex max-h-[28em] min-h-[60px] resize-none px-4 py-[1.3rem] text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="xs"
                  disabled={isLoading || input === ""}
                >
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  )
}
