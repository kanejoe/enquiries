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
    <div className="mt-4 rounded-lg bg-gray-100 p-4 shadow">
      <h2 className="mb-4 line-clamp-2 font-albertsans text-lg font-semibold">
        <MessageSquareQuote className="mr-4 inline-block size-6" />
        Sources
      </h2>

      {sources.map((source: any, index: number) => {
        return (
          <div key={index} className="ml-10">
            <div className="line-clamp-1 text-sm font-semibold text-gray-800">
              {source.document_name}
            </div>
            {index < sources.length - 1 && <Separator className="my-4" />}
          </div>
        )
      })}
    </div>
  )
}
