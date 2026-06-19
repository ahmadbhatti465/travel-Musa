"use client";

import { useEffect, useState } from "react";
import { Trash2, RefreshCw } from "lucide-react";

interface Payment {
  id: number;
  agent_id: number;
  agent_name: string;
  amount: number;
  method: string;
  status: string;
  reference: string;
  date: string;
  notes: string;
}

const statuses = ["pending", "approved", "rejected"];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    const res = await fetch("/api/admin/payments");
    const data = await res.json();
    setPayments(data.payments || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/payments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchPayments();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this payment?")) return;
    await fetch(`/api/admin/payments?id=${id}`, { method: "DELETE" });
    fetchPayments();
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">All Payments</h1>
        <button onClick={fetchPayments} className="flex items-center gap-2 text-gray-500 hover:text-[#F97316] text-sm">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Agent</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Method</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Reference</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3 font-medium">{p.agent_name || p.agent_id}</td>
                  <td className="px-4 py-3">PKR {Number(p.amount).toLocaleString()}</td>
                  <td className="px-4 py-3">{p.method || "-"}</td>
                  <td className="px-4 py-3">{p.reference || "-"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status}
                      onChange={(e) => updateStatus(p.id, e.target.value)}
                      className="px-2 py-1 border rounded-md text-xs"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">{p.date ? new Date(p.date).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">No payments found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
