import type { Metadata } from "next"
import { Lightbulb } from "lucide-react"

import { DecisionCard } from "@/components/decisions/DecisionCard"
import { EmptyState } from "@/components/ui/EmptyState"
import { mockDecisions } from "@/lib/mock/decisions"

export const metadata: Metadata = {
  title: "Decisões da Semana — ClinicAI",
  description: "Análises e ações geradas pela IA toda segunda.",
}

export default function DecisionsPage() {
  if (mockDecisions.length === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">
            Decisões da Semana
          </h1>
        </header>
        <EmptyState
          icon={Lightbulb}
          title="Sua primeira Decisão chega na próxima segunda"
          description="Toda segunda às 8h a IA gera 3 números + 1 ação clara baseada nos dados reais da sua semana."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Decisões da Semana
        </h1>
        <p className="text-sm text-muted-foreground">
          Histórico das análises geradas para sua clínica.
        </p>
      </header>
      <div className="space-y-4">
        {mockDecisions.map((d) => (
          <DecisionCard key={d.id} decision={d} />
        ))}
      </div>
    </div>
  )
}
