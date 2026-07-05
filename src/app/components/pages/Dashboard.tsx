import { ArrowUpRight, Send, PlusCircle, FileDown, ChevronRight } from "lucide-react";
import { Card, CardHeader, KpiCard, Button, Amount, Badge, TableHeader, Row, Input } from "../primitives";
import { formatINR } from "../data";
import { useAccounts, useTransactions, useLoans, usePayees } from "../../../hooks/useData";
import type { NavKey } from "../Sidebar";

export function Dashboard({ onNavigate }: { onNavigate: (k: NavKey) => void }) {
  const { data: accounts, loading: loadingAccounts } = useAccounts();
  const { data: transactions, loading: loadingTxns } = useTransactions();
  const { data: loans } = useLoans();
  const { data: payees } = usePayees();

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const recent = transactions.slice(0, 6);
  const upcomingEmi = loans.filter(l => l.status === 'Active').reduce((s, l) => s + l.emi, 0);
  const nextEmiDate = loans.find(l => l.status === 'Active' && l.nextEmi !== '—')?.nextEmi ?? '—';
  const firstPayee = payees[0];

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</div>
          <h1 className="mt-1">Welcome back</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<FileDown size={16} strokeWidth={1.5} />}>Download statement</Button>
          <Button variant="primary" leftIcon={<Send size={16} strokeWidth={1.5} />} onClick={() => onNavigate("payments")}>New transfer</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total balance"     value={loadingAccounts ? '…' : formatINR(totalBalance)} delta="Across all accounts" deltaTone="up" />
        <KpiCard label="Pending approvals" value="3"                        delta="₹5,84,500.00 awaiting"  deltaTone="flat" />
        <KpiCard label="Upcoming EMIs"     value={upcomingEmi ? formatINR(upcomingEmi) : '—'} delta={`Next ${nextEmiDate}`} deltaTone="flat" />
        <KpiCard label="Open disputes"     value="1"                        delta="Under review"            deltaTone="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card padding={false}>
            <div className="p-6 pb-3 flex items-center justify-between border-b border-gray-200">
              <h3>Accounts</h3>
              <button onClick={() => onNavigate("accounts")} className="text-[13px] font-medium text-blue-600 hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            {loadingAccounts ? (
              <div className="px-6 py-8 text-[13px] text-gray-400">Loading accounts…</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <TableHeader>Account</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>IFSC</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader><div className="text-right">Available balance</div></TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <Row key={a.id} onClick={() => onNavigate("accounts")}>
                      <td className="px-4 py-3">
                        <div className="text-[14px] font-medium text-gray-900">{a.nickname}</div>
                        <div className="text-[12px] text-gray-500 tabular">{a.masked}</div>
                      </td>
                      <td className="px-4 py-3 text-[14px] text-gray-700">{a.type}</td>
                      <td className="px-4 py-3 text-[14px] text-gray-700 tabular">{a.ifsc}</td>
                      <td className="px-4 py-3"><Badge>{a.status}</Badge></td>
                      <td className="px-4 py-3 text-right"><Amount value={a.balance} /></td>
                    </Row>
                  ))}
                </tbody>
              </table>
            )}
          </Card>

          <Card padding={false}>
            <div className="p-6 pb-3 flex items-center justify-between border-b border-gray-200">
              <h3>Recent activity</h3>
              <button onClick={() => onNavigate("accounts")} className="text-[13px] font-medium text-blue-600 hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            {loadingTxns ? (
              <div className="px-6 py-8 text-[13px] text-gray-400">Loading transactions…</div>
            ) : (
              <div>
                {recent.map((t, i) => (
                  <div
                    key={t.id}
                    className={`flex items-center gap-4 px-6 py-3 ${i !== recent.length - 1 ? "border-b border-gray-200" : ""} hover:bg-gray-50 cursor-pointer`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                      <ArrowUpRight size={18} strokeWidth={1.5} className={t.amount > 0 ? "rotate-180" : ""} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-gray-900 truncate">{t.description}</div>
                      <div className="text-[12px] text-gray-500 tabular">{t.date} · {t.channel} · {t.reference}</div>
                    </div>
                    <div className="text-right">
                      <Amount value={t.amount} showSign />
                      {t.status !== "Completed" && <div className="mt-0.5"><Badge>{t.status}</Badge></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Quick transfer" />
            <div className="flex flex-col gap-4">
              <Input label="From account" defaultValue={accounts[0] ? `${accounts[0].nickname} ${accounts[0].masked}` : 'Loading…'} readOnly />
              <div>
                <label>To payee</label>
                <div className="mt-1.5 flex items-center h-10 px-3 border border-gray-300 rounded-md bg-white">
                  {firstPayee ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center justify-center mr-2">
                        {firstPayee.name.split(' ').map((n: string) => n[0]).slice(0,2).join('')}
                      </div>
                      <div className="text-[14px] text-gray-900 flex-1">{firstPayee.name}</div>
                      <div className="text-[12px] text-gray-500 tabular">{firstPayee.handle}</div>
                    </>
                  ) : (
                    <div className="text-[13px] text-gray-400">No payees yet</div>
                  )}
                </div>
              </div>
              <Input label="Amount" prefix="₹" placeholder="0.00" />
              <Input label="Note (optional)" placeholder="e.g. rent, groceries" />
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="text-[12px] text-gray-500">Rail · IMPS · Free · Instant</div>
                <Button variant="primary" onClick={() => onNavigate("payments")}>Continue</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Loans" action={<button onClick={() => onNavigate("loans")} className="text-[13px] font-medium text-blue-600 hover:underline">Manage</button>} />
            <div className="flex flex-col gap-4">
              {loans.length === 0 ? (
                <div className="text-[13px] text-gray-400">No active loans</div>
              ) : (
                loans.map((l) => (
                  <div key={l.id} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[14px] font-medium text-gray-900 truncate">{l.product}</div>
                      <div className="text-[12px] text-gray-500 tabular">EMI {formatINR(l.emi)} · {l.rate}% · Next {l.nextEmi}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[13px] tabular text-gray-900 font-semibold">{formatINR(l.outstanding)}</div>
                      <div className="text-[11px] text-gray-500">outstanding</div>
                    </div>
                  </div>
                ))
              )}
              <Button variant="secondary" leftIcon={<PlusCircle size={16} strokeWidth={1.5} />}>New loan application</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
