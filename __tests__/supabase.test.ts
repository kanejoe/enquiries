import "@testing-library/jest-dom"

import { insertRequisition } from "@/app/requisitions/_actions/insertRequisition"

// Mock Supabase client if necessary
jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({
        data: [],
        error: null,
      }),
    }),
  }),
}))

describe("Supabase Insert Test", () => {
  it("should insert data into Supabase", async () => {
    const testData = {
      column1: "test",
      column2: 123,
    }

    const result = await insertRequisition(testData)
    console.log("🚀 ~ file: supabase.test.tsx:30 ~ it ~ result:", result)

    // Check if the result matches expected data
    expect(result).toEqual([
      /* expected response */
    ])
  })

  // More tests...
})
