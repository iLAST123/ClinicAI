export type NotificationChannel = "whatsapp" | "sms"

export type NotificationStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "failed"
  | "responded"
  | "cancelled"

export type PatientResponse = "CONFIRMAR" | "CANCELAR" | "REMARCAR"

export interface ReminderNotification {
  id: string
  appointment_id: string
  channel: NotificationChannel
  scheduled_for: string
  status: NotificationStatus
  provider_message_id: string | null
  response: PatientResponse | null
  created_at: string
}

export interface CommunicationEvent {
  id: string
  appointment_id: string
  event_type: "enviado" | "entregue" | "respondido"
  channel: NotificationChannel
  content: string
  at: string
}
