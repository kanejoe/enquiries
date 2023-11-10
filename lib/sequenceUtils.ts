/**
 * Ensures that the sequence of the given data is unique.
 *
 * @param data - The data to ensure uniqueness of.
 * @param priorityId - The ID of the item that should be given priority.
 * @returns The modified data with unique sequences.
 */

import { Requisition } from "@/types/RequisitionType"

type PartialRequisition = Omit<
  Requisition,
  "is_complete" | "is_flagged" | "has_doc" | "is_applicable"
>
export function ensureUniqueSequence(
  data: PartialRequisition[],
  priorityId?: number
): PartialRequisition[] {
  // Find the index of the priority item, if it exists
  const priorityIndex =
    priorityId !== undefined
      ? data.findIndex((item) => item.id === priorityId)
      : -1

  // Sort all items by sequence, except the priority item
  let sortedData = data
    .filter((_, index) => index !== priorityIndex)
    .sort((a, b) => a.sequence - b.sequence)

  // Reset sequences for all items
  sortedData = sortedData.map((item, index) => ({
    ...item,
    sequence: index + 1,
  }))

  // If priorityId is provided and found, adjust the sequences to keep the priority item's sequence unchanged
  if (priorityIndex !== -1 && data[priorityIndex]) {
    const prioritySequence = data[priorityIndex]?.sequence ?? 1

    sortedData.forEach((item) => {
      if (item.sequence >= prioritySequence) {
        item.sequence += 1
      }
    })

    // Reinsert the priority item at its correct sequence position
    sortedData.splice(
      prioritySequence ? prioritySequence - 1 : 0,
      0,
      data[priorityIndex] as PartialRequisition
    )
  }

  return sortedData
}
