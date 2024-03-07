"use client"

import * as React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { TChatQueries } from "@/lib/hooks/use-chats"
import { cn } from "@/lib/utils"
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
}

export function ChatDropDown({ chats }: ChatDropDownProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  //   console.log("🚀 ~ ChatDropDown ~ value:", value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[600px] justify-between"
        >
          {value
            ? chats.find((chat) => chat.id.toString() === value)?.title
            : "Select from Chat History..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-0" id="popover-content">
        <Command>
          <CommandInput placeholder="Search chat history..." />
          <CommandGroup className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 scrollbar-corner-slate-700">
            {chats.sort(sortByCreatedAtDescending).map((chat) => (
              <CommandItem
                key={chat.id}
                value={chat.id.toString()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === chat.id.toString() ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="font-geistsans text-xs">{chat.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function sortByCreatedAtDescending(a: TChatQueries, b: TChatQueries) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}
