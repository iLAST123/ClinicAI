import Link from "next/link"
import { AlertTriangle, Plug } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConnectionBannerProps {
  variant: "missing" | "expired"
}

export function ConnectionBanner({ variant }: ConnectionBannerProps) {
  const isExpired = variant === "expired"
  const Icon = isExpired ? AlertTriangle : Plug
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between",
        isExpired
          ? "border-rose-200 bg-rose-50 text-rose-900"
          : "border-amber-200 bg-amber-50 text-amber-900"
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">
            {isExpired
              ? "Sua conexão com o Meta expirou"
              : "Conecte sua conta de anúncios"}
          </p>
          <p className="text-sm opacity-80">
            {isExpired
              ? "Os dados pararam de chegar há mais de 24h. Reconecte para continuar recebendo análises."
              : "Sem essa conexão a gente não consegue calcular suas métricas nem gerar Decisões."}
          </p>
        </div>
      </div>
      <Button asChild variant={isExpired ? "destructive" : "default"} size="sm">
        <Link href="/connect">
          {isExpired ? "Reconectar agora" : "Conectar Meta Ads"}
        </Link>
      </Button>
    </div>
  )
}
