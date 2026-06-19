import { MapPin, Phone, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-4">About Upsky Group of Travels</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are a leading travel agency specializing in Hajj & Umrah services, providing premium travel experiences to pilgrims from Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600">To provide seamless, comfortable, and spiritually fulfilling journeys for every pilgrim. We strive to make Hajj and Umrah accessible, affordable, and memorable.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600">To become the most trusted travel partner for Islamic pilgrimages in Pakistan, known for reliability, transparency, and exceptional customer service.</p>
        </div>
      </div>

      <div className="bg-[#0F172A] text-white rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Branches Across Pakistan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["Faisalabad", "Lahore", "Karachi", "Islamabad", "Peshawar", "Multan", "Rawalpindi", "Sialkot"].map((city) => (
            <div key={city} className="bg-white/10 rounded-md p-4">
              <MapPin className="mx-auto mb-2 text-[#F97316]" size={20} />
              <p className="font-medium">{city}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Our Authorizations & Affiliations</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {["PTAA", "IATA", "SAUDI MOFA", "MINISTRY OF HAJJ", "PIA"].map((org) => (
            <div key={org} className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
              {org}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
