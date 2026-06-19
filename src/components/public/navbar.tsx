"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, User } from "lucide-react";

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/umrah-packages", label: "Umrah Packages" },
    { href: "/one-way-groups", label: "One Way Groups" },
    { href: "/umrah-groups", label: "Umrah Groups" },
    { href: "/hotel-rates", label: "Hotel Rates" },
    { href: "/umrah-calculator", label: "Umrah Calculator" },
    { href: "/downloads", label: "Downloads" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="w-full">
      <div className="bg-[#0F172A] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> +92 333 7323179</span>
            <span className="flex items-center gap-1"><Mail size={14} /> support@musatravelservice.pk</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F97316]">f</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#F97316]">t</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F97316]">i</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#F97316]">in</a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#0F172A]">
              <span className="text-[#F97316]">Musa</span> Travel
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#F97316] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agent/login"
              className="flex items-center gap-1 text-sm font-medium text-white bg-[#F97316] hover:bg-[#ea580c] px-4 py-2 rounded-md transition-colors"
            >
              <User size={16} /> Agent Login
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-sm font-medium text-[#0F172A] border border-[#0F172A] hover:bg-[#0F172A] hover:text-white px-4 py-2 rounded-md transition-colors"
            >
              Admin
            </Link>
          </div>

          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-[#F97316]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/agent/login"
              className="block text-sm font-medium text-white bg-[#F97316] hover:bg-[#ea580c] px-4 py-2 rounded-md text-center"
              onClick={() => setMobileOpen(false)}
            >
              Agent Login
            </Link>
            <Link
              href="/admin/login"
              className="block text-sm font-medium text-[#0F172A] border border-[#0F172A] hover:bg-[#0F172A] hover:text-white px-4 py-2 rounded-md text-center"
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
