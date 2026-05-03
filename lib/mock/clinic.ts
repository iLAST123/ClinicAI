import type { Clinic, MetaConnection, Subscription } from "@/types"

export const mockClinic: Clinic = {
  id: "clinic-001",
  user_id: "user-001",
  name: "Clínica Sorria Mais",
  specialty: "Odontologia",
  phone: "(11) 99876-5432",
  onboarding_data: {
    clinic_name: "Clínica Sorria Mais",
    specialty: "Odontologia estética",
    differentials: "Atendimento humanizado, tecnologia de ponta, parcelamento",
    communication_tone: "Acolhedor e profissional",
    patient_profile: "Mulheres 28-45 anos, classe B, querem mais autoestima",
    patient_age_range: "28-45",
    common_objections: "Preço, medo de dor, tempo de tratamento",
    priority_procedures: "Lentes de contato, clareamento, harmonização",
    price_range: "R$ 3.000 a R$ 25.000",
    payment_conditions: "Até 18x sem juros no cartão, à vista 10% off",
    scheduling_process: "WhatsApp + agenda Google",
    crm_used: "Nenhum (planilha)",
    available_hours: "Seg-Sex 9h-19h, Sáb 9h-13h",
    response_time: "Em até 1h no horário comercial",
    procedures_to_advertise: "Lentes de contato, harmonização orofacial",
    monthly_budget: "R$ 4.500",
    current_challenges: "Lead caro e pouco qualificado, taxa de no-show alta",
  },
  onboarding_step: 5,
  onboarding_completed: true,
  created_at: "2026-02-01T10:00:00Z",
  updated_at: "2026-04-28T14:30:00Z",
}

export const mockMetaConnection: MetaConnection = {
  id: "meta-001",
  clinic_id: mockClinic.id,
  ad_account_id: "act_1234567890",
  ad_account_name: "Sorria Mais — Anúncios",
  token_expires_at: "2026-06-30T00:00:00Z",
  status: "active",
  connected_at: "2026-03-12T11:00:00Z",
}

export const mockSubscription: Subscription = {
  id: "sub-001",
  clinic_id: mockClinic.id,
  plan: "managed",
  status: "active",
  next_billing_date: "2026-05-28",
}
