import { addSiblingToNode } from "@/lib/addSiblingToNode"

import { arrayOfSiblings } from "./data/mockData"

describe("addSiblingToNode", () => {
  const firstSibling = arrayOfSiblings[0]
  const secondSibling = arrayOfSiblings[1]

  it("should add a sibling to the node and add the proper sequence - first sibling", () => {
    // @ts-expect-error
    const result = addSiblingToNode(firstSibling)
    expect(result.query).toEqual("")
    expect(result).not.toHaveProperty("id")
    expect(result.parent_id).toEqual(firstSibling?.parent_id)
    expect(result.sequence).toEqual(2)
    expect(result.siblings).toEqual([1, 2, 3])
  })

  it("should add a sibling to the node and add the proper sequence - second sibling", () => {
    // @ts-expect-error
    const result = addSiblingToNode(secondSibling)
    expect(result.query).toEqual("")
    expect(result).not.toHaveProperty("id")
    expect(result.parent_id).toEqual(secondSibling?.parent_id)
    expect(result.sequence).toEqual(3)
    expect(result.siblings).toEqual([1, 2, 3])
  })

  it("what happens when a null node is passed in?", () => {
    expect(() => {
      // @ts-expect-error
      addSiblingToNode(null)
    }).toThrow("The node is null or the parent_id property is not set.")
  })
})
