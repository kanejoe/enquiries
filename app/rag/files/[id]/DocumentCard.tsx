import { FC } from "react"
import Link from "next/link"
import { ChevronDownIcon, PlusIcon, StarIcon } from "@radix-ui/react-icons"
import { format as formatD } from "date-fns"
import { File, FileText, TagsIcon } from "lucide-react"

import { getIconForFileType } from "@/lib/fileIcons"
import type { TDocuments, TExtendedDocuments } from "@/lib/hooks/useFolders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { parseFile } from "./_actions"

interface DocumentCardProps {
  document: TExtendedDocuments
}

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  const parseFileWithDoc = parseFile.bind(null, document)

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex text-lg">
          {/* {getIconForFileType(
            document.name || "",
            4,
            "shrink-0 self-center mr-4 size-6 text-slate-800"
          )} */}
          <FileText className="mr-4 mt-px size-6" />
          <span className="">File Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="">File Name</TableCell>
              <TableCell className="">{document.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Word Count</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {document.wordCount.toLocaleString("en-IE")} words
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell>
                <Badge variant="outline">None</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Embeddings</TableCell>
              <TableCell>
                <Badge variant="outline">None</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="gap-x-4">
        {document.wordCount < 1 ? (
          <form action={parseFileWithDoc}>
            <Button variant={"secondary"} type="submit">
              Read File
            </Button>
          </form>
        ) : null}
      </CardFooter>
    </Card>
  )
}

export { DocumentCard }
