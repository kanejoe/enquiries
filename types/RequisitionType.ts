export interface Requisition {
  children?: Requisition[]
  has_doc?: boolean | null
  id?: number
  is_applicable?: boolean | null
  is_complete?: boolean | null
  is_flagged?: boolean | null
  is_required: boolean
  level?: number
  parent_id?: number | null
  query?: string | null
  reply?: string | null
  sequence: number
  sequence_in_levels: number[]
  siblings: number[] // <-- Added
  sources?: string[]
}

export interface HeadingRequisition {
  id: number
  query?: string | null
  level_sequence: string // Now a string
  is_applicable?: boolean | null
}
