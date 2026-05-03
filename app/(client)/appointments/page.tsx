import type { Metadata } from "next"

import { AppointmentsView } from "./appointments-view"

export const metadata: Metadata = {
  title: "Agendamentos — ClinicAI",
  description: "Pacientes que entraram na cadeira por conta dos seus anúncios.",
}

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Agendamentos</h1>
        <p className="text-sm text-muted-foreground">
          Cada agendamento ligado à sua campanha de origem fecha o cálculo de custo
          por paciente.
        </p>
      </header>
      <AppointmentsView />
    </div>
  )
}
