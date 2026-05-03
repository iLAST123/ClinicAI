import { Sidebar, type NavItem } from "@/components/layout/Sidebar"
import { MobileNav } from "@/components/layout/MobileNav"

const items: NavItem[] = [
  { label: "Clientes", href: "/admin", icon: "clients" },
  { label: "Decisões", href: "/admin/decisions", icon: "decisions" },
  { label: "Configurações", href: "/admin/settings", icon: "settings" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar
        items={items}
        footerName="Admin ClinicAI"
        footerSubtitle="Painel interno"
        variant="admin"
      />
      <MobileNav items={items} variant="admin" />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
