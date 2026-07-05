Enterprise Core Banking Platform — AI Build Prompts

Three Integrated Applications: Customer Mobile App | Internet Banking Portal | Bank Management Portal (Staff)


0. SHARED SYSTEM CONTEXT (read this before using any of the three prompts below)

All three applications are front-ends over one shared core banking backend. Use this section to keep them integrated — paste it at the top of whichever individual prompt you run, or keep it as standing context in your AI builder.

Shared Data Entities (single source of truth across all 3 apps):


Customer Profile (KYC status, risk tier, linked accounts)
Account (savings/current/loan/wallet, balance, ledger)
Transaction (type, status, channel, timestamp, linked account, fraud flag)
Loan (application, status, EMI schedule, credit score, collections stage)
Payment Instruction (ACH/wire/card/UPI/wallet, currency, corridor: SWIFT/SEPA/domestic)
Fraud Alert (severity, linked transaction, resolution status)
Staff User (role, permissions, branch/department)


Shared Rules:


Any action a customer takes (deposit, withdrawal, loan application, payment) creates a record that must appear in real time on the Bank Management Portal (staff side) — e.g., a customer's loan application instantly appears in the staff loan-queue with "Pending Review" status.
Any staff action (KYC approval, loan approval, fraud flag resolution, EMI restructuring) must reflect back to the customer's Mobile App and Internet Banking Portal in real time (push notification + in-app status update).
Authentication, KYC status, and risk tier are shared across Mobile App and Internet Banking Portal — a customer approved on one channel is instantly approved on the other.
All monetary flows (deposits, withdrawals, loan disbursement, EMI debit, wallet top-up, UPI, card/ACH/wire) funnel through one Transaction Engine so the staff portal's real-time monitoring dashboard sees every channel.
Fraud detection runs centrally; alerts can originate from mobile, web, or staff-initiated manual review, and are visible to staff regardless of origin channel.


Design System (apply consistently across all 3):


Enterprise-grade, trust-driven visual language — avoid generic "startup" styling; reference established digital banking product patterns (clear hierarchy, restrained color, strong data legibility).
Distinct but harmonized themes per app: Mobile App = touch-optimized, single-column, bottom nav; Internet Banking Portal = dashboard-first, multi-column, sidebar nav; Bank Management Portal = data-dense, table/queue-first, role-based navigation.
Shared component language: same iconography, same status-color coding (e.g., green = completed/approved, amber = pending, red = flagged/rejected) across all three so staff and customers interpret status identically.


2. INTERNET BANKING PORTAL — Build Prompt (Customer Web)

Portal purpose: Desktop/web channel for customers wanting deeper account control, statements, and business-grade payment operations (e.g., bulk transfers), fully synced with the Mobile App.

Build this as a web dashboard with sidebar navigation. Include ALL flows below — same underlying actions as the Mobile App, but expanded for desktop workflows (bulk actions, detailed reporting, multi-user business accounts).

2.1 Login & Onboarding (Core Banking Automation)


Web login: username/password → MFA (OTP/authenticator app) → Dashboard
New customer onboarding mirrors Mobile App KYC flow, web-adapted: multi-step form wizard with progress bar, drag-drop document upload, live status page with polling updates
Account recovery flow: forgot username/password → identity verification → reset


2.2 Dashboard & Account Management


Multi-account overview table (all accounts, balances, status)
Account detail page: transaction ledger with advanced filters (date range, amount range, type, channel), export (CSV/PDF/Excel)
Real-time transaction monitoring widget: live feed + anomaly highlighting
Standing instructions management: create/edit/cancel recurring transfers


2.3 Deposits & Withdrawals


Same flows as mobile, web-adapted with form-based entry
Bulk deposit reconciliation view for business accounts (upload deposit slip batch)
Withdrawal request → approval-required flow for business/joint accounts (maker-checker: one user initiates, another approves before execution)


2.4 Loan & Credit Management


Loan application wizard (multi-step, save-and-resume)
Document center: upload/view all loan-related documents in one place
Credit score dashboard with historical graph and improvement tips
EMI management: full amortization table view, download schedule, auto-debit mandate management, early-payoff calculator
Collections/recovery: overdue account dashboard, restructuring request submission with document upload, repayment plan simulator


2.5 Secure Payment Processing


Payments hub: single transfer, bulk/batch payment upload (CSV for payroll/vendor payments), payee management (add/verify/delete payees)
Cross-border payment flow: corridor selection (SWIFT/SEPA), compliance questionnaire (purpose of payment, beneficiary details), FX rate lock, fee breakdown, submit → tracking with SWIFT message status (Sent → In Transit → Delivered)
Card management: view linked cards, set spend controls, dispute a transaction (formal dispute form with evidence upload)
Multi-currency accounts: view/manage balances per currency, currency conversion flow
Fraud alert center: list of all alerts, drill into each, confirm/deny, view case status and resolution timeline


2.6 Digital Wallet & UPI


Wallet management console: balance, funding history, linked funding sources, transaction export
UPI management: linked UPI IDs, mandate management (for recurring UPI autopay), transaction history filtered view


2.7 Business/Joint Account Features (Enterprise-Grade)


Multi-user access: invite additional users to account with role (viewer/initiator/approver)
Maker-checker approval queue for payments/withdrawals above threshold
Statement & tax document center (annual statements, interest certificates)
Support ticket system with case tracking