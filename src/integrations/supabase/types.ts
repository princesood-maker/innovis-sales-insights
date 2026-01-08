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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          code: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          region: string | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          region?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          region?: string | null
        }
        Relationships: []
      }
      forecasts: {
        Row: {
          business_area: Database["public"]["Enums"]["business_area"]
          country_id: string
          created_at: string
          created_by: string | null
          expected_revenue: number | null
          growth_assumption: number | null
          id: string
          notes: string | null
          quarter: number | null
          updated_at: string
          year: number
        }
        Insert: {
          business_area: Database["public"]["Enums"]["business_area"]
          country_id: string
          created_at?: string
          created_by?: string | null
          expected_revenue?: number | null
          growth_assumption?: number | null
          id?: string
          notes?: string | null
          quarter?: number | null
          updated_at?: string
          year: number
        }
        Update: {
          business_area?: Database["public"]["Enums"]["business_area"]
          country_id?: string
          created_at?: string
          created_by?: string | null
          expected_revenue?: number | null
          growth_assumption?: number | null
          id?: string
          notes?: string | null
          quarter?: number | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "forecasts_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          business_area: Database["public"]["Enums"]["business_area"]
          country_id: string | null
          created_at: string
          created_by: string | null
          creation_date: string | null
          customer_name: string
          deal_value: number
          expected_closure_date: string | null
          id: string
          notes: string | null
          opportunity_code: string
          owner_id: string | null
          probability: number
          status: Database["public"]["Enums"]["opportunity_status"]
          updated_at: string
        }
        Insert: {
          business_area: Database["public"]["Enums"]["business_area"]
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          creation_date?: string | null
          customer_name: string
          deal_value?: number
          expected_closure_date?: string | null
          id?: string
          notes?: string | null
          opportunity_code: string
          owner_id?: string | null
          probability?: number
          status?: Database["public"]["Enums"]["opportunity_status"]
          updated_at?: string
        }
        Update: {
          business_area?: Database["public"]["Enums"]["business_area"]
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          creation_date?: string | null
          customer_name?: string
          deal_value?: number
          expected_closure_date?: string | null
          id?: string
          notes?: string | null
          opportunity_code?: string
          owner_id?: string | null
          probability?: number
          status?: Database["public"]["Enums"]["opportunity_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_delivery: {
        Row: {
          actual_revenue: number | null
          actual_sites: number | null
          actual_teams: number | null
          country_id: string
          created_at: string
          created_by: string | null
          forecast_revenue: number | null
          forecast_sites: number | null
          forecast_teams: number | null
          health_status: Database["public"]["Enums"]["health_status"] | null
          id: string
          month: number
          notes: string | null
          planned_revenue: number | null
          planned_sites: number | null
          planned_teams: number | null
          planning_assumptions: string | null
          updated_at: string
          year: number
        }
        Insert: {
          actual_revenue?: number | null
          actual_sites?: number | null
          actual_teams?: number | null
          country_id: string
          created_at?: string
          created_by?: string | null
          forecast_revenue?: number | null
          forecast_sites?: number | null
          forecast_teams?: number | null
          health_status?: Database["public"]["Enums"]["health_status"] | null
          id?: string
          month: number
          notes?: string | null
          planned_revenue?: number | null
          planned_sites?: number | null
          planned_teams?: number | null
          planning_assumptions?: string | null
          updated_at?: string
          year: number
        }
        Update: {
          actual_revenue?: number | null
          actual_sites?: number | null
          actual_teams?: number | null
          country_id?: string
          created_at?: string
          created_by?: string | null
          forecast_revenue?: number | null
          forecast_sites?: number | null
          forecast_teams?: number | null
          health_status?: Database["public"]["Enums"]["health_status"] | null
          id?: string
          month?: number
          notes?: string | null
          planned_revenue?: number | null
          planned_sites?: number | null
          planned_teams?: number | null
          planning_assumptions?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_delivery_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      business_area:
        | "Telecom Build"
        | "Network Implementation"
        | "NOC"
        | "FLM"
        | "Resource Provisioning"
      health_status: "Green" | "Amber" | "Red"
      opportunity_status:
        | "Prospect"
        | "Qualified"
        | "RFP"
        | "Proposal"
        | "Negotiation"
        | "Won"
        | "Lost"
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
    Enums: {
      business_area: [
        "Telecom Build",
        "Network Implementation",
        "NOC",
        "FLM",
        "Resource Provisioning",
      ],
      health_status: ["Green", "Amber", "Red"],
      opportunity_status: [
        "Prospect",
        "Qualified",
        "RFP",
        "Proposal",
        "Negotiation",
        "Won",
        "Lost",
      ],
    },
  },
} as const
