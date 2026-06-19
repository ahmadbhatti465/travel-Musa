import { getAgent } from "@/lib/auth";
import { getLedger } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function LedgerPage() {
  const agentToken = await getAgent();
  if (!agentToken) redirect("/agent/login");

  const entries = getLedger(Number(agentToken.id)) as any[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ledger</h1>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Type</th>
                <th className="text-left py-2 px-3">Description</th>
                <th className="text-right py-2 px-3">Amount</th>
                <th className="text-right py-2 px-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-500">No ledger entries found.</td></tr>
              ) : (
                entries.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{e.date?.split("T")[0]}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${e.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {e.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3">{e.description || "-"}</td>
                    <td className="py-2 px-3 text-right font-medium">PKR {e.amount.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-bold">PKR {e.balance.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
