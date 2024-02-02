"use client"

import { Suspense } from "react"
import { useParams } from "next/navigation"

import { useDocument } from "@/lib/hooks/useFolders"

// actions
import { DocumentCard } from "./DocumentCard"
import { DocumentDetails } from "./DocumentDetails"
import { DocumentTags } from "./DocumentTags"
import { SummariseContent } from "./SummariseContent"

const Page = () => {
  const { id } = useParams()
  const { data: document } = useDocument(id?.toString() || "")

  if (!document) return null

  return (
    <Suspense fallback={"loading..."}>
      <div className="flex flex-col gap-y-12">
        <DocumentCard document={document} />
        <DocumentDetails document={document} />
        <SummariseContent document={document} />
        <DocumentTags document={document} />
      </div>
    </Suspense>
  )
}

export default Page
