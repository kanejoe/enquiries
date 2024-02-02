import { FC, Fragment, useCallback, useState } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"

import { Tables } from "@/lib/database.types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SummariseContentProps {
  document: Tables<"documents">
}

type BadgeRendererProps = {
  text: string
}
const BadgeRenderer: React.FC<BadgeRendererProps> = ({ text }) => {
  // Splitting the text by semicolon and filtering out empty strings
  const items = text.split(";").filter((item) => item.trim())

  return (
    <div>
      {items.map((item, index) => (
        <Badge key={index} variant="secondary" className="m-1">
          {item.trim()}
        </Badge>
      ))}
    </div>
  )
}

const SummariseContent: FC<SummariseContentProps> = ({ document }) => {
  const [content, setContent] = useState("")
  const { complete, completion, isLoading } = useCompletion({
    api: "/api/summarise",
  })

  const summariseText = useCallback(
    async (c: string) => {
      setContent("")
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
        {content ? <BadgeRenderer text={content} /> : completion}
      </div>
      <div className="">
        <Button
          variant="outline"
          size="xs"
          disabled={isLoading}
          onClick={() => summariseText(document.id.toString())}
        >
          <LightningBoltIcon
            className={cn(`h-4 w-4`, {
              "animate-spin fill-yellow-600": isLoading,
            })}
          />
        </Button>
      </div>
    </div>
  )
}

export { SummariseContent }
