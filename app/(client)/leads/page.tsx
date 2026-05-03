import type { Metadata } from "next"

import { LeadsTable } from "./leads-table"

export const metadata: Metadata = {
  title: "Leads — ClinicAI",
  description: "Leads capturados pelas suas campanhas Meta Ads.",
}

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Toda pessoa que preencheu um formulário de campanha aparece aqui.
        </p>
      </header>
      <LeadsTable />
    </div>
  )
}
