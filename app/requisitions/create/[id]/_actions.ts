"use server"

import { z } from "zod"

import { FormSchema } from "./RequisitionForm"

// type Inputs = z.infer<typeof FormSchema>

export async function addEntry(requisition: unknown) {
  console.log(
    "🚀 ~ file: _actions.ts:10 ~ addEntry ~ requisition:",
    requisition
  )
  // const result = FormSchema.safeParse(data)
  // if (result.success) {
  //   return { success: true, data: result.data }
  // }
  // if (result.error) {
  //   return { success: false, error: result.error.format() }
  // }
}
