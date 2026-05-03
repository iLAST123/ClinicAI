import { CheckCircle2, Circle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const items = [
  "Cadastre profissionais e horários de atendimento",
  "Configure procedimentos e duração média",
  "Conecte Google/Outlook Calendar",
  "Cadastre seu primeiro paciente",
  "Faça o primeiro agendamento com confirmação",
]

export function OnboardingChecklist() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Checklist de onboarding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {items.map((item, index) => (
          <div key={item} className="flex items-start gap-2">
            {index === 0 ? (
              <Circle className="mt-0.5 h-4 w-4 text-brand" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
            )}
            <span>{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
