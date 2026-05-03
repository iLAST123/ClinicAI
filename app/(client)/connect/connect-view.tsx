"use client"

import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Plug,
  PlugZap,
} from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { mockMetaConnection } from "@/lib/mock/clinic"
import { formatDateLong } from "@/lib/format"
import type { MetaConnection } from "@/types"

type Status = MetaConnection["status"]

export function ConnectView() {
  const [status, setStatus] = useState<Status>(mockMetaConnection.status)

  return (
    <div className="space-y-6">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm">Modo demo — alterne os estados</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={status} onValueChange={(v) => setStatus(v as Status)}>
            <TabsList>
              <TabsTrigger value="disconnected">Não conectado</TabsTrigger>
              <TabsTrigger value="active">Conectado</TabsTrigger>
              <TabsTrigger value="expired">Expirado</TabsTrigger>
            </TabsList>
            <TabsContent value="disconnected" className="pt-2 text-xs text-muted-foreground">
              Ainda não plugou o Meta — sem dados.
            </TabsContent>
            <TabsContent value="active" className="pt-2 text-xs text-muted-foreground">
              Tudo funcionando, dados sincronizando todo dia às 6h.
            </TabsContent>
            <TabsContent value="expired" className="pt-2 text-xs text-muted-foreground">
              O token caducou — o sync para até reconectar.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {status === "disconnected" && <DisconnectedCard />}
      {status === "active" && <ConnectedCard onDisconnect={() => setStatus("disconnected")} />}
      {status === "expired" && <ExpiredCard />}
    </div>
  )
}

function DisconnectedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Plug className="h-4 w-4 text-muted-foreground" />
          Sem conexão ativa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>
          Vamos pedir acesso de leitura à sua conta de anúncios para coletar
          investimento, leads e performance das campanhas. Você pode revogar
          quando quiser.
        </p>
        <Button onClick={() => toast.success("OAuth do Meta inicia na Fase 2")}>
          <PlugZap className="mr-2 h-4 w-4" />
          Conectar Meta Ads
        </Button>
      </CardContent>
    </Card>
  )
}

function ConnectedCard({ onDisconnect }: { onDisconnect: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Conectado
          <Badge variant="success">ativo</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <Row label="Conta de anúncios" value={mockMetaConnection.ad_account_name ?? "—"} />
        <Row label="ID da conta" value={mockMetaConnection.ad_account_id} />
        <Row
          label="Conectado em"
          value={formatDateLong(mockMetaConnection.connected_at)}
        />
        <Row
          label="Token expira em"
          value={
            mockMetaConnection.token_expires_at
              ? formatDateLong(mockMetaConnection.token_expires_at)
              : "—"
          }
        />
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => {
              toast.success("Conta desconectada (mock)")
              onDisconnect()
            }}
          >
            Desconectar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ExpiredCard() {
  return (
    <Card className="border-rose-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-rose-900">
          <AlertTriangle className="h-4 w-4" />
          Conexão expirada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="rounded-md bg-rose-50 p-3 text-rose-900">
          O token caducou e o sync diário do Meta parou. Reconecte em 1 clique
          para retomar os dados.
        </div>
        <Button
          variant="destructive"
          onClick={() => toast.success("Reconexão simulada")}
        >
          Reconectar agora
        </Button>
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b py-2 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
