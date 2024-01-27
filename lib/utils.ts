import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
