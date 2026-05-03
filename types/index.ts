export type UserRole = "admin" | "client"

export interface Profile {
  id: string
  email: string
  role: UserRole
  created_at: string
}

export interface Clinic {
  id: string
  user_id: string
  name: string
  specialty: string | null
  phone: string | null
  onboarding_data: OnboardingData
  onboarding_step: number
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface OnboardingData {
  // Step 1 — Identidade
  clinic_name?: string
  specialty?: string
  differentials?: string
  communication_tone?: string
  // Step 2 — Paciente Ideal
  patient_profile?: string
  patient_age_range?: string
  common_objections?: string
  // Step 3 — Oferta
  priority_procedures?: string
  price_range?: string
  payment_conditions?: string
  // Step 4 — Processo Comercial
  scheduling_process?: string
  crm_used?: string
  available_hours?: string
  response_time?: string
  // Step 5 — Campanhas
  procedures_to_advertise?: string
  monthly_budget?: string
  current_challenges?: string
  form_campaign_map?: { form_id: string; campaign_id: string }[]
  calendar_provider?: "google" | "microsoft_graph"
  calendar_professional_email?: string
  calendar_connected?: boolean
}

export interface MetaConnection {
  id: string
  clinic_id: string
  ad_account_id: string
  ad_account_name: string | null
  // access_token_encrypted nunca chega ao client. Descriptografar só em API Routes.
  token_expires_at: string | null
  status: "active" | "expired" | "disconnected"
  connected_at: string
}

export interface Campaign {
  id: string
  clinic_id: string
  campaign_id: string
  campaign_name: string | null
  spend: number
  impressions?: number
  clicks?: number
  leads: number
  cost_per_lead: number | null
  period_start: string
  period_end: string
}

export interface Appointment {
  id: string
  clinic_id: string
  lead_id?: string | null
  campaign_id: string | null
  campaign_name?: string | null
  patient_name: string | null
  procedure: string | null
  appointment_date: string | null
  status:
    | "scheduled"
    | "confirmed"
    | "completed"
    | "no_show"
    | "cancelled"
  source: "manual" | "csv_import" | "crm_webhook" | "whatsapp"
  notes: string | null
  professional_id?: string | null
  external_event_id?: string | null
  sync_status?: "synced" | "pending" | "error"
  created_at: string
}

export interface Lead {
  id: string
  clinic_id: string
  meta_lead_id: string | null
  form_id: string | null
  campaign_id: string | null
  campaign_name: string | null
  lead_name: string | null
  lead_phone: string | null
  lead_email: string | null
  status: "new" | "contacted" | "scheduled" | "lost"
  created_at: string
}

export interface FormCampaignMap {
  id: string
  clinic_id: string
  form_id: string
  campaign_id: string
  campaign_name: string | null
}

export interface WeeklyDecision {
  id: string
  clinic_id: string
  week_date: string
  content: string
  highlight_metric_1: string | null
  highlight_metric_2: string | null
  highlight_metric_3: string | null
  action_recommended: string | null
  metrics_snapshot: Record<string, unknown>
  sent_via_whatsapp: boolean
  created_at: string
}

export type SubscriptionPlan = "solo" | "managed" | "expansion"

export interface Subscription {
  id: string
  clinic_id: string
  plan: SubscriptionPlan
  status: "active" | "inactive" | "trial" | "cancelled"
  next_billing_date: string | null
}

export interface DashboardMetrics {
  total_spend: number
  total_leads: number
  total_appointments: number
  avg_cost_per_lead: number
  avg_cost_per_appointment: number
  conversion_rate: number
  best_campaign: string | null
  week_over_week_cpl_change: number
}

export interface AdminClientRow {
  clinic: Clinic
  subscription: Subscription
  meta_status: MetaConnection["status"]
  last_decision_date: string | null
}
