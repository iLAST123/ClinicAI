import type { Appointment } from "@/types"
import type { CalendarEvent, CalendarProviderClient } from "./types"

function mkEvent(
  provider: CalendarProviderClient["provider"],
  professionalId: string,
  appointment: Appointment,
  eventId?: string
): CalendarEvent {
  const startsAt = `${appointment.appointment_date ?? "2026-01-01"}T09:00:00Z`
  return {
    id: eventId ?? `${provider}-${appointment.id}`,
    provider,
    professionalId,
    startsAt,
    endsAt: `${appointment.appointment_date ?? "2026-01-01"}T10:00:00Z`,
    title: appointment.procedure ?? "Consulta",
    patientName: appointment.patient_name,
    updatedAt: new Date().toISOString(),
  }
}

export class GoogleCalendarProvider implements CalendarProviderClient {
  provider = "google" as const

  getOAuthUrl(professionalId: string): string {
    return `/api/integrations/calendar/google/oauth/start?professional_id=${professionalId}`
  }

  async createEvent(appointment: Appointment): Promise<CalendarEvent> {
    return mkEvent(this.provider, appointment.professional_id ?? "unassigned", appointment)
  }

  async updateEvent(eventId: string, appointment: Appointment): Promise<CalendarEvent> {
    return mkEvent(this.provider, appointment.professional_id ?? "unassigned", appointment, eventId)
  }

  async deleteEvent(): Promise<void> {
    return
  }

  async pollEvents(professionalId: string): Promise<CalendarEvent[]> {
    void professionalId
    return []
  }
}

export class MicrosoftGraphCalendarProvider implements CalendarProviderClient {
  provider = "microsoft_graph" as const

  getOAuthUrl(professionalId: string): string {
    return `/api/integrations/calendar/microsoft/oauth/start?professional_id=${professionalId}`
  }

  async createEvent(appointment: Appointment): Promise<CalendarEvent> {
    return mkEvent(this.provider, appointment.professional_id ?? "unassigned", appointment)
  }

  async updateEvent(eventId: string, appointment: Appointment): Promise<CalendarEvent> {
    return mkEvent(this.provider, appointment.professional_id ?? "unassigned", appointment, eventId)
  }

  async deleteEvent(): Promise<void> {
    return
  }

  async pollEvents(professionalId: string): Promise<CalendarEvent[]> {
    void professionalId
    return []
  }
}
