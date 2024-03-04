import { useEffect, useState } from "react"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

const DocxViewer = ({ file }: { file?: File }) => {
  // Optional File type to handle undefined case
  const [selectedDocs, setSelectedDocs] = useState<File[]>([])

  useEffect(() => {
    if (!file) return // Better handling of undefined or null file

    setSelectedDocs([file]) // No need for Array.from for a single item
  }, [file]) // Dependency array to trigger effect when file changes

  // Ensure selectedDocs is not empty before rendering DocViewer
  if (selectedDocs.length === 0) return null

  return (
    <DocViewer
      documents={selectedDocs.map((file) => {
        const docxBlob = new Blob([file], {
          // Pass an array of BlobParts
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          //   type: "application/pdf",
        })
        return {
          uri: URL.createObjectURL(docxBlob),
          fileName: file.name,
        }
      })}
      pluginRenderers={DocViewerRenderers}
    />
  )
}

export { DocxViewer }
