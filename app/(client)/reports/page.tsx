import type { Metadata } from "next"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Relatórios — ClinicAI",
  description: "KPIs operacionais e financeiros da clínica.",
}

const kpis = [
  ["Taxa de no-show", "11,2%"],
  ["Taxa de confirmação", "72,8%"],
  ["Ocupação da agenda", "83%"],
  ["Receita mensal", "R$ 128.450"],
  ["Ticket médio", "R$ 534"],
  ["Pacientes inativos (6m)", "94"],
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Relatórios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão consolidada para operação clínica, financeiro e retenção.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map(([label, value]) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
