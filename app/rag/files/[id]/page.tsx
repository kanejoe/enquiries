"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"

import { useDocument } from "@/lib/hooks/useFolders"
import { useFetchStorageFileUrl } from "@/lib/hooks/useStorageFiles"

// actions
import { DocumentCard } from "./DocumentCard"
import { DocumentDetails } from "./DocumentDetails"
import { DocumentTags } from "./DocumentTags"
import { SummariseContent } from "./SummariseContent"
import { PdfViewer } from "./ViewPdf"

const Page = () => {
  const { id } = useParams()
  const { data: document } = useDocument(id?.toString() || "")
  const { data: file } = useFetchStorageFileUrl(Number(id))

  if (!document) return null

  return (
    <Suspense fallback={"loading..."}>
      <div className="grid h-128 grid-cols-12 gap-x-20">
        <div className="col-span-5">
          <div className="flex flex-col gap-y-4">
            <DocumentCard document={document} />
            <DocumentTags document={document} />
            {/* <DocumentDetails document={document} />
            <SummariseContent document={document} /> */}
          </div>
        </div>
        <div className="col-span-7">
          {/* {file ? <PdfViewer signedUrl={file.signedUrl} /> : null} */}
        </div>
      </div>
    </Suspense>
  )
}

export default Page
