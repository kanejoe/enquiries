"use server"

import * as z from "zod"

const FormSchema = z.object({
  isApplicable: z.boolean().default(false),
  reqId: z.string(),
})

async function IsApplicableAction(data: z.infer<typeof FormSchema>) {
  console.log(
    "🚀 ~ file: IsApplicableAction.tsx:11 ~ IsApplicableAction ~ data:",
    data
  )
}

export { IsApplicableAction }
