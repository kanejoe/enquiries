import { clsx, type ClassValue } from "clsx"
import diacritics from "diacritics"
import GPT3Tokenizer from "gpt3-tokenizer"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

import { TChatQueries } from "./hooks/use-chats"

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to combine.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
) // 7-character random string

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

/**
 * Sanitizes and formats the input text by replacing newline characters and hyphens with spaces,
 * and removing consecutive spaces.
 *
 * @param inputText - The input text to be sanitized and formatted.
 * @returns The sanitized and formatted text.
 */
export function sanitizeAndFormatText(inputText: string) {
  // Replace newline characters and hyphens with spaces
  let formattedText = inputText.replace(/[\n-]/g, " ")

  // Remove consecutive spaces
  formattedText = formattedText.replace(/\s+/g, " ")

  return formattedText
}

/**
 * Delays the execution of a function by the specified number of milliseconds.
 * @param ms - The number of milliseconds to delay the execution.
 * @returns A promise that resolves after the specified delay.
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * replaces a string if it contains invalid characters
 * @param key
 */
export function removeInvalidCharacters(key: string): string {
  // Remove diacritics from the key
  const keyWithoutDiacritics = diacritics.remove(key)

  // Regular expression to match invalid characters
  const invalidCharRegex = /[^\w\/!-\.\\*\(\)' &\$@=;:+,\?]/g

  // Replace all invalid characters with an empty string
  return keyWithoutDiacritics.replace(invalidCharRegex, "")
}

/**
 * Sorts an array of chat queries by their created_at property in descending order.
 * @param a - The first chat query to compare.
 * @param b - The second chat query to compare.
 * @returns A negative value if `b` was created later than `a`, a positive value if `a` was created later than `b`, or 0 if they were created at the same time.
 */
interface WithCreatedAt {
  created_at: Date | string
}
export function sortByCreatedAtDescending<T extends WithCreatedAt>(a: T, b: T) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}

interface WithDocumentDetails {
  name: string
  id: number
  content: string
}

/**
 * Concatenates the content of matched documents up to a specified token limit.
 *
 * @param documents - An array of documents to concatenate.
 * @param LIMIT - The maximum number of tokens allowed in the concatenated text. Defaults to 16000.
 * @returns The concatenated text of the matched documents, limited by the specified token count.
 */
export function getContextTextWithLimit<T extends WithDocumentDetails>(
  documents: T[],
  LIMIT: number = 16000
) {
  const tokenizer = new GPT3Tokenizer({ type: "gpt3" })
  let tokenCount = 0
  let contextText = ""

  // Concat matched documents
  if (documents) {
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i]
      const content =
        `${document?.content} [Source: ${document?.name}] [DocId: ${document?.id}] ` ??
        ""
      const encoded = tokenizer.encode(content)
      tokenCount += encoded.text.length

      // Limit context to max 1500 tokens (configurable)
      if (tokenCount > LIMIT) {
        break
      }

      contextText += `${content?.trim()}\n---\n`
    }
  }
  return contextText
}
