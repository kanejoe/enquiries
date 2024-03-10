"use client"

import * as React from "react"
import { SetStateAction, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ReaderIcon } from "@radix-ui/react-icons"
import Fuse from "fuse.js"
import { Check, ChevronsUpDown } from "lucide-react"

import { TChatQueries } from "@/lib/hooks/use-chats"
import { cn, sortByCreatedAtDescending } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ChatDropDownProps {
  chats: TChatQueries[]
  isLoading: boolean
  width?: string
}

const searchOptions = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ["title"],
}

export function ChatDropDown({
  chats,
  isLoading,
  width = "520px",
}: ChatDropDownProps) {
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

  const wwidth = `w-[${width}]`

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[520px] justify-between"
            //   className={cn("justify-between", wwidth)}
          >
            <span className="line-clamp-1">
              {value
                ? chats.find((chat) => chat.id.toString() === value)?.title
                : "Select from Chat History..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[520px] p-0"
          // className={cn("p-0", wwidth)}
          id="popover-content"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search chat history..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandGroup className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 scrollbar-corner-slate-700">
              {displayChats.map((chat) => (
                <CommandItem
                  key={chat.id}
                  value={chat.id.toString()}
                  onSelect={() =>
                    onSelect(chat.id.toString(), chat.message_id.toString())
                  }
                >
                  {/* <Check
                  className={cn(
                    "mr-3 size-5",
                    value === chat.id.toString() ? "opacity-100" : "opacity-0"
                  )}
                /> */}
                  <ReaderIcon
                    className={cn(
                      "mr-3 size-4 text-slate-700",
                      value === chat.id.toString()
                        ? "opacity-100"
                        : "opacity-100"
                    )}
                  />
                  <span className="line-clamp-1 w-full font-geistsans text-sm text-gray-700">
                    {chat.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
