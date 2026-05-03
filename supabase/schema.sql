-- ============================================================================
-- ClinicAI — Schema Supabase (cole no SQL Editor do projeto)
-- ============================================================================

-- PERFIS (extensão do auth.users do Supabase)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  role text default 'client' check (role in ('admin', 'client')),
  created_at timestamp with time zone default now()
);

-- Trigger: cria perfil automaticamente ao criar usuário
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- CLÍNICAS
-- ============================================================================
create table public.clinics (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  specialty text,
  phone text,
  onboarding_data jsonb default '{}',
  onboarding_step integer default 0,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- ============================================================================
-- CONEXÕES META ADS
-- access_token sempre encriptado via lib/crypto.ts (AES-256-GCM)
-- ============================================================================
create table public.meta_connections (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  ad_account_id text not null,
  ad_account_name text,
  access_token_encrypted text not null,
  token_expires_at timestamp with time zone,
  status text default 'active' check (status in ('active', 'expired', 'disconnected')),
  connected_at timestamp with time zone default now()
);

-- ============================================================================
-- CAMPANHAS (dados coletados da Meta API)
-- ============================================================================
create table public.campaigns (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  campaign_id text not null,
  campaign_name text,
  adset_name text,
  spend numeric(10,2) default 0,
  impressions integer default 0,
  clicks integer default 0,
  leads integer default 0,
  cost_per_lead numeric(10,2),
  period_start date not null,
  period_end date not null,
  synced_at timestamp with time zone default now(),
  unique (clinic_id, campaign_id, period_start)
);

create index campaigns_clinic_period
  on public.campaigns (clinic_id, period_start desc);

-- ============================================================================
-- LEADS — bridge Meta → Agendamentos
-- O Meta passa form_id, NÃO campaign_id. O lookup é feito via form_campaign_map.
-- ============================================================================
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  meta_lead_id text,
  form_id text,
  campaign_id text,
  campaign_name text,
  lead_name text,
  lead_phone text,
  lead_email text,
  status text default 'new' check (status in ('new', 'contacted', 'scheduled', 'lost')),
  created_at timestamp with time zone default now()
);

create index leads_clinic_date
  on public.leads (clinic_id, created_at desc);

-- ============================================================================
-- MAPEAMENTO FORM → CAMPANHA (preenchido no onboarding/connect)
-- ============================================================================
create table public.form_campaign_map (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  form_id text not null,
  campaign_id text not null,
  campaign_name text,
  unique (clinic_id, form_id)
);

-- ============================================================================
-- AGENDAMENTOS
-- ============================================================================
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  lead_id uuid references public.leads(id),
  campaign_id text,
  campaign_name text,
  patient_name text,
  procedure text,
  appointment_date date,
  status text default 'scheduled' check (status in ('scheduled', 'confirmed', 'completed', 'no_show', 'cancelled')),
  source text default 'manual' check (source in ('manual', 'csv_import', 'crm_webhook', 'whatsapp')),
  notes text,
  created_at timestamp with time zone default now()
);

create index appointments_clinic_date
  on public.appointments (clinic_id, appointment_date desc);

-- ============================================================================
-- DECISÕES DA SEMANA
-- ============================================================================
create table public.weekly_decisions (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  week_date date not null,
  content text not null,
  highlight_metric_1 text,
  highlight_metric_2 text,
  highlight_metric_3 text,
  action_recommended text,
  metrics_snapshot jsonb default '{}',
  sent_via_whatsapp boolean default false,
  whatsapp_sent_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- ============================================================================
-- ASSINATURAS
-- ============================================================================
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  clinic_id uuid references public.clinics(id) on delete cascade not null,
  plan text check (plan in ('solo', 'managed', 'expansion')),
  stripe_subscription_id text,
  stripe_customer_id text,
  status text default 'active' check (status in ('active', 'inactive', 'trial', 'cancelled')),
  next_billing_date date,
  created_at timestamp with time zone default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.clinics enable row level security;
alter table public.campaigns enable row level security;
alter table public.weekly_decisions enable row level security;
alter table public.meta_connections enable row level security;
alter table public.subscriptions enable row level security;
alter table public.appointments enable row level security;
alter table public.leads enable row level security;
alter table public.form_campaign_map enable row level security;

create policy "client_own_clinic" on public.clinics
  for all using (auth.uid() = user_id);

create policy "client_own_campaigns" on public.campaigns
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_decisions" on public.weekly_decisions
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_meta" on public.meta_connections
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_appointments" on public.appointments
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_leads" on public.leads
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_form_map" on public.form_campaign_map
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

create policy "client_own_subscriptions" on public.subscriptions
  for all using (
    clinic_id in (select id from public.clinics where user_id = auth.uid())
  );

-- O service role key (usado em API Routes) ignora RLS automaticamente,
-- então o painel admin acessa tudo sem policy adicional.
