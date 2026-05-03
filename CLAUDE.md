# ClinicAI — Master Project Specification

## Visão do Produto

Plataforma web SaaS que age como o **CMO de dados** de clínicas odontológicas, médicas e estéticas. Conecta o Meta Ads da clínica, processa os dados de campanhas e agendamentos, e entrega toda segunda-feira uma **Decisão da Semana** gerada por IA: 3 números + 1 ação clara baseada nos dados reais daquela clínica.

**O diferencial:** Nenhuma agência mostra custo por paciente agendado. O ClinicAI mostra.

---

## Estado Atual

**Fase 1 (Frontend) — concluída.** Todas as páginas e componentes navegáveis com dados mockados em `lib/mock/`. Sem integrações reais ainda. As fases 2 (Supabase + Meta OAuth + sync), 3 (Claude API) e 4 (Stripe) começam após o usuário preencher `PENDENCIAS.md`.

---

## Tech Stack — Não mudar sem confirmar

| Camada | Ferramenta |
|--------|-----------|
| Framework | Next.js 14 com App Router |
| Styling | Tailwind CSS + shadcn/ui (manual, sem CLI) |
| Database + Auth | Supabase |
| Deploy | Vercel |
| IA | Claude API (`claude-sonnet-4-6`) |
| Gráficos | Recharts |
| Automações | n8n (self-hosted, VPS externo) |
| Pagamentos | Stripe |
| WhatsApp | Evolution API (VPS externo) |

---

## Estrutura de Pastas

```
clinicai/
├── app/
│   ├── (auth)/login/{page,login-form}.tsx
│   ├── (client)/
│   │   ├── layout.tsx                      ← sidebar + mobile nav
│   │   ├── dashboard/{page,loading}.tsx
│   │   ├── leads/{page,leads-table,loading}.tsx
│   │   ├── appointments/{page,appointments-view,loading}.tsx
│   │   ├── decisions/{page,loading}.tsx
│   │   ├── connect/{page,connect-view}.tsx
│   │   ├── settings/{page,settings-view}.tsx
│   │   └── onboarding/{page,wizard}.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── {page,clients-view,loading}.tsx
│   │       └── clients/[id]/{page,generate-button}.tsx
│   ├── (marketing)/pricing/{page,pricing-cta}.tsx
│   ├── api/                                 ← criar na Fase 2 (rotas Meta, Stripe, Claude)
│   ├── layout.tsx                           ← root + Toaster
│   ├── page.tsx                             ← redirect /dashboard
│   └── globals.css
├── components/
│   ├── ui/                                  ← shadcn primitives + Empty/Error states
│   ├── layout/{BrandLogo,Sidebar,MobileNav,nav-icons}.tsx
│   ├── dashboard/{MetricCard,CplChart,CampaignTable,PeriodFilter,ConnectionBanner}.tsx
│   ├── decisions/DecisionCard.tsx
│   ├── onboarding/OnboardingStep.tsx
│   └── admin/ClientRow.tsx
├── lib/
│   ├── utils.ts                             ← cn helper
│   ├── format.ts                            ← BRL, %, datas pt-BR
│   ├── mock/                                ← dados fake tipados
│   ├── supabase/{client,server}.ts          ← stubs (Fase 2)
│   ├── meta/api.ts                          ← stub (Fase 2)
│   └── claude/decisions.ts                  ← stub (Fase 3)
├── middleware.ts                            ← pass-through (Fase 2 ativa lógica real)
├── types/index.ts                           ← Profile, Clinic, Lead, Campaign, ...
├── supabase/schema.sql                      ← rodar no SQL Editor
├── PENDENCIAS.md                            ← checklist do usuário antes da Fase 2
├── CLAUDE.md                                ← este arquivo
├── .env.example / .env.local
```

---

## Variáveis de Ambiente

Ver `.env.example` na raiz. Resumo:

- **Supabase**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Anthropic**: `ANTHROPIC_API_KEY`
- **Meta**: `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`
- **Stripe**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_{SOLO,MANAGED,EXPANSION}`
- **Cripto / n8n**: `TOKEN_ENCRYPTION_KEY` (32 bytes hex), `N8N_API_KEY`
- **App**: `NEXT_PUBLIC_APP_URL`

---

## Schema do Banco

Ver `supabase/schema.sql` — schema completo, RLS habilitado, com policies "client_own_*". Rodar no SQL Editor do projeto Supabase antes da Fase 2.

Tabelas principais:
- `profiles` (extensão de `auth.users` com `role`)
- `clinics` (com `onboarding_data` JSONB e `onboarding_step`)
- `meta_connections` (token sempre encriptado via `lib/crypto.ts`)
- `campaigns` (sync diário do Meta)
- `leads` + `form_campaign_map` + `appointments` (loop de atribuição)
- `weekly_decisions`, `subscriptions`

---

## Convenções de Código

- TypeScript com tipagem explícita
- Server Components por padrão; Client Components só quando precisar de interatividade/hooks
- Supabase server client em Server Components; client em Client Components
- PascalCase pra componentes, camelCase pra funções/variáveis
- `async/await` — nunca `.then().catch()`
- Cor brand: `#4C5AFF` (token Tailwind: `brand`); dark: `#1A1A2E` (token: `ink`)
- Em Server Components, **não passar functions/components** como props pra Client Components — usar chaves string e mapear no client (ver `components/layout/nav-icons.tsx`)

---

## Roles e Middleware (a implementar na Fase 2)

