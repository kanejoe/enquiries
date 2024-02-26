import { FC, useTransition } from "react"
import { toast } from "sonner"

import type { TExtendedDocuments } from "@/lib/types/TableTypes"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/Spinner"

import { parseFile } from "./_actions"

interface ParseDocumentFormProps {
  document: TExtendedDocuments
}

const ParseDocumentForm: FC<ParseDocumentFormProps> = ({ document }) => {
  let [isPending, startTransition] = useTransition()

  const parseFileWithDoc = parseFile.bind(null, document)

  return (
    <Button
      variant={"outline"}
      size={"xs"}
      onClick={async () => {
        startTransition(() => {
          try {
            parseFileWithDoc()
          } catch (e) {
            console.log("🚀 ~ startTransition ~ e:", e)
            toast.error("Failed to parse document")
          }
        })
      }}
    >
      {isPending ? <Spinner className="size-4" /> : "Read File"}
    </Button>
  )
}

export { ParseDocumentForm }
