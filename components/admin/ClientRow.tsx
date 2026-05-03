import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/format"
import type { AdminClientRow as Row } from "@/types"

const planLabels = {
  solo: "Solo",
  managed: "Managed",
  expansion: "Expansion",
} as const

const subscriptionVariant: Record<
  Row["subscription"]["status"],
  "success" | "muted" | "warning" | "destructive"
> = {
  active: "success",
  trial: "warning",
  inactive: "muted",
  cancelled: "destructive",
}

const metaVariant: Record<
  Row["meta_status"],
  "success" | "warning" | "destructive"
> = {
  active: "success",
  expired: "warning",
  disconnected: "destructive",
}

export function ClientRow({
  row,
  onGenerate,
}: {
  row: Row
  onGenerate: (clinicId: string) => void
}) {
  return (
    <TableRow>
      <TableCell>
        <p className="font-medium">{row.clinic.name}</p>
        <p className="text-xs text-muted-foreground">
          {row.clinic.specialty ?? "—"}
        </p>
      </TableCell>
      <TableCell>
        <Badge variant="muted">{planLabels[row.subscription.plan]}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={subscriptionVariant[row.subscription.status]}>
          {row.subscription.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={metaVariant[row.meta_status]}>{row.meta_status}</Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {row.last_decision_date ? formatDate(row.last_decision_date) : "—"}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onGenerate(row.clinic.id)}
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Gerar decisão
          </Button>
          <Button asChild size="sm">
            <Link href={`/admin/clients/${row.clinic.id}`}>
              Ver
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
