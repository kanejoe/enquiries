import { format as formatD } from "date-fns"

import { DocumentsType } from "@/types/folders"
import { Badge } from "@/components/ui/badge"

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
            className="my-1 flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-[1.5px] border-transparent px-1 font-medium"
          >
            <span className="h-4 w-4 shrink-0" />
            <span className="font-geistmono my-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-blue-700 hover:underline">
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
          </div>
        )
      })}
    </>
  )
}
