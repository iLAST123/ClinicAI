export interface ReminderTemplateVars {
  patientName: string
  professionalName: string
  appointmentDateTime: string
  locationOrLink: string
}

const base =
  "Olá {{patientName}}! Lembrete da sua consulta com {{professionalName}} em {{appointmentDateTime}}. Local/Link: {{locationOrLink}}. Responda CONFIRMAR, CANCELAR ou REMARCAR."

export const reminderTemplates = {
  whatsapp: base,
  sms: base,
} as const

export function renderReminderTemplate(template: string, vars: ReminderTemplateVars) {
  return template
    .replaceAll("{{patientName}}", vars.patientName)
    .replaceAll("{{professionalName}}", vars.professionalName)
    .replaceAll("{{appointmentDateTime}}", vars.appointmentDateTime)
    .replaceAll("{{locationOrLink}}", vars.locationOrLink)
}
