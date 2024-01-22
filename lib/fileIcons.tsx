import { FaFile, FaFilePdf, FaFileWord } from "react-icons/fa"

export function getIconForFileType(filename: string): JSX.Element {
  const extension = getFileExtension(filename).toLowerCase()

  switch (extension) {
    case "pdf":
      return <FaFilePdf className="h-4 w-4 text-red-700" />
    case "doc":
    case "docx":
      return <FaFileWord className="h-4 w-4 text-blue-800" />
    // You can add more cases for different file types
    default:
      return <FaFile /> // Default icon for unknown file types
  }
}

export function getFileExtension(filename: string): string {
  // Ensure filename is not undefined or null
  if (!filename) {
    return ""
  }

  let parts = filename.split(".")
  // Check if parts array actually has more than one element
  if (parts.length > 1) {
    // TypeScript should infer that this is always a string
    return parts[parts.length - 1] as string
  } else {
    return "" // Return an empty string if no extension is found
  }
}
