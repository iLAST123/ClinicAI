"use client"

import { useState } from "react"
import { CalendarPlus, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockLeads } from "@/lib/mock/leads"
import { formatDate } from "@/lib/format"
import type { Lead } from "@/types"
import { Users } from "lucide-react"

const statusLabels: Record<Lead["status"], string> = {
  new: "Novo",
  contacted: "Contatado",
  scheduled: "Agendado",
  lost: "Perdido",
}

const statusVariant: Record<
  Lead["status"],
  "default" | "secondary" | "success" | "destructive" | "muted" | "warning"
> = {
  new: "warning",
  contacted: "secondary",
  scheduled: "success",
  lost: "destructive",
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)

  function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    )
    toast.success(`Lead atualizado para "${statusLabels[status]}"`)
  }

  if (leads.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Nenhum lead ainda"
        description="Assim que sua campanha Meta capturar leads, eles vão aparecer aqui."
      />
    )
  }

  return (
    <Card>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Campanha</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(lead.created_at)}
                </TableCell>
                <TableCell className="font-medium">{lead.lead_name ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.lead_phone ?? "—"}
                </TableCell>
                <TableCell className="max-w-[240px] truncate text-sm text-muted-foreground">
                  {lead.campaign_name ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[lead.status]}>
                    {statusLabels[lead.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {lead.status === "contacted" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          toast.info("Modal de criação de agendamento (mock)")
                        }
                      >
                        <CalendarPlus className="mr-1 h-3.5 w-3.5" />
                        Agendar
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mudar status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(Object.keys(statusLabels) as Lead["status"][]).map(
                          (s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => updateStatus(lead.id, s)}
                            >
                              {statusLabels[s]}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
