"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

import { BrandLogo } from "./BrandLogo"
import { navIcons, type IconKey } from "./nav-icons"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface NavItem {
  label: string
  href: string
  icon: IconKey
}

interface SidebarProps {
  items: NavItem[]
  footerName: string
  footerSubtitle?: string
  variant?: "client" | "admin"
}

export function Sidebar({
  items,
  footerName,
  footerSubtitle,
  variant = "client",
}: SidebarProps) {
  const pathname = usePathname()
  const initial = footerName.trim().charAt(0).toUpperCase() || "?"

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r bg-card md:flex">
      <div className="px-6 py-6">
        <BrandLogo href={variant === "admin" ? "/admin" : "/dashboard"} />
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const Icon = navIcons[item.icon]
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand/10 text-brand"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Separator />
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-brand/10 text-brand">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{footerName}</p>
            {footerSubtitle && (
              <p className="truncate text-xs text-muted-foreground">
                {footerSubtitle}
              </p>
            )}
          </div>
        </div>
        <Link
          href="/login"
          className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Sair"
        >
          <LogOut className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  )
}
