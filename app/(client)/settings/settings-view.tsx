"use client"

import Link from "next/link"
import { CheckCircle2, ExternalLink, Link2 } from "lucide-react"
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



const professionals = [
  { id: "prof-ana", name: "Dra. Ana", calendar: "Google" },
  { id: "prof-bruno", name: "Dr. Bruno", calendar: "Microsoft" },
]
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
        <TabsTrigger value="security">Segurança</TabsTrigger>
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
            <CardTitle className="text-base">Integração de calendário (OAuth)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {professionals.map((professional) => (
              <div key={professional.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{professional.name}</p>
                    <p className="text-xs text-muted-foreground">Profissional: {professional.id}</p>
                  </div>
                  <Badge variant="secondary">{professional.calendar}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast.success(`OAuth Google iniciado para ${professional.name} (mock)`) }>
                    <Link2 className="mr-2 h-4 w-4" />
                    Conectar Google
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success(`OAuth Microsoft iniciado para ${professional.name} (mock)`) }>
                    <Link2 className="mr-2 h-4 w-4" />
                    Conectar Microsoft
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

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

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">LGPD e Controle de Acesso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Defina perfis com permissão granular e mantenha trilha de auditoria para dados sensíveis.
            </p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Administrador: acesso completo.</li>
              <li>Médico/Enfermagem: prontuário e evolução clínica.</li>
              <li>Recepção: agenda e cadastro de pacientes.</li>
              <li>Financeiro: faturamento e recebimentos.</li>
            </ul>
            <div className="rounded-md border bg-muted/30 p-3">
              <p><strong>Auditoria:</strong> 14 acessos a prontuário registrados hoje.</p>
              <p><strong>Consentimento LGPD:</strong> 92% dos pacientes com termo ativo.</p>
            </div>
            <Button onClick={() => toast.success("Configuração de roles salva (mock)")}>
              Salvar políticas de acesso
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  )
}
