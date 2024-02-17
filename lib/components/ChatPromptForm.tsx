import { ChangeEvent, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { UseChatHelpers } from "ai/react"
import { ArrowBigUp, ArrowUpWideNarrow } from "lucide-react"

// import Textarea from "react-textarea-autosize"

import {
  IconArrowElbow,
  IconChevronUpDown,
  IconPlus,
} from "@/lib/components/ui/Icons"
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ChatPromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: string) => void
  isLoading: boolean
}

export function ChatPromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: ChatPromptProps) {
  return (
    <form className="xl:ma mx-auto flex flex-row gap-3 lg:max-w-2xl">
      <div className="relative flex h-full flex-1 items-stretch md:flex-col">
        <div className="flex w-full items-center">
          <div className="w-full rounded-xl [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]">
            <Textarea
              placeholder="Ask a Question."
              className="resize-none rounded-xl pl-10 pr-10 font-albertsans placeholder-black/50 focus:ring-0 focus-visible:ring-0"
              spellCheck={false}
            />
            <Button
              className="absolute bottom-2.5 right-2"
              variant={"secondary"}
              size={"xs"}
              data-testid="send-button"
            >
              <ArrowBigUp className="fill-white text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
