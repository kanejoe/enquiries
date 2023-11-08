import type { EnhancedRequisition } from "@/types/RequisitionType"

/**
 * Adds a sibling to the given node.
 *
 * @param node - The node to add a sibling to.
 * @returns The sibling requisition without an id.
 */

export function addSiblingToNode(
  node: EnhancedRequisition
): Omit<EnhancedRequisition, "id"> {
  // Check if the node object is null or if parent_id is not set
  if (!node || node.parent_id == null) {
    throw new Error("The node is null or the parent_id property is not set.")
  }

  // Ensure siblings is an array, default to empty if not
  const siblingsArray = Array.isArray(node?.siblings) ? node.siblings : []

  // Determine the new sequence number for the sibling
  const newSequence =
    siblingsArray.length > 0 ? Math.max(...siblingsArray) + 1 : 1

  // Include the new sequence in the siblings array
  const siblingsSequences = [
    ...new Set(siblingsArray.concat(newSequence)),
  ].sort((a, b) => a - b) // Sort numerically

  // Ensure sequence_in_levels is an array, default to [1] if not
  const sequenceInLevels = Array.isArray(node?.sequence_in_levels)
    ? node.sequence_in_levels
    : [1]

  // Create the new sequence_in_levels for the new sibling
  const newSequenceInLevels = sequenceInLevels.slice(0, -1).concat(newSequence)

  const newSibling: Omit<EnhancedRequisition, "id"> = {
    parent_id: node.parent_id,
    sequence: node.sequence + 1,
    query: "",
    reply: null,
    is_applicable: false,
    has_doc: false,
    is_complete: false,
    is_flagged: false,
    is_required: true,
    children: [],
    // Update the siblings array to include the sequence of the current node
    siblings: siblingsSequences,
    sequence_in_levels: newSequenceInLevels,
    level: node.level,
  }

  return newSibling
}
