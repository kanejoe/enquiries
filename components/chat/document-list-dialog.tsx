"use client"

import { SetStateAction, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ReaderIcon } from "@radix-ui/react-icons"
import Fuse from "fuse.js"

import { TDocuments } from "@/lib/types/TableTypes"
import { cn, sortByCreatedAtDescending } from "@/lib/utils"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface DocumentHistoryDialogProps {
  documents: TDocuments[]
}

const searchOptions = {
  includeScore: true,
  // Search in `name`
  keys: ["name"],
  threshold: 0.6,
  distance: 120,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: true,
}

export function DocumentListDialog({ documents }: DocumentHistoryDialogProps) {
  const fuse = new Fuse(documents, searchOptions)
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [search, setSearch] = useState("")

  const searchResult = fuse.search(search).map((result) => result.item)
  // console.log("🚀 ~ DocumentListDialog ~ searchResult:", fuse.search(search))

  const onSelect = useCallback(
    (document_id: SetStateAction<string>) => {
      setValue(document_id)
      setOpen(false)
      router.push(`/rag/files/${document_id}`) // Navigate to the chat page
    },
    [router]
  )

  const displayDocuments = search.trim()
    ? searchResult
    : documents.sort(sortByCreatedAtDescending)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
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
        className="font-geist flex w-64 cursor-pointer justify-between rounded-md border bg-muted py-0.5 pl-1 text-sm text-slate-600 hover:text-sky-600"
        onClick={() => setOpen((open) => !open)}
      >
        Search Document Library{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CtrlB</span>
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search documents..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Most recently added documents">
            {displayDocuments.map((document) => {
              const parts = document.name.split(new RegExp(`(${search})`, "gi"))

              return (
                <CommandItem
                  key={document.id}
                  value={document.id.toString()}
                  onSelect={() => onSelect(document.id.toString())}
                >
                  <ReaderIcon
                    className={cn(
                      "mr-3 size-4 text-slate-700",
                      value === document.id.toString()
                        ? "opacity-100"
                        : "opacity-100"
                    )}
                  />
                  <span className="line-clamp-1 w-full font-geistsans text-sm text-gray-700">
                    {/* {document.name} */}
                    {parts.map((part, index) =>
                      part.toLowerCase() === search.toLowerCase() ? (
                        <span key={index} className="bg-yellow-200">
                          {part}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
