"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, KanbanSquare,
  ShoppingBag, Briefcase, CalendarClock,
} from "lucide-react";

const nav = [
  { href: "/",            icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/contactos",   icon: Users,            label: "Contactos"   },
  { href: "/pipeline",    icon: KanbanSquare,     label: "Pipeline"    },
  { href: "/deals",       icon: Briefcase,        label: "Deals"       },
  { href: "/pedidos",     icon: ShoppingBag,      label: "Pedidos"     },
  { href: "/actividades", icon: CalendarClock,    label: "Actividades" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white text-[9px] font-black tracking-widest">CDM</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-none">CDM Labs</p>
            <p className="text-[10px] text-emerald-500 font-semibold leading-none mt-0.5">CRM Demo</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Demo notice */}
      <div className="mx-3 mb-4 p-3 rounded-lg bg-amber-50 border border-amber-100">
        <p className="text-[10px] font-semibold text-amber-700 mb-0.5">Versión Demo</p>
        <p className="text-[10px] text-amber-600 leading-relaxed">
          Datos ficticios. Desarrollado por{" "}
          <span className="font-semibold">CDM Labs</span>.
        </p>
      </div>
    </aside>
  );
}
