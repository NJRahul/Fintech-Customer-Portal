import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Card, CardHeader, Badge, Button, Amount, TableHeader, Row } from "../primitives";
import { formatINR } from "../data";
import { useLoans } from "../../../hooks/useData";

const scoreTrend = [
  { m: "Jan", v: 748 },
  { m: "Feb", v: 752 },
  { m: "Mar", v: 758 },
  { m: "Apr", v: 762 },
  { m: "May", v: 770 },
  { m: "Jun", v: 776 },
  { m: "Jul", v: 782 },
];

const emis = [
  { n: 41, due: "02 Aug 2026", principal: 21400, interest: 26850, balance: 6390930, status: "Upcoming" },
  { n: 42, due: "02 Sep 2026", principal: 21550, interest: 26700, balance: 6369380, status: "Upcoming" },
  { n: 43, due: "02 Oct 2026", principal: 21700, interest: 26550, balance: 6347680, status: "Upcoming" },
  { n: 40, due: "02 Jul 2026", principal: 21250, interest: 27000, balance: 6412330, status: "Paid" },
  { n: 39, due: "02 Jun 2026", principal: 21100, interest: 27150, balance: 6433580, status: "Paid" },
];

export function Loans() {
  const { data: loans, loading } = useLoans();
  const homeLoan = loans.find(l => l.product.toLowerCase().includes('home'));

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">Credit</div>
          <h1 className="mt-1">Loans & credit</h1>
        </div>
        <Button variant="primary">New loan application</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Your loans" action={<button className="text-[13px] font-medium text-blue-600">EMI calculator</button>} />
          {loading ? (
            <div className="py-4 text-[13px] text-gray-400">Loading loans…</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {loans.map((l) => {
                const pct = Math.round(((l.principal - l.outstanding) / l.principal) * 100);
                return (
                  <div key={l.id} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="md:col-span-2">
                      <div className="text-[14px] font-medium text-gray-900">{l.product}</div>
                      <div className="text-[12px] text-gray-500 tabular">Rate {l.rate}% · EMI {formatINR(l.emi)} · Next {l.nextEmi}</div>
                      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-1 text-[11px] text-gray-500 tabular">{pct}% repaid</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 uppercase tracking-[0.03em]">Outstanding</div>
                      <div className="mt-1 text-[16px] font-semibold text-gray-900 tabular">{formatINR(l.outstanding)}</div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge>{l.status}</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="compact">Amortization</Button>
                        <Button variant="secondary" size="compact">Pre-pay</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {loans.length === 0 && <div className="py-4 text-[13px] text-gray-400">No loans found</div>}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Credit score" action={<span className="text-[12px] text-gray-500">Updated 03 Jul 2026</span>} />
          <div className="flex items-baseline gap-2">
            <div className="text-[40px] leading-none font-bold text-gray-900 tabular">782</div>
            <div className="text-[13px] text-success-600 font-medium">▲ +6 this month</div>
          </div>
          <div className="text-[12px] text-gray-500 mt-1">Excellent · CIBIL TransUnion</div>
          <div className="mt-4 h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#E2E5EA" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "#6B7484", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[730, 800]} />
                <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid #E2E5EA", fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="#1B4DD8" strokeWidth={2.5} dot={{ r: 3, fill: "#1B4DD8" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {homeLoan && (
        <Card padding={false}>
          <div className="p-5 flex items-center justify-between border-b border-gray-200">
            <div>
              <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.03em]">Amortization</div>
              <div className="mt-1 text-[16px] font-semibold text-gray-900">{homeLoan.product}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="compact">Download PDF</Button>
              <Button variant="ghost" size="compact">Early-payoff calculator</Button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>#</TableHeader>
                <TableHeader>Due date</TableHeader>
                <TableHeader><div className="text-right">Principal</div></TableHeader>
                <TableHeader><div className="text-right">Interest</div></TableHeader>
                <TableHeader><div className="text-right">EMI</div></TableHeader>
                <TableHeader><div className="text-right">Outstanding</div></TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {emis.map((e) => (
                <Row key={e.n}>
                  <td className="px-4 py-3 text-[13px] text-gray-700 tabular">{e.n}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-900 tabular">{e.due}</td>
                  <td className="px-4 py-3 text-right"><Amount value={-e.principal} /></td>
                  <td className="px-4 py-3 text-right"><Amount value={-e.interest} /></td>
                  <td className="px-4 py-3 text-right"><span className="tabular font-semibold text-gray-900">{formatINR(e.principal + e.interest)}</span></td>
                  <td className="px-4 py-3 text-right"><span className="tabular text-gray-700">{formatINR(e.balance)}</span></td>
                  <td className="px-4 py-3"><Badge>{e.status}</Badge></td>
                </Row>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
