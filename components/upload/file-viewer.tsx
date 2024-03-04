import { FC } from "react"
import { FileText } from "lucide-react"

import { FileTypes } from "@/types/file-types"
import { convertFileSize } from "@/lib/utils"

import { DocxViewer } from "./docx-viewer"
import { PdfViewer } from "./pdf-viewer"

interface FileViewerProps {
  acceptedFile: File
}

const DocxColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
}

const PdfColor = {
  bgColor: "bg-red-600",
  fillColor: "fill-red-400",
}

export const getFileIconAndColor = (file: File) => {
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

const FileViewer: FC<FileViewerProps> = ({ acceptedFile }) => {
  const fileIconAndColor = getFileIconAndColor(acceptedFile)
  const pdfBlob = new Blob([acceptedFile], { type: "application/pdf" })
  const pdfUrl = URL.createObjectURL(pdfBlob)

  return (
    <div className="mx-12 flex w-full flex-col gap-y-8">
      <div className="inline-flex w-full items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-semibold">
        <span className="shrink-0">{fileIconAndColor?.icon}</span>
        <span className="ml-4 line-clamp-1 text-xl font-semibold">
          {acceptedFile.name}
        </span>
        <span className="ml-8 mt-0.5 shrink-0 self-center text-xs font-semibold text-gray-500">
          {convertFileSize(acceptedFile.size)}
        </span>
      </div>

      <div className="w-full">
        {acceptedFile.type.includes(FileTypes.Pdf) ? (
          <div className="mx-auto max-w-2xl">
            <PdfViewer
              signedUrl={pdfUrl}
              className="h-[calc(50vh-70px)] max-h-[20em] w-full"
            />
          </div>
        ) : acceptedFile.type.includes(FileTypes.Docx) ? (
          <DocxViewer
            acceptedFile={acceptedFile}
            className="h-[calc(50vh-70px)] max-h-[20em]"
          />
        ) : null}
      </div>
    </div>
  )
}

export { FileViewer }
