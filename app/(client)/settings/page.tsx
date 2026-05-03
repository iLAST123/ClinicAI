import type { Metadata } from "next"

import { SettingsView } from "./settings-view"

export const metadata: Metadata = {
  title: "Configurações — ClinicAI",
  description: "Edite os dados da clínica, assinatura e conexões.",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Atualize as informações que alimentam suas Decisões e gerencie sua
          assinatura.
        </p>
      </header>
      <SettingsView />
    </div>
  )
}
