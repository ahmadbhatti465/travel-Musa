import Link from "next/link";
import { getAgent } from "@/lib/auth";
import { getAgentById, getBookingsByAgent, getLedger, getPayments } from "@/lib/data";
import { redirect } from "next/navigation";
import { ArrowRight, Users, Calculator, Wallet } from "lucide-react";

export default async function AgentDashboardPage() {
  const agentToken = await getAgent();
  if (!agentToken) redirect("/agent/login");

  const agent = getAgentById(Number(agentToken.id)) as any;
  if (!agent) redirect("/agent/login");

  const bookings = getBookingsByAgent(agent.id) as any[];
  const ledger = getLedger(agent.id) as any[];
  const payments = getPayments(agent.id) as any[];

  const balance = agent.balance || 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0c1d4a]">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/agent/bookings/umrah" className="bg-[#dc2626] text-white rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">Umrah Groups</h3>
              <p className="text-sm text-orange-100 mt-1">My Umrah Group Bookings</p>
            </div>
            <Users size={24} className="text-orange-200" />
          </div>
          <div className="mt-4 flex items-center text-sm font-medium">
            Go to list <ArrowRight size={16} className="ml-1" />
          </div>
        </Link>

        <Link href="/umrah-calculator" className="bg-[#EAB308] text-white rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">Umrah Calculator</h3>
              <p className="text-sm text-yellow-100 mt-1">My Umrah Calculator Bookings</p>
            </div>
            <Calculator size={24} className="text-yellow-200" />
          </div>
          <div className="mt-4 flex items-center text-sm font-medium">
            Go to list <ArrowRight size={16} className="ml-1" />
          </div>
        </Link>

        <Link href="/agent/accounts" className="bg-[#EF4444] text-white rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg">Account Closing</h3>
              <p className="text-sm text-red-100 mt-1">Closing Balance: {balance.toFixed(2)} Br</p>
            </div>
            <Wallet size={24} className="text-red-200" />
          </div>
          <div className="mt-4 flex items-center text-sm font-medium">
            Go to list <ArrowRight size={16} className="ml-1" />
          </div>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Update Your Profile</h2>
        </div>
        <div className="p-6">
          <form action="/api/agent/profile" method="POST" className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
              <input
                type="text"
                name="agency_name"
                defaultValue={agent.agency_name || ""}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={agent.email || ""}
                disabled
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name</label>
              <input
                type="text"
                name="contact_person"
                defaultValue={agent.contact_person || ""}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.</label>
              <input
                type="text"
                name="phone"
                defaultValue={agent.phone || ""}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                defaultValue={agent.city || ""}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                defaultValue={agent.country || ""}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#dc2626]"
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Recent Bookings</h2>
        </div>
        <div className="p-6">
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Ref#</th>
                    <th className="text-left py-2 px-3">Type</th>
                    <th className="text-left py-2 px-3">Adults</th>
                    <th className="text-left py-2 px-3">Infants</th>
                    <th className="text-left py-2 px-3">Amount</th>
                    <th className="text-left py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{b.reference_id}</td>
                      <td className="py-2 px-3 capitalize">{b.type}</td>
                      <td className="py-2 px-3">{b.adults}</td>
                      <td className="py-2 px-3">{b.infants}</td>
                      <td className="py-2 px-3">{b.total_amount?.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          b.status === "confirmed" ? "bg-green-100 text-green-700" :
                          b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
