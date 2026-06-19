"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Plane,
  Hotel,
  BookOpen,
  Wallet,
  FileText,
  Download,
  MessageSquare,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type ChildItem = { href: string; icon: React.ElementType; label: string };
type ParentItem = { label: string; icon: React.ElementType; children: ChildItem[] };
type MenuItem = ChildItem | ParentItem;

const menuItems: MenuItem[] = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/agents", icon: Users, label: "Agents" },
  {
    label: "Packages & Groups",
    icon: Plane,
    children: [
      { href: "/admin/packages", icon: Plane, label: "Umrah Packages" },
      { href: "/admin/umrah-groups", icon: Plane, label: "Umrah Groups" },
    ],
  },
  {
    label: "Hotels",
    icon: Hotel,
    children: [
      { href: "/admin/hotels", icon: Hotel, label: "Hotels" },
      { href: "/admin/hotel-rates", icon: Hotel, label: "Hotel Rates" },
    ],
  },
  { href: "/admin/bookings", icon: BookOpen, label: "Bookings" },
  { href: "/admin/payments", icon: Wallet, label: "Payments" },
  { href: "/admin/ledger", icon: FileText, label: "Ledger" },
  { href: "/admin/downloads", icon: Download, label: "Downloads" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Contacts" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

function isParent(item: MenuItem): item is ParentItem {
  return "children" in item;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e293b] text-white flex flex-col z-50">
      <div className="p-4 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#F97316] rounded flex items-center justify-center text-white font-bold">U</div>
          <div>
            <div className="text-sm font-bold">Musa Travel Service</div>
            <div className="text-[10px] text-gray-400">MANAGEMENT PANEL</div>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            if (isParent(item)) {
              const isOpen = openMenus[item.label] || item.children.some((c) => pathname.startsWith(c.href));
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      item.children.some((c) => pathname.startsWith(c.href))
                        ? "bg-[#F97316] text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon size={16} /> {item.label}
                    </span>
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            pathname === child.href ? "bg-[#F97316]/20 text-[#F97316]" : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <child.icon size={14} /> {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === item.href ? "bg-[#F97316] text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <item.icon size={16} /> {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
