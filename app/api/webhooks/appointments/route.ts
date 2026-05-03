import { NextResponse } from "next/server"

const responseToStatus = {
  CONFIRMAR: "confirmed",
  CANCELAR: "cancelled",
  REMARCAR: "scheduled",
} as const

export async function POST(req: Request) {
  const body = (await req.json()) as {
    appointment_id?: string
    response?: keyof typeof responseToStatus
    provider_message_id?: string
  }

  if (!body.appointment_id || !body.response) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    appointment_id: body.appointment_id,
    provider_message_id: body.provider_message_id ?? null,
    normalized_response: body.response,
    next_status: responseToStatus[body.response],
  })
}
