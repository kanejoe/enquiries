import { FC } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ArrowBigDownDash } from "lucide-react"

import { DocumentsType } from "@/types/folders"
import { Database } from "@/lib/database.types"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DownloadButtonProps {
  document: DocumentsType
}

async function recordDownloadStats(documentId: number) {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from("download_stats")
    .insert([{ document_id: documentId }])
    .select()
    .throwOnError()
}

const DownloadButton: FC<DownloadButtonProps> = ({ document }) => {
  const supabase = createClientComponentClient<Database>()

  const selectDocument = (document: DocumentsType) => async () => {
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(document.storage_object_path || "", 60)

    if (error) {
      throw new Error("Error fetching signed url")
    }

    if (document.document_id) recordDownloadStats(document.document_id)
    // window.location.href = data.signedUrl
    window.open(data.signedUrl, "_blank")
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">
            <ArrowBigDownDash
              className="size-5 text-emerald-600"
              onClick={selectDocument(document)}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-secondary">
          <p>Download</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { DownloadButton }
