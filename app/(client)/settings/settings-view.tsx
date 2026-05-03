"use client"

import Link from "next/link"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  mockClinic,
  mockMetaConnection,
  mockSubscription,
} from "@/lib/mock/clinic"
import { formatDateLong } from "@/lib/format"
import type { SubscriptionPlan } from "@/types"

const planLabels: Record<SubscriptionPlan, string> = {
  solo: "Solo — R$ 597/mês",
  managed: "Managed — R$ 1.997/mês",
  expansion: "Expansion — R$ 3.497/mês",
}

export function SettingsView() {
  const data = mockClinic.onboarding_data

  return (
    <Tabs defaultValue="clinic" className="space-y-4">
      <TabsList>
        <TabsTrigger value="clinic">Clínica</TabsTrigger>
        <TabsTrigger value="subscription">Assinatura</TabsTrigger>
        <TabsTrigger value="connections">Conexões</TabsTrigger>
      </TabsList>

      <TabsContent value="clinic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Dados da clínica</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                toast.success("Configurações salvas")
              }}
            >
              <div className="space-y-2">
                <Label>Nome da clínica</Label>
                <Input defaultValue={data.clinic_name} />
              </div>
              <div className="space-y-2">
                <Label>Especialidade</Label>
                <Input defaultValue={data.specialty} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Diferenciais</Label>
                <Textarea defaultValue={data.differentials} rows={2} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Perfil do paciente ideal</Label>
                <Textarea defaultValue={data.patient_profile} rows={2} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Procedimentos prioritários</Label>
                <Textarea defaultValue={data.priority_procedures} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Orçamento mensal</Label>
                <Input defaultValue={data.monthly_budget} />
              </div>
              <div className="space-y-2">
                <Label>Tempo de resposta</Label>
                <Input defaultValue={data.response_time} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Salvar alterações</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="subscription" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Plano atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-2xl font-semibold">
                  {planLabels[mockSubscription.plan]}
                </p>
                <p className="text-sm text-muted-foreground">
                  Próxima cobrança em{" "}
                  {mockSubscription.next_billing_date
                    ? formatDateLong(mockSubscription.next_billing_date)
                    : "—"}
                </p>
              </div>
              <Badge variant="success">{mockSubscription.status}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => toast.success("Stripe Customer Portal (mock)")}
              >
                Gerenciar assinatura
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button asChild variant="ghost">
                <Link href="/pricing">Mudar de plano</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="connections" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Meta Ads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="font-medium">
                {mockMetaConnection.ad_account_name}
              </span>
              <Badge variant="success">{mockMetaConnection.status}</Badge>
            </div>
            <p className="text-muted-foreground">
              Conectado em {formatDateLong(mockMetaConnection.connected_at)}.
              {mockMetaConnection.token_expires_at &&
                ` Token expira em ${formatDateLong(mockMetaConnection.token_expires_at)}.`}
            </p>
            <Button asChild variant="outline">
              <Link href="/connect">Gerenciar conexão</Link>
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
