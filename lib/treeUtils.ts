import { Requisition } from "@/types/RequisitionType"

import { numberToRoman } from "./tree"

/**
 * Finds all siblings of the given ID.
 *
 * @param items - The list of items to search.
 * @param idToFind - The ID of the item whose siblings should be found.
 * @returns A list of items that have the same parent ID as the given ID.
 */
export function findSiblings(
  items: Requisition[],
  idToFind: number
): Requisition[] {
  // Find the parent ID of the given ID
  const currentItem = items.find((item) => item.id === idToFind)
  const parentId = currentItem?.parent_id

  // If no parent ID is found, return an empty list
  if (parentId === undefined) {
    return []
  }

  // Find all items with the same parent ID
  const siblings = items.filter((item) => item.parent_id === parentId)

  return siblings
}

/**
 * Returns a string representing the sequence number based on the given level.
 * @param sequence - The sequence number to be converted to string.
 * @param level - The level of the sequence number.
 * @returns A string representing the sequence number based on the given level.
 * @throws An error if the level is invalid.
 */
export function getSequenceString(sequence: number, level: number): string {
  if (level === 1) {
    return sequence.toString()
  } else if (level === 2) {
    return `${sequence.toString()}.`
  } else if (level === 3) {
    return `(${String.fromCharCode(96 + sequence)})`
  } else if (level === 4) {
    return `(${numberToRoman(sequence).toLowerCase()})`
  } else if (level === 5) {
    return `(${numberToRoman(sequence).toLocaleUpperCase()})`
  } else {
    throw new Error("Invalid level")
  }
}
