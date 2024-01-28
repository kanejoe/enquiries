import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { format as formatD } from "date-fns"

import { DocumentsType } from "@/types/folders"
import { getIconForFileType } from "@/lib/fileIcons"
import { removeLastSegment } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { DownloadButton } from "./DownloadButton"

type DocumentsListProps = {
  documents: DocumentsType[]
}

export function DocumentsList({ documents }: DocumentsListProps) {
  const pathname = usePathname()
  const { id } = useParams()

  let newPathname = pathname
  if (id) newPathname = removeLastSegment(pathname)

  return (
    <div className="">
      {documents.map((document: DocumentsType) => {
        return (
          <div
            key={document.document_id}
            className="my-0.5 flex items-center gap-x-4 overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-[1.5px] border-transparent px-1 py-0.5 font-medium"
          >
            <span className="size-1 shrink-0" />
            <span className="">
              {getIconForFileType(document.document_name || "")}
            </span>

            <span className="my-0.5 overflow-hidden text-ellipsis whitespace-nowrap font-geistsans text-sm text-blue-600 hover:underline">
              <Link href={`${newPathname}/${document.document_id}`}>
                {document.document_name}
              </Link>
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
    </div>
  )
}
