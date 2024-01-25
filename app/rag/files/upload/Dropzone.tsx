import { FC, useCallback, useEffect, useState } from "react"
import {
  ArrowUpTrayIcon,
  CloudArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid"
import { Cross2Icon } from "@radix-ui/react-icons"
import { DropEvent, FileRejection, useDropzone } from "react-dropzone"

import { getFileExtension, getIconForFileType } from "@/lib/fileIcons"
import { cn, convertFileSize } from "@/lib/utils"
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
          {files.length > 0 && files[0] ? (
            <FileComponent file={files[0]} removeAll={removeAll} />
          ) : (
            <div
              className="flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dotted border-primary bg-primary/5 p-8 text-center shadow shadow-primary/20 transition hover:bg-primary/15"
              {...getRootProps({})}
            >
              <input {...getInputProps({ name: "file" })} />

              <div className="flex flex-col items-center justify-center gap-4">
                <CloudArrowUpIcon className="h-8 w-8 fill-secondary-foreground" />
                {isDragActive ? (
                  <p>Drop your file here ...</p>
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

/**
 *
 * @param param0
 * @returns
 */
export function FileComponent({
  file,
  removeAll,
}: {
  file: ExtendedFile
  removeAll: () => void
}) {
  return (
    <div
      className={cn(
        `h-64 w-64 rounded-xl border border-dotted p-2 text-center shadow-sm`,
        getFileExtension(file.name) === "pdf" &&
          "border-red-400 bg-red-50 shadow-red-400",
        (getFileExtension(file.name) === "doc" ||
          getFileExtension(file.name) === "docx") &&
          "border-sky-200 bg-sky-50 shadow-sky-400"
      )}
    >
      <div className="relative flex h-full flex-col items-center justify-center gap-y-4">
        <Button
          className={cn(
            `bordershadow-sm absolute right-2 top-2 rounded-full transition `,
            getFileExtension(file.name) === "pdf" &&
              "border-red-400 bg-red-50 shadow-red-400 hover:bg-red-100",
            (getFileExtension(file.name) === "doc" ||
              getFileExtension(file.name) === "docx") &&
              "border-sky-200 bg-sky-50 shadow-sky-400 hover:bg-sky-100"
          )}
          variant="ghost"
          size="sm"
          onClick={removeAll}
        >
          <Cross2Icon />
        </Button>
        <div className="">{file && getIconForFileType(file.name, 8)}</div>

        <div className="max-w-48 truncate text-balance font-geistsans text-sm font-semibold text-primary-foreground">
          {file && file.name}
        </div>

        <div className="text-sm text-gray-500">
          {file && convertFileSize(file.size)}
        </div>
      </div>
    </div>
  )
}
