"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CloudArrowUpIcon } from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropEvent, useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { getFileExtension } from "@/lib/fileIcons"
import { useAddStorageFile } from "@/lib/hooks/useStorageFiles"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { parseFile } from "../[id]/_actions"
import { PdfOrDocFileComponent } from "./PdfOrDocFileComponent"
import { SelectFolders } from "./SelectFolders"

interface DropzoneProps {}

type ExtendedFile = File & { preview: string }

const FormSchema = z.object({
  file: z.any().optional(),
  folder_id: z.string({
    required_error: "Please select a folder.",
  }),
})

const Dropzone: FC<DropzoneProps> = () => {
  const router = useRouter()
  const [files, setFiles] = useState<ExtendedFile[]>([]) // Initialize with an empty array and type 'ExtendedFile[]'

  const { mutateAsync: uploadFile, status: addFolderStatus } =
    useAddStorageFile({
      onSuccess: async (data) => {
        router.push(`/rag/files/${data.id}`)
        toast.success(`File successfully uploaded! ${data.name}`)
        try {
          await parseFile(data)
        } catch (error) {
          console.error("Error parsing file:", error)
        }
      },
      onError: () => toast.error("Error uploading file."),
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    onDropAccepted: (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setFiles((previousFiles: ExtendedFile[]) => [
          ...acceptedFiles.map((file: File) => {
            const extendedFile: ExtendedFile = Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
            return extendedFile
          }),
        ])
      }
    },
    multiple: false,
    maxFiles: 1,
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeAll = () => setFiles([])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const file_to_upload = files[0]
    if (!file_to_upload) return
    await uploadFile({
      selectedFile: file_to_upload,
      folder_id: data.folder_id,
    })
    form.reset()
    removeAll()
  }

  return (
    <div className="mt-6">
      {files.length > 0 && files[0] ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <PdfOrDocFileComponent file={files[0]} removeAll={removeAll} />

              <div className="">
                <SelectFolders file_ext={getFileExtension(files[0].name)} />
              </div>

              <div className="">
                <Button
                  className={cn(
                    "user-select-none w-full rounded-lg border font-semibold shadow-sm transition hover:bg-opacity-90",
                    getFileExtension(files[0].name) === "pdf" &&
                      "border-red-300 bg-red-100 text-red-800 shadow-red-400 hover:bg-red-200",
                    (getFileExtension(files[0].name) === "doc" ||
                      getFileExtension(files[0].name) === "docx") &&
                      "border-sky-300 bg-sky-100 text-blue-800 shadow-sky-400 hover:bg-sky-200"
                  )}
                  type="submit"
                >
                  <CloudArrowUpIcon className="mr-2 size-5" />
                  Upload Document
                </Button>
              </div>
            </div>
          </form>
        </Form>
      ) : (
        <div
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-yellow-400 bg-yellow-50 p-8 text-center shadow shadow-yellow-300 transition hover:bg-yellow-100"
          {...getRootProps({})}
        >
          <input {...getInputProps({ name: "file" })} />

          <div className="flex flex-col items-center justify-center gap-4">
            <CloudArrowUpIcon className="h-8 w-8 fill-secondary-foreground" />
            {isDragActive ? (
              <p>Drop your file here ...</p>
            ) : (
              <p className="text-balance">
                Drag & drop file here, or click to select
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export { Dropzone }
