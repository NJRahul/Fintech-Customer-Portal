import { ShieldAlert, FileWarning, PlusCircle } from "lucide-react";
import { Card, TableHeader, Row, Badge, Button, Amount } from "../primitives";
import { formatINR } from "../data";
import { useDisputes, useFraudAlerts } from "../../../hooks/useData";

export function Disputes() {
  const { data: disputes, loading } = useDisputes();

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">Protection</div>
          <h1 className="mt-1">Disputes</h1>
        </div>
        <Button variant="primary" leftIcon={<PlusCircle size={16} strokeWidth={1.5} />}>Raise dispute</Button>
      </div>

      <Card padding={false}>
        {loading ? (
          <div className="px-6 py-8 text-[13px] text-gray-400">Loading disputes…</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>Case #</TableHeader>
                <TableHeader>Merchant</TableHeader>
                <TableHeader>Transaction ref</TableHeader>
                <TableHeader>Raised on</TableHeader>
                <TableHeader><div className="text-right">Amount</div></TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {disputes.map((d) => (
                <Row key={d.id}>
                  <td className="px-4 py-3 text-[13px] text-gray-900 tabular font-medium">{d.ref}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-900">{d.merchant}</td>
                  <td className="px-4 py-3 text-[12px] text-gray-500 tabular">{d.txnRef}</td>
                  <td className="px-4 py-3 text-[13px] text-gray-700 tabular">{d.raisedOn}</td>
                  <td className="px-4 py-3 text-right"><Amount value={-d.amount} /></td>
                  <td className="px-4 py-3"><Badge>{d.status}</Badge></td>
                </Row>
              ))}
              {disputes.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-[13px] text-gray-400 text-center">No disputes found</td></tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

      <div className="flex items-start gap-3 p-4 rounded-md bg-blue-50 border-l-4 border-blue-600">
        <FileWarning size={18} className="text-blue-600 shrink-0 mt-0.5" strokeWidth={1.5} />
        <div className="text-[13px] text-gray-700">
          Dispute resolutions typically take 7–15 business days. You will receive real-time updates on the case status and any refunds will be credited to the source account.
        </div>
      </div>
    </div>
  );
}

export function Fraud() {
  const { data: fraudAlerts, loading } = useFraudAlerts();
  const openAlerts = fraudAlerts.filter(f => f.status === 'Open' || f.status === 'Customer Notified');

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div>
        <div className="text-[13px] text-gray-500">Protection</div>
        <h1 className="mt-1">Fraud alerts</h1>
      </div>

      {openAlerts.length > 0 && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-danger-50 border-l-4 border-danger-600">
          <ShieldAlert size={20} className="text-danger-600 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-gray-900">Action required · {openAlerts.length} open alert{openAlerts.length > 1 ? 's' : ''}</div>
            <div className="text-[13px] text-gray-700 mt-0.5">Review the flagged transaction{openAlerts.length > 1 ? 's' : ''} below and confirm whether it was authorised by you.</div>
          </div>
          <Button variant="danger">Review now</Button>
        </div>
      )}

      {loading ? (
        <div className="text-[13px] text-gray-400 py-4">Loading alerts…</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {fraudAlerts.map((f) => (
            <Card key={f.id}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge>{f.severity}</Badge>
                    <Badge>{f.status}</Badge>
                    <span className="text-[12px] text-gray-500 tabular">{f.when}</span>
                  </div>
                  <div className="mt-3 text-[16px] font-semibold text-gray-900">{f.rule}</div>
                  <div className="mt-1 text-[13px] text-gray-500 tabular">Transaction {f.txn} · {formatINR(f.amount)}</div>
                  <p className="mt-3 max-w-xl">
                    We noticed activity that doesn't match your usual pattern. If this was you, dismiss the alert. If not, we'll freeze the account and open a case.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button variant="primary">Yes, it was me</Button>
                  <Button variant="secondary">No, secure account</Button>
                  <button className="text-[12px] text-gray-500 hover:underline mt-1">View timeline</button>
                </div>
              </div>
            </Card>
          ))}
          {fraudAlerts.length === 0 && (
            <div className="text-[13px] text-gray-400 text-center py-8">No fraud alerts</div>
          )}
        </div>
      )}
    </div>
  );
}
