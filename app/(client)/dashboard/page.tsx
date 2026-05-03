import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist"

import { CampaignTable } from "@/components/dashboard/CampaignTable"
import { ConnectionBanner } from "@/components/dashboard/ConnectionBanner"
import { CplChart } from "@/components/dashboard/CplChart"
import { MetricCard } from "@/components/dashboard/MetricCard"
import { PeriodFilter } from "@/components/dashboard/PeriodFilter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCampaigns } from "@/lib/mock/campaigns"
import { mockClinic, mockMetaConnection } from "@/lib/mock/clinic"
import { mockDecisions } from "@/lib/mock/decisions"
import { mockCplSeries, mockMetrics } from "@/lib/mock/metrics"
import { formatBRL, formatPercent } from "@/lib/format"

export const metadata: Metadata = {
  title: "Dashboard — ClinicAI",
  description: "Métricas de Meta Ads e agendamentos da sua clínica.",
}

export default function DashboardPage() {
  const currentDecision = mockDecisions[0]
  const showMissing = mockMetaConnection.status === "disconnected"
  const showExpired = mockMetaConnection.status === "expired"

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Olá, {mockClinic.name.split(" ")[0]} 👋
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Como sua clínica está performando
          </h1>
        </div>
        <PeriodFilter />
      </header>

      {showMissing && <ConnectionBanner variant="missing" />}
      {showExpired && <ConnectionBanner variant="expired" />}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Custo por Lead"
          value={formatBRL(mockMetrics.avg_cost_per_lead)}
          change={mockMetrics.week_over_week_cpl_change}
          inverse
          helper="vs semana anterior"
        />
        <MetricCard
          label="Custo por Paciente Agendado"
          value={formatBRL(mockMetrics.avg_cost_per_appointment)}
          helper={`${mockMetrics.total_appointments} agendamentos`}
        />
        <MetricCard
          label="Conversão Lead → Agenda"
          value={`${mockMetrics.conversion_rate.toFixed(1).replace(".", ",")}%`}
          helper={`${mockMetrics.total_leads} leads no período`}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CplChart data={mockCplSeries} />
        </div>
        <Card className="bg-brand text-brand-foreground">
          <CardHeader className="space-y-2 pb-3">
            <Badge
              variant="secondary"
              className="w-fit bg-white/20 text-white"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Decisão desta semana
            </Badge>
            <CardTitle className="text-xl text-white">
              {currentDecision.action_recommended}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-white/90">
            <p>• {currentDecision.highlight_metric_1}</p>
            <p>• {currentDecision.highlight_metric_2}</p>
            <p>• {currentDecision.highlight_metric_3}</p>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="mt-4 w-full bg-white text-brand hover:bg-white/90"
            >
              <Link href="/decisions">
                Ver histórico completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <CampaignTable campaigns={mockCampaigns} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
        Investido no período: <strong>{formatBRL(mockMetrics.total_spend)}</strong>{" "}
        · Melhor campanha: <strong>{mockMetrics.best_campaign}</strong> · Variação
        do CPL: <strong>{formatPercent(mockMetrics.week_over_week_cpl_change)}</strong>
        </div>
        <OnboardingChecklist />
      </section>

      <section className="rounded-lg border bg-muted/20 p-4 text-xs text-muted-foreground">
        Dica: ative lembretes 48h/24h e sincronização de calendário para reduzir no-show.
      </section>
    </div>
  )
}
