import { Sidebar, type NavItem } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"
import { mockClinic } from "@/lib/mock/clinic"

const items: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Agenda", href: "/appointments", icon: "appointments" },
  { label: "Pacientes", href: "/leads", icon: "patients" },
  { label: "Financeiro", href: "/pricing", icon: "finance" },
  { label: "Relatórios", href: "/reports", icon: "reports" },
  { label: "Decisões", href: "/decisions", icon: "decisions" },
  { label: "Conexões", href: "/connect", icon: "connect" },
  { label: "Configurações", href: "/settings", icon: "settings" },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar
        items={items}
        footerName={mockClinic.name}
        footerSubtitle={mockClinic.specialty ?? undefined}
      />
      <MobileNav items={items} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
