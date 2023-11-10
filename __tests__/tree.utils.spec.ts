import data from "@/__tests__/data/data.json"

import { ensureUniqueSequence } from "@/lib/sequenceUtils"
import { findSiblings } from "@/lib/treeUtils"

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

const twoSiblings = [
  {
    id: 44,
    sequence: 2,
    query:
      "If so, furnish a list of same and give the Vendor's estimate of value",
    parent_id: 28,
    is_required: true,
  },
  {
    id: 30,
    sequence: 2,
    query: "Are there any contents included in the purchase price?",
    parent_id: 28,
    is_required: true,
  },
]
describe("ensureUniqueSequence", () => {
  it("does not have duplicates of sequence", () => {
    const siblings = findSiblings(data, 30)
    const sequence = siblings.map((sibling) => sibling.sequence)
    const madeUnique = ensureUniqueSequence(siblings)
    const updatedSequence = madeUnique.map((sibling) => sibling.sequence)

    expect(updatedSequence.length).toEqual(new Set(updatedSequence).size)
    expect(new Set(sequence).size).toEqual(6)
  })

  it('when given two siblings with same sequence, it updates the sequence of the second sibling to be "1" greater than the first', () => {
    const madeUnique = ensureUniqueSequence(twoSiblings, 30)

    const updatedSequence = madeUnique.map((sibling) => sibling.sequence)
    expect(updatedSequence).toEqual([1, 2])
    const find30 = madeUnique.find((sibling) => sibling.id === 30)
    expect(find30?.sequence).toEqual(2)
  })
})
