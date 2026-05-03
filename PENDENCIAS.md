# PENDÊNCIAS — antes de avançar para Fase 2

A Fase 1 (frontend visual com mocks) está pronta. Para começar a Fase 2 (integrações reais), você precisa fechar os itens abaixo e me devolver as chaves para preenchermos `.env.local`.

---

## 1. Supabase

- [ ] Criar projeto em https://supabase.com (escolha região mais próxima do Brasil — `us-east-1` ou `sa-east-1`).
- [ ] Em **Settings → API**, copiar:
  - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon public)
  - `SUPABASE_SERVICE_ROLE_KEY` (service role — **secret**)
- [ ] Em **SQL Editor**, colar e rodar todo o conteúdo de `supabase/schema.sql`. Confirmar que aparecem 9 tabelas em **Table Editor**.
- [ ] Em **Authentication → Providers**, habilitar **Email** com confirmação opcional.

## 2. Anthropic (Claude API)

- [ ] Criar conta em https://console.anthropic.com.
- [ ] Adicionar método de pagamento e comprar pelo menos US$ 5 de crédito inicial.
- [ ] Em **Settings → API Keys**, gerar key dedicada `ClinicAI - Production` → `ANTHROPIC_API_KEY`.

## 3. Meta for Developers

- [ ] Criar app em https://developers.facebook.com/apps com tipo **Business**.
- [ ] Adicionar produto **Marketing API** e **Facebook Login for Business**.
- [ ] Em **App Settings → Basic**, copiar **App ID** e **App Secret** → `META_APP_ID`, `META_APP_SECRET`.
- [ ] Em **Facebook Login for Business → Settings**, adicionar **Valid OAuth Redirect URIs**:
  - Local: `http://localhost:3000/api/meta/callback`
  - Produção: `https://SEU-DOMINIO/api/meta/callback`
- [ ] Definir `META_REDIRECT_URI` com a URL de produção.
- [ ] Solicitar permissões: `ads_read`, `ads_management`, `business_management`, `leads_retrieval`. Para uso real (fora de Development Mode), enviar para revisão da Meta.

## 4. Stripe

- [ ] Criar conta em https://dashboard.stripe.com (modo Test inicialmente).
- [ ] Em **Products**, criar 3 produtos com preço recorrente mensal em BRL:
  - **Solo** — R$ 597/mês → copiar Price ID em `STRIPE_PRICE_SOLO`
  - **Managed** — R$ 1.997/mês → `STRIPE_PRICE_MANAGED`
  - **Expansion** — R$ 3.497/mês → `STRIPE_PRICE_EXPANSION`
- [ ] Em **Developers → API Keys**, copiar:
  - `STRIPE_SECRET_KEY` (sk_test_… ou sk_live_…)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_… ou pk_live_…)
- [ ] Em **Developers → Webhooks**, criar endpoint apontando para `https://SEU-DOMINIO/api/webhooks/stripe` com eventos:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
  - Copiar **Signing secret** → `STRIPE_WEBHOOK_SECRET`.
- [ ] Em **Settings → Customer portal**, ativar e configurar.

## 5. Domínio + Vercel

- [ ] Registrar domínio (Registro.br ou Namecheap). Sugestão: `clinicai.com.br`.
- [ ] Conectar repositório à Vercel (https://vercel.com/new).
- [ ] Adicionar todas as variáveis de `.env.local` em **Project Settings → Environment Variables**.
- [ ] Apontar DNS do domínio para a Vercel.
- [ ] Confirmar `NEXT_PUBLIC_APP_URL=https://SEU-DOMINIO`.

## 6. Cripto + n8n

- [ ] Gerar `TOKEN_ENCRYPTION_KEY`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Gerar `N8N_API_KEY` (qualquer string aleatória forte de 32+ chars):
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Provisionar VPS (Hetzner, DigitalOcean ou Contabo — algo de 2 vCPU / 4GB) com Docker.
- [ ] Subir n8n em container expondo HTTPS. Recomendado: usar Caddy ou Traefik na frente.
- [ ] Criar os 3 workflows descritos em `CLAUDE.md` (Refresh Token às 5h, Sync às 6h, Decisão segunda às 8h).

## 7. WhatsApp / Evolution API

- [ ] Na mesma VPS do n8n (ou outra), subir Evolution API (https://github.com/EvolutionAPI/evolution-api).
- [ ] Conectar uma instância de WhatsApp Business da clínica (escanear QR code).
- [ ] Definir endpoint + token e me passar para integrarmos no envio das Decisões.

---

## Decisões de produto que ainda preciso de você

- [ ] **Logo final**: hoje uso o glifo "C" em fundo brand. Você quer logo customizada?
- [ ] **Paleta**: confirmar `#4C5AFF` (brand) e `#1A1A2E` (dark surfaces) ou ajustar.
- [ ] **Copy de marketing** da `/pricing` e `/login` (textos atuais são placeholders sensatos, mas você pode querer aprovar).
- [ ] **Política de trial**: Stripe permite trial sem cartão ou só com cartão? Quantos dias?
- [ ] **Email transacional** (boas-vindas, recuperação de senha, etc): Resend, Postmark ou usar o próprio Supabase?

---

## O que já está pronto e funcionando agora

- Todas as páginas navegáveis com mocks: `/login`, `/onboarding`, `/dashboard`, `/leads`, `/appointments`, `/decisions`, `/connect`, `/settings`, `/pricing`, `/admin`, `/admin/clients/[id]`.
- Sidebar + mobile nav (sheet hambúrguer).
- Wizard de onboarding com persistência em `localStorage`.
- Estados visuais de conexão Meta (não conectado / conectado / expirado) alternáveis na `/connect`.
- Toasts (sonner), skeletons de loading e estados de Empty/Error.
- Tipos TypeScript completos em `types/index.ts` que vão alimentar a Fase 2.

Para rodar localmente:
```bash
npm install
npm run dev
# abrir http://localhost:3000
```

Quando os itens 1–6 estiverem prontos, abrimos uma nova sessão para a Fase 2 (Supabase Auth real + Meta OAuth + sync diário + leads/appointments funcional + dashboard com dados reais).
