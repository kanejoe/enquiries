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
