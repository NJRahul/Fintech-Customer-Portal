import { useState } from "react";
import { Search, SlidersHorizontal, Download, ChevronLeft, ChevronRight, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, Amount, Badge, Button, TableHeader, Row } from "../primitives";
import { formatINR } from "../data";
import { useAccounts, useTransactions } from "../../../hooks/useData";

export function Accounts() {
  const { data: accounts, loading: loadingAccounts } = useAccounts();
  const { data: transactions, loading: loadingTxns } = useTransactions();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = accounts.find(a => a.id === (selectedId ?? accounts[0]?.id));
  const rows = transactions.filter(t => t.accountId === selected?.id);

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">Accounts overview</div>
          <h1 className="mt-1">Accounts & ledger</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" leftIcon={<Download size={16} strokeWidth={1.5} />}>Export CSV</Button>
          <Button variant="primary">Open new account</Button>
        </div>
      </div>

      {loadingAccounts ? (
        <div className="text-[13px] text-gray-400 py-4">Loading accounts…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((a) => {
            const isActive = a.id === (selectedId ?? accounts[0]?.id);
            return (
              <button
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={`text-left bg-white border rounded-lg p-5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition
                  ${isActive ? "border-blue-600 ring-[3px] ring-blue-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.03em]">{a.type}</span>
                  <Badge>{a.status}</Badge>
                </div>
                <div className="mt-3 text-[14px] font-medium text-gray-900">{a.nickname}</div>
                <div className="text-[12px] text-gray-500 tabular">{a.masked} · {a.ifsc}</div>
                <div className="mt-4 tabular font-semibold text-[20px] text-gray-900">{formatINR(a.balance)}</div>
              </button>
            );
          })}
        </div>
      )}

      {selected && (
        <Card padding={false}>
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.03em]">Ledger</div>
              <div className="mt-1 text-[16px] font-semibold text-gray-900">{selected.nickname} · {selected.masked}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[11px] text-gray-500 uppercase tracking-[0.03em]">Available balance</div>
                <div className="tabular text-[20px] font-bold text-gray-900">{formatINR(selected.balance)}</div>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 h-9 px-3 border border-gray-300 rounded-md bg-white w-[280px]">
              <Search size={16} strokeWidth={1.5} className="text-gray-500" />
              <input placeholder="Search description, ref, payee…" className="flex-1 h-full outline-none text-[13px] bg-transparent placeholder:text-gray-500" />
            </div>
            {["Last 30 days", "All channels", "All statuses"].map((c) => (
              <button key={c} className="h-9 px-3 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                {c} <ChevronRight size={14} className="rotate-90 text-gray-500" />
              </button>
            ))}
            <div className="flex-1" />
            <Button variant="secondary" size="compact" leftIcon={<SlidersHorizontal size={14} strokeWidth={1.5} />}>Columns</Button>
          </div>

          {loadingTxns ? (
            <div className="px-6 py-8 text-[13px] text-gray-400">Loading transactions…</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Description</TableHeader>
                  <TableHeader>Channel</TableHeader>
                  <TableHeader>Reference</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader><div className="text-right">Amount</div></TableHeader>
                  <TableHeader><div className="text-right pr-2">Balance</div></TableHeader>
                  <TableHeader><span className="sr-only">Actions</span></TableHeader>
                </tr>
              </thead>
              <tbody>
                {rows.map((t, i) => {
                  const running = selected.balance - rows.slice(0, i + 1).reduce((s, x) => s - x.amount, 0);
                  return (
                    <Row key={t.id}>
                      <td className="px-4 py-3 text-[13px] text-gray-700 tabular whitespace-nowrap">{t.date}<div className="text-[11px] text-gray-500">{t.time}</div></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                            <ArrowUpRight size={14} strokeWidth={1.5} className={t.amount > 0 ? "rotate-180" : ""} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[14px] font-medium text-gray-900">{t.description}</div>
                            <div className="text-[12px] text-gray-500">{t.counterparty}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-gray-700">{t.channel}</td>
                      <td className="px-4 py-3 text-[12px] text-gray-500 tabular whitespace-nowrap">{t.reference}</td>
                      <td className="px-4 py-3"><Badge>{t.status}</Badge></td>
                      <td className="px-4 py-3 text-right"><Amount value={t.amount} showSign /></td>
                      <td className="px-4 py-3 text-right pr-2 tabular text-[13px] text-gray-700">{formatINR(Math.max(running, 0))}</td>
                      <td className="px-3 py-3 text-right">
                        <button className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </Row>
                  );
                })}
                {rows.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-8 text-[13px] text-gray-400 text-center">No transactions for this account</td></tr>
                )}
              </tbody>
            </table>
          )}

          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200">
            <div className="text-[13px] text-gray-500 tabular">1–{rows.length} of {rows.length}</div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50"><ChevronLeft size={14} /></button>
              <button className="w-8 h-8 rounded-md bg-blue-600 text-white text-[13px] font-medium">1</button>
              <button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-50"><ChevronRight size={14} /></button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
