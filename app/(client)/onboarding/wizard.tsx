"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Link2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { OnboardingStep } from "@/components/onboarding/OnboardingStep"
import type { OnboardingData } from "@/types"

const STORAGE_KEY = "clinicai:onboarding"
const TOTAL_STEPS = 5

interface PersistedState {
  step: number
  data: OnboardingData
}

const stepTitles = [
  "Identidade da clínica",
  "Paciente ideal",
  "Oferta",
  "Processo comercial",
  "Campanhas",
] as const

const stepDescriptions = [
  "Como você quer que a IA fale por você. Quanto mais específico, melhor.",
  "Pra quem você está vendendo? Sua resposta calibra os anúncios.",
  "O que entra no anúncio e qual a barreira de entrada do paciente.",
  "O caminho do lead até a cadeira: quem, como, quando.",
  "Onde investir, quanto, e o que está atrapalhando hoje.",
] as const

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: PersistedState = JSON.parse(raw)
        if (parsed.step >= 1 && parsed.step <= TOTAL_STEPS) setStep(parsed.step)
        if (parsed.data) setData(parsed.data)
      }
    } catch {
      // ignore corrupt state
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }))
  }, [step, data, hydrated])

  function update<K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      toast.success(`Etapa ${step} salva`)
      setStep((s) => s + 1)
      return
    }
    toast.success("Onboarding concluído!")
    localStorage.removeItem(STORAGE_KEY)
    router.push("/dashboard")
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1)
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand">
          Etapa {step} de {TOTAL_STEPS}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Vamos configurar sua clínica
        </h1>
        <p className="mt-2 text-muted-foreground">
          Essas respostas alimentam a IA que vai gerar suas Decisões da Semana.
        </p>
        <Progress value={progress} className="mt-6" />
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <OnboardingStep title={stepTitles[0]} description={stepDescriptions[0]}>
            <Field
              label="Nome da clínica"
              id="clinic_name"
              value={data.clinic_name ?? ""}
              onChange={(v) => update("clinic_name", v)}
              placeholder="Clínica Sorria Mais"
            />
            <Field
              label="Especialidade principal"
              id="specialty"
              value={data.specialty ?? ""}
              onChange={(v) => update("specialty", v)}
              placeholder="Odontologia estética"
            />
            <Field
              label="Diferenciais (3-5 frases)"
              id="differentials"
              textarea
              value={data.differentials ?? ""}
              onChange={(v) => update("differentials", v)}
              placeholder="Atendimento humanizado, tecnologia de ponta, parcelamento facilitado..."
            />
            <Field
              label="Tom de comunicação"
              id="communication_tone"
              value={data.communication_tone ?? ""}
              onChange={(v) => update("communication_tone", v)}
              placeholder="Acolhedor, profissional, próximo"
            />
          </OnboardingStep>
        )}

        {step === 2 && (
          <OnboardingStep title={stepTitles[1]} description={stepDescriptions[1]}>
            <Field
              label="Perfil do paciente ideal"
              id="patient_profile"
              textarea
              value={data.patient_profile ?? ""}
              onChange={(v) => update("patient_profile", v)}
              placeholder="Mulheres 30-45 anos, classe B, querem mais autoestima..."
            />
            <Field
              label="Faixa etária"
              id="patient_age_range"
              value={data.patient_age_range ?? ""}
              onChange={(v) => update("patient_age_range", v)}
              placeholder="28-45"
            />
            <Field
              label="Objeções mais comuns"
              id="common_objections"
              textarea
              value={data.common_objections ?? ""}
              onChange={(v) => update("common_objections", v)}
              placeholder="Preço, medo de dor, tempo de tratamento..."
            />
          </OnboardingStep>
        )}

        {step === 3 && (
          <OnboardingStep title={stepTitles[2]} description={stepDescriptions[2]}>
            <Field
              label="Procedimentos prioritários"
              id="priority_procedures"
              textarea
              value={data.priority_procedures ?? ""}
              onChange={(v) => update("priority_procedures", v)}
              placeholder="Lentes de contato, clareamento, harmonização..."
            />
            <Field
              label="Faixa de preço"
              id="price_range"
              value={data.price_range ?? ""}
              onChange={(v) => update("price_range", v)}
              placeholder="R$ 3.000 a R$ 25.000"
            />
            <Field
              label="Condições de pagamento"
              id="payment_conditions"
              textarea
              value={data.payment_conditions ?? ""}
              onChange={(v) => update("payment_conditions", v)}
              placeholder="Até 18x sem juros, 10% off à vista..."
            />
          </OnboardingStep>
        )}

        {step === 4 && (
          <OnboardingStep title={stepTitles[3]} description={stepDescriptions[3]}>
            <Field
              label="Como você agenda hoje?"
              id="scheduling_process"
              textarea
              value={data.scheduling_process ?? ""}
              onChange={(v) => update("scheduling_process", v)}
              placeholder="WhatsApp + agenda Google, recepção liga de volta..."
            />
            <Field
              label="CRM utilizado"
              id="crm_used"
              value={data.crm_used ?? ""}
              onChange={(v) => update("crm_used", v)}
              placeholder="Nenhum / RD Station / HubSpot..."
            />
            <Field
              label="Horários de atendimento"
              id="available_hours"
              value={data.available_hours ?? ""}
              onChange={(v) => update("available_hours", v)}
              placeholder="Seg-Sex 9h-19h, Sáb 9h-13h"
            />
            <Field
              label="Tempo médio de resposta a leads"
              id="response_time"
              value={data.response_time ?? ""}
              onChange={(v) => update("response_time", v)}
              placeholder="Em até 1h no horário comercial"
            />
            <div className="rounded-md border bg-muted/40 p-4 text-sm">
              <p className="font-medium">Conexão de calendário por profissional (OAuth)</p>
              <p className="mt-1 text-muted-foreground">Você pode conectar Google Calendar ou Microsoft Graph por dentista para sincronizar automaticamente agendamentos.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => toast.success("OAuth Google iniciado (mock)")}>
                  <Link2 className="mr-2 h-4 w-4" />Conectar Google
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => toast.success("OAuth Microsoft iniciado (mock)")}>
                  <Link2 className="mr-2 h-4 w-4" />Conectar Microsoft
                </Button>
              </div>
            </div>
          </OnboardingStep>
        )}

        {step === 5 && (
          <OnboardingStep title={stepTitles[4]} description={stepDescriptions[4]}>
            <Field
              label="Procedimentos para anunciar"
              id="procedures_to_advertise"
              textarea
              value={data.procedures_to_advertise ?? ""}
              onChange={(v) => update("procedures_to_advertise", v)}
              placeholder="Lentes de contato, harmonização orofacial..."
            />
            <Field
              label="Orçamento mensal de mídia"
              id="monthly_budget"
              value={data.monthly_budget ?? ""}
              onChange={(v) => update("monthly_budget", v)}
              placeholder="R$ 4.500"
            />
            <Field
              label="Maiores desafios atuais"
              id="current_challenges"
              textarea
              value={data.current_challenges ?? ""}
              onChange={(v) => update("current_challenges", v)}
              placeholder="Lead caro, taxa de no-show alta..."
            />
            <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
              Após conectar o Meta Ads, você vai mapear cada formulário de lead à
              campanha correspondente — esse passo é o que liga o lead ao agendamento
              no relatório. Disponível na próxima fase.
            </div>
          </OnboardingStep>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button type="button" onClick={handleNext}>
            {step < TOTAL_STEPS ? (
              <>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Finalizar
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  textarea?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {textarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
