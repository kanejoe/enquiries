import { ensureUniqueSequence } from "@/lib/sequenceUtils"

import { nonUniqueArrayOfSiblings } from "./data/non-unique-sequence"

describe("ensureUniqueSequence", () => {
  it("sequence should return [1,2] when given given a non-unique array, and a priority id", () => {
    const priorityId = 68
    const expectedOutput = [1, 2]
    const output = ensureUniqueSequence(nonUniqueArrayOfSiblings, priorityId)
    const actualOutput = output.map((item) => item.sequence)
    expect(actualOutput).toEqual(expectedOutput)
  })

  it("sequence should return [1,2] when given given a non-unique array, and no priority id", () => {
    const expectedOutput = [1, 2]
    const output = ensureUniqueSequence(nonUniqueArrayOfSiblings)
    const actualOutput = output.map((item) => item.sequence)
    expect(actualOutput).toEqual(expectedOutput)
  })
})
