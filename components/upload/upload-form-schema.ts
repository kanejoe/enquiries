import * as z from "zod"

export const FormSchema = z.object({
  file: z.any(),
})
