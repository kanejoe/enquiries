import { z } from "zod"

export const FormSchema = z.object({
  id: z.number().int().nullable().optional(),
  query: z
    .string()
    .transform((str) => str.trim())
    // .refine((val) => val.length > 0, "Query cannot be empty.")
    .optional(),
  sequence: z.string().default("1"), // Coercion is not necessary if defaulting to string "1"
  parent_id: z.number().int().positive().nullable().optional(), // Ensure integers with .int()
  is_required: z.boolean().default(true),
})
