import type { Appointment } from "@/types"
import type { ReminderNotification } from "./types"

function scheduleDate(appointmentDate: string, hoursBefore: number) {
  const dt = new Date(`${appointmentDate}T12:00:00Z`)
  dt.setHours(dt.getHours() - hoursBefore)
  return dt.toISOString()
}

export function buildReminderJobs(appointment: Appointment): ReminderNotification[] {
  if (!appointment.appointment_date) return []

  return [48, 24].map((hours) => ({
    id: crypto.randomUUID(),
    appointment_id: appointment.id,
    channel: "whatsapp",
    scheduled_for: scheduleDate(appointment.appointment_date!, hours),
    status: "queued",
    provider_message_id: null,
    response: null,
    created_at: new Date().toISOString(),
  }))
}

export function rescheduleReminderJobs(
  existing: ReminderNotification[],
  appointment: Appointment
): ReminderNotification[] {
  const active = existing.filter((j) => j.status === "queued" || j.status === "sent")
  const cancelled = active.map((j) => ({ ...j, status: "cancelled" as const }))
  return [...cancelled, ...buildReminderJobs(appointment)]
}
