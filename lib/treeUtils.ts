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
 * Ensures that the sequence of the given data is unique.
 *
 * @param data - The data to ensure uniqueness of.
 * @param priorityId - The ID of the item that should be given priority.
 * @returns The modified data with unique sequences.
 */

type PartialRequisition = Omit<
  Requisition,
  "is_complete" | "is_flagged" | "has_doc" | "is_applicable"
>
export function ensureUniqueSequence(
  data: PartialRequisition[],
  priorityId?: number
): PartialRequisition[] {
  // Sort the data by sequence, but ensure the priority ID does not change position
  const priorityItem = data.find((item) => item.id === priorityId)
  const nonPriorityItems = data.filter((item) => item.id !== priorityId)

  nonPriorityItems.sort((a, b) => a.sequence - b.sequence)

  let sortedData = []
  if (priorityItem) {
    // Place the priority item in its original position
    sortedData = [
      ...nonPriorityItems.slice(0, priorityItem.sequence - 1),
      priorityItem,
      ...nonPriorityItems.slice(priorityItem.sequence - 1),
    ]
  } else {
    sortedData = [...nonPriorityItems]
  }

  // Ensure the first sequence starts with 1 and increment subsequent sequences
  let currentSequence = 1
  for (let i = 0; i < data.length; i++) {
    const current = data[i]

    // Skip the iteration if current is undefined (which should not happen here)
    if (current === undefined) continue

    // If the current item is the priority item, keep its sequence unchanged
    if (current.id === priorityId) continue

    // Assign the new sequence
    current.sequence = currentSequence

    // Increment the sequence for the next iteration
    currentSequence++
  }

  // Return the modified data
  return sortedData
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
    return `(${numberToRoman(sequence)})`
  } else {
    throw new Error("Invalid level")
  }
}
