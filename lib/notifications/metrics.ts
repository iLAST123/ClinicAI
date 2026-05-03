import type { Appointment } from "@/types"
import type { ReminderNotification } from "./types"

export interface ReminderMetrics {
  noShowRateBefore: number
  noShowRateAfter: number
  confirmationRateByChannel: Record<string, number>
}

export function calculateReminderMetrics(
  appointments: Appointment[],
  reminders: ReminderNotification[]
): ReminderMetrics {
  const before = appointments.filter((a) => a.source !== "whatsapp")
  const after = appointments.filter((a) => a.source === "whatsapp")

  const noShowRateBefore = before.length
    ? before.filter((a) => a.status === "no_show").length / before.length
    : 0
  const noShowRateAfter = after.length
    ? after.filter((a) => a.status === "no_show").length / after.length
    : 0

  const channels = ["whatsapp", "sms"]
  const confirmationRateByChannel = Object.fromEntries(
    channels.map((channel) => {
      const channelReminders = reminders.filter((r) => r.channel === channel)
      const confirmed = channelReminders.filter((r) => r.response === "CONFIRMAR")
      return [channel, channelReminders.length ? confirmed.length / channelReminders.length : 0]
    })
  )

  return { noShowRateBefore, noShowRateAfter, confirmationRateByChannel }
}
