"use client"

// import { useParams } from "next/navigation"
// import { useDocument } from "@/lib/hooks/useFolders"

const Page = () => {
  //   const { id } = useParams()
  //   const { data: document } = useDocument(id?.toString() || "")

  //   if (!document) return null

  return (
    <div className="container mt-4 flex flex-col gap-y-12">
      <h1 className="font-geistsans text-xl font-semibold">Tags</h1>
    </div>
  )
}

export default Page
