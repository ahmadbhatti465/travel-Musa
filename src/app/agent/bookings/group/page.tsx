import { getAgent } from "@/lib/auth";
import { getBookingsByAgent, getOneWayGroups } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function GroupBookingsPage() {
  const agentToken = await getAgent();
  if (!agentToken) redirect("/agent/login");

  const bookings = getBookingsByAgent(Number(agentToken.id), "group") as any[];
  const groups = getOneWayGroups() as any[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Group Bookings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="font-bold mb-4">New Group Booking</h2>
          <form action="/api/agent/bookings" method="POST" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="hidden" name="type" value="group" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Group</label>
              <select name="group_id" className="w-full px-3 py-2 border rounded-md">
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>{g.title} - PKR {g.price.toLocaleString()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
              <input type="number" name="adults" min={1} defaultValue={1} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Infants</label>
              <input type="number" name="infants" min={0} defaultValue={0} className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-md text-sm font-medium">Create Booking</button>
            </div>
          </form>
        </div>

        <div className="p-6">
          <h2 className="font-bold mb-4">My Group Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No group bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Ref#</th>
                    <th className="text-left py-2 px-3">Group</th>
                    <th className="text-left py-2 px-3">Adults</th>
                    <th className="text-left py-2 px-3">Infants</th>
                    <th className="text-left py-2 px-3">Amount</th>
                    <th className="text-left py-2 px-3">Status</th>
                    <th className="text-left py-2 px-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{b.reference_id}</td>
                      <td className="py-2 px-3">{groups.find((g) => g.id === b.group_id)?.title || "N/A"}</td>
                      <td className="py-2 px-3">{b.adults}</td>
                      <td className="py-2 px-3">{b.infants}</td>
                      <td className="py-2 px-3">PKR {b.total_amount?.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-1 rounded text-xs ${b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-2 px-3">{b.created_at?.split("T")[0]}</td>
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
