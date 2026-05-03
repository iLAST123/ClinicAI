import { SmsAdapter, WhatsAppAdapter } from "./adapters"
import { reminderTemplates, renderReminderTemplate, type ReminderTemplateVars } from "./templates"
import type { CommunicationEvent, ReminderNotification } from "./types"

const whatsapp = new WhatsAppAdapter()
const sms = new SmsAdapter()

export async function sendReminder(
  reminder: ReminderNotification,
  phone: string,
  vars: ReminderTemplateVars
): Promise<{ reminder: ReminderNotification; events: CommunicationEvent[] }> {
  const content = renderReminderTemplate(reminderTemplates[reminder.channel], vars)
  const primary = reminder.channel === "whatsapp" ? whatsapp : sms

  const firstAttempt = await primary.send({ to: phone, message: content })
  const usedFallback = !firstAttempt.ok && reminder.channel === "whatsapp"
  const finalResult = usedFallback ? await sms.send({ to: phone, message: content }) : firstAttempt

  const now = new Date().toISOString()
  const updatedReminder: ReminderNotification = {
    ...reminder,
    status: finalResult.ok ? "sent" : "failed",
    provider_message_id: finalResult.providerMessageId,
  }

  const events: CommunicationEvent[] = [
    {
      id: crypto.randomUUID(),
      appointment_id: reminder.appointment_id,
      event_type: "enviado",
      channel: finalResult.channel,
      content,
      at: now,
    },
    {
      id: crypto.randomUUID(),
      appointment_id: reminder.appointment_id,
      event_type: "entregue",
      channel: finalResult.channel,
      content: `Mensagem ${finalResult.ok ? "entregue" : "falhou"}`,
      at: now,
    },
  ]

  return { reminder: updatedReminder, events }
}
