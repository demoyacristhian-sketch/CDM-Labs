import { orders, orderStatusLabel, orderStatusColors } from "@/lib/data";
import { Package, AlertCircle, CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";

const statusIcon: Record<string, React.ReactNode> = {
  pendiente:      <Clock size={11} />,
  en_preparacion: <Package size={11} />,
  en_transito:    <RefreshCw size={11} />,
  completado:     <CheckCircle2 size={11} />,
  incidencia:     <AlertCircle size={11} />,
  cancelado:      <XCircle size={11} />,
  reembolsado:    <XCircle size={11} />,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "2-digit" });
}

export default function PedidosPage() {
  const totalRevenue = orders
    .filter(o => o.status === "completado")
    .reduce((s, o) => s + o.total, 0);
  const activeCount = orders.filter(o => ["pendiente","en_preparacion","en_transito"].includes(o.status)).length;
  const incidencias = orders.filter(o => o.status === "incidencia").length;

  return (
    <div className="p-6 lg:p-8 max-w-[1100px] w-full mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-sm text-gray-500 mt-1">{orders.length} pedidos registrados</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Ingresos totales",   value: `€${(totalRevenue/1000).toFixed(1)}k`, color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle2 size={16} className="text-emerald-600" /> },
          { label: "Pedidos activos",    value: activeCount,                           color: "text-blue-600",    bg: "bg-blue-50",    icon: <Package size={16} className="text-blue-600" /> },
          { label: "Completados",        value: orders.filter(o=>o.status==="completado").length, color: "text-gray-700", bg: "bg-gray-50", icon: <CheckCircle2 size={16} className="text-gray-500" /> },
          { label: "Incidencias",        value: incidencias,                           color: "text-red-600",     bg: "bg-red-50",     icon: <AlertCircle size={16} className="text-red-500" /> },
        ].map(({ label, value, color, bg, icon }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>{icon}</div>
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Incidencias alert */}
      {incidencias > 0 && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-3.5">
          <AlertCircle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700">
            <span className="font-semibold">{incidencias} pedido{incidencias > 1 ? "s" : ""} con incidencia</span> — Requiere atención inmediata.
          </p>
        </div>
      )}

      {/* Orders list */}
      <div className="space-y-3">
        {[...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((o) => (
          <div
            key={o.id}
            className={`bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow ${
              o.status === "incidencia" ? "border-red-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Package size={16} className="text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{o.customerName}</p>
                    <span className="text-xs text-gray-400 font-mono">{o.orderNumber}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{o.email} · {o.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${orderStatusColors[o.status]}`}>
                  {statusIcon[o.status]}
                  {orderStatusLabel[o.status]}
                </span>
                <span className="text-base font-bold text-gray-900">€{o.total.toLocaleString("es")}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-1 mb-4">
              {o.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-2">
                    <span className="text-gray-300">·</span>
                    <span className="font-mono text-gray-400 text-[10px]">{item.sku}</span>
                    {item.name}
                    {item.quantity > 1 && <span className="text-gray-400">x{item.quantity}</span>}
                  </span>
                  <span className="font-medium text-gray-700">€{(item.price * item.quantity).toLocaleString("es")}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-3 flex-wrap">
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>📅 {formatDate(o.createdAt)}</span>
                <span>💳 {o.paymentMethod}</span>
                {o.trackingGls && (
                  <span className="font-mono text-blue-600">🚚 GLS {o.trackingGls}</span>
                )}
                <span className="truncate max-w-[200px]">📍 {o.address}</span>
              </div>
              {o.notes && (
                <p className={`text-[10px] italic ${o.status === "incidencia" ? "text-red-500" : "text-gray-400"}`}>
                  {o.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
