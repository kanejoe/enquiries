"use client"

import { toast } from "sonner"

import { useFolders } from "@/lib/hooks/useFolders"
import { useAddStorageFile, useStorageFiles } from "@/lib/hooks/useStorageFiles"
import { Input } from "@/components/ui/input"
import LoadingDots from "@/components/loading-dots"

import { EmptyState } from "./emptyState"
import { FilesTable } from "./filesTable"
import { TreeView } from "./TreeView"

export default function FilesPage() {
  const { data: folders, error: foldersError } = useFolders()

  const { data: documents, error: fetchError, isPending } = useStorageFiles()
  const { mutate: addFile, error: addFileError } = useAddStorageFile({
    onSuccess: () => toast.success("File uploaded successfully!"),
  })

  if (fetchError) {
    toast.error("Error", {
      description: `There was an error fetching the files. Please try again later.
       ${fetchError.message.replace("\n", "")}`,
      classNames: {
        toast: "bg-red-200",
      },
    })
  }

  if (addFileError) {
    toast.error("Error", {
      description: `There was an error uploading the file. Please try again.  ${addFileError.message}`,
    })
  }

  return (
    <div className="container">
      {folders ? <TreeView treeData={folders} /> : null}

      <div className="m-4 flex max-w-2xl grow flex-col items-stretch gap-8 sm:m-10">
        <div className="flex h-32 flex-col items-center justify-center pb-4">
          <Input
            name="file"
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={async (e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) {
                addFile(selectedFile)
              }
            }}
          />
          <p
            className="mt-1 w-full pl-2 text-left text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            PDF, DOC or DOCX
          </p>
        </div>
        {isPending ? (
          <p>
            Loading <LoadingDots className={""} />
          </p>
        ) : null}
        {documents && documents.length === 0 ? <EmptyState /> : null}
        {documents && documents.length > 0 ? (
          <FilesTable documents={documents} />
        ) : null}
      </div>
    </div>
  )
}
