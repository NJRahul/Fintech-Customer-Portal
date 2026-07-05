import { LayoutDashboard, Wallet, ArrowLeftRight, Users, Landmark, CreditCard, ShieldAlert, FileWarning, FileText, Settings, LifeBuoy } from "lucide-react";
import type { ReactNode } from "react";

export type NavKey =
  | "dashboard" | "accounts" | "payments" | "payees" | "loans" | "cards" | "disputes" | "fraud" | "statements" | "settings" | "support";

const groups: { label?: string; items: { key: NavKey; label: string; icon: ReactNode; badge?: string }[] }[] = [
  {
    items: [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} strokeWidth={1.5} /> },
      { key: "accounts",  label: "Accounts",  icon: <Wallet size={20} strokeWidth={1.5} /> },
    ],
  },
  {
    label: "MONEY MOVEMENT",
    items: [
      { key: "payments", label: "Payments",  icon: <ArrowLeftRight size={20} strokeWidth={1.5} /> },
      { key: "payees",   label: "Payees",    icon: <Users size={20} strokeWidth={1.5} /> },
      { key: "cards",    label: "Cards",     icon: <CreditCard size={20} strokeWidth={1.5} /> },
    ],
  },
  {
    label: "CREDIT",
    items: [
      { key: "loans", label: "Loans", icon: <Landmark size={20} strokeWidth={1.5} /> },
    ],
  },
  {
    label: "PROTECTION",
    items: [
      { key: "fraud",    label: "Fraud alerts", icon: <ShieldAlert size={20} strokeWidth={1.5} />, badge: "2" },
      { key: "disputes", label: "Disputes",     icon: <FileWarning size={20} strokeWidth={1.5} />, badge: "1" },
    ],
  },
  {
    label: "DOCUMENTS",
    items: [
      { key: "statements", label: "Statements", icon: <FileText size={20} strokeWidth={1.5} /> },
    ],
  },
  {
    label: "ACCOUNT",
    items: [
      { key: "settings", label: "Profile & security", icon: <Settings size={20} strokeWidth={1.5} /> },
      { key: "support",  label: "Support",            icon: <LifeBuoy size={20} strokeWidth={1.5} /> },
    ],
  },
];

export function Sidebar({ active, onNavigate }: { active: NavKey; onNavigate: (k: NavKey) => void }) {
  return (
    <aside className="w-[264px] shrink-0 bg-navy-900 text-white flex flex-col min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-navy-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <span className="font-bold text-white text-[15px]">M</span>
          </div>
          <div className="font-semibold text-[15px] tracking-tight">Meridian Bank</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {groups.map((g, gi) => (
          <div key={gi} className={gi === 0 ? "px-3" : "px-3 mt-6"}>
            {g.label && (
              <div className="px-3 mb-2 text-[11px] font-semibold tracking-[0.06em] text-gray-500">{g.label}</div>
            )}
            <div className="flex flex-col gap-0.5">
              {g.items.map((it) => {
                const isActive = it.key === active;
                return (
                  <button
                    key={it.key}
                    onClick={() => onNavigate(it.key)}
                    className={`relative flex items-center gap-3 h-11 pl-3 pr-3 rounded-md text-[14px] transition-colors
                      ${isActive
                        ? "bg-navy-800 text-white font-medium"
                        : "text-gray-300 hover:bg-navy-800 hover:text-white"}`}
                  >
                    {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600" />}
                    <span className="text-current opacity-90">{it.icon}</span>
                    <span className="flex-1 text-left">{it.label}</span>
                    {it.badge && (
                      <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full bg-danger-600 text-white">{it.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-navy-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">AM</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate">Arjun R Mehta</div>
            <div className="text-[11px] text-gray-500 truncate">Customer ID CX-402118</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
