import type { Appointment } from "@/types"

export type CalendarProvider = "google" | "microsoft_graph"
export type SyncStatus = "synced" | "pending" | "error"

export interface ProfessionalCalendarConnection {
  professionalId: string
  provider: CalendarProvider
  email: string
  connectedAt: string
  accessToken: string
  refreshToken?: string
  expiresAt?: string
}

export interface CalendarEvent {
  id: string
  provider: CalendarProvider
  professionalId: string
  startsAt: string
  endsAt: string
  title: string
  patientName?: string | null
  updatedAt: string
}

export interface AppointmentEventMap {
  internalAppointmentId: string
  externalEventId: string
  professionalId: string
  provider: CalendarProvider
  lastSyncedAt: string
}

export interface CalendarProviderClient {
  provider: CalendarProvider
  getOAuthUrl(professionalId: string): string
  createEvent(appointment: Appointment): Promise<CalendarEvent>
  updateEvent(eventId: string, appointment: Appointment): Promise<CalendarEvent>
  deleteEvent(eventId: string): Promise<void>
  pollEvents(professionalId: string): Promise<CalendarEvent[]>
}
