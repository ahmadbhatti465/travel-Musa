import { getUmrahGroups } from "@/lib/data";
import Link from "next/link";

export default function UmrahGroupsPage() {
  const groups = getUmrahGroups() as any[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#0c1d4a] mb-4">Umrah Groups</h1>
        <p className="text-gray-600">Join our organized Umrah groups with experienced guides and premium services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div key={g.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
            <div className="bg-[#0D9488] text-white px-4 py-3">
              <h3 className="font-bold">{g.title}</h3>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-sm"><strong>Departure:</strong> {g.departure_date}</p>
              <p className="text-sm"><strong>Return:</strong> {g.return_date || "N/A"}</p>
              <p className="text-sm"><strong>Airline:</strong> {g.airline}</p>
              <p className="text-sm"><strong>Days:</strong> {g.days}</p>
              <p className="text-sm"><strong>Seats Available:</strong> {g.available_seats}/{g.seats}</p>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-xl font-bold text-[#dc2626]">PKR {g.price.toLocaleString()}</span>
                <Link href="/agent/login" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-1.5 rounded text-sm transition-colors">Book</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
