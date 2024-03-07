import { FC, useTransition } from "react"
import { Component1Icon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { TDocument } from "@/lib/hooks/use-tags"
import { cn } from "@/lib/utils"

import { embedOpenAi } from "./_actions"

interface AddEmbeddingButtonProps {
  documentId: TDocument["id"]
}

const AddEmbeddingButton: FC<AddEmbeddingButtonProps> = ({ documentId }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <Component1Icon
      onClick={async (e) => {
        if (isPending) return
        e.stopPropagation() // to stop the parent onClick event

        // Mark this state update as non-urgent with startTransition
        startTransition(async () => {
          try {
            await embedOpenAi(documentId)
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error("🚀 ~ onClick={ ~ error:", error)
              toast.error(`Error embedding data. ${error.message}`)
            }
          }
        })
      }}
      className={cn(
        "ml-4 mt-0.5 size-4 shrink-0 cursor-pointer transition hover:text-blue-700",
        { "animate-spin text-indigo-700": isPending }
      )}
      aria-label={isPending ? "Embedding... Please wait." : "Add Embedding"}
    />
  )
}

export { AddEmbeddingButton }
