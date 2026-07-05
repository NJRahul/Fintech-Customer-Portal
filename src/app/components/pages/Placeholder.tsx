import { FileText, Settings, LifeBuoy } from "lucide-react";
import { Card, Button } from "../primitives";

export function Placeholder({ kind }: { kind: "statements" | "settings" | "support" }) {
  const cfg = {
    statements: {
      title: "Statements & documents",
      caption: "Documents",
      icon: <FileText size={24} strokeWidth={1.5} />,
      body: "Download monthly statements, interest certificates, TDS documents and Form 26AS from a single place.",
      cta: "Generate statement",
    },
    settings: {
      title: "Profile & security",
      caption: "Account",
      icon: <Settings size={24} strokeWidth={1.5} />,
      body: "Manage your registered devices, MFA methods, notification preferences and personal details.",
      cta: "Review security",
    },
    support: {
      title: "Support",
      caption: "Account",
      icon: <LifeBuoy size={24} strokeWidth={1.5} />,
      body: "Open a support ticket, chat with a banker, or visit your nearest branch.",
      cta: "New ticket",
    },
  }[kind];

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div>
        <div className="text-[13px] text-gray-500">{cfg.caption}</div>
        <h1 className="mt-1">{cfg.title}</h1>
      </div>
      <Card>
        <div className="py-16 flex flex-col items-center text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-4">{cfg.icon}</div>
          <h2>{cfg.title}</h2>
          <p className="mt-2">{cfg.body}</p>
          <div className="mt-5"><Button variant="primary">{cfg.cta}</Button></div>
        </div>
      </Card>
    </div>
  );
}
