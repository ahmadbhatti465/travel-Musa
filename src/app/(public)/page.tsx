import Link from "next/link";
import { Plane, MapPin, Shield, Headphones, Clock, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full">
      <section className="relative bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542317805-56f3415e0e94?w=1600&auto=format&fit=crop')" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fly Beyond<br />
            <span className="text-[#F97316]">Skies With Upsky</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your trusted partner for Hajj & Umrah journeys. Premium travel services tailored for travel agents and pilgrims.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/umrah-packages"
              className="bg-[#F97316] hover:bg-[#ea580c] text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              Explore Packages
            </Link>
            <Link
              href="/agent/login"
              className="bg-white hover:bg-gray-100 text-[#0F172A] px-8 py-3 rounded-md font-medium transition-colors"
            >
              Agent Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Umrah by Bus", image: "https://images.unsplash.com/photo-1565058688641-6776481d1b84?w=600&auto=format&fit=crop", link: "/umrah-packages" },
              { title: "Umrah by Air", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop", link: "/umrah-packages" },
              { title: "Group Umrah", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7bb?w=600&auto=format&fit=crop", link: "/umrah-groups" },
            ].map((item) => (
              <Link key={item.title} href={item.link} className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F172A]">Your Journey, Our Commitment</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Plane, title: "Travel & Airline", desc: "Premium airline partnerships for comfortable journeys." },
            { icon: Shield, title: "Best Price Guarantee", desc: "Competitive pricing with no hidden charges." },
            { icon: MapPin, title: "247 Places", desc: "Extensive network covering all major destinations." },
            { icon: Headphones, title: "Personalized Services", desc: "Dedicated support throughout your journey." },
            { icon: Clock, title: "24/7 Service", desc: "Round-the-clock assistance for all your needs." },
            { icon: Users, title: "Group Benefits", desc: "Special perks for group bookings and agents." },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="w-14 h-14 bg-[#F97316]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-[#F97316]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch With Upsky</h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-bold">Head Office</h4>
                <p className="text-sm text-gray-300">Suite 203-204, Kohinoor City, Faisalabad</p>
              </div>
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-bold">Email</h4>
                <p className="text-sm text-gray-300">support@musatravelservice.pk</p>
              </div>
              <div className="bg-white/10 p-4 rounded-md">
                <h4 className="font-bold">Call / Whatsapp</h4>
                <p className="text-sm text-gray-300">+92 333 7323179</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8322996481626!2d73.0793!3d31.4187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI1JzA3LjMiTiA3M8KwMDQnNDUuNSJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
