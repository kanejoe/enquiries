"use client"

import { FC } from "react"

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { Button } from "@/components/ui/button"

import { CopyIcon, PasteIcon } from "./chat-bubble-icons"

interface ChatCopyButtonProps {
  copyText: string
}

const ChatCopyButton: FC<ChatCopyButtonProps> = ({ copyText }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000,
  })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(copyText)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs transition-opacity hover:bg-zinc-200 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
      onClick={onCopy}
    >
      {isCopied ? <PasteIcon /> : <CopyIcon />}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}

export { ChatCopyButton }
