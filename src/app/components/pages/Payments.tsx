import { useState } from "react";
import { Check, Info, Upload, Globe2, Repeat, Send } from "lucide-react";
import { Card, CardHeader, Input, Button, Badge, Amount } from "../primitives";
import { formatINR } from "../data";
import { useAccounts, usePayees } from "../../../hooks/useData";

const tabs = [
  { key: "single", label: "Single transfer",       icon: <Send size={16} strokeWidth={1.5} /> },
  { key: "bulk",   label: "Bulk upload",           icon: <Upload size={16} strokeWidth={1.5} /> },
  { key: "cross",  label: "Cross-border",          icon: <Globe2 size={16} strokeWidth={1.5} /> },
  { key: "si",     label: "Standing instructions", icon: <Repeat size={16} strokeWidth={1.5} /> },
];

export function Payments() {
  const { data: accounts } = useAccounts();
  const { data: payees } = usePayees();

  const [tab, setTab] = useState("single");
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div>
        <div className="text-[13px] text-gray-500">Payments hub</div>
        <h1 className="mt-1">Send money</h1>
      </div>

      <div className="flex items-center gap-1 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`h-11 px-4 flex items-center gap-2 text-[14px] font-medium border-b-2 -mb-px transition-colors
              ${tab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === "single" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                {[
                  { n: 1, label: "Details" },
                  { n: 2, label: "Review" },
                  { n: 3, label: "Authenticate" },
                  { n: 4, label: "Done" },
                ].map((s, i, arr) => {
                  const done = s.n < step;
                  const current = s.n === step;
                  return (
                    <div key={s.n} className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold
                        ${done ? "bg-blue-600 text-white" :
                           current ? "ring-2 ring-blue-600 text-blue-600 bg-white" :
                                     "bg-gray-100 text-gray-500"}`}>
                        {done ? <Check size={16} /> : s.n}
                      </div>
                      <div className={`text-[13px] font-medium ${current ? "text-gray-900" : done ? "text-gray-700" : "text-gray-500"}`}>{s.label}</div>
                      {i < arr.length - 1 && <div className="flex-1 h-px bg-gray-200" />}
                    </div>
                  );
                })}
              </div>

              {step === 1 && (
                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label>From account</label>
                    <div className="mt-1.5 flex divide-x divide-gray-200 border border-gray-300 rounded-md overflow-hidden">
                      {accounts.slice(0, 3).map((a, i) => (
                        <button key={a.id} className={`flex-1 text-left px-4 py-3 hover:bg-gray-50 ${i === 0 ? "bg-blue-50" : "bg-white"}`}>
                          <div className="text-[13px] font-medium text-gray-900">{a.nickname}</div>
                          <div className="text-[12px] text-gray-500 tabular">{a.masked}</div>
                          <div className="mt-1 text-[13px] tabular font-semibold text-gray-900">{formatINR(a.balance)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input label="Payee name" placeholder="Enter payee name" />
                  <Input label="UPI ID / Account" placeholder="UPI ID or account number" />
                  <Input label="Amount" prefix="₹" placeholder="0.00" />
                  <div>
                    <label>Rail</label>
                    <div className="mt-1.5 flex gap-2">
                      {["UPI", "IMPS", "NEFT", "RTGS"].map((r, i) => (
                        <button key={r} className={`h-10 px-4 text-[13px] font-medium rounded-md border
                          ${i === 1 ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Input label="Purpose" placeholder="e.g. Rent, Invoice payment" />
                  <Input label="Reference / narration (optional)" placeholder="Shown on statement" />
                  <div className="md:col-span-2 flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-[12px] text-gray-500">Transaction will be verified and processed instantly via IMPS. Daily limit ₹5,00,000.00.</div>
                    <div className="flex gap-2">
                      <Button variant="secondary">Save as draft</Button>
                      <Button variant="primary" onClick={() => setStep(2)}>Continue to review</Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="pt-6">
                  <div className="rounded-lg bg-gray-50 border border-gray-200 p-6">
                    <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.03em]">You are about to transfer</div>
                    <div className="mt-2 tabular font-bold text-gray-900" style={{ fontSize: 32, lineHeight: "40px" }}>
                      <span className="font-medium text-gray-500 text-[20px] mr-1">₹</span>—
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-3 p-4 rounded-md bg-warning-50 border-l-4 border-warning-600">
                    <Info size={18} className="text-warning-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="text-[13px] text-gray-700">
                      Please verify the payee details before confirming the transfer.
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep(1)}>← Back to edit</Button>
                    <div className="flex gap-2">
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary" onClick={() => setStep(3)}>Confirm & authenticate</Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="pt-8 flex flex-col items-center text-center max-w-md mx-auto">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Send size={22} strokeWidth={1.5} />
                  </div>
                  <h2>Authenticate transfer</h2>
                  <p className="mt-2">Enter the 6-digit OTP sent to your registered mobile and email.</p>
                  <div className="mt-6 flex gap-2 tabular">
                    {[0,1,2,3,4,5].map((i) => (
                      <div key={i} className="w-11 h-12 border border-gray-300 rounded-md flex items-center justify-center text-[18px] font-semibold text-gray-900" />
                    ))}
                  </div>
                  <div className="mt-3 text-[12px] text-gray-500">Resend OTP in 00:30</div>
                  <div className="mt-8 flex gap-2 w-full">
                    <Button variant="secondary" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                    <Button variant="primary" className="flex-1" onClick={() => setStep(4)}>Authorize transfer</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="pt-10 pb-6 flex flex-col items-center text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-success-50 text-success-600 flex items-center justify-center mb-4">
                    <Check size={28} strokeWidth={2} />
                  </div>
                  <h2>Transfer sent</h2>
                  <p className="mt-2">Your transfer has been submitted successfully.</p>
                  <div className="mt-6 flex gap-2 w-full">
                    <Button variant="secondary" className="flex-1">Download receipt</Button>
                    <Button variant="primary" className="flex-1" onClick={() => setStep(1)}>Done</Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader title="Recent payees" action={<button className="text-[13px] font-medium text-blue-600">Manage</button>} />
              <div className="flex flex-col gap-3">
                {payees.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-[12px] font-semibold flex items-center justify-center">
                      {p.name.split(" ").map((s: string) => s[0]).slice(0,2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-gray-900 truncate">{p.name}</div>
                      <div className="text-[12px] text-gray-500 truncate">{p.handle}</div>
                    </div>
                    <Badge>{p.status}</Badge>
                  </div>
                ))}
                {payees.length === 0 && <div className="text-[13px] text-gray-400">No payees yet</div>}
              </div>
            </Card>

            <Card>
              <CardHeader title="Limits & fees" />
              <dl className="text-[13px] divide-y divide-gray-200">
                {[
                  ["IMPS per transaction", "₹5,00,000.00"],
                  ["NEFT / RTGS", "No upper limit"],
                  ["UPI per day", "₹1,00,000.00"],
                  ["Wire transfer fee", "₹550.00 + GST"],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between py-2.5">
                    <dt className="text-gray-500">{l}</dt>
                    <dd className="tabular font-medium text-gray-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      )}

      {tab !== "single" && (
        <Card>
          <div className="py-16 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-4">
              {tabs.find((t) => t.key === tab)?.icon}
            </div>
            <h2>{tabs.find((t) => t.key === tab)?.label}</h2>
            <p className="mt-2 max-w-md">Configure and monitor your {tabs.find((t) => t.key === tab)?.label.toLowerCase()} workflows. Upload your first batch or template to get started.</p>
            <div className="mt-5"><Button variant="primary">Get started</Button></div>
          </div>
        </Card>
      )}
    </div>
  );
}
