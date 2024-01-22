import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { format as formatD } from "date-fns"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getFileExtension, getIconForFileType } from "../../../lib/fileIcons"

type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"]

type Document = Views<"documents_with_storage_path_and_created_by_email">

export function FilesTable({ documents }: { documents: Document[] }) {
  const supabase = createClientComponentClient<Database>()

  const selectDocument = (document: Document) => async () => {
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(document.storage_object_path || "", 60)

    if (error) {
      console.log(
        "🚀 ~ file: filesTable.tsx:33 ~ selectDocument ~ error",
        error
      )
      return
    }

    // window.location.href = data.signedUrl
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">Type</TableHead>
          <TableHead className="w-[260px]">Document Name</TableHead>
          <TableHead className="w-[200px]">Upload Date</TableHead>
          <TableHead className="w-[200px]">Upload By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document: Document) => {
          const fileExt = getFileExtension(document.name as string)

          return (
            <TableRow key={document.id}>
              <TableCell>{getIconForFileType(document.name || "")}</TableCell>
              <TableCell
                onClick={selectDocument(document)}
                className="font-medium hover:cursor-pointer hover:text-blue-800 hover:underline"
              >
                {document.name}
              </TableCell>
              <TableCell>
                {document.created_at ? (
                  <Badge variant="secondary">
                    {formatD(document.created_at, "d MMMM yyyy")}
                  </Badge>
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell>
                {document.created_by_email ? (
                  <Badge variant="outline">{document.created_by_email}</Badge>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
