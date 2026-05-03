import type { Metadata } from "next"

import { ConnectView } from "./connect-view"

export const metadata: Metadata = {
  title: "Conectar Anúncios — ClinicAI",
  description: "Conecte sua conta de Meta Ads para começar a receber dados.",
}

export default function ConnectPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Conectar Meta Ads</h1>
        <p className="text-sm text-muted-foreground">
          Sem essa conexão a gente não consegue calcular nada. É um clique.
        </p>
      </header>
      <ConnectView />
    </div>
  )
}
