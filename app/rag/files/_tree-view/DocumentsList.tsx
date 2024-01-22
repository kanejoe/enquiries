import { format as formatD } from "date-fns"
import { ArrowBigDownDash } from "lucide-react"

import { DocumentsType } from "@/types/folders"
import { getFileExtension, getIconForFileType } from "@/lib/fileIcons"
import { Badge } from "@/components/ui/badge"

import { DownloadButton } from "./DownloadButton"

type DocumentsListProps = {
  documents: DocumentsType[]
}

export function DocumentsList({ documents }: DocumentsListProps) {
  return (
    <>
      {documents.map((document: DocumentsType) => {
        return (
          <div
            key={document.document_id}
            className="my-1 flex items-center space-x-4 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-[1.5px] border-transparent px-2 font-medium"
          >
            <span className="h-4 w-4 shrink-0" />
            <span className="">
              {getIconForFileType(document.document_name || "")}
            </span>

            <span className="font-geistsans my-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-blue-600 hover:underline">
              {document.document_name}
            </span>

            <span className="">
              {document.document_created_at ? (
                <Badge variant="secondary">
                  {formatD(document.document_created_at, "d MMMM yyyy")}
                </Badge>
              ) : (
                ""
              )}
            </span>
            <span className="">
              <DownloadButton document={document} />
            </span>
          </div>
        )
      })}
    </>
  )
}
