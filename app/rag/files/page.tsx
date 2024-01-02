"use client"

import { useRouter } from "next/navigation"
import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useQuery } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import { FilesTable } from "./filesTable"

export default function FilesPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const {
    isPending,
    error,
    data: documents,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents_with_storage_path_and_created_by_email")
        .select()
        .order("created_at", { ascending: false })

      if (error) {
        console.log("🚀 ~ file: page.tsx:23 ~ queryFn: ~ error:", error)
        toast({
          variant: "destructive",
          description: "Failed to fetch documents",
        })
        throw error
      }
      return data
    },
    retry: false,
  })
  // console.log("🚀 ~ file: page.tsx:38 ~ FilesPage ~ isPending:", isPending)
  // console.log("🚀 ~ file: page.tsx:38 ~ FilesPage ~ documents:", documents)

  return (
    <div className="container">
      <div className="m-4 flex max-w-2xl grow flex-col items-stretch gap-8 sm:m-10">
        <div className="flex h-40 flex-col items-center justify-center border-b pb-8">
          <Input
            type="file"
            name="file"
            className="w-full max-w-xs cursor-pointer"
            onChange={async (e) => {
              const selectedFile = e.target.files?.[0]

              if (selectedFile) {
                console.log(
                  "🚀 ~ file: page.tsx:55 ~ onChange={ ~ selectedFile:",
                  selectedFile
                )
                const { error } = await supabase.storage
                  .from("files")
                  .upload(
                    `${crypto.randomUUID()}/${selectedFile.name}`,
                    selectedFile
                  )

                if (error) {
                  toast({
                    variant: "destructive",
                    description:
                      "There was an error uploading the file. Please try again.",
                  })
                  return
                }

                // router.push("/rag/chat")
              }
            }}
          />
        </div>

        {documents ? <FilesTable documents={documents} /> : null}
      </div>
    </div>
  )
}
