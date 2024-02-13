export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      document_sections: {
        Row: {
          content: string
          document_id: number
          id: number
          isvectorized: boolean | null
          metadata: Json | null
          openai_embedding: string | null
        }
        Insert: {
          content: string
          document_id: number
          id?: never
          isvectorized?: boolean | null
          metadata?: Json | null
          openai_embedding?: string | null
        }
        Update: {
          content?: string
          document_id?: number
          id?: never
          isvectorized?: boolean | null
          metadata?: Json | null
          openai_embedding?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents_with_storage_path_and_created_by_email"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["document_id"]
          }
        ]
      }
      document_tags: {
        Row: {
          document_id: number
          tag_id: number
        }
        Insert: {
          document_id: number
          tag_id: number
        }
        Update: {
          document_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents_with_storage_path_and_created_by_email"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "document_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          created_at: string
          created_by: string
          file_extension: string
          folder_id: number | null
          id: number
          name: string
          storage_object_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          file_extension: string
          folder_id?: number | null
          id?: never
          name: string
          storage_object_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          file_extension?: string
          folder_id?: number | null
          id?: never
          name?: string
          storage_object_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["folder_id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["storage_object_id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      download_stats: {
        Row: {
          created_at: string
          created_by: string
          document_id: number | null
          id: number
        }
        Insert: {
          created_at?: string
          created_by?: string
          document_id?: number | null
          id?: never
        }
        Update: {
          created_at?: string
          created_by?: string
          document_id?: number | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "download_stats_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_stats_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_stats_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents_with_storage_path_and_created_by_email"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "download_stats_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["document_id"]
          }
        ]
      }
      folders: {
        Row: {
          created_at: string
          created_by: string
          folder_name: string
          id: number
          parent_folder_id: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          folder_name: string
          id?: never
          parent_folder_id?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string
          folder_name?: string
          id?: never
          parent_folder_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["folder_id"]
          }
        ]
      }
      precedents: {
        Row: {
          asset_id: number | null
          created_at: string | null
          created_by: string | null
          id: number
          is_archived: boolean | null
          is_locked: boolean
          name: string
          subname: string
        }
        Insert: {
          asset_id?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name: string
          subname: string
        }
        Update: {
          asset_id?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          is_archived?: boolean | null
          is_locked?: boolean
          name?: string
          subname?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string
          first_name: string | null
          id: string
          initials: string | null
          last_name: string | null
        }
        Insert: {
          email: string
          first_name?: string | null
          id: string
          initials?: string | null
          last_name?: string | null
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          initials?: string | null
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      tags: {
        Row: {
          created_at: string
          created_by: string
          id: number
          tag_name: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: never
          tag_name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: never
          tag_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      documents_with_storage_path_and_created_by_email: {
        Row: {
          created_at: string | null
          created_by: string | null
          created_by_email: string | null
          file_extension: string | null
          folder_id: number | null
          id: number | null
          name: string | null
          storage_object_id: string | null
          storage_object_path: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["folder_id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_storage_object_id_fkey"
            columns: ["storage_object_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["storage_object_id"]
          }
        ]
      }
      folders_with_documents: {
        Row: {
          document_created_at: string | null
          document_id: number | null
          document_name: string | null
          folder_id: number | null
          folder_name: string | null
          parent_folder_id: number | null
          storage_object_id: string | null
          storage_object_path: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "folders_with_documents"
            referencedColumns: ["folder_id"]
          }
        ]
      }
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
      get_documents_by_tag_name: {
        Args: {
          p_tag_name: string
        }
        Returns: {
          id: number
          name: string
          folder_id: number
          storage_object_id: string
          created_by: string
          created_at: string
          tags: Json
        }[]
      }
      get_documents_with_tags: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          name: string
          folder_id: number
          storage_object_id: string
          created_by: string
          created_at: string
          tags: Json
        }[]
      }
      get_single_document_with_tags: {
        Args: {
          p_document_id: number
        }
        Returns: {
          id: number
          name: string
          folder_id: number
          storage_object_id: string
          created_by: string
          created_at: string
          tags: Json
        }[]
      }
      get_tags_with_documents: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          tag_name: string
          created_by: string
          created_at: string
          documents: Json
        }[]
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
      match_document_sections: {
        Args: {
          embedding: string
          match_threshold: number
        }
        Returns: {
          content: string
          document_id: number
          id: number
          isvectorized: boolean | null
          metadata: Json | null
          openai_embedding: string | null
        }[]
      }
      supabase_url: {
        Args: Record<PropertyKey, never>
        Returns: string
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

