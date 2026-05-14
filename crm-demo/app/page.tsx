import { contacts, deals, orders, activities, stageLabels, activityTypeColors, activityTypeLabel } from "@/lib/data";
import {
  Users, TrendingUp, DollarSign, Clock,
  ShoppingBag, ArrowUpRight, CheckCircle2,
  Phone, Mail, Users2, FileText, CalendarClock,
} from "lucide-react";

const totalPipeline  = deals.reduce((s, d) => s + d.value, 0);
const closedValue    = deals.filter(d => d.stage === "cerrado").reduce((s, d) => s + d.value, 0);
const activeContacts = contacts.filter(c => c.status === "activo").length;
const hotLeads       = contacts.filter(c => c.temperature === "caliente").length;
const openDeals      = deals.filter(d => d.stage !== "cerrado").length;
const pendingOrders  = orders.filter(o => o.status === "pendiente" || o.status === "en_preparacion").length;
const completedOrders = orders.filter(o => o.status === "completado").length;

const recentDeals    = [...deals].sort((a, b) => b.value - a.value).slice(0, 6);
const recentContacts = contacts.slice(0, 6);
const recentOrders   = [...orders].sort((a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
).slice(0, 5);

const pendingActivities = activities.filter(a => a.scheduledAt && !a.completedAt);
const recentActivities  = [...activities]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 5);

const stageBar: Record<string, { label: string; color: string; bg: string }> = {
  prospecto:   { label: "Prospecto",   color: "bg-zinc-400",    bg: "bg-zinc-100"  },
  contactado:  { label: "Contactado",  color: "bg-blue-400",    bg: "bg-blue-50"   },
  propuesta:   { label: "Propuesta",   color: "bg-yellow-400",  bg: "bg-yellow-50" },
  negociacion: { label: "Negociación", color: "bg-orange-400",  bg: "bg-orange-50" },
  cerrado:     { label: "Cerrado",     color: "bg-emerald-500", bg: "bg-emerald-50"},
};

const statusDot: Record<string, string> = {
  activo:   "bg-emerald-500",
  lead:     "bg-blue-400",
  inactivo: "bg-zinc-300",
};

const tempDot: Record<string, string> = {
  caliente: "bg-red-400",
  tibio:    "bg-orange-400",
  frio:     "bg-zinc-300",
};

const activityIcon: Record<string, React.ReactNode> = {
  llamada:     <Phone size={11} />,
  email:       <Mail size={11} />,
  reunion:     <Users2 size={11} />,
  nota:        <FileText size={11} />,
  seguimiento: <CalendarClock size={11} />,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short" });
}

// Pipeline distribution data
const stages = ["prospecto", "contactado", "propuesta", "negociacion", "cerrado"] as const;
const stageData = stages.map(s => ({
  stage: s,
  count: deals.filter(d => d.stage === s).length,
  total: deals.filter(d => d.stage === s).reduce((acc, d) => acc + d.value, 0),
}));
const maxTotal = Math.max(...stageData.map(d => d.total), 1);

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Resumen operativo · Mayo 2026</p>
      </div>

      {/* KPIs — 6 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Contactos activos",  value: activeContacts,   icon: Users,       color: "text-blue-600",    bg: "bg-blue-50"   },
          { label: "Leads calientes",    value: hotLeads,         icon: TrendingUp,  color: "text-red-500",     bg: "bg-red-50"    },
          { label: "Pipeline total",     value: `€${(totalPipeline/1000).toFixed(0)}k`, icon: DollarSign, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Ingresos cerrados",  value: `€${(closedValue/1000).toFixed(1)}k`,   icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Deals activos",      value: openDeals,        icon: Clock,       color: "text-purple-600",  bg: "bg-purple-50" },
          { label: "Pedidos activos",    value: pendingOrders,    icon: ShoppingBag, color: "text-cyan-600",    bg: "bg-cyan-50"   },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={16} className={color} />
            </div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* Pipeline chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Distribución del pipeline</h2>
            <a href="/pipeline" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              Ver kanban <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="p-5 space-y-3">
            {stageData.map(({ stage, count, total }) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 shrink-0">{stageBar[stage].label}</span>
                <div className="flex-1 h-6 bg-gray-50 rounded-md overflow-hidden">
                  <div
                    className={`h-full ${stageBar[stage].color} rounded-md transition-all flex items-center px-2`}
                    style={{ width: `${Math.max((total / maxTotal) * 100, 4)}%` }}
                  >
                    {total > 0 && (
                      <span className="text-[9px] text-white font-bold whitespace-nowrap">
                        €{(total / 1000).toFixed(1)}k
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-400 w-6 text-right shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending activities */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Seguimientos pendientes</h2>
            <a href="/actividades" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              Ver todos <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingActivities.slice(0, 4).map((a) => (
              <div key={a.id} className="px-5 py-3 flex items-start gap-3">
                <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] shrink-0 ${activityTypeColors[a.type]}`}>
                  {activityIcon[a.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">{a.contactName}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {a.scheduledAt ? formatDate(a.scheduledAt) : "—"}
                  </p>
                </div>
              </div>
            ))}
            {pendingActivities.length === 0 && (
              <p className="px-5 py-4 text-xs text-gray-400">Sin pendientes 🎉</p>
            )}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">

        {/* Top deals */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Top deals</h2>
            <a href="/deals" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              Ver todos <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentDeals.map((d) => (
              <div key={d.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">{d.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{d.company}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className={`w-2 h-2 rounded-full ${stageBar[d.stage]?.color}`} />
                  <span className="text-xs font-semibold text-gray-900">€{d.value.toLocaleString("es")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Contactos recientes</h2>
            <a href="/contactos" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              Ver todos <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.map((c) => (
              <div key={c.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-gray-600">
                    {c.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">{c.name}</p>
                  <p className="text-[10px] text-gray-400 truncate">{c.company}</p>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${tempDot[c.temperature]}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Pedidos recientes</h2>
            <a href="/pedidos" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
              Ver todos <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((o) => {
              const colorMap: Record<string, string> = {
                pendiente: "text-amber-600",
                en_preparacion: "text-blue-600",
                en_transito: "text-purple-600",
                completado: "text-emerald-600",
                incidencia: "text-red-600",
                cancelado: "text-zinc-400",
                reembolsado: "text-zinc-400",
              };
              const labelMap: Record<string, string> = {
                pendiente: "Pendiente",
                en_preparacion: "Preparando",
                en_transito: "En revisión",
                completado: "Completado",
                incidencia: "Incidencia",
                cancelado: "Cancelado",
                reembolsado: "Reembolsado",
              };
              return (
                <div key={o.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{o.customerName}</p>
                    <p className="text-[10px] text-gray-400">{o.orderNumber} · {formatDate(o.createdAt)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-gray-900">€{o.total.toLocaleString("es")}</p>
                    <p className={`text-[10px] font-medium ${colorMap[o.status]}`}>{labelMap[o.status]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent activity timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Actividad reciente</h2>
          <a href="/actividades" className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium">
            Ver todo <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {recentActivities.map((a) => (
            <div key={a.id} className="flex flex-col gap-1.5 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] shrink-0 ${activityTypeColors[a.type]}`}>
                  {activityIcon[a.type]}
                </span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${activityTypeColors[a.type]}`}>
                  {activityTypeLabel[a.type]}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-900 leading-snug line-clamp-2">{a.description}</p>
              <p className="text-[10px] text-gray-400 mt-auto">{a.contactName} · {formatDate(a.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
