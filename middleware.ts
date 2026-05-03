import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// TODO (Fase 2): trocar por verificação real via Supabase Auth.
// Lógica final esperada:
//   - Rotas públicas: /login, /pricing
//   - Rotas client: /dashboard, /onboarding, /leads, /appointments,
//                   /decisions, /connect, /settings
//   - Rotas admin: /admin/**
//   - Sem sessão → redireciona para /login
//   - role=client tentando /admin → redireciona para /dashboard
//   - role=client com onboarding_completed=false → força /onboarding
//
// Hoje (Fase 1 — Frontend mockado): pass-through.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
