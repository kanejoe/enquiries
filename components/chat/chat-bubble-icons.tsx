"use client"

import { ElementType, FC, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { BoltIcon } from "@/components/icons/BoltIcon"
import { ChatBubbleIcon } from "@/components/icons/ChatBubbleIcon"
import { CheckIcon } from "@/components/icons/CheckIcon"
import { ClipboardIcon } from "@/components/icons/ClipboardIcon"
import { MagnifyingGlassIcon } from "@/components/icons/MagnifyingGlassIcon"
import { UserIcon } from "@/components/icons/UserIcon"

const iconContainerVariants = cva("", {
  variants: {
    size: {
      default: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10",
    },
    icon: {
      default: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
  // defaultVariants: {
  //   size: "lg",
  //   icon: "default",
  // },
})

interface IconContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {
  IconComponent: ElementType // Defines a prop that can take any React component
}

const IconContainer: FC<IconContainerProps> = ({
  IconComponent,
  size,
  icon,
  ...props
}) => {
  return (
    <div
      className={cn(
        "dark:bg-white/7.5 flex items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400",
        iconContainerVariants({ size })
      )}
      {...props}
    >
      <IconComponent
        className={cn(
          "dark:group-hover:stroke-emerald-400` fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10",
          iconContainerVariants({ icon })
        )}
      />
    </div>
  )
}

export function ChatHeaderIcon() {
  return <IconContainer IconComponent={BoltIcon} size="lg" icon="lg" />
}
export function ChatUserIcon() {
  return <IconContainer IconComponent={UserIcon} size="lg" icon="lg" />
}

export function ChatAiIcon() {
  return (
    <IconContainer IconComponent={ChatBubbleIcon} size={"lg"} icon={"lg"} />
  )
}

export function SourceIcon() {
  return (
    <IconContainer
      IconComponent={MagnifyingGlassIcon}
      size={"default"}
      icon={"default"}
    />
  )
}

export function CopyIcon() {
  return (
    <IconContainer
      IconComponent={ClipboardIcon}
      size={"default"}
      icon={"default"}
    />
  )
}

export function PasteIcon() {
  return (
    <IconContainer
      IconComponent={CheckIcon}
      size={"default"}
      icon={"default"}
    />
  )
}
