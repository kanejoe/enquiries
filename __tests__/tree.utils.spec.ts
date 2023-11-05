import data from "@/__tests__/data.json"

import { ensureUniqueSequence, findSiblings } from "@/lib/treeUtils"

describe("findSiblings", () => {
  it("return no. of siblings, if any", () => {
    const siblings = findSiblings(data, 30)
    expect(siblings.length).toEqual(9)
  })

  it("return empty list if no siblings", () => {
    const siblings = findSiblings(data, 1)
    expect(siblings.length).toEqual(0)
  })
})
describe("ensureUniqueSequence", () => {
  it("does not have duplicates of sequence", () => {
    const siblings = findSiblings(data, 30)
    const sequence = siblings.map((sibling) => sibling.sequence)
    const madeUnique = ensureUniqueSequence(siblings)
    const updatedSequence = madeUnique.map((sibling) => sibling.sequence)

    expect(updatedSequence.length).toEqual(new Set(updatedSequence).size)
    expect(new Set(sequence).size).toEqual(6)
  })
})
