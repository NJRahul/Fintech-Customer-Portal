import { ReactNode } from "react";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "processing";

const toneMap: Record<Tone, string> = {
  success:    "bg-success-50 text-success-600",
  warning:    "bg-warning-50 text-warning-600",
  danger:     "bg-danger-50  text-danger-600",
  info:       "bg-blue-50    text-blue-600",
  processing: "bg-blue-50    text-blue-600",
  neutral:    "bg-gray-100   text-gray-700",
};

const labelTone: Record<string, Tone> = {
  Completed: "success", Approved: "success", Active: "success", Paid: "success", "Resolved – Refunded": "success", Delivered: "success", Cleared: "success",
  Pending: "warning", "In Review": "warning", Expiring: "warning", "Customer Notified": "warning", Upcoming: "warning", Cooling: "warning", "Counter-Offer": "warning", Overdue: "warning",
  Failed: "danger", Rejected: "danger", Flagged: "danger", "Confirmed Fraud": "danger", High: "danger", Frozen: "danger", Blocked: "danger", Escalated: "danger", Open: "danger",
  Draft: "neutral", Closed: "neutral", Scheduled: "neutral", Dormant: "neutral", "Resolved – Declined": "neutral", Reversed: "neutral", Medium: "neutral", Low: "neutral",
  Processing: "processing", Disbursed: "processing", "Under Investigation": "processing", Sent: "processing", "In Transit": "processing", Screening: "processing", Submitted: "processing",
  Disputed: "warning",
};

export function Badge({ children }: { children: string }) {
  const tone = labelTone[children] || "neutral";
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-[2px] text-[12px] leading-4 font-medium ${toneMap[tone]}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "", padding = true }: { children: ReactNode; className?: string; padding?: boolean }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${padding ? "p-6" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
      <h3>{title}</h3>
      {action}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  type,
  leftIcon,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "compact";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  leftIcon?: ReactNode;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";
  const sizing = size === "compact" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-[14px]";
  const styles = {
    primary:   "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",
    ghost:     "bg-transparent text-blue-600 hover:bg-blue-50",
    danger:    "bg-danger-600 text-white hover:brightness-95",
  }[variant];
  return (
    <button type={type ?? "button"} onClick={onClick} className={`${base} ${sizing} ${styles} ${className}`}>
      {leftIcon}
      {children}
    </button>
  );
}

export function Input({
  label,
  hint,
  error,
  prefix,
  className = "",
  ...rest
}: {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label>{label}</label>}
      <div className={`flex items-center h-10 border rounded-md bg-white ${error ? "border-danger-600" : "border-gray-300 focus-within:border-blue-600 focus-within:ring-[3px] focus-within:ring-blue-50"} ${className}`}>
        {prefix && <span className="pl-3 text-gray-500 text-[14px]">{prefix}</span>}
        <input
          {...rest}
          className="flex-1 h-full px-3 bg-transparent outline-none placeholder:text-gray-500 text-gray-900 text-[14px] rounded-md"
        />
      </div>
      {error && <span className="text-[12px] leading-4 text-danger-600">{error}</span>}
      {hint && !error && <span className="text-[12px] leading-4 text-gray-500">{hint}</span>}
    </div>
  );
}

export function KpiCard({ label, value, delta, deltaTone }: { label: string; value: string; delta?: string; deltaTone?: "up" | "down" | "flat" }) {
  const toneClass = deltaTone === "up" ? "text-success-600" : deltaTone === "down" ? "text-danger-600" : "text-gray-500";
  const arrow = deltaTone === "up" ? "▲" : deltaTone === "down" ? "▼" : "•";
  return (
    <Card>
      <div className="text-[12px] leading-4 font-medium text-gray-500 uppercase tracking-[0.03em]">{label}</div>
      <div className="mt-2 text-[24px] leading-8 font-bold text-gray-900 tabular">{value}</div>
      {delta && <div className={`mt-1 text-[12px] leading-4 font-medium ${toneClass}`}>{arrow} {delta}</div>}
    </Card>
  );
}

export function Amount({ value, showSign = false, className = "" }: { value: number; showSign?: boolean; className?: string }) {
  const isCredit = value > 0;
  const isDebit  = value < 0;
  const color = isCredit ? "text-success-600" : "text-gray-900";
  const sign = isCredit ? "+" : isDebit ? "−" : "";
  const abs = Math.abs(value);
  const [i, d] = abs.toFixed(2).split(".");
  const last3 = i.slice(-3);
  const rest  = i.slice(0, -3);
  const grouped = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3;
  return (
    <span className={`tabular font-semibold ${color} ${className}`}>
      {(showSign || isCredit || isDebit) ? sign : ""}₹{grouped}.{d}
    </span>
  );
}

export function TableHeader({ children }: { children: ReactNode }) {
  return (
    <th className="bg-gray-100 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-[0.03em] px-4 h-11 border-b border-gray-200 whitespace-nowrap">
      {children}
    </th>
  );
}

export function Row({ children, selected, onClick }: { children: ReactNode; selected?: boolean; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-gray-200 transition-colors ${selected ? "bg-blue-50" : "hover:bg-gray-50"} ${onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </tr>
  );
}
