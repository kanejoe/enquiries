import type { EnhancedRequisition, Requisition } from "@/types/RequisitionType"

/**
 * Adds a child to the given parent.
 *
 * @param parent - The parent to add a child to.
 * @returns The child requisition.
 */
export function addChildToParent(
  parent: EnhancedRequisition
): Omit<EnhancedRequisition, "id"> {
  // Gather the sequences of the existing children for the siblings array
  const siblingsSequences: number[] = parent.children.map(
    (child) => child.sequence
  )

  const newChild: Omit<EnhancedRequisition, "id"> = {
    // Omit 'id' since it's set by the database
    parent_id: parent.id,
    sequence: parent.children.length + 1,
    query: "",
    reply: null,
    is_applicable: false,
    has_doc: false,
    is_complete: false,
    is_flagged: false,
    is_required: true,
    children: [],
    siblings: siblingsSequences,
    sequence_in_levels: [
      ...parent.sequence_in_levels,
      parent.children.length + 1,
    ],
    level: parent.level + 1,
  }

  return newChild
}

/**
 * Adds a sibling to the given node.
 *
 * @param node - The node to add a sibling to.
 * @returns The sibling requisition without an id.
 */
export function addSiblingToNode(
  node: EnhancedRequisition
): Omit<EnhancedRequisition, "id"> {
  // Determine the new sequence number for the sibling
  const newSequence = node.sequence + 1
  // It should be the highest sequence number among the existing siblings + 1
  // node.siblings.length > 0
  //   ? Math.max(...node.siblings) + 1
  //   : node.sequence + 1

  // The new sibling's sequence_in_levels is almost the same as the node's
  // except for the last number which is the new sequence
  const newSequenceInLevels = node.sequence_in_levels
    .slice(0, -1)
    .concat(newSequence)

  const newSibling: Omit<EnhancedRequisition, "id"> = {
    parent_id: node.parent_id,
    sequence: newSequence,
    query: "", // Empty string as per requirement
    reply: null,
    is_applicable: false,
    has_doc: false,
    is_complete: false,
    is_flagged: false,
    is_required: true,
    children: [],
    siblings: node.siblings.concat(node.sequence), // Include the current node's sequence as a sibling
    sequence_in_levels: newSequenceInLevels,
    level: node.level,
  }

  return newSibling
}
