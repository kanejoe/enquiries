"use client"

import { FC, useCallback, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import { FileText, UploadCloud } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { FileTypes } from "@/types/file-types"
import { convertFileSize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileViewer } from "@/components/upload/file-viewer"

import { PdfViewer } from "../files/[id]/ViewPdf"
// import { DocxViewer } from "../query/(chat)/chat/[id]/DocxViewer"
import { DocxParser } from "../query/(chat)/chat/[id]/Mammoth"

interface FileUploadProgress {
  File: File
}

export const UploadComponent: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [fileToUpload, setFileToUpload] = useState<FileUploadProgress[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFileToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            File: file,
          }
        }),
      ]
    })
  }, [])

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
  })

  return (
    <div className="">
      <div className="mx-auto mb-12 mt-8 w-128">
        <label
          {...getRootProps()}
          className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow"
        >
          <div className=" text-center">
            <div className=" mx-auto max-w-min rounded-md border p-2">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-base text-gray-600">
              <span className="font-semibold">
                Drag and Drop File or Click to Upload
              </span>
            </p>
            <p className="text-sm text-gray-500">pdf or docx files only</p>
          </div>
        </label>

        <Input
          {...getInputProps({ name: "file", accept: ".pdf,.docx" })}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div>

      {acceptedFiles && acceptedFiles.length > 0 && (
        <div className="mx-h-[10em] group relative mx-auto flex max-w-screen-lg items-center justify-center gap-2 overflow-hidden rounded-lg border border-slate-200 p-8 shadow">
          <Button
            variant={"ghost"}
            className="absolute right-2 top-2 rounded-xl border shadow-sm transition"
            onClick={() => {
              console.log("clicked", fileToUpload)
              //   setFileToUpload([])
            }}
          >
            <Cross2Icon />
          </Button>
          {acceptedFiles.map((file: File) => {
            return <FileViewer key={file.lastModified} acceptedFile={file} />
          })}
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="0">
          <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
            Uploaded Files
          </p>
        </div>
      )}
    </div>
  )
}
