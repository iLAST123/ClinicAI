import type { NotificationChannel } from "./types"

export interface ChannelPayload {
  to: string
  message: string
}

export interface DeliveryResult {
  ok: boolean
  providerMessageId: string
  channel: NotificationChannel
}

export interface NotificationAdapter {
  send(payload: ChannelPayload): Promise<DeliveryResult>
}

export class WhatsAppAdapter implements NotificationAdapter {
  async send(payload: ChannelPayload): Promise<DeliveryResult> {
    void payload
    return {
      ok: true,
      providerMessageId: `wa_${crypto.randomUUID()}`,
      channel: "whatsapp",
    }
  }
}

export class SmsAdapter implements NotificationAdapter {
  async send(payload: ChannelPayload): Promise<DeliveryResult> {
    void payload
    return {
      ok: true,
      providerMessageId: `sms_${crypto.randomUUID()}`,
      channel: "sms",
    }
  }
}
