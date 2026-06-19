import { getUmrahPackages } from "@/lib/data";
import Link from "next/link";

export default function UmrahPackagesPage() {
  const packages = getUmrahPackages() as any[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-4">Umrah Packages</h1>
        <p className="text-gray-600">Choose from our wide range of Umrah packages with premium hotels and airlines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
            {pkg.image_url && (
              <img src={pkg.image_url} alt={pkg.title} className="w-full h-48 object-cover" />
            )}
            <div className="bg-[#F97316] text-white px-4 py-3 flex items-center justify-between">
              <span className="font-bold">{pkg.airline}</span>
              <span className="text-sm">{pkg.days} Days</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{pkg.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p><strong>Departure:</strong> {pkg.departure_date}</p>
                <p><strong>Return:</strong> {pkg.return_date}</p>
                <p><strong>Makkah Hotel:</strong> {pkg.hotel_makkah}</p>
                <p><strong>Madina Hotel:</strong> {pkg.hotel_madina}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-xl font-bold text-[#F97316]">PKR {pkg.price.toLocaleString()}</p>
                </div>
                <Link
                  href="/agent/login"
                  className="bg-[#F97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
