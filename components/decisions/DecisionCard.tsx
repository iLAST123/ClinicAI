import { Sparkles } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateLong } from "@/lib/format"
import type { WeeklyDecision } from "@/types"

export function DecisionCard({ decision }: { decision: WeeklyDecision }) {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Semana de {formatDateLong(decision.week_date)}
          </p>
          {decision.sent_via_whatsapp && (
            <Badge variant="muted">Enviada por WhatsApp</Badge>
          )}
        </div>
        <CardTitle className="flex items-start gap-2 text-lg">
          <Sparkles className="mt-1 h-4 w-4 shrink-0 text-brand" />
          <span>{decision.action_recommended}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 rounded-md bg-muted/40 p-3 text-sm sm:grid-cols-3">
          {decision.highlight_metric_1 && (
            <div className="rounded bg-background p-2">
              {decision.highlight_metric_1}
            </div>
          )}
          {decision.highlight_metric_2 && (
            <div className="rounded bg-background p-2">
              {decision.highlight_metric_2}
            </div>
          )}
          {decision.highlight_metric_3 && (
            <div className="rounded bg-background p-2">
              {decision.highlight_metric_3}
            </div>
          )}
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="content" className="border-b-0">
            <AccordionTrigger className="text-sm text-brand hover:no-underline">
              Ver análise completa
            </AccordionTrigger>
            <AccordionContent className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {decision.content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
