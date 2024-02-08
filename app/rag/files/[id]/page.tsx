"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { useDocument } from "@/lib/hooks/useFolders"
import { useFetchStorageFileUrl } from "@/lib/hooks/useStorageFiles"
import { Button } from "@/components/ui/button"

// actions
import { DocumentCard } from "./DocumentCard"
import { DocumentDetails } from "./DocumentDetails"
import { EditDocumentNameForm } from "./DocumentNameForm"
import { DocumentTags } from "./DocumentTags"
import { SummariseContent } from "./SummariseContent"
import { TagsTable } from "./TagsTable"
import { PdfViewer } from "./ViewPdf"

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = ({ searchParams }: PageProps) => {
  const { id } = useParams()
  const { data: document } = useDocument(id?.toString() || "")
  const { data: file } = useFetchStorageFileUrl(Number(id))

  // if tag search params is present, use it
  const tagName =
    typeof searchParams.tag === "string" ? searchParams.tag : undefined

  if (!document) return null

  return (
    <div className="">
      <div className="mb-8 mt-1 flex justify-between">
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-r from-red-900 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
          {document.name}
        </h1>
        <Button variant={"outline"} asChild className="shrink-0 shadow-none ">
          <Link href={"./"}>Back to Search</Link>
        </Button>
      </div>
      <div className="grid h-128 grid-cols-12 gap-x-20">
        <div className="col-span-5 mb-4">
          <div className="flex flex-col gap-y-4">
            <DocumentCard document={document} />
            <DocumentTags documentId={Number(id)} />
            {/* <DocumentDetails document={document} />*/}
            <SummariseContent document={document} />
            <EditDocumentNameForm
              documentId={document.id}
              documentName={document.name}
            />
          </div>
        </div>
        <div className="col-span-7">
          {tagName !== undefined ? (
            <TagsTable tagName={tagName || ""} />
          ) : file ? (
            <PdfViewer signedUrl={file.signedUrl} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Page
