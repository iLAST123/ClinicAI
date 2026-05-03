import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

import { BrandLogo } from "@/components/layout/BrandLogo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingCta } from "./pricing-cta"

export const metadata: Metadata = {
  title: "Planos — ClinicAI",
  description: "Escolha o plano que cabe no momento da sua clínica.",
}

const plans = [
  {
    id: "solo" as const,
    name: "Solo",
    price: "R$ 597",
    suffix: "/mês",
    description: "Pra clínica que toca o marketing internamente.",
    features: [
      "Sync diário de Meta Ads",
      "Dashboard de CPL e custo por agendamento",
      "Decisão da Semana por WhatsApp",
      "Suporte por email",
    ],
  },
  {
    id: "managed" as const,
    name: "Managed",
    price: "R$ 1.997",
    suffix: "/mês",
    description: "Time da ClinicAI roda suas campanhas com você.",
    features: [
      "Tudo do Solo",
      "Gestão semanal das campanhas",
      "Reuniões mensais de estratégia",
      "Otimização de copy + criativo",
    ],
    highlighted: true,
  },
  {
    id: "expansion" as const,
    name: "Expansion",
    price: "R$ 3.497",
    suffix: "/mês",
    description: "Pra rede de clínicas que quer escalar.",
    features: [
      "Tudo do Managed",
      "Suporte multi-unidade",
      "Integração com CRM próprio",
      "Account manager dedicado",
    ],
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-brand/5">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <BrandLogo href="/" />
        <Button asChild variant="ghost">
          <Link href="/login">Entrar</Link>
        </Button>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:py-16">
        <Badge variant="muted" className="mb-4">
          Planos transparentes
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          O CMO de dados da sua clínica, por menos que uma diária de UTI.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Você escolhe o ritmo. Cancela quando quiser.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.highlighted
                ? "border-brand shadow-lg ring-2 ring-brand/20"
                : ""
            }
          >
            <CardHeader>
              {plan.highlighted && (
                <Badge className="mb-2 w-fit">Mais escolhido</Badge>
              )}
              <CardTitle className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold">{plan.name}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <p className="pt-3">
                <span className="text-4xl font-semibold tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.suffix}
                </span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <PricingCta plan={plan.id} highlighted={plan.highlighted} />
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
