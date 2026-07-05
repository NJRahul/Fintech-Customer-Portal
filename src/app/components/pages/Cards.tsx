import { Snowflake, Settings2, Eye, ShieldCheck } from "lucide-react";
import { Card, CardHeader, Badge, Button } from "../primitives";
import { formatINR } from "../data";
import { useCards } from "../../../hooks/useData";

export function Cards() {
  const { data: cards, loading } = useCards();

  return (
    <div className="max-w-[1440px] mx-auto p-6 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[13px] text-gray-500">Money movement</div>
          <h1 className="mt-1">Cards</h1>
        </div>
        <Button variant="primary">Request new card</Button>
      </div>

      {loading ? (
        <div className="text-[13px] text-gray-400 py-4">Loading cards…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <Card key={c.id} padding={false} className="overflow-hidden">
              <div className={`p-5 ${c.type === "Credit" ? "bg-navy-900" : "bg-blue-600"} text-white`}>
                <div className="flex items-center justify-between">
                  <div className="text-[12px] uppercase tracking-[0.06em] opacity-80">{c.type} · {c.network}</div>
                  <div className="text-[13px] font-semibold">Meridian</div>
                </div>
                <div className="mt-8 tabular text-[18px] tracking-[0.15em]">{c.masked}</div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase opacity-70">Card holder</div>
                    <div className="text-[13px] font-medium">{c.holder}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase opacity-70">Expires</div>
                    <div className="text-[13px] font-medium tabular">{c.expiry}</div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <Badge>{c.status}</Badge>
                  <div className="text-[12px] text-gray-500">{c.type === "Credit" ? "Statement 12 Jul" : `Linked to ${c.masked.slice(-6)}`}</div>
                </div>

                {c.type === "Credit" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[12px] text-gray-500">
                      <span>Utilised</span>
                      <span className="tabular">{formatINR(c.used)} / {formatINR(c.limit)}</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(c.used / c.limit) * 100}%` }} />
                    </div>
                  </div>
                )}

                <div className="mt-5 grid grid-cols-4 gap-2">
                  <button className="flex flex-col items-center gap-1.5 py-2 rounded-md hover:bg-gray-50 text-gray-700"><Snowflake size={16} strokeWidth={1.5} /><span className="text-[11px]">Freeze</span></button>
                  <button className="flex flex-col items-center gap-1.5 py-2 rounded-md hover:bg-gray-50 text-gray-700"><Settings2 size={16} strokeWidth={1.5} /><span className="text-[11px]">Limits</span></button>
                  <button className="flex flex-col items-center gap-1.5 py-2 rounded-md hover:bg-gray-50 text-gray-700"><Eye size={16} strokeWidth={1.5} /><span className="text-[11px]">Show PIN</span></button>
                  <button className="flex flex-col items-center gap-1.5 py-2 rounded-md hover:bg-gray-50 text-gray-700"><ShieldCheck size={16} strokeWidth={1.5} /><span className="text-[11px]">Controls</span></button>
                </div>
              </div>
            </Card>
          ))}
          {cards.length === 0 && (
            <div className="col-span-3 text-[13px] text-gray-400 py-8 text-center">No cards found</div>
          )}
        </div>
      )}

      {cards.length > 0 && (
        <Card>
          <CardHeader title={`Card controls · ${cards[0]?.network} ${cards[0]?.masked?.slice(-8)}`} action={<button className="text-[13px] font-medium text-blue-600">See all activity</button>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              ["Domestic transactions",    true],
              ["International transactions", false],
              ["Online payments",          true],
              ["ATM withdrawals",          true],
              ["Contactless (tap to pay)", true],
              ["Recurring subscriptions",  true],
            ].map(([label, on]) => (
              <div key={label as string} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-none">
                <div>
                  <div className="text-[14px] font-medium text-gray-900">{label as string}</div>
                  <div className="text-[12px] text-gray-500">Applies to this card only</div>
                </div>
                <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${on ? "bg-blue-600" : "bg-gray-300"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
