import { MessageSquareQuote } from "lucide-react"

import { Separator } from "@/components/ui/separator"

export interface SourcesList {
  sources?: any
}

export function ChatSourcesList({ sources }: SourcesList) {
  if (!sources.length) {
    return null
  }

  return (
    <div className="">
      <h2 className="-ml-2 mb-2 line-clamp-2 font-albertsans text-lg font-semibold">
        <MessageSquareQuote className="mr-4 inline-block size-6" />
        Sources
      </h2>

      {sources.map((source: any, index: number) => {
        console.log("🚀 ~ {sources.map ~ source:", source)
        return (
          <div key={index}>
            <div className="text-sm font-semibold">{source.document_name}</div>
            {index < sources.length - 1 && <Separator className="my-4" />}
          </div>
        )
      })}
    </div>
  )
}
