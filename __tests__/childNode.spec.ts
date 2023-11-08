import { addChildToParent } from "@/lib/addChildToParent"

import { arrayOfSiblings } from "./data/mockData"

describe("addChildToParent", () => {
  it("should add a child node to a parent node", () => {
    const parent = arrayOfSiblings[0]
    // @ts-expect-error
    const result = addChildToParent(parent)
    expect(result.query).toEqual("")
    expect(result).not.toHaveProperty("id")
    expect(result.parent_id).toEqual(parent?.id)
    expect(result.sequence).toEqual(4)
    expect(result.siblings).toEqual([1, 2, 3, 4])
    expect(result.sequence_in_levels).toEqual([1, 1, 4])
    expect(result.level).toEqual(3)
  })
})
