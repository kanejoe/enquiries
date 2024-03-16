import { ElementType } from "react"

import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon"
import { CheckIcon } from "@/components/icons/CheckIcon"
import { ClipboardIcon } from "@/components/icons/ClipboardIcon"
import { MagnifyingGlassIcon } from "@/components/icons/MagnifyingGlassIcon"
import { UserIcon } from "@/components/icons/UserIcon"

type IconContainerProps = {
  IconComponent: ElementType // Defines a prop that can take any React component
  size?: string
  iconSize?: string
}

function IconContainer({
  IconComponent,
  size = "6",
  iconSize = "4",
  ...props
}: IconContainerProps) {
  return (
    <div
      className={`dark:bg-white/7.5 flex size-${size} items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400`}
      {...props}
    >
      <IconComponent
        className={`size-${iconSize} fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400`}
      />
    </div>
  )
}

export function ChatUserIcon() {
  return <IconContainer IconComponent={UserIcon} size="10" iconSize="6" />
}

export function ChatAiIcon() {
  return <IconContainer IconComponent={ChatBubbleIcon} size="10" iconSize="6" />
}

export function SourceIcon() {
  return <IconContainer IconComponent={MagnifyingGlassIcon} />
}

export function CopyIcon() {
  return <IconContainer IconComponent={ClipboardIcon} size="6" iconSize="4" />
}

export function PasteIcon() {
  return <IconContainer IconComponent={CheckIcon} size="8" iconSize="6" />
}
