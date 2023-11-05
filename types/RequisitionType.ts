export interface Requisition {
  children?: Requisition[]
  has_doc?: boolean | null
  id: number
  is_applicable?: boolean | null
  is_complete?: boolean | null
  is_flagged?: boolean | null
  is_required: boolean
  level?: number
  parent_id?: number | null
  query?: string | null
  reply?: string | null
  sequence: number
  sources?: string[]
}

// Extend the base type to include the sequence_in_levels and siblings properties
export interface EnhancedRequisition extends Requisition {
  sequence_in_levels: number[]
  siblings: number[]
}

export interface HeadingRequisition {
  id: number
  query?: string | null
  level_sequence: string // Now a string
  is_applicable?: boolean | null
}
