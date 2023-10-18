"use server"

import * as z from "zod"

const schema = z.object({
  property: z.string().min(3, {
    message: "Property must be at least 3 characters.",
  }),
})

export async function PropertyFormActions(data: unknown) {
  console.log(
    "🚀 ~ file: PropertyFormActions.tsx:8 ~ PropertyFormActions ~ data:",
    data
  )
  const result = schema.safeParse(data)
  // console.log(
  //   "🚀 ~ file: PropertyFormActions.tsx:10 ~ PropertyFormActions ~ result:",
  //   result
  // )
}
