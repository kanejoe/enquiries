import { z } from "zod"

import "@testing-library/jest-dom"

const FormSchema = z.object({
  id: z.number().nullable().optional(),
  query: z
    .string()
    .transform((str) => str.trim())
    .refine((value) => value.length > 0, {
      message: "Query cannot be empty",
    }),
  sequence: z.string().default("1"),
  parent_id: z.number().positive().nullable().optional(),
  is_required: z.boolean().default(true).optional(),
})

describe("FormSchema", () => {
  it("should trim the query string", () => {
    const result = FormSchema.safeParse({
      query: "   untrimmed query   ",
      sequence: "2",
      parent_id: 5,
      is_required: false,
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.query).toBe("untrimmed query")
    }
  })

  it("should use the default sequence when not provided", () => {
    const result = FormSchema.safeParse({
      query: "test",
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.sequence).toBe("1")
    }
  })

  it("should reject negative parent_id", () => {
    const result = FormSchema.safeParse({
      query: "test",
      parent_id: -1,
    })

    expect(result.success).toBe(false)
  })

  it("should reject empty query", () => {
    const result = FormSchema.safeParse({
      query: "",
    })

    expect(result.success).toBe(false)
  })

  // Add more tests as needed to cover the validation logic of your schema.
})
