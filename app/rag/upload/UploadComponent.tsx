"use client"

import { FC, useCallback, useState } from "react"
import { File, FileText, UploadCloud } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { convertFileSize } from "@/lib/utils"
import { Input } from "@/components/ui/input"

import { PdfViewer } from "../files/[id]/ViewPdf"
import { DocxViewer } from "../query/(chat)/chat/[id]/DocxViewer"
import { DocxParser } from "../query/(chat)/chat/[id]/Mammoth"

interface FileUploadProgress {
  File: File
}

enum FileTypes {
  Pdf = "pdf",
  Docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

const DocxColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
}

const PdfColor = {
  bgColor: "bg-red-600",
  fillColor: "fill-red-400",
}

export const UploadComponent: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [fileToUpload, setFileToUpload] = useState<FileUploadProgress[]>([])

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <FileText size={24} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      }
    }
    if (file.type.includes(FileTypes.Docx)) {
      return {
        icon: <FileText size={24} className={DocxColor.fillColor} />,
        color: DocxColor.bgColor,
      }
    }
  }

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

  const acceptedFileItems = acceptedFiles.map((file: File) => {
    // console.log("🚀 ~ acceptedFileItems ~ file:", file)
    const pdfBlob = new Blob([file], { type: "application/pdf" })
    const pdfUrl = URL.createObjectURL(pdfBlob)

    const fileIconAndColor = getFileIconAndColor(file)
    return (
      <li key={file.name} className="">
        <div className="mb-4 flex items-center">
          {fileIconAndColor?.icon}
          <span className="ml-2 text-xl font-semibold">
            {file.name} - {convertFileSize(file.size)}
          </span>
        </div>
        {file.type.includes(FileTypes.Pdf) ? (
          <PdfViewer signedUrl={pdfUrl} />
        ) : //   <DocxViewer file={file} />
        file.type.includes(FileTypes.Docx) ? (
          <DocxParser file={file} />
        ) : //   <DocxViewer file={file} />
        null}
      </li>
    )
  })

  return (
    <div className="">
      <div className="mt-8 w-128">
        <label
          {...getRootProps()}
          className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow"
        >
          <div className=" text-center">
            <div className=" mx-auto max-w-min rounded-md border p-2">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">
                Drag and Drop File or Click to Upload
              </span>
            </p>
            <p className="text-xs text-gray-500">pdf or docx files only</p>
          </div>
        </label>

        <Input
          {...getInputProps({ name: "file", accept: ".pdf,.docx" })}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </div>

      <ul className="my-8">{acceptedFileItems}</ul>

      {uploadedFiles.length > 0 && (
        <div>
          <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
            Uploaded Files
          </p>
        </div>
      )}
    </div>
  )
}
