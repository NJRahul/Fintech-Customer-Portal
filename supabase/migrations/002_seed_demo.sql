-- ============================================================
-- Seed demo data for a specific user
-- Replace <USER_ID> with the UUID from auth.users after sign-up
-- Run: Dashboard → SQL Editor → paste and replace <USER_ID>
-- ============================================================

do $$
declare
  uid uuid := '<USER_ID>';
  a1 uuid; a2 uuid; a3 uuid; a4 uuid;
begin

  -- Accounts
  insert into public.accounts (id, user_id, nickname, type, masked, ifsc, balance, status)
  values
    (gen_random_uuid(), uid, 'Primary Savings',  'Savings', '••4821', 'HDFC0000123', 1284502.34, 'Active'),
    (gen_random_uuid(), uid, 'Salary Account',   'Salary',  '••7712', 'HDFC0000123', 234110.00,  'Active'),
    (gen_random_uuid(), uid, 'Business Current', 'Current', '••0092', 'HDFC0000456', 5620411.75, 'Active'),
    (gen_random_uuid(), uid, 'NRE Account',      'NRE',     '••3384', 'HDFC0000789', 812340.12,  'Dormant')
  returning id into a1;

  select id into a1 from public.accounts where user_id = uid and masked = '••4821';
  select id into a2 from public.accounts where user_id = uid and masked = '••7712';
  select id into a3 from public.accounts where user_id = uid and masked = '••0092';

  -- Transactions
  insert into public.transactions (user_id, account_id, date, time, description, counterparty, channel, reference, amount, status)
  values
    (uid, a1, '05 Jul 2026', '14:22', 'UPI/Zomato Ltd', 'zomato@ybl', 'UPI', 'UPI/620512334412', -842.00, 'Completed'),
    (uid, a2, '05 Jul 2026', '11:08', 'Salary Credit — Infosys Ltd', 'INFOSYS PAYROLL', 'NEFT', 'NEFT/N252186123', 218450.00, 'Completed'),
    (uid, a1, '05 Jul 2026', '10:14', 'IMPS to Priya Sharma', 'ICIC0001234 ••7781', 'IMPS', 'IMPS/612504482', -25000.00, 'Completed'),
    (uid, a1, '04 Jul 2026', '19:47', 'Amazon Pay Recharge', 'amazonpay@apl', 'UPI', 'UPI/620423918441', -1499.00, 'Completed'),
    (uid, a1, '04 Jul 2026', '16:32', 'Card POS — Croma Retail', 'CROMA JUHU MUM', 'Card', 'POS/8845123', -68990.00, 'Flagged'),
    (uid, a3, '04 Jul 2026', '12:00', 'Vendor Payment — Rahul Traders', 'HDFC0000092 ••0092', 'RTGS', 'RTGS/HDFCH25074', -484500.00, 'Processing'),
    (uid, a1, '03 Jul 2026', '22:11', 'Netflix Subscription', 'NETFLIX.COM', 'Card', 'POS/9912045', -649.00, 'Completed'),
    (uid, a1, '03 Jul 2026', '18:22', 'Refund — Flipkart Internet Pvt Ltd', 'flipkart@ybl', 'UPI', 'UPI/620312091133', 3499.00, 'Completed'),
    (uid, a1, '02 Jul 2026', '09:03', 'EMI — Home Loan HDFC', 'HDFC HOME LOAN', 'Branch', 'EMI/HL/JUL26', -48250.00, 'Completed'),
    (uid, a1, '02 Jul 2026', '08:15', 'ATM Withdrawal — Andheri E', 'ATM ID 41102', 'ATM', 'ATM/41102/9911', -20000.00, 'Completed'),
    (uid, a1, '01 Jul 2026', '20:44', 'UPI — Swiggy Instamart', 'swiggy@ybl', 'UPI', 'UPI/620112087771', -1284.50, 'Completed'),
    (uid, a1, '01 Jul 2026', '14:00', 'Failed Transfer — Wrong IFSC', 'SBIN000ERR', 'IMPS', 'IMPS/612012554', -15000.00, 'Failed');

  -- Payees
  insert into public.payees (user_id, name, handle, bank, rail, status, added_on)
  values
    (uid, 'Priya Sharma',     'priya.sharma@okhdfcbank', 'HDFC Bank',  'UPI',  'Active',  '12 Mar 2026'),
    (uid, 'Rahul Traders',    'HDFC0000092 ••0092',      'HDFC Bank',  'IMPS', 'Active',  '02 Jan 2026'),
    (uid, 'Ananya Iyer',      'ananya@ybl',              'YES Bank',   'UPI',  'Cooling', '05 Jul 2026'),
    (uid, 'M/s Meghna Steel', 'ICIC0009812 ••3312',      'ICICI Bank', 'NEFT', 'Active',  '18 Nov 2025'),
    (uid, 'Vikram Nair',      'vikram@paytm',            'Paytm PB',   'UPI',  'Pending', '05 Jul 2026');

  -- Loans
  insert into public.loans (user_id, product, principal, outstanding, emi, rate, next_emi, status)
  values
    (uid, 'Home Loan — Andheri Property', 8500000, 6412330, 48250, 8.6, '02 Aug 2026', 'Active'),
    (uid, 'Auto Loan — Tata Nexon EV',    1450000, 812400,  22140, 9.2, '10 Jul 2026', 'Active'),
    (uid, 'Personal Loan — Top-up',       500000,  500000,  12480, 11.5, '—',          'Counter-Offer');

  -- Cards
  insert into public.cards (user_id, network, type, masked, holder, card_limit, used, expiry, status)
  values
    (uid, 'Visa',       'Credit', '•••• •••• •••• 4498', 'ARJUN R MEHTA', 500000, 128450, '08/29', 'Active'),
    (uid, 'Mastercard', 'Debit',  '•••• •••• •••• 7712', 'ARJUN R MEHTA', 100000, 0,      '04/28', 'Active'),
    (uid, 'RuPay',      'Credit', '•••• •••• •••• 0021', 'ARJUN R MEHTA', 200000, 45000,  '11/27', 'Frozen');

  -- Disputes
  insert into public.disputes (user_id, ref, txn_ref, merchant, amount, raised_on, status)
  values
    (uid, 'DSP-2026-04412', 'POS/8845123',    'Croma Retail Juhu',  68990, '04 Jul 2026', 'Under Investigation'),
    (uid, 'DSP-2026-04398', 'UPI/620112087',  'Swiggy Instamart',   1284,  '01 Jul 2026', 'Resolved – Refunded');

  -- Fraud Alerts
  insert into public.fraud_alerts (user_id, severity, rule, txn, amount, occurred_at, status)
  values
    (uid, 'High',   'Unusual location + high-value card POS',          'POS/8845123',   68990, '04 Jul 2026, 16:32', 'Customer Notified'),
    (uid, 'Medium', 'Beneficiary added within 30 min of transfer',     'IMPS/612504482', 25000, '05 Jul 2026, 10:14', 'Open');

end $$;
