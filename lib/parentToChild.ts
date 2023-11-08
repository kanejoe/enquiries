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

  // Omit 'id' since it's set by the database
  const newChild: Omit<EnhancedRequisition, "id"> = {
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
