import {
  CalendarCheck,
  LayoutDashboard,
  Lightbulb,
  Plug,
  Settings,
  ShieldCheck,
  BarChart3,
  Users,
  type LucideIcon,
} from "lucide-react"

export type IconKey =
  | "dashboard"
  | "leads"
  | "appointments"
  | "decisions"
  | "connect"
  | "settings"
  | "reports"
  | "patients"
  | "finance"
  | "security"
  | "clients"

export const navIcons: Record<IconKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  leads: Users,
  appointments: CalendarCheck,
  decisions: Lightbulb,
  connect: Plug,
  settings: Settings,
  reports: BarChart3,
  patients: Users,
  finance: BarChart3,
  security: ShieldCheck,
  clients: Users,
}
