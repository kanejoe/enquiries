"use client"

import { useRouter } from "next/navigation"
import { Database } from "@/supabase/functions/_lib/database"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

import { useStorageFiles } from "@/lib/hooks/useStorageFiles"
import { Input } from "@/components/ui/input"

import { FilesTable } from "./filesTable"

export default function FilesPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  const { data: documents, error, isPending } = useStorageFiles()

  if (error) {
    toast.error("Error", {
      description: `There was an error fetching the files. Please try again later.
       ${error.message.replace("\n", "")}`,
      classNames: {
        toast: "bg-red-200",
      },
    })
  }

  console.log("🚀 ~ file: page.tsx:38 ~ FilesPage ~ isPending:", isPending)
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
                const { error } = await supabase.storage
                  .from("files")
                  .upload(
                    `${crypto.randomUUID()}/${selectedFile.name}`,
                    selectedFile
                  )

                if (error) {
                  console.log(
                    "🚀 ~ file: page.tsx:65 ~ onChange={ ~ error:",
                    error
                  )
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
