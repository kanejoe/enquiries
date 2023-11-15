export interface Requisition {
  id: number
  has_doc?: boolean
  is_applicable?: boolean
  is_complete?: boolean
  is_flagged?: boolean
  is_required?: boolean
  parent_id?: number | null
  query?: string | null
  reply?: string | null
  sequence: number
}

// Extend the base type to include the sequence_in_levels and siblings properties
export interface EnhancedRequisition extends Requisition {
  children: EnhancedRequisition[]
  sequence_in_levels: number[]
  siblings: number[]
  level: number
}

export interface HeadingRequisition
  extends Pick<
    EnhancedRequisition,
    "id" | "query" | "sequence" | "sequence_in_levels" | "is_applicable"
  > {
  level_sequence: string // Now a string
}
