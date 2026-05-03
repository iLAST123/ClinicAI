// TODO (Fase 2 — Integração Supabase):
// Exportar createBrowserClient do @supabase/ssr usando NEXT_PUBLIC_SUPABASE_URL
// e NEXT_PUBLIC_SUPABASE_ANON_KEY. Usado por Client Components.
//
// Exemplo (após instalar @supabase/ssr):
//   import { createBrowserClient } from "@supabase/ssr"
//   export function createClient() {
//     return createBrowserClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//     )
//   }

export function createClient(): never {
  throw new Error(
    "Supabase client ainda não configurado. Veja PENDENCIAS.md."
  )
}
