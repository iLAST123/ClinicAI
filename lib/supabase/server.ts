// TODO (Fase 2 — Integração Supabase):
// Exportar createServerClient do @supabase/ssr lendo cookies via next/headers.
// Usado por Server Components e Route Handlers.
//
// Exemplo:
//   import { cookies } from "next/headers"
//   import { createServerClient } from "@supabase/ssr"
//   export function createClient() {
//     const cookieStore = cookies()
//     return createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
//     )
//   }

export function createClient(): never {
  throw new Error(
    "Supabase server client ainda não configurado. Veja PENDENCIAS.md."
  )
}
