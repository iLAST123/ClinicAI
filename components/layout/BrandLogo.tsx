import Link from "next/link"
import { cn } from "@/lib/utils"

export function BrandLogo({
  className,
  href = "/dashboard",
}: {
  className?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-lg font-semibold tracking-tight",
        className
      )}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-brand-foreground font-bold">
        C
      </span>
      <span>
        Clinic<span className="text-brand">AI</span>
      </span>
    </Link>
  )
}
