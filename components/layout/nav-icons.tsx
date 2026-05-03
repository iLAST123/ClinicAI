import {
  CalendarCheck,
  LayoutDashboard,
  Lightbulb,
  Plug,
  Settings,
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
  | "clients"

export const navIcons: Record<IconKey, LucideIcon> = {
  dashboard: LayoutDashboard,
  leads: Users,
  appointments: CalendarCheck,
  decisions: Lightbulb,
  connect: Plug,
  settings: Settings,
  clients: Users,
}
