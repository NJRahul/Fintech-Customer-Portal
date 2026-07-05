import { X, Check, ShieldAlert, ArrowLeftRight, FileWarning, Landmark } from "lucide-react";
import type { ReactNode } from "react";

const items: { icon: ReactNode; title: string; body: string; time: string; tone: "info" | "warning" | "danger" | "success" }[] = [
  { icon: <ShieldAlert size={16} strokeWidth={1.5} />, title: "Was this you?", body: "Card POS ₹68,990.00 at Croma Retail Juhu.", time: "2 min ago", tone: "danger" },
  { icon: <ArrowLeftRight size={16} strokeWidth={1.5} />, title: "IMPS credit received", body: "₹2,18,450.00 from Infosys Payroll · ••7712.", time: "34 min ago", tone: "success" },
  { icon: <Landmark size={16} strokeWidth={1.5} />, title: "EMI reminder", body: "Home Loan EMI of ₹48,250.00 due on 02 Aug 2026.", time: "3 hr ago", tone: "warning" },
  { icon: <FileWarning size={16} strokeWidth={1.5} />, title: "Dispute update", body: "Case DSP-2026-04412 is now Under Investigation.", time: "Yesterday", tone: "info" },
  { icon: <Check size={16} strokeWidth={1.5} />, title: "New payee added", body: "Ananya Iyer (ananya@ybl) — transfers enabled after 30-min cooling period.", time: "Yesterday", tone: "info" },
];

const toneRing = {
  info: "bg-blue-50 text-blue-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
  success: "bg-success-50 text-success-600",
};

export function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-900/40 z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-[420px] bg-white shadow-[0_12px_24px_rgba(16,24,40,0.14)] z-50 flex flex-col">
        <div className="h-16 px-5 flex items-center justify-between border-b border-gray-200">
          <div>
            <h3>Notifications</h3>
            <div className="text-[12px] text-gray-500">5 new · today</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-500">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.map((n, i) => (
            <div key={i} className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${toneRing[n.tone]}`}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[14px] font-semibold text-gray-900">{n.title}</div>
                    <div className="text-[11px] text-gray-500 shrink-0">{n.time}</div>
                  </div>
                  <div className="text-[13px] text-gray-700 mt-0.5">{n.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <button className="text-[13px] font-medium text-blue-600 hover:underline">Mark all as read</button>
          <button className="text-[13px] font-medium text-gray-700 hover:underline">Notification settings</button>
        </div>
      </aside>
    </>
  );
}
