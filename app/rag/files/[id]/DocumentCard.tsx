import { FC } from "react"
import Link from "next/link"
import { ChevronDownIcon, PlusIcon, StarIcon } from "@radix-ui/react-icons"
import { format as formatD } from "date-fns"

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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { parseFile } from "./actions"

interface DocumentCardProps {
  document: TExtendedDocuments
}

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  const parseFileWithDoc = parseFile.bind(null, document)

  return (
    <Card className="shadow">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="mb-2 flex gap-x-4 font-geistsans text-xl">
            {getIconForFileType(document.name || "", 8, "shrink-0 self-center")}
            <span className="bg-gradient-to-r from-red-800 to-blue-800 bg-clip-text text-lg text-transparent">
              {document.name}
            </span>
          </CardTitle>
          <CardDescription className="text-balance font-semibold">
            {/* {document.name} */}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <StarIcon className="mr-2 h-4 w-4" />
            Star
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Future Ideas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {formatD(document.created_at, "d MMMM yyyy")}
            </Badge>
            <Badge variant="secondary">
              {document.wordCount.toLocaleString("en-IE")} words
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-x-4">
        <Button variant={"secondary"} asChild>
          <Link href={"./"}>Close</Link>
        </Button>
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