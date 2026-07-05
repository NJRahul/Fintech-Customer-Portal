export const formatINR = (n: number, opts: { showSign?: boolean } = {}) => {
  const abs = Math.abs(n);
  const [intPart, decPart] = abs.toFixed(2).split(".");
  // Indian grouping: last 3, then groups of 2
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3;
  const sign = n < 0 ? "−" : opts.showSign ? "+" : "";
  return `${sign}₹${grouped}.${decPart}`;
};

export type Account = {
  id: string;
  nickname: string;
  type: "Savings" | "Current" | "Salary" | "NRE" | "Loan";
  masked: string;
  ifsc: string;
  balance: number;
  status: "Active" | "Frozen" | "Dormant" | "Closed";
};

export const accounts: Account[] = [
  { id: "a1", nickname: "Primary Savings",  type: "Savings", masked: "••4821", ifsc: "HDFC0000123", balance: 1284502.34, status: "Active" },
  { id: "a2", nickname: "Salary Account",   type: "Salary",  masked: "••7712", ifsc: "HDFC0000123", balance: 234110.00, status: "Active" },
  { id: "a3", nickname: "Business Current", type: "Current", masked: "••0092", ifsc: "HDFC0000456", balance: 5620411.75, status: "Active" },
  { id: "a4", nickname: "NRE Account",      type: "NRE",     masked: "••3384", ifsc: "HDFC0000789", balance: 812340.12, status: "Dormant" },
];

export type Transaction = {
  id: string;
  date: string;      // DD MMM YYYY
  time: string;      // HH:mm
  description: string;
  counterparty: string;
  channel: "UPI" | "IMPS" | "NEFT" | "RTGS" | "Card" | "Wallet" | "Branch" | "ATM";
  reference: string;
  amount: number;    // + credit / - debit
  status: "Completed" | "Processing" | "Failed" | "Flagged" | "Disputed" | "Reversed";
  accountId: string;
};

export const transactions: Transaction[] = [
  { id: "t1",  date: "05 Jul 2026", time: "14:22", description: "UPI/Zomato Ltd", counterparty: "zomato@ybl", channel: "UPI",  reference: "UPI/620512334412", amount: -842.00,   status: "Completed", accountId: "a1" },
  { id: "t2",  date: "05 Jul 2026", time: "11:08", description: "Salary Credit — Infosys Ltd", counterparty: "INFOSYS PAYROLL", channel: "NEFT", reference: "NEFT/N252186123", amount: 218450.00, status: "Completed", accountId: "a2" },
  { id: "t3",  date: "05 Jul 2026", time: "10:14", description: "IMPS to Priya Sharma", counterparty: "ICIC0001234 ••7781", channel: "IMPS", reference: "IMPS/612504482", amount: -25000.00, status: "Completed", accountId: "a1" },
  { id: "t4",  date: "04 Jul 2026", time: "19:47", description: "Amazon Pay Recharge", counterparty: "amazonpay@apl", channel: "UPI",  reference: "UPI/620423918441", amount: -1499.00,  status: "Completed", accountId: "a1" },
  { id: "t5",  date: "04 Jul 2026", time: "16:32", description: "Card POS — Croma Retail",     counterparty: "CROMA JUHU MUM",  channel: "Card", reference: "POS/8845123",   amount: -68990.00, status: "Flagged",   accountId: "a1" },
  { id: "t6",  date: "04 Jul 2026", time: "12:00", description: "Vendor Payment — Rahul Traders", counterparty: "HDFC0000092 ••0092", channel: "RTGS", reference: "RTGS/HDFCH25074", amount: -484500.00, status: "Processing", accountId: "a3" },
  { id: "t7",  date: "03 Jul 2026", time: "22:11", description: "Netflix Subscription", counterparty: "NETFLIX.COM", channel: "Card", reference: "POS/9912045",   amount: -649.00,   status: "Completed", accountId: "a1" },
  { id: "t8",  date: "03 Jul 2026", time: "18:22", description: "Refund — Flipkart Internet Pvt Ltd", counterparty: "flipkart@ybl", channel: "UPI",  reference: "UPI/620312091133", amount: 3499.00, status: "Completed", accountId: "a1" },
  { id: "t9",  date: "02 Jul 2026", time: "09:03", description: "EMI — Home Loan HDFC",         counterparty: "HDFC HOME LOAN",  channel: "Branch", reference: "EMI/HL/JUL26",  amount: -48250.00, status: "Completed", accountId: "a1" },
  { id: "t10", date: "02 Jul 2026", time: "08:15", description: "ATM Withdrawal — Andheri E",   counterparty: "ATM ID 41102",    channel: "ATM",  reference: "ATM/41102/9911",  amount: -20000.00, status: "Completed", accountId: "a1" },
  { id: "t11", date: "01 Jul 2026", time: "20:44", description: "UPI — Swiggy Instamart",       counterparty: "swiggy@ybl",      channel: "UPI",  reference: "UPI/620112087771", amount: -1284.50, status: "Completed", accountId: "a1" },
  { id: "t12", date: "01 Jul 2026", time: "14:00", description: "Failed Transfer — Wrong IFSC", counterparty: "SBIN000ERR",      channel: "IMPS", reference: "IMPS/612012554", amount: -15000.00, status: "Failed",    accountId: "a1" },
];

export type Payee = {
  id: string;
  name: string;
  handle: string;
  bank: string;
  rail: "UPI" | "IMPS" | "NEFT" | "Wire";
  status: "Active" | "Cooling" | "Pending";
  addedOn: string;
};

export const payees: Payee[] = [
  { id: "p1", name: "Priya Sharma",    handle: "priya.sharma@okhdfcbank", bank: "HDFC Bank",  rail: "UPI",  status: "Active", addedOn: "12 Mar 2026" },
  { id: "p2", name: "Rahul Traders",   handle: "HDFC0000092 ••0092",      bank: "HDFC Bank",  rail: "RTGS" as any, status: "Active", addedOn: "02 Jan 2026" },
  { id: "p3", name: "Ananya Iyer",     handle: "ananya@ybl",              bank: "YES Bank",   rail: "UPI",  status: "Cooling", addedOn: "05 Jul 2026" },
  { id: "p4", name: "M/s Meghna Steel",handle: "ICIC0009812 ••3312",      bank: "ICICI Bank", rail: "NEFT", status: "Active", addedOn: "18 Nov 2025" },
  { id: "p5", name: "Vikram Nair",     handle: "vikram@paytm",            bank: "Paytm PB",   rail: "UPI",  status: "Pending", addedOn: "05 Jul 2026" },
];

export type Loan = {
  id: string;
  product: string;
  principal: number;
  outstanding: number;
  emi: number;
  rate: number;
  nextEmi: string;
  status: "Active" | "In Review" | "Disbursed" | "Closed" | "Counter-Offer";
};

export const loans: Loan[] = [
  { id: "l1", product: "Home Loan — Andheri Property", principal: 8500000, outstanding: 6412330, emi: 48250, rate: 8.6, nextEmi: "02 Aug 2026", status: "Active" },
  { id: "l2", product: "Auto Loan — Tata Nexon EV",    principal: 1450000, outstanding: 812400, emi: 22140, rate: 9.2, nextEmi: "10 Jul 2026", status: "Active" },
  { id: "l3", product: "Personal Loan — Top-up",       principal: 500000,  outstanding: 500000, emi: 12480, rate: 11.5, nextEmi: "—", status: "Counter-Offer" },
];

export type Card = {
  id: string;
  network: "Visa" | "Mastercard" | "RuPay";
  type: "Credit" | "Debit";
  masked: string;
  holder: string;
  limit: number;
  used: number;
  expiry: string;
  status: "Active" | "Frozen" | "Blocked";
};

export const cards: Card[] = [
  { id: "c1", network: "Visa",       type: "Credit", masked: "•••• •••• •••• 4498", holder: "ARJUN R MEHTA", limit: 500000, used: 128450, expiry: "08/29", status: "Active" },
  { id: "c2", network: "Mastercard", type: "Debit",  masked: "•••• •••• •••• 7712", holder: "ARJUN R MEHTA", limit: 100000, used: 0,      expiry: "04/28", status: "Active" },
  { id: "c3", network: "RuPay",      type: "Credit", masked: "•••• •••• •••• 0021", holder: "ARJUN R MEHTA", limit: 200000, used: 45000,  expiry: "11/27", status: "Frozen" },
];

export type Dispute = {
  id: string;
  ref: string;
  txnRef: string;
  merchant: string;
  amount: number;
  raisedOn: string;
  status: "Open" | "Under Investigation" | "Resolved – Refunded" | "Resolved – Declined";
};

export const disputes: Dispute[] = [
  { id: "d1", ref: "DSP-2026-04412", txnRef: "POS/8845123", merchant: "Croma Retail Juhu",  amount: 68990, raisedOn: "04 Jul 2026", status: "Under Investigation" },
  { id: "d2", ref: "DSP-2026-04398", txnRef: "UPI/620112087", merchant: "Swiggy Instamart", amount: 1284,  raisedOn: "01 Jul 2026", status: "Resolved – Refunded" },
];

export type FraudAlert = {
  id: string;
  severity: "High" | "Medium" | "Low";
  rule: string;
  txn: string;
  amount: number;
  when: string;
  status: "Open" | "Customer Notified" | "Confirmed Fraud" | "Cleared" | "Escalated";
};

export const fraudAlerts: FraudAlert[] = [
  { id: "f1", severity: "High",   rule: "Unusual location + high-value card POS", txn: "POS/8845123", amount: 68990, when: "04 Jul 2026, 16:32", status: "Customer Notified" },
  { id: "f2", severity: "Medium", rule: "Beneficiary added within 30 min of transfer", txn: "IMPS/612504482", amount: 25000, when: "05 Jul 2026, 10:14", status: "Open" },
];
