import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatPercent } from "@/lib/format"

interface MetricCardProps {
  label: string
  value: string
  helper?: string
  change?: number
  /** "lower-is-better" inverts the color scale (good when CPL goes down). */
  inverse?: boolean
}

export function MetricCard({
  label,
  value,
  helper,
  change,
  inverse,
}: MetricCardProps) {
  const hasChange = typeof change === "number"
  const isPositive = hasChange && change! > 0
  const isNegative = hasChange && change! < 0
  const isGood = inverse ? isNegative : isPositive

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <div className="flex items-center justify-between text-xs">
          {hasChange ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
                isGood
                  ? "bg-emerald-100 text-emerald-700"
                  : isPositive || isNegative
                  ? "bg-rose-100 text-rose-700"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : isNegative ? (
                <ArrowDownRight className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              {formatPercent(change!)}
            </span>
          ) : (
            <span />
          )}
          {helper && (
            <span className="text-muted-foreground">{helper}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
