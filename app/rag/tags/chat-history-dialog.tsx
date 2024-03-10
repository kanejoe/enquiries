"use client"

import { SetStateAction, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
import Fuse from "fuse.js"
import { Check, ChevronsUpDown } from "lucide-react"

import { TChatQueries } from "@/lib/hooks/use-chats"
import { cn, sortByCreatedAtDescending } from "@/lib/utils"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface ChatHistoryDialogProps {
  chats: TChatQueries[]
}

const searchOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["title"],
}

export function ChatHistoryDialog({ chats }: ChatHistoryDialogProps) {
  const fuse = new Fuse(chats, searchOptions)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")

  const searchResult = fuse.search(search).map((result) => result.item)

  const onSelect = useCallback(
    (chatId: SetStateAction<string>, message_id: string) => {
      setValue(chatId)
      setOpen(false)
      //   router.push(`/rag/chat/${message_id}`) // Navigate to the chat page
    },
    [router]
  ) // Include router in the dependency array

  const sortedChats = useCallback(
    () => chats.sort(sortByCreatedAtDescending),
    [chats]
  )

  const displayChats = search.trim() ? searchResult : sortedChats()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p
        className="font-geist flex w-64 cursor-pointer justify-between rounded-md border bg-muted py-0.5 pl-1 text-sm text-slate-600 hover:text-sky-600 hover:underline"
        onClick={() => setOpen((open) => !open)}
      >
        Search Chat History{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CtrlK</span>
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search chat history..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            heading="Suggestions"
            // className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 scrollbar-corner-slate-700"
          >
            {displayChats.map((chat) => (
              <CommandItem
                key={chat.id}
                value={chat.id.toString()}
                onSelect={() =>
                  onSelect(chat.id.toString(), chat.message_id.toString())
                }
              >
                <ReaderIcon
                  className={cn(
                    "mr-3 size-4 text-slate-700",
                    value === chat.id.toString() ? "opacity-100" : "opacity-100"
                  )}
                />
                <span className="line-clamp-1 w-full font-geistsans text-sm text-gray-700">
                  {chat.title}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
