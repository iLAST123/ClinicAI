import type { WeeklyDecision } from "@/types"
import { mockClinic } from "./clinic"

export const mockDecisions: WeeklyDecision[] = [
  {
    id: "d-1",
    clinic_id: mockClinic.id,
    week_date: "2026-05-04",
    highlight_metric_1: "CPL caiu 12% — agora R$ 32,48",
    highlight_metric_2: "38 pacientes agendados (+9 vs semana anterior)",
    highlight_metric_3: "Custo por paciente: R$ 112,83",
    action_recommended:
      "Aumente em 30% o orçamento da campanha 'Lentes de Contato — Conversão Lead' nos próximos 7 dias.",
    content:
      "A semana foi positiva: o CPL recuou 12% e os agendamentos cresceram 31% versus a semana anterior. A campanha de Lentes de Contato continua sendo a operação mais rentável da clínica — entrega leads com CPL 21% abaixo da média e tem a melhor taxa de agendamento (37%).\n\nA recomendação principal é dobrar a aposta nessa campanha. O retorno marginal ainda está saudável e há sinal claro de que o público está respondendo. Em paralelo, revise a Harmonização Orofacial: o CPL subiu 11% e poucos leads viraram agenda — vale pausar e refazer a copy.\n\nPróximo monitoramento: confirmar se a taxa de no-show de 8% se mantém após o aumento de volume.",
    metrics_snapshot: {},
    sent_via_whatsapp: true,
    created_at: "2026-05-04T08:00:00Z",
  },
  {
    id: "d-2",
    clinic_id: mockClinic.id,
    week_date: "2026-04-27",
    highlight_metric_1: "29 agendamentos confirmados",
    highlight_metric_2: "CPL médio de R$ 36,90",
    highlight_metric_3: "Conversão lead → agenda em 26%",
    action_recommended:
      "Crie um lookalike de 1% baseado nos pacientes que fecharam contrato em abril.",
    content:
      "Resultado dentro do esperado, mas com sinal de saturação na campanha Clareamento. O custo por mil impressões (CPM) subiu 14% e a frequência passou de 3 — o público atual está vendo o anúncio demais.\n\nA ação recomendada é gerar um novo público lookalike de 1% a partir da lista de pacientes que efetivamente fecharam contrato em abril. Isso renova a base sem perder qualidade.\n\nO indicador de no-show (12%) ficou acima do desejado: revise o roteiro de confirmação 24h antes.",
    metrics_snapshot: {},
    sent_via_whatsapp: true,
    created_at: "2026-04-27T08:00:00Z",
  },
  {
    id: "d-3",
    clinic_id: mockClinic.id,
    week_date: "2026-04-20",
    highlight_metric_1: "R$ 4.310 investidos",
    highlight_metric_2: "115 leads gerados",
    highlight_metric_3: "Taxa de resposta em 1h: 64%",
    action_recommended:
      "Implemente atendimento por WhatsApp das 19h às 21h em dias úteis.",
    content:
      "Volume de leads cresceu 18%, mas 36% deles entram fora do horário comercial e levam mais de 4h para receber o primeiro contato. A correlação entre tempo de resposta e fechamento é direta: leads atendidos em até 1h convertem 3,2x mais.\n\nA recomendação é estender o atendimento de WhatsApp até 21h — pode ser uma pessoa só nesse turno. O ROI esperado paga o custo em 2 semanas.\n\nPonto de atenção: a campanha Botox tem CPL alto (R$ 52) e apenas 2 agendamentos no mês — avalie pausar.",
    metrics_snapshot: {},
    sent_via_whatsapp: true,
    created_at: "2026-04-20T08:00:00Z",
  },
]
