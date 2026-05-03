import type { Metadata } from "next"

import { AdminClientsView } from "./clients-view"

export const metadata: Metadata = {
  title: "Admin — ClinicAI",
  description: "Painel interno: clientes, status e decisões.",
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Clientes</h1>
        <p className="text-sm text-muted-foreground">
          Visão geral de todas as clínicas, status do Meta e última decisão gerada.
        </p>
      </header>
      <AdminClientsView />
    </div>
  )
}
