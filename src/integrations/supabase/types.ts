export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      article_audit_summary: {
        Row: {
          article_id: string
          composite_score: number
          composite_severity: string
          consensus_layers: Json
          consensus_sublayers: Json
          created_at: string
          disagreements: Json
          id: string
          layer_jaccard: number | null
          models_run: string[]
          run_id: string
          sublayer_jaccard: number | null
          verdict_agreement: boolean | null
        }
        Insert: {
          article_id: string
          composite_score: number
          composite_severity: string
          consensus_layers?: Json
          consensus_sublayers?: Json
          created_at?: string
          disagreements?: Json
          id?: string
          layer_jaccard?: number | null
          models_run?: string[]
          run_id: string
          sublayer_jaccard?: number | null
          verdict_agreement?: boolean | null
        }
        Update: {
          article_id?: string
          composite_score?: number
          composite_severity?: string
          consensus_layers?: Json
          consensus_sublayers?: Json
          created_at?: string
          disagreements?: Json
          id?: string
          layer_jaccard?: number | null
          models_run?: string[]
          run_id?: string
          sublayer_jaccard?: number | null
          verdict_agreement?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "article_audit_summary_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "live_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_audits: {
        Row: {
          article_id: string
          created_at: string
          current_layers: Json
          current_sublayers: Json
          error: string | null
          evidence_quotes: Json
          fixes: Json
          flaws: Json
          id: string
          model: string
          proposed_layers: Json
          proposed_sublayers: Json
          raw_critique: string | null
          run_id: string
          score: number
          severity: string
          status: string
          suggested_headline: string | null
          suggested_subheadline: string | null
          verdict_check: Json
        }
        Insert: {
          article_id: string
          created_at?: string
          current_layers?: Json
          current_sublayers?: Json
          error?: string | null
          evidence_quotes?: Json
          fixes?: Json
          flaws?: Json
          id?: string
          model: string
          proposed_layers?: Json
          proposed_sublayers?: Json
          raw_critique?: string | null
          run_id: string
          score: number
          severity: string
          status?: string
          suggested_headline?: string | null
          suggested_subheadline?: string | null
          verdict_check?: Json
        }
        Update: {
          article_id?: string
          created_at?: string
          current_layers?: Json
          current_sublayers?: Json
          error?: string | null
          evidence_quotes?: Json
          fixes?: Json
          flaws?: Json
          id?: string
          model?: string
          proposed_layers?: Json
          proposed_sublayers?: Json
          raw_critique?: string | null
          run_id?: string
          score?: number
          severity?: string
          status?: string
          suggested_headline?: string | null
          suggested_subheadline?: string | null
          verdict_check?: Json
        }
        Relationships: [
          {
            foreignKeyName: "article_audits_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "live_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_revisions: {
        Row: {
          accepted: boolean
          article_id: string
          created_at: string
          critic_a: Json | null
          critic_a_score: number | null
          critic_b: Json | null
          critic_b_score: number | null
          draft: Json | null
          id: string
          models: Json
          notes: string | null
          round: number
          stage: string
        }
        Insert: {
          accepted?: boolean
          article_id: string
          created_at?: string
          critic_a?: Json | null
          critic_a_score?: number | null
          critic_b?: Json | null
          critic_b_score?: number | null
          draft?: Json | null
          id?: string
          models?: Json
          notes?: string | null
          round: number
          stage: string
        }
        Update: {
          accepted?: boolean
          article_id?: string
          created_at?: string
          critic_a?: Json | null
          critic_a_score?: number | null
          critic_b?: Json | null
          critic_b_score?: number | null
          draft?: Json | null
          id?: string
          models?: Json
          notes?: string | null
          round?: number
          stage?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_revisions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "live_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_runs: {
        Row: {
          completed_articles: number
          finished_at: string | null
          id: string
          models: string[]
          notes: string | null
          started_at: string
          status: string
          total_articles: number
        }
        Insert: {
          completed_articles?: number
          finished_at?: string | null
          id: string
          models?: string[]
          notes?: string | null
          started_at?: string
          status?: string
          total_articles?: number
        }
        Update: {
          completed_articles?: number
          finished_at?: string | null
          id?: string
          models?: string[]
          notes?: string | null
          started_at?: string
          status?: string
          total_articles?: number
        }
        Relationships: []
      }
      citation_reports: {
        Row: {
          created_at: string
          id: string
          issue_type: string
          message: string
          reporter_email: string | null
          source_label: string
          source_url: string
          status: string
          subject: string
          subject_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          issue_type?: string
          message: string
          reporter_email?: string | null
          source_label: string
          source_url: string
          status?: string
          subject: string
          subject_id: string
        }
        Update: {
          created_at?: string
          id?: string
          issue_type?: string
          message?: string
          reporter_email?: string | null
          source_label?: string
          source_url?: string
          status?: string
          subject?: string
          subject_id?: string
        }
        Relationships: []
      }
      live_articles: {
        Row: {
          analysis: Json
          created_at: string
          headline: string
          id: string
          linkedin_post: string
          news_summary: string
          published_at: string
          slug: string
          source_urls: Json
          status: string
          subheadline: string | null
          verdict: string
          vertical: string | null
        }
        Insert: {
          analysis: Json
          created_at?: string
          headline: string
          id?: string
          linkedin_post: string
          news_summary: string
          published_at?: string
          slug: string
          source_urls?: Json
          status?: string
          subheadline?: string | null
          verdict: string
          vertical?: string | null
        }
        Update: {
          analysis?: Json
          created_at?: string
          headline?: string
          id?: string
          linkedin_post?: string
          news_summary?: string
          published_at?: string
          slug?: string
          source_urls?: Json
          status?: string
          subheadline?: string | null
          verdict?: string
          vertical?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          confirm_token: string | null
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          source: string | null
          status: string
          unsubscribed_at: string | null
        }
        Insert: {
          confirm_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          source?: string | null
          status?: string
          unsubscribed_at?: string | null
        }
        Update: {
          confirm_token?: string | null
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          source?: string | null
          status?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      remaster_queue: {
        Row: {
          content: string | null
          created_at: string
          error: string | null
          id: string
          notes: string | null
          priority: number
          processed_at: string | null
          result: Json | null
          status: string
          target_id: string
          target_label: string
          target_type: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          error?: string | null
          id?: string
          notes?: string | null
          priority?: number
          processed_at?: string | null
          result?: Json | null
          status?: string
          target_id: string
          target_label: string
          target_type: string
        }
        Update: {
          content?: string | null
          created_at?: string
          error?: string | null
          id?: string
          notes?: string | null
          priority?: number
          processed_at?: string | null
          result?: Json | null
          status?: string
          target_id?: string
          target_label?: string
          target_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
