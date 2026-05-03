import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"

import { CampaignTable } from "@/components/dashboard/CampaignTable"
import { CplChart } from "@/components/dashboard/CplChart"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { DecisionCard } from "@/components/decisions/DecisionCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAdminClients } from "@/lib/mock/clients"
import { mockCampaigns } from "@/lib/mock/campaigns"
import { mockDecisions } from "@/lib/mock/decisions"
import { mockCplSeries, mockMetrics } from "@/lib/mock/metrics"
import { formatBRL, formatDateLong } from "@/lib/format"
import { GenerateDecisionButton } from "./generate-button"

export const metadata: Metadata = {
  title: "Cliente — Admin ClinicAI",
}

export default function AdminClientPage({
  params,
}: {
  params: { id: string }
}) {
  const row = mockAdminClients.find((c) => c.clinic.id === params.id)
  if (!row) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-2">
          <Link href="/admin">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {row.clinic.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {row.clinic.specialty ?? "—"} · {row.clinic.phone ?? "sem telefone"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="muted">Plano {row.subscription.plan}</Badge>
            <Badge variant={row.meta_status === "active" ? "success" : "warning"}>
              Meta {row.meta_status}
            </Badge>
            <Badge variant="muted">
              Onboarding {row.clinic.onboarding_completed ? "completo" : `etapa ${row.clinic.onboarding_step}/5`}
            </Badge>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Custo por Lead"
          value={formatBRL(mockMetrics.avg_cost_per_lead)}
          change={mockMetrics.week_over_week_cpl_change}
          inverse
        />
        <MetricCard
          label="Custo por Paciente"
          value={formatBRL(mockMetrics.avg_cost_per_appointment)}
          helper={`${mockMetrics.total_appointments} agendamentos`}
        />
        <MetricCard
          label="Conversão"
          value={`${mockMetrics.conversion_rate.toFixed(1).replace(".", ",")}%`}
          helper={`${mockMetrics.total_leads} leads`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CplChart data={mockCplSeries} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-brand" />
              Geração manual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Última decisão:{" "}
              {row.last_decision_date
                ? formatDateLong(row.last_decision_date)
                : "nenhuma"}
            </p>
            <GenerateDecisionButton clinicId={row.clinic.id} />
          </CardContent>
        </Card>
      </section>

      <section>
        <CampaignTable campaigns={mockCampaigns} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Histórico de decisões</h2>
        <div className="space-y-3">
          {mockDecisions.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      </section>
    </div>
  )
}
