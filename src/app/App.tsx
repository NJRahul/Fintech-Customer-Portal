import { useState } from "react";
import { Sidebar, type NavKey } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { Dashboard } from "./components/pages/Dashboard";
import { Accounts } from "./components/pages/Accounts";
import { Payments } from "./components/pages/Payments";
import { Payees } from "./components/pages/Payees";
import { Loans } from "./components/pages/Loans";
import { Cards } from "./components/pages/Cards";
import { Disputes, Fraud } from "./components/pages/Protection";
import { Placeholder } from "./components/pages/Placeholder";
import { Login } from "./components/pages/Login";
import { useAuth } from "../contexts/AuthContext";

export default function App() {
  const { session, loading } = useAuth();
  const [nav, setNav] = useState<NavKey>("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-[14px] text-gray-500">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen w-full flex bg-gray-100 text-gray-900">
      <Sidebar active={nav} onNavigate={setNav} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar onOpenNotifications={() => setNotifOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {nav === "dashboard" && <Dashboard onNavigate={setNav} />}
          {nav === "accounts"  && <Accounts />}
          {nav === "payments"  && <Payments />}
          {nav === "payees"    && <Payees />}
          {nav === "loans"     && <Loans />}
          {nav === "cards"     && <Cards />}
          {nav === "disputes"  && <Disputes />}
          {nav === "fraud"     && <Fraud />}
          {nav === "statements"&& <Placeholder kind="statements" />}
          {nav === "settings"  && <Placeholder kind="settings" />}
          {nav === "support"   && <Placeholder kind="support" />}
        </main>
      </div>
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
}