```
/login, /pricing  → público
/onboarding       → client (não completou onboarding)
/dashboard, /leads, /appointments,
/decisions, /connect, /settings → client (onboarding completo)
/admin/**         → admin only
```

O middleware atual (`middleware.ts`) é pass-through — substituir por verificação real do `profiles.role` quando o Supabase Auth estiver plugado.

---

## Utilitário de Criptografia (criar na Fase 2 em lib/crypto.ts)

O `access_token` do Meta NUNCA pode ser salvo em texto puro. Usar AES-256-GCM:

```typescript
import crypto from "crypto"

const ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY!  // 32 bytes hex
const ALGORITHM = "aes-256-gcm"

export function encryptToken(token: string): string {
  const iv = crypto.randomBytes(16)
  const key = Buffer.from(ENCRYPTION_KEY, "hex")
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()
  return [iv.toString("hex"), authTag.toString("hex"), encrypted.toString("hex")].join(":")
}

export function decryptToken(encrypted: string): string {
  const [ivHex, authTagHex, encryptedHex] = encrypted.split(":")
  const key = Buffer.from(ENCRYPTION_KEY, "hex")
  const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, "hex"))
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"))
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]).toString("utf8")
}
```

---

## Fluxo de Atribuição Meta Ads → Agendamento (CRÍTICO)

O Meta **não passa `campaign_id` no lead** — passa `form_id`. Fluxo:

1. Onboarding Step 5 (após conectar Meta): dono mapeia cada formulário a uma campanha → salvo em `form_campaign_map`.
2. Webhook do Meta Leads chega → buscar `campaign_id` em `form_campaign_map` pelo `form_id` → salvar em `leads`.
3. Lead vira agendamento (manual, CSV ou webhook do CRM) → `campaign_id` herdado do lead.
4. KPI principal: `custo_por_agendamento = total_spend / COUNT(appointments WHERE status IN ('confirmed','completed'))`.

Critério de `best_campaign`:
1. Menor `cost_per_appointment` no período.
2. Se nenhum appointment atribuído: menor `cost_per_lead`.
3. Empate: maior volume de leads.

---

## Refresh do Token Meta (CRÍTICO)

Token de longa duração do Meta expira em ~60 dias. Sem refresh, o sync diário falha em silêncio.

**Job n8n às 5h (antes do sync de 6h):**
- Buscar `meta_connections` com `token_expires_at < now() + 7 days`.
- Para cada uma: `POST /api/meta/refresh-token { clinic_id }` com header `x-api-key`.
- Falhou? Setar `status='expired'` e notificar dono via WhatsApp.

---

## Prompt Base para Decisão da Semana (Claude API)

```
Você é o analista de marketing e receita da clínica {clinic_name}.

DADOS DA CLÍNICA:
- Especialidade: {specialty}
- Procedimentos prioritários: {priority_procedures}
- Perfil do paciente ideal: {patient_profile}
- Objeções mais comuns: {common_objections}
- Processo comercial: {scheduling_process}

MÉTRICAS DA SEMANA ({period_start} a {period_end}):
{metrics_json}

AGENDAMENTOS CONFIRMADOS ESSA SEMANA:
{appointments_json}

HISTÓRICO DAS ÚLTIMAS 3 DECISÕES:
{previous_decisions}

TAREFA:
Analise os dados acima e gere a Decisão da Semana no seguinte formato JSON:

{
  "highlight_metric_1": "string curta com o número mais importante",
  "highlight_metric_2": "string curta com o segundo número importante",
  "highlight_metric_3": "string curta com o terceiro número importante",
  "action_recommended": "1 ação específica e acionável para essa semana",
  "content": "análise completa em 3-4 parágrafos explicando o que os dados mostram e por que a ação recomendada é a mais importante agora"
}

Seja específico com números reais. Nunca use linguagem genérica. Responda APENAS com o JSON, sem texto adicional.
```

Modelo: `claude-sonnet-4-6` · `max_tokens: 1500`.

---

## Notas Importantes

### Segurança
- Service role key do Supabase: **só** em API Routes server-side.
- Access token do Meta: SEMPRE encriptado via `lib/crypto.ts` antes de salvar; nunca exposto em respostas pro frontend.
- `.env.local` está no `.gitignore` — não commitar.
- Todas as API Routes chamadas pelo n8n verificam header `x-api-key === N8N_API_KEY`.

### Rate Limit Meta API
- App básico (Development): 200 calls/hora.
- Até 10 clínicas: sem problema.
- 11–50 clínicas: backoff exponencial (2^n segundos) em erro 429.
- 50+: solicitar upgrade no Meta for Developers.

### Formato CSV de Importação de Agendamentos
```
data_agendamento,procedimento,status,campanha_id,nome_paciente,observacoes
2026-05-15,Harmonização Facial,completed,123456789,,
2026-05-16,Botox,scheduled,,Maria Silva,Primeira consulta
```
- UTF-8, vírgula, datas YYYY-MM-DD.
- Obrigatórios: `data_agendamento`, `procedimento`, `status`.
- Status válidos: `scheduled`, `confirmed`, `completed`, `no_show`, `cancelled`.

### Evolution API — Escopo
Apenas notificação de saída: enviar a Decisão da Semana toda segunda às 8h. Não é chatbot de atendimento.

### Jobs n8n
- Refresh tokens: todo dia às 5h (`0 5 * * *`)
- Sync Meta Ads: todo dia às 6h (`0 6 * * *`)
- Decisão da Semana: toda segunda às 8h (`0 8 * * 1`)
- Retry com Wait de 5s entre tentativas; alerta WhatsApp em falha persistente.
