import { FC } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { ArrowBigDownDash } from "lucide-react"

import { DocumentsType } from "@/types/folders"
import { Database } from "@/lib/database.types"
import { Button } from "@/components/ui/button"

interface DownloadButtonProps {
  document: DocumentsType
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
    window.location.href = data.signedUrl
  }
  return (
    <Button variant={"ghost"}>
      <ArrowBigDownDash
        className="size-5 text-emerald-600"
        onClick={selectDocument(document)}
      />
    </Button>
  )
}

export { DownloadButton }
