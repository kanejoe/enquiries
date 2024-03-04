import { FC, useEffect, useState, type SetStateAction } from "react"
import mammoth from "mammoth/mammoth.browser"

import { cn } from "@/lib/utils"

interface FileViewerProps {
  acceptedFile: File
  className?: string
}

/**
 * Renders a viewer for displaying the content of a DOCX file.
 *
 * @component
 * @param {FileViewerProps} props - The component props.
 * @param {File} props.acceptedFile - The accepted DOCX file to be displayed.
 * @param {string} props.className - The CSS class name for the component.
 * @returns {JSX.Element} The rendered component.
 */

const DocxViewer: FC<FileViewerProps> = ({
  acceptedFile,
  className,
}: FileViewerProps): JSX.Element => {
  const [htmlContent, setHtmlContent] = useState("")

  useEffect(() => {
    if (!acceptedFile) return // Exit if no file is provided

    const reader = new FileReader()
    reader.onloadend = function (event) {
      const arrayBuffer = reader.result

      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function (resultObject: { value: SetStateAction<string> }) {
          setHtmlContent(resultObject.value)
        })
    }
    reader.readAsArrayBuffer(acceptedFile)
  }, [acceptedFile]) // This ensures the effect runs only when the file prop changes

  return (
    <div
      className={cn(`overflow-y-auto rounded border p-8 shadow-md`, className)}
    >
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}

export { DocxViewer }
