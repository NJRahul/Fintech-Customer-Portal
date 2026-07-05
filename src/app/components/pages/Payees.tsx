import { Search, PlusCircle, MoreHorizontal } from "lucide-react";
import { Card, TableHeader, Row, Badge, Button } from "../primitives";
import { usePayees } from "../../../hooks/useData";

export function Payees() {
  const { data: payees, loading } = usePayees();

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">Money movement</div>
          <h1 className="mt-1">Payees</h1>
        </div>
        <Button variant="primary" leftIcon={<PlusCircle size={16} strokeWidth={1.5} />}>Add payee</Button>
      </div>

      <Card padding={false}>
        <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3">
          <div className="flex items-center gap-2 h-9 px-3 border border-gray-300 rounded-md bg-white w-[280px]">
            <Search size={16} strokeWidth={1.5} className="text-gray-500" />
            <input placeholder="Search by name, UPI ID, IFSC…" className="flex-1 h-full outline-none text-[13px] bg-transparent placeholder:text-gray-500" />
          </div>
          {["All rails", "Active", "Cooling", "Pending"].map((c, i) => (
            <button key={c} className={`h-9 px-3 rounded-full text-[13px] font-medium border
              ${i === 0 ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>{c}</button>
          ))}
        </div>
        {loading ? (
          <div className="px-6 py-8 text-[13px] text-gray-400">Loading payees…</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>Payee</TableHeader>
                <TableHeader>Bank / handle</TableHeader>
                <TableHeader>Rail</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Added on</TableHeader>
                <TableHeader><span className="sr-only">Actions</span></TableHeader>
              </tr>
            </thead>
            <tbody>
              {payees.map((p) => (
                <Row key={p.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-[12px] font-semibold flex items-center justify-center">
                        {p.name.split(" ").map((s: string) => s[0]).slice(0,2).join("")}
                      </div>
                      <div className="text-[14px] font-medium text-gray-900">{p.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[13px] text-gray-900">{p.bank}</div>
                    <div className="text-[12px] text-gray-500 tabular">{p.handle}</div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-gray-700">{p.rail}</td>
                  <td className="px-4 py-3"><Badge>{p.status}</Badge></td>
                  <td className="px-4 py-3 text-[13px] text-gray-700 tabular">{p.addedOn}</td>
                  <td className="px-3 py-3 text-right">
                    <button className="w-8 h-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </Row>
              ))}
              {payees.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-[13px] text-gray-400 text-center">No payees added yet</td></tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
