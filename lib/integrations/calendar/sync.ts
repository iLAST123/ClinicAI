import type { Appointment } from "@/types"
import type {
  AppointmentEventMap,
  CalendarEvent,
  CalendarProvider,
  CalendarProviderClient,
  ProfessionalCalendarConnection,
} from "./types"

const DEDUPE_WINDOW_MINUTES = 120

function parseDate(date: string | null): number {
  return date ? new Date(`${date}T09:00:00Z`).getTime() : 0
}

export function isPotentialDuplicate(a: Appointment, b: Appointment): boolean {
  if (!a.professional_id || !b.professional_id) return false
  if (a.professional_id !== b.professional_id) return false
  if (!a.patient_name || !b.patient_name) return false
  if (a.patient_name.toLowerCase() !== b.patient_name.toLowerCase()) return false
  const delta = Math.abs(parseDate(a.appointment_date) - parseDate(b.appointment_date))
  return delta <= DEDUPE_WINDOW_MINUTES * 60 * 1000
}

export class CalendarSyncService {
  private mappings: AppointmentEventMap[] = []

  constructor(
    private readonly clients: Record<CalendarProvider, CalendarProviderClient>,
    private readonly connections: ProfessionalCalendarConnection[]
  ) {}

  private getConnection(professionalId?: string | null) {
    return this.connections.find((c) => c.professionalId === professionalId)
  }

  async mirrorCreate(appointment: Appointment): Promise<AppointmentEventMap | null> {
    const connection = this.getConnection(appointment.professional_id)
    if (!connection) return null
    const event = await this.clients[connection.provider].createEvent(appointment)
    const map: AppointmentEventMap = {
      internalAppointmentId: appointment.id,
      externalEventId: event.id,
      professionalId: connection.professionalId,
      provider: connection.provider,
      lastSyncedAt: new Date().toISOString(),
    }
    this.mappings.push(map)
    return map
  }

  async mirrorUpdate(appointment: Appointment): Promise<AppointmentEventMap | null> {
    const map = this.mappings.find((m) => m.internalAppointmentId === appointment.id)
    if (!map) return this.mirrorCreate(appointment)
    const event = await this.clients[map.provider].updateEvent(map.externalEventId, appointment)
    map.externalEventId = event.id
    map.lastSyncedAt = new Date().toISOString()
    return map
  }

  async mirrorDelete(appointmentId: string): Promise<void> {
    const idx = this.mappings.findIndex((m) => m.internalAppointmentId === appointmentId)
    if (idx < 0) return
    const map = this.mappings[idx]
    await this.clients[map.provider].deleteEvent(map.externalEventId)
    this.mappings.splice(idx, 1)
  }

  async pullExternalChanges(professionalId: string): Promise<CalendarEvent[]> {
    const connection = this.connections.find((c) => c.professionalId === professionalId)
    if (!connection) return []
    return this.clients[connection.provider].pollEvents(professionalId)
  }

  getMappings() {
    return this.mappings
  }
}
