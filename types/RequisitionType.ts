export interface Requisition {
  children?: Requisition[]
  has_doc?: boolean | null
  id: number
  is_applicable?: boolean | null
  is_complete?: boolean | null
  is_flagged?: boolean | null
  level?: number
  parent_id?: number | null
  query?: string | null
  reply?: string | null
  sequence: number
  sequence_array?: number[]
  sources?: string[]
  siblings?: number[] // <-- Added
}

export interface HeadingRequisition {
  id: number
  query?: string | null
  level_sequence: string // Now a string
  is_applicable?: boolean | null
}
