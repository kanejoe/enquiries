import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";





/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to combine.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

/**
 * Removes the last segment from a pathname.
 * @param pathname - The pathname to remove the last segment from.
 * @returns The new pathname without the last segment.
 */
export const removeLastSegment = (pathname: string): string => {
  // Split the pathname into segments based on '/'
  const segments = pathname.split("/")

  // Remove the last segment
  segments.pop()

  // Reassemble the remaining segments into a new pathname
  return segments.join("/")
}

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

/**
 * Splits a string into an array of strings by a specified delimiter and trims each item.
 * 
 * @param input - The input string to be split.
 * @returns An array of strings.
 */
export function splitStringBySemicolon(input: string): string[] {
  return input.split(";").map((item) => item.trim())
}