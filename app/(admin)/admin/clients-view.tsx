"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClientRow } from "@/components/admin/ClientRow"
import { mockAdminClients } from "@/lib/mock/clients"

type StatusFilter = "all" | "active" | "trial" | "inactive" | "cancelled"
type PlanFilter = "all" | "solo" | "managed" | "expansion"

export function AdminClientsView() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all")

  const filtered = useMemo(() => {
    return mockAdminClients.filter((row) => {
      const statusMatch =
        statusFilter === "all" || row.subscription.status === statusFilter
      const planMatch =
        planFilter === "all" || row.subscription.plan === planFilter
      return statusMatch && planMatch
    })
  }, [statusFilter, planFilter])

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Status</p>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Plano</p>
          <Select
            value={planFilter}
            onValueChange={(v) => setPlanFilter(v as PlanFilter)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="managed">Managed</SelectItem>
              <SelectItem value="expansion">Expansion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clínica</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Assinatura</TableHead>
                <TableHead>Meta Ads</TableHead>
                <TableHead>Última decisão</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((row) => (
                <ClientRow
                  key={row.clinic.id}
                  row={row}
                  onGenerate={(id) =>
                    toast.success(`Geração de decisão disparada para ${id} (mock)`)
                  }
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
