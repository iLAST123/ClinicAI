"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu } from "lucide-react"

import { BrandLogo } from "./BrandLogo"
import { navIcons, type IconKey } from "./nav-icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export interface MobileNavItem {
  label: string
  href: string
  icon: IconKey
}

export function MobileNav({
  items,
  variant = "client",
}: {
  items: MobileNavItem[]
  variant?: "client" | "admin"
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-2 border-b bg-card px-4 md:hidden">
      <BrandLogo href={variant === "admin" ? "/admin" : "/dashboard"} />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-6 py-5">
            <SheetTitle>
              <BrandLogo href={variant === "admin" ? "/admin" : "/dashboard"} />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-3 pb-4">
            {items.map((item) => {
              const Icon = navIcons[item.icon]
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
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
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
