"use server"

import { LoadAndParsePdf } from "@/lib/utils/parse-load-pdf"

import { FormSchema } from "./upload-form-schema"

// import { schema } from "./formSchema";

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
  const parsedFile = file ? await LoadAndParsePdf(file, 1) : null
  console.log("🚀 ~ parsedFile:", parsedFile)

  const textContent =
    parsedFile?.map((section) => section.content).join("\n") ?? ""

  return { message: parsedFile ? "File parsed" : "No file to parse" }
}
