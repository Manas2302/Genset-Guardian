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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      generator_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          created_at: string | null
          generator_id: string | null
          id: string
          is_acknowledged: boolean | null
          message: string
          severity: string | null
          title: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          created_at?: string | null
          generator_id?: string | null
          id?: string
          is_acknowledged?: boolean | null
          message: string
          severity?: string | null
          title: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          created_at?: string | null
          generator_id?: string | null
          id?: string
          is_acknowledged?: boolean | null
          message?: string
          severity?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "generator_alerts_generator_id_fkey"
            columns: ["generator_id"]
            isOneToOne: false
            referencedRelation: "generators"
            referencedColumns: ["id"]
          },
        ]
      }
      generator_commands: {
        Row: {
          command_status: Database["public"]["Enums"]["command_status"] | null
          command_type: Database["public"]["Enums"]["command_type"]
          completed_at: string | null
          error_message: string | null
          executed_at: string | null
          generator_id: string | null
          id: string
          metadata: Json | null
          requested_at: string | null
          user_id: string | null
        }
        Insert: {
          command_status?: Database["public"]["Enums"]["command_status"] | null
          command_type: Database["public"]["Enums"]["command_type"]
          completed_at?: string | null
          error_message?: string | null
          executed_at?: string | null
          generator_id?: string | null
          id?: string
          metadata?: Json | null
          requested_at?: string | null
          user_id?: string | null
        }
        Update: {
          command_status?: Database["public"]["Enums"]["command_status"] | null
          command_type?: Database["public"]["Enums"]["command_type"]
          completed_at?: string | null
          error_message?: string | null
          executed_at?: string | null
          generator_id?: string | null
          id?: string
          metadata?: Json | null
          requested_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generator_commands_generator_id_fkey"
            columns: ["generator_id"]
            isOneToOne: false
            referencedRelation: "generators"
            referencedColumns: ["id"]
          },
        ]
      }
      generator_logs: {
        Row: {
          created_at: string | null
          event_type: string
          generator_id: string | null
          id: string
          message: string
          metadata: Json | null
          severity: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          generator_id?: string | null
          id?: string
          message: string
          metadata?: Json | null
          severity?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          generator_id?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          severity?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generator_logs_generator_id_fkey"
            columns: ["generator_id"]
            isOneToOne: false
            referencedRelation: "generators"
            referencedColumns: ["id"]
          },
        ]
      }
      generators: {
        Row: {
          city: string
          coolant_level_percent: number | null
          country: string
          created_at: string | null
          current_power_kw: number | null
          efficiency_percent: number | null
          frequency_hz: number | null
          fuel_level_percent: number | null
          id: string
          is_online: boolean | null
          last_maintenance_date: string | null
          last_seen: string | null
          latitude: number | null
          location: string
          longitude: number | null
          max_power_kw: number
          model: string
          name: string
          next_maintenance_date: string | null
          oil_pressure_bar: number | null
          runtime_hours: number | null
          serial_number: string
          state: string
          status: Database["public"]["Enums"]["generator_status"] | null
          temperature_celsius: number | null
          updated_at: string | null
          voltage: number | null
        }
        Insert: {
          city: string
          coolant_level_percent?: number | null
          country: string
          created_at?: string | null
          current_power_kw?: number | null
          efficiency_percent?: number | null
          frequency_hz?: number | null
          fuel_level_percent?: number | null
          id?: string
          is_online?: boolean | null
          last_maintenance_date?: string | null
          last_seen?: string | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_power_kw: number
          model: string
          name: string
          next_maintenance_date?: string | null
          oil_pressure_bar?: number | null
          runtime_hours?: number | null
          serial_number: string
          state: string
          status?: Database["public"]["Enums"]["generator_status"] | null
          temperature_celsius?: number | null
          updated_at?: string | null
          voltage?: number | null
        }
        Update: {
          city?: string
          coolant_level_percent?: number | null
          country?: string
          created_at?: string | null
          current_power_kw?: number | null
          efficiency_percent?: number | null
          frequency_hz?: number | null
          fuel_level_percent?: number | null
          id?: string
          is_online?: boolean | null
          last_maintenance_date?: string | null
          last_seen?: string | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_power_kw?: number
          model?: string
          name?: string
          next_maintenance_date?: string | null
          oil_pressure_bar?: number | null
          runtime_hours?: number | null
          serial_number?: string
          state?: string
          status?: Database["public"]["Enums"]["generator_status"] | null
          temperature_celsius?: number | null
          updated_at?: string | null
          voltage?: number | null
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
      command_status:
        | "pending"
        | "executing"
        | "completed"
        | "failed"
        | "cancelled"
      command_type: "start" | "stop" | "restart" | "maintenance_mode"
      generator_status:
        | "Running"
        | "Standby"
        | "Critical"
        | "Warning"
        | "Maintenance"
        | "Off"
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
      command_status: [
        "pending",
        "executing",
        "completed",
        "failed",
        "cancelled",
      ],
      command_type: ["start", "stop", "restart", "maintenance_mode"],
      generator_status: [
        "Running",
        "Standby",
        "Critical",
        "Warning",
        "Maintenance",
        "Off",
      ],
    },
  },
} as const
