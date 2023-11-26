export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      precedents: {
        Row: {
          asset_id: number | null
          created_at: string | null
          id: number
          is_archived: boolean | null
          is_locked: boolean
          name: string
          subname: string
        }
        Insert: {
          asset_id?: number | null
          created_at?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name: string
          subname: string
        }
        Update: {
          asset_id?: number | null
          created_at?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name?: string
          subname?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          category: string | null
          created_at: string
          eircode: string | null
          id: number
          is_archived: boolean | null
          property: string | null
          status: string | null
          vendor: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          eircode?: string | null
          id?: number
          is_archived?: boolean | null
          property?: string | null
          status?: string | null
          vendor?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          eircode?: string | null
          id?: number
          is_archived?: boolean | null
          property?: string | null
          status?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      requisitions: {
        Row: {
          has_doc: boolean
          id: number
          is_applicable: boolean
          is_archived: boolean | null
          is_complete: boolean
          is_flagged: boolean
          is_locked: boolean
          is_required: boolean
          parent_id: number | null
          precedent_id: number | null
          query: string | null
          reply: string | null
          sequence: number
        }
        Insert: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_archived?: boolean | null
          is_complete?: boolean
          is_flagged?: boolean
          is_locked?: boolean
          is_required?: boolean
          parent_id?: number | null
          precedent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Update: {
          has_doc?: boolean
          id?: never
          is_applicable?: boolean
          is_archived?: boolean | null
          is_complete?: boolean
          is_flagged?: boolean
          is_locked?: boolean
          is_required?: boolean
          parent_id?: number | null
          precedent_id?: number | null
          query?: string | null
          reply?: string | null
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "requisitions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "requisitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requisitions_precedent_id_fkey"
            columns: ["precedent_id"]
            isOneToOne: false
            referencedRelation: "precedents"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      adjust_sequence: {
        Args: {
          p_parent_id: number
          p_new_sequence: number
          p_old_sequence: number
        }
        Returns: undefined
      }
      inc_sequence: {
        Args: {
          p_parent_id: number
          p_sequence_threshold: number
        }
        Returns: undefined
      }
      insert_and_resequence: {
        Args: {
          p_query: string
          p_parent_id: number
          p_sequence: number
        }
        Returns: undefined
      }
      update_requisition:
        | {
            Args: {
              p_id: number
              p_parent_id: number
              p_old_sequence: number
              p_new_sequence: number
              p_query: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_id: number
              p_parent_id: number
              p_old_sequence: number
              p_new_sequence: number
              p_query: string
              p_is_required: boolean
            }
            Returns: undefined
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
