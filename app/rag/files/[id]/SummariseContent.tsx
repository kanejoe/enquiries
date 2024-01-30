import { FC } from "react"
import { LightningBoltIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"

import { Tables } from "@/lib/database.types"
import { Button } from "@/components/ui/button"

interface SummariseContentProps {
  document: Tables<"documents">
}

const SummariseContent: FC<SummariseContentProps> = ({ document }) => {
  const { completion, input, handleInputChange, handleSubmit, error, data } =
    useCompletion()

  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="font-semibold">Document Summary</div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {/* {document.name.substring(0, 300)} */}
        {data && (
          <pre className="bg-gray-100 p-4 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        {error && (
          <div className="fixed left-0 top-0 w-full bg-red-500 p-4 text-center text-white">
            {error.message}
          </div>
        )}
        {completion}
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            className=""
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button variant="outline" size="xs" type="submit">
            <LightningBoltIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export { SummariseContent }
