import { FaFile, FaFilePdf, FaFileWord } from "react-icons/fa"

export function getIconForFileType(
  filename: string,
  iconSize: number = 4
): JSX.Element {
  const extension = getFileExtension(filename).toLowerCase()
  const iconClass = `h-${iconSize} w-${iconSize}`

  switch (extension) {
    case "pdf":
      return <FaFilePdf className={`${iconClass} fill-red-700 text-red-700`} />
    case "doc":
    case "docx":
      return (
        <FaFileWord className={`${iconClass} fill-blue-700 text-blue-700`} />
      )
    // You can add more cases for different file types
    default:
      return <FaFile className={iconClass} /> // Default icon for unknown file types
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
