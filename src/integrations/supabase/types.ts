export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
