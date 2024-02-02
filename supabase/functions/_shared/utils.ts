/**
 * Gets the file extension based on the provided file type.
 * @param type - The file type.
 * @returns The corresponding file extension.
 */
export function getFileExtension(type: string): string {
  switch (type) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx"
    case "application/msword":
      return "doc"
    case "application/pdf":
      return "pdf"
    default:
      return "unknown"
  }
}
