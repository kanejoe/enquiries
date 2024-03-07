"use server"

import { FileTypes } from "@/types/file-types"
import {
  saveFileToDb,
  upsertDocumentSections,
} from "@/lib/supabase-funcs/supabase.server"
import { countWords } from "@/lib/utils/count-words"
import { embedOpenAi } from "@/lib/utils/embed-openai"
import { ParseDocx } from "@/lib/utils/parse-docx"
import { ParsePdf } from "@/lib/utils/parse-pdf"

import { FormSchema } from "./upload-form-schema"

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = FormSchema.safeParse(formData)
  let errorMessage,
    parsedFile = null,
    textContent

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      if (formData[key] !== undefined) {
        // @ts-ignore
        fields[key] = formData[key].toString()
      }
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    }
  }

  const file = parsed.data.file

  try {
    if (file.type.includes(FileTypes.Pdf)) {
      parsedFile = file ? await ParsePdf(file) : null
      textContent =
        parsedFile?.map((section) => section.content).join("\n") ?? ""
    }

    if (file.type.includes(FileTypes.Docx)) {
      parsedFile = file ? await ParseDocx(file) : null
      textContent =
        parsedFile?.map((section) => section.content).join("\n") ?? ""
    }

    if (parsedFile) {
      const document_id = await saveFileToDb(file)

      if (!document_id) {
        throw new Error("Failed to save file to the database")
      }

      if (document_id) {
        const wordCount = countWords(textContent ?? "")

        const upsertData = parsedFile.map((section) => {
          return {
            metadata: section.metadata,
            content: section.content,
            document_id,
          }
        })

        await upsertDocumentSections(upsertData, document_id)
        await embedOpenAi(document_id)

        return {
          message: `The file has been saved to the database.`,
          fields: {
            document_id: document_id ? document_id.toString() : "",
            fileName: file.name,
            wordCount: wordCount.toString(),
          },
        }
      }
    }

    // console.log(textContent)
    // console.log(parsedFile)
  } catch (error: any) {
    console.error("An error occurred:", error.message)
    errorMessage = error.message
  }

  return {
    message: parsedFile
      ? "File parsed"
      : "No file provided or an error occurred while parsing the file.",
    issues: errorMessage ? [errorMessage] : undefined,
  }
}
