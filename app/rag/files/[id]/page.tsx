"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { TagsListDrawer } from "@/lib/components/TagsListDrawer"
import { useDocument } from "@/lib/hooks/use-documents"
import {
  useFetchStorageFileDownload,
  useFetchStorageFileUrl,
} from "@/lib/hooks/use-files"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DocxViewer } from "@/components/upload/docx-viewer"
// import { PdfViewer } from "./ViewPdf"
import { PdfViewer } from "@/components/upload/pdf-viewer"

import StreamChat from "../../folio/StreamTest"
import { DocumentCard } from "./DocumentCard"
import { DocumentTags } from "./DocumentTags"
import StreamIt from "./StreamIt"
import { SummariseContent } from "./SummariseContent"

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = ({ searchParams }: PageProps) => {
  const { id } = useParams()

  const { data: document } = useDocument(Number(id))
  const { data: file } = useFetchStorageFileUrl(Number(id))
  const { data: downloadedFile } = useFetchStorageFileDownload(Number(id))

  // if tag search params is present, use it
  const tagName =
    typeof searchParams.tag === "string" ? searchParams.tag : undefined

  if (!document) return null

  return (
    <>
      <Suspense fallback={null}>
        <TagsListDrawer tagName={tagName} key={tagName} />
      </Suspense>

      <div className="mb-8 mt-1 flex justify-between">
        <h1 className="mr-8 overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-r from-red-900 to-blue-800 bg-clip-text text-3xl font-bold text-transparent">
          {document.name}
        </h1>
        <Button variant={"outline"} asChild className="shrink-0 shadow-none">
          <Link href={"/rag/chat"}>go to chat</Link>
        </Button>
      </div>
      <div className="grid h-128 grid-cols-12 gap-x-20">
        <div className="col-span-5 mb-8">
          <div className="flex flex-col gap-y-4">
            <DocumentCard document={document} />
            <DocumentTags documentId={Number(id)} />
            {/* <StreamIt /> */}

            {/* <DocumentDetails document={document} />*/}
            {/* <SummariseContent document={document} /> */}
          </div>
        </div>
        <div className="col-span-7">
          {file && document.file_extension === "pdf" ? (
            <PdfViewer signedUrl={file.signedUrl} />
          ) : null}

          {file && document.file_extension === "docx" && downloadedFile ? (
            <>
              {/* <Button onClick={() => window.open(file.signedUrl, "_blank")}>
                download
              </Button> */}
              {/* <DocxViewer acceptedFile={downloadedFile as File} /> */}

              <div className="">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4 font-albertsans text-sm shadow-sm">
                  {document.document_sections
                    .map((doc: { content: string }) => doc.content)
                    .join(" ")}
                </ScrollArea>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Page
