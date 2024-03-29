import { FC, useRef } from "react"
import { useChat } from "ai/react"
import { Check, FileText } from "lucide-react"
import { toast } from "sonner"

import { getIconForFileType } from "@/lib/fileIcons"
import {
  useStructuredOutput,
  useStructuredOutputMutation,
} from "@/lib/hooks/use-structured-output"
import type { TDocuments, TExtendedDocuments } from "@/lib/types/TableTypes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { SummarizeModal } from "@/app/rag/files/[id]/SummarizeModal"

import { parseFile } from "./_actions"
import { AddEmbeddingButton } from "./AddEmbeddingsButton"
import { EditDocumentNameButton } from "./EditDocumentNameButton"
import { ParseDocumentForm } from "./parse-document-form"
import StreamIt from "./StreamIt"

interface DocumentCardProps {
  document: TExtendedDocuments
}

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  const { data, mutateAsync, status } = useStructuredOutputMutation(
    document.id,
    {
      onSuccess: () => toast.success("Document name updated!"),
      onError: (error) => toast.error("Something went wrong."),
    }
  )

  const isVectorized = document.document_sections.every(
    (section) => section.isvectorized
  )

  return (
    <>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}

      <Card className="shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex text-lg">
            {/* {getIconForFileType(
            document.name || "",
            4,
            "shrink-0 self-center mr-4 size-6 text-slate-800"
          )} */}
            <FileText className="mr-4 mt-px size-6" />
            <span className="">Details</span>
            <Button onClick={() => mutateAsync(document.id)}>
              {status === "pending" ? "Loading..." : "get folio details"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="w-1/4 align-top text-sm font-semibold">
                  File Name
                </TableCell>
                <TableCell className="flex pl-3">
                  <span className="">{document.name}</span>
                  <EditDocumentNameButton
                    documentId={document.id}
                    documentName={document.name}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/4 align-top text-sm font-semibold">
                  Word Count
                </TableCell>
                <TableCell>
                  {document.wordCount < 1 ? (
                    <ParseDocumentForm document={document} />
                  ) : (
                    <Badge variant="secondary" className="ml-0.5">
                      {document.wordCount.toLocaleString("en-IE")} words
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/4 align-top text-sm font-semibold">
                  Summary
                </TableCell>
                <TableCell>
                  <SummarizeModal documentId={document.id} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/4 align-top text-sm font-semibold">
                  Embeddings
                </TableCell>
                <TableCell className="flex">
                  {isVectorized ? (
                    <Badge variant={"outline"} className="bg-emerald-600">
                      <Check className="size-4 text-white" />
                    </Badge>
                  ) : (
                    <>
                      <Badge variant="outline" className="">
                        Click to Generate
                      </Badge>
                      <AddEmbeddingButton documentId={document.id} />
                    </>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export { DocumentCard }
