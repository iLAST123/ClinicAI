"use client"

import { useState } from "react"
import { CalendarPlus, FileUp, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { mockAppointments } from "@/lib/mock/appointments"
import { buildReminderJobs } from "@/lib/notifications/jobs"
import { formatDate } from "@/lib/format"
import type { Appointment, CommunicationEvent } from "@/types"

const statusLabels: Record<Appointment["status"], string> = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  no_show: "No-show",
  cancelled: "Cancelado",
}

const statusVariant: Record<
  Appointment["status"],
  "default" | "secondary" | "success" | "destructive" | "muted" | "warning"
> = {
  scheduled: "secondary",
  confirmed: "default",
  completed: "success",
  no_show: "destructive",
  cancelled: "muted",
}

const sourceLabels: Record<Appointment["source"], string> = {
  manual: "Manual",
  csv_import: "CSV",
  crm_webhook: "CRM",
  whatsapp: "WhatsApp",
}

export function AppointmentsView() {
  const [items, setItems] = useState<Appointment[]>(mockAppointments)
  const [timeline, setTimeline] = useState<CommunicationEvent[]>([])

  function updateStatus(id: string, status: Appointment["status"]) {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
    toast.success(`Status atualizado para "${statusLabels[status]}"`)
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <ImportCsvDialog />
        <CreateAppointmentDialog onCreate={(appointment) => {
          setItems((prev) => [appointment, ...prev])
          buildReminderJobs(appointment)
          const now = new Date().toISOString()
          setTimeline((prev) => [...prev,
            { id: crypto.randomUUID(), appointment_id: appointment.id, event_type: "enviado", channel: "whatsapp", content: "Lembretes 48h e 24h agendados", created_at: now },
            { id: crypto.randomUUID(), appointment_id: appointment.id, event_type: "entregue", channel: "whatsapp", content: "Fila de envio criada", created_at: now },
          ])
        }} />
      </div>

      <Card>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Procedimento</TableHead>
                <TableHead>Campanha</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {a.appointment_date ? formatDate(a.appointment_date) : "—"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {a.patient_name ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {a.procedure ?? "—"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {a.campaign_name ?? <span className="italic">Sem atribuição</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="muted">{sourceLabels[a.source]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[a.status]}>
                      {statusLabels[a.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{timeline.filter((t) => t.appointment_id === a.id).slice(-2).map((t) => t.event_type).join(" → ") || "Sem eventos"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mudar status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(Object.keys(statusLabels) as Appointment["status"][]).map(
                          (s) => (
                            <DropdownMenuItem
                              key={s}
                              onClick={() => {
                                updateStatus(a.id, s)
                                if (s === "confirmed") {
                                  const now = new Date().toISOString()
                                  setTimeline((prev) => [...prev,
                                    { id: crypto.randomUUID(), appointment_id: a.id, event_type: "respondido", channel: "whatsapp", content: "Paciente respondeu CONFIRMAR", created_at: now },
                                  ])
                                }
                              }}
                            >
                              {statusLabels[s]}
                            </DropdownMenuItem>
                          )
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

function CreateAppointmentDialog({ onCreate }: { onCreate: (a: Appointment) => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Adicionar agendamento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo agendamento</DialogTitle>
          <DialogDescription>
            Preencha os dados — a campanha de origem é o que conecta o agendamento
            ao Meta Ads.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const form = new FormData(e.currentTarget)
            const appointment: Appointment = {
              id: crypto.randomUUID(),
              clinic_id: "mock-clinic",
              lead_id: null,
              campaign_id: String(form.get("campaign") || "") || null,
              campaign_name: null,
              patient_name: String(form.get("patient") || ""),
              procedure: String(form.get("procedure") || ""),
              appointment_date: String(form.get("date") || ""),
              status: "scheduled",
              source: "whatsapp",
              notes: String(form.get("notes") || ""),
              created_at: new Date().toISOString(),
            }
            onCreate(appointment)
            toast.success("Agendamento criado (mock)")
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="patient">Nome do paciente</Label>
            <Input id="patient" name="patient" placeholder="Maria Silva" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input id="date" name="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="scheduled">
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(statusLabels) as Appointment["status"][]).map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s]}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="procedure">Procedimento</Label>
            <Input id="procedure" name="procedure" placeholder="Avaliação, Botox, etc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign">Campanha de origem (opcional)</Label>
            <Input id="campaign" name="campaign" placeholder="ID ou nome da campanha do Meta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ImportCsvDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Importar CSV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importar agendamentos via CSV</DialogTitle>
          <DialogDescription>
            UTF-8, separado por vírgula. Datas no formato AAAA-MM-DD.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="rounded-md border bg-muted/40 p-3">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
              Cabeçalho esperado
            </p>
            <pre className="overflow-x-auto text-xs">
data_agendamento,procedimento,status,campanha_id,nome_paciente,observacoes
            </pre>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Obrigatórios: data_agendamento, procedimento, status</li>
            <li>• Opcionais: campanha_id, nome_paciente, observacoes</li>
            <li>
              • Status válidos: scheduled, confirmed, completed, no_show, cancelled
            </li>
          </ul>
          <Input
            type="file"
            accept=".csv"
            onChange={() => toast.success("Arquivo selecionado (mock)")}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={() => toast.success("Importação simulada")}>
            Importar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
