import type { DashboardMetrics } from "@/types"

export const mockMetrics: DashboardMetrics = {
  total_spend: 4287.5,
  total_leads: 132,
  total_appointments: 38,
  avg_cost_per_lead: 32.48,
  avg_cost_per_appointment: 112.83,
  conversion_rate: 28.79,
  best_campaign: "Lentes de Contato — Conversão Lead",
  week_over_week_cpl_change: -12.4,
}

export interface CplPoint {
  week: string
  cpl: number
}

export const mockCplSeries: CplPoint[] = [
  { week: "Sem 14", cpl: 41.2 },
  { week: "Sem 15", cpl: 38.5 },
  { week: "Sem 16", cpl: 36.1 },
  { week: "Sem 17", cpl: 37.4 },
  { week: "Sem 18", cpl: 33.9 },
  { week: "Sem 19", cpl: 30.7 },
  { week: "Sem 20", cpl: 32.48 },
]
