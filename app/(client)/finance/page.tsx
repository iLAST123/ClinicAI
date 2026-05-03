import type { Metadata } from "next"
import { CircleDollarSign, FileText, Wallet } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Financeiro — ClinicAI",
  description: "Resumo de faturamento, recebimentos e pendências.",
}

const cards = [
  { label: "Receita do mês", value: "R$ 128.450", icon: CircleDollarSign },
  { label: "A receber", value: "R$ 24.980", icon: Wallet },
  { label: "Faturas em atraso", value: "12", icon: FileText },
]

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Financeiro</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestão de faturamento, contas a receber e cobranças da clínica.
          </p>
        </div>
        <Button>Emitir cobrança</Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{card.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-2xl font-semibold">{card.value}</p>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
