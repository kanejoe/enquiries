import { supabase } from "@/lib/supabase.client"

// Your function that performs the Supabase operation
async function insertAndSelectData(insert_data: any) {
  const { data, error } = await supabase
    .from("requisitions")
    .insert(insert_data)
    .select("id, sequence, query, parent_id, is_required")
    .single()
  return { data, error }
}

describe("insertAndSelectData", () => {
  it("should insert data and return selected fields", async () => {
    const insert_data = {
      sequence: "A",
      query: "Test",
      parent_id: null,
      is_required: true,
    }
    const returnedData = { ...insert_data, id: 1 } // Simulate the data returned with an ID

    // Mocking the chain of Supabase methods
    const singleMock = jest
      .fn()
      .mockResolvedValue({ data: returnedData, error: null })
    const selectMock = jest.fn(() => ({ single: singleMock }))
    const insertMock = jest.fn(() => ({ select: selectMock }))
    const fromMock = jest.fn(() => ({ insert: insertMock }))

    jest.spyOn(supabase, "from").mockImplementation(fromMock as any)

    const result = await insertAndSelectData(insert_data)

    // Assertions
    expect(result.data).toEqual(returnedData)
    // @ts-expect-error
    expect(result.data.id).toBeDefined() // Check that the id is present
    expect(result.error).toBeNull()

    // Verify that the mocked methods were called correctly
    expect(fromMock).toHaveBeenCalledWith("requisitions")
    expect(insertMock).toHaveBeenCalledWith(insert_data)
    expect(selectMock).toHaveBeenCalledWith(
      "id, sequence, query, parent_id, is_required"
    )
    expect(singleMock).toHaveBeenCalled()
  })

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks()
  })
})
