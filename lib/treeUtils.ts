import { Requisition } from "@/types/RequisitionType"

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
export function ensureUniqueSequence(
  data: Requisition[],
  priorityId?: number
): Requisition[] {
  // Sort the data by sequence, giving precedence to the priority ID in case of equal sequences
  data.sort((a, b) => {
    if (a.sequence === b.sequence) {
      if (priorityId !== undefined) {
        if (a.id === priorityId) return -1
        if (b.id === priorityId) return 1
      }
      return 0 // If priorityId is not set or doesn't match, return 0 to indicate no swap needed.
    }
    return a.sequence - b.sequence
  })

  // Ensure the first sequence starts with 1 and increment subsequent sequences
  let currentSequence = 1
  for (let i = 0; i < data.length; i++) {
    const current = data[i]
    const previous = data[i - 1]

    // Explicitly check if current is not undefined (should not be due to the loop condition)
    if (current) {
      // If the priority ID is defined and matches the current item's ID, or if it's the first item, set the sequence to the current sequence
      if ((priorityId !== undefined && current.id === priorityId) || i === 0) {
        current.sequence = currentSequence
      } else {
        // If the previous item has the same sequence, increment the current sequence
        // Also ensure that previous is not undefined
        if (previous && previous.sequence >= currentSequence) {
          currentSequence++
        }
        // Assign the new sequence
        current.sequence = currentSequence
      }
      // Increment the sequence for the next iteration
      currentSequence++
    }
  }

  // Return the modified data
  return data
}
