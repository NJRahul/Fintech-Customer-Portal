import { Search, Bell, ChevronDown, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function TopBar({ onOpenNotifications }: { onOpenNotifications: () => void }) {
  const { user, signOut } = useAuth();

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Customer";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-2 h-10 px-3 flex-1 max-w-[520px] border border-gray-300 rounded-md focus-within:border-blue-600 focus-within:ring-[3px] focus-within:ring-blue-50 bg-white">
        <Search size={18} strokeWidth={1.5} className="text-gray-500" />
        <input
          className="flex-1 h-full outline-none placeholder:text-gray-500 text-[14px] bg-transparent"
          placeholder="Search transactions, payees, IFSC, reference…"
        />
        <kbd className="hidden md:inline text-[11px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5">⌘K</kbd>
      </div>

      <div className="flex-1" />

      <button className="h-9 px-3 rounded-md text-[13px] font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
        Retail Banking · Mumbai
        <ChevronDown size={14} />
      </button>

      <button className="w-10 h-10 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-500">
        <HelpCircle size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={onOpenNotifications}
        className="relative w-10 h-10 rounded-md hover:bg-gray-50 flex items-center justify-center text-gray-700"
      >
        <Bell size={20} strokeWidth={1.5} />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger-600 ring-2 ring-white" />
      </button>

      <div className="h-8 w-px bg-gray-200" />

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2.5 h-10 pl-1 pr-2 rounded-md">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[13px] font-semibold">
            {initials}
          </div>
          <div className="text-left leading-tight">
            <div className="text-[13px] font-semibold text-gray-900 max-w-[120px] truncate">{displayName}</div>
            <div className="text-[11px] text-gray-500">Personal</div>
          </div>
        </div>
        <button
          onClick={signOut}
          title="Sign out"
          className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500"
        >
          <LogOut size={16} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
