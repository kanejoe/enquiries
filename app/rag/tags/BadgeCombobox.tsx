import { FC, useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { useTags } from "@/lib/hooks/useTags"
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

interface BadgeComboboxProps {}

const BadgeCombobox: FC<BadgeComboboxProps> = (props) => {
  const { data: tags } = useTags()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const tagsList = tags?.map((tag) => {
    return { label: tag.tag_name, value: tag.id.toString() }
  })

  if (!tagsList) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[260px] justify-between"
        >
          {value
            ? tagsList.find((tag) => tag.value === value)?.label
            : "Select tag..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." className="h-9" />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            {tagsList.map((tag) => (
              <CommandItem
                key={tag.value}
                value={tag.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {tag.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === tag.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { BadgeCombobox }
