import { FC, useCallback, useEffect, useState } from "react"
import Image from "next/image"
import {
  ArrowUpTrayIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { Cross2Icon } from "@radix-ui/react-icons"
import { FileIcon, X } from "lucide-react"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

import { getIconForFileType } from "@/lib/fileIcons"
import { Button } from "@/components/ui/button"

interface DropzoneProps {}

type ExtendedFile = File & { preview: string }

const Dropzone: FC<DropzoneProps> = () => {
  const [files, setFiles] = useState<ExtendedFile[]>([]) // Initialize with an empty array and type 'ExtendedFile[]'

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

  const removeAll = () => {
    setFiles([])
  }

  async function action() {
    const file = files[0]
    if (!file) return
    // console.log("🚀 ~ action ~ file:", file)
  }

  return (
    <div className="">
      <div className="mt-6">
        <form action={action}>
          {files.length > 0 ? (
            <div className="h-64 w-64 cursor-pointer rounded-xl border border-double border-sky-600 bg-sky-50 p-2 text-center shadow-lg shadow-sky-100">
              <div className="relative flex h-full flex-col items-center justify-center gap-y-4">
                <Button
                  className="absolute right-0 top-0"
                  variant="ghost"
                  size="sm"
                  onClick={removeAll}
                >
                  <Cross2Icon />
                </Button>
                <div className="">
                  {files[0] && getIconForFileType(files[0].name, 8)}
                </div>

                <div className="max-w-48 truncate text-balance font-geistsans text-sm">
                  {files[0] && files[0].name}
                </div>

                <div className="text-sm text-gray-500">
                  {files[0] && convertFileSize(files[0].size)}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-400 bg-slate-50 p-8 text-center shadow-xl shadow-slate-200 hover:bg-slate-100"
              {...getRootProps({})}
            >
              <input {...getInputProps({ name: "file" })} />

              <div className="flex flex-col items-center justify-center gap-4">
                <CloudArrowUpIcon className="h-8 w-8 fill-slate-700" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop files here, or click to select files</p>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export { Dropzone }

export function convertFileSize(sizeInBytes: number): string {
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let i = 0
  let size = sizeInBytes

  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i++
  }

  return `${size.toFixed(0)} ${units[i]}`
}
