import { getHotelRates } from "@/lib/data";

export default function HotelRatesPage() {
  const rates = getHotelRates() as any[];

  const makkahRates = rates.filter((r) => r.city === "Makkah");
  const madinaRates = rates.filter((r) => r.city === "Madina");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-4">Hotel Rates</h1>
        <p className="text-gray-600">Check the latest hotel rates in Makkah and Madina for your Umrah packages.</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b pb-2">Makkah Hotel Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3">Hotel</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Distance</th>
                <th className="text-left px-4 py-3">Sharing</th>
                <th className="text-left px-4 py-3">Double</th>
                <th className="text-left px-4 py-3">Triple</th>
                <th className="text-left px-4 py-3">Quad</th>
                <th className="text-left px-4 py-3">Quint</th>
              </tr>
            </thead>
            <tbody>
              {makkahRates.length > 0 ? makkahRates.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.hotel_name}</div>
                    <div className="text-xs text-gray-500">{r.address}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{r.date_from} to {r.date_to}</td>
                  <td className="px-4 py-3 text-sm">{r.distance}</td>
                  <td className="px-4 py-3 text-sm">{r.sharing_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.double_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.triple_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.quad_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.quint_price || "N/A"}</td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">No Makkah hotel rates available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-4 border-b pb-2">Madina Hotel Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3">Hotel</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Distance</th>
                <th className="text-left px-4 py-3">Sharing</th>
                <th className="text-left px-4 py-3">Double</th>
                <th className="text-left px-4 py-3">Triple</th>
                <th className="text-left px-4 py-3">Quad</th>
                <th className="text-left px-4 py-3">Quint</th>
              </tr>
            </thead>
            <tbody>
              {madinaRates.length > 0 ? madinaRates.map((r) => (
                <tr key={r.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.hotel_name}</div>
                    <div className="text-xs text-gray-500">{r.address}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{r.date_from} to {r.date_to}</td>
                  <td className="px-4 py-3 text-sm">{r.distance}</td>
                  <td className="px-4 py-3 text-sm">{r.sharing_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.double_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.triple_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.quad_price || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{r.quint_price || "N/A"}</td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">No Madina hotel rates available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
