import { useCallback } from "react"
import { MessageSquareQuote } from "lucide-react"

import {
  createSignedUrl,
  getStorageObjectPathByObjectId,
} from "@/lib/supabase-funcs/supabase.client"
import { Separator } from "@/components/ui/separator"

export interface SourcesList {
  sources?: any
}

export async function ChatSourcesList({ sources }: SourcesList) {
  if (!sources.length) {
    return null
  }

  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4 shadow">
      <h2 className="mb-4 line-clamp-2 font-albertsans text-lg font-semibold">
        <MessageSquareQuote className="mr-4 inline-block size-6" />
        Sources
      </h2>
      {sources.map(async (source: any, index: number) => {
        return (
          <>
            <SourceItem key={index} source={source} />
            {index < sources.length - 1 && <Separator className="my-4" />}
          </>
        )
      })}
    </div>
  )
}

interface SourceItemProps {
  source: any
}

export function SourceItem({ source }: SourceItemProps) {
  return (
    <div className="ml-10">
      <div className="line-clamp-1 cursor-pointer text-sm font-semibold text-gray-800 hover:text-blue-800 hover:underline hover:decoration-sky-500">
        {source.document_name}
      </div>
    </div>
  )
}
