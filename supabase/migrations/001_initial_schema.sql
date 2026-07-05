-- ============================================================
-- Rudimax Fintech – Customer Portal Schema
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → New query
-- ============================================================

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  phone       text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Accounts
create table if not exists public.accounts (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  nickname    text not null,
  type        text check (type in ('Savings','Current','Salary','NRE','Loan')) not null,
  masked      text not null,
  ifsc        text not null,
  balance     numeric(15,2) default 0,
  status      text check (status in ('Active','Frozen','Dormant','Closed')) default 'Active',
  created_at  timestamptz default now()
);
alter table public.accounts enable row level security;
create policy "Users view own accounts" on public.accounts for select using (auth.uid() = user_id);
create policy "Users insert own accounts" on public.accounts for insert with check (auth.uid() = user_id);
create policy "Users update own accounts" on public.accounts for update using (auth.uid() = user_id);

-- Transactions
create table if not exists public.transactions (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  account_id   uuid references public.accounts(id) on delete cascade not null,
  date         text not null,
  time         text not null,
  description  text not null,
  counterparty text,
  channel      text check (channel in ('UPI','IMPS','NEFT','RTGS','Card','Wallet','Branch','ATM')) not null,
  reference    text,
  amount       numeric(15,2) not null,
  status       text check (status in ('Completed','Processing','Failed','Flagged','Disputed','Reversed')) default 'Completed',
  created_at   timestamptz default now()
);
alter table public.transactions enable row level security;
create policy "Users view own transactions"   on public.transactions for select using (auth.uid() = user_id);
create policy "Users insert own transactions" on public.transactions for insert with check (auth.uid() = user_id);
create policy "Users update own transactions" on public.transactions for update using (auth.uid() = user_id);

-- Payees
create table if not exists public.payees (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  name        text not null,
  handle      text not null,
  bank        text,
  rail        text check (rail in ('UPI','IMPS','NEFT','Wire')) not null,
  status      text check (status in ('Active','Cooling','Pending')) default 'Pending',
  added_on    text not null default to_char(now(), 'DD Mon YYYY'),
  created_at  timestamptz default now()
);
alter table public.payees enable row level security;
create policy "Users view own payees"   on public.payees for select using (auth.uid() = user_id);
create policy "Users insert own payees" on public.payees for insert with check (auth.uid() = user_id);
create policy "Users update own payees" on public.payees for update using (auth.uid() = user_id);

-- Loans
create table if not exists public.loans (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  product      text not null,
  principal    numeric(15,2) not null,
  outstanding  numeric(15,2) not null,
  emi          numeric(15,2) not null,
  rate         numeric(5,2) not null,
  next_emi     text default '—',
  status       text check (status in ('Active','In Review','Disbursed','Closed','Counter-Offer')) default 'Active',
  created_at   timestamptz default now()
);
alter table public.loans enable row level security;
create policy "Users view own loans"   on public.loans for select using (auth.uid() = user_id);
create policy "Users insert own loans" on public.loans for insert with check (auth.uid() = user_id);
create policy "Users update own loans" on public.loans for update using (auth.uid() = user_id);

-- Cards
create table if not exists public.cards (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid references auth.users(id) on delete cascade not null,
  network      text check (network in ('Visa','Mastercard','RuPay')) not null,
  type         text check (type in ('Credit','Debit')) not null,
  masked       text not null,
  holder       text not null,
  card_limit   numeric(15,2) not null,
  used         numeric(15,2) default 0,
  expiry       text not null,
  status       text check (status in ('Active','Frozen','Blocked')) default 'Active',
  created_at   timestamptz default now()
);
alter table public.cards enable row level security;
create policy "Users view own cards"   on public.cards for select using (auth.uid() = user_id);
create policy "Users insert own cards" on public.cards for insert with check (auth.uid() = user_id);
create policy "Users update own cards" on public.cards for update using (auth.uid() = user_id);

-- Disputes
create table if not exists public.disputes (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  ref         text not null,
  txn_ref     text,
  merchant    text not null,
  amount      numeric(15,2) not null,
  raised_on   text not null,
  status      text check (status in ('Open','Under Investigation','Resolved – Refunded','Resolved – Declined')) default 'Open',
  created_at  timestamptz default now()
);
alter table public.disputes enable row level security;
create policy "Users view own disputes"   on public.disputes for select using (auth.uid() = user_id);
create policy "Users insert own disputes" on public.disputes for insert with check (auth.uid() = user_id);
create policy "Users update own disputes" on public.disputes for update using (auth.uid() = user_id);

-- Fraud Alerts
create table if not exists public.fraud_alerts (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  severity    text check (severity in ('High','Medium','Low')) not null,
  rule        text not null,
  txn         text,
  amount      numeric(15,2),
  occurred_at text not null,
  status      text check (status in ('Open','Customer Notified','Confirmed Fraud','Cleared','Escalated')) default 'Open',
  created_at  timestamptz default now()
);
alter table public.fraud_alerts enable row level security;
create policy "Users view own fraud alerts"   on public.fraud_alerts for select using (auth.uid() = user_id);
create policy "Users insert own fraud alerts" on public.fraud_alerts for insert with check (auth.uid() = user_id);
create policy "Users update own fraud alerts" on public.fraud_alerts for update using (auth.uid() = user_id);

-- ============================================================
-- Admin: grant service_role full access (admin portal uses service role key)
-- ============================================================
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
