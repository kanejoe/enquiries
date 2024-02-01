import { FC, useCallback, useState } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"

import { Tables } from "@/lib/database.types"
import { Button } from "@/components/ui/button"

interface SummariseContentProps {
  document: Tables<"documents">
}

const SummariseContent: FC<SummariseContentProps> = ({ document }) => {
  const [content, setContent] = useState("")
  const { complete, completion } = useCompletion({
    api: "/api/summarise",
  })

  const summariseText = useCallback(
    async (c: string) => {
      console.log("🚀 ~ c:", c)
      const completion = await complete(c)
      if (!completion) throw new Error("Failed to summarise content")
      setContent(completion)
    },
    [complete]
  )

  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all">
      <div className="font-semibold">Document Summary</div>
      <div className="text-pretty text-sm text-muted-foreground">
        {completion || content}
      </div>
      <div className="">
        <Button
          variant="outline"
          size="xs"
          onClick={() => summariseText(document.id.toString())}
        >
          <LightningBoltIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export { SummariseContent }
