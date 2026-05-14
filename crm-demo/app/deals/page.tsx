import { deals, stageLabels, stageColors } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const stages = ["prospecto", "contactado", "propuesta", "negociacion", "cerrado"] as const;

const stageBadge: Record<string, string> = {
  prospecto:   "bg-zinc-100 text-zinc-600 border-zinc-200",
  contactado:  "bg-blue-50 text-blue-700 border-blue-200",
  propuesta:   "bg-yellow-50 text-yellow-700 border-yellow-200",
  negociacion: "bg-orange-50 text-orange-700 border-orange-200",
  cerrado:     "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const probColor = (p: number) =>
  p >= 75 ? "text-emerald-600" : p >= 50 ? "text-orange-500" : "text-zinc-400";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "2-digit" });
}

export default function DealsPage() {
  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);
  const closedValue   = deals.filter(d => d.stage === "cerrado").reduce((s, d) => s + d.value, 0);
  const convRate      = Math.round((deals.filter(d => d.stage === "cerrado").length / deals.length) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] w-full mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-sm text-gray-500 mt-1">{deals.length} oportunidades · €{totalPipeline.toLocaleString("es")} en pipeline</p>
        </div>
        <a href="/pipeline" className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <ArrowUpRight size={14} /> Ver kanban
        </a>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage} className="bg-white rounded-xl border border-gray-200 p-4">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stageBadge[stage]}`}>
                {stageLabels[stage]}
              </span>
              <p className="text-lg font-bold text-gray-900 mt-2">€{(stageTotal/1000).toFixed(0)}k</p>
              <p className="text-xs text-gray-400">{stageDeals.length} deals</p>
            </div>
          );
        })}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Conversión
          </span>
          <p className="text-lg font-bold text-gray-900 mt-2">{convRate}%</p>
          <p className="text-xs text-gray-400">€{(closedValue/1000).toFixed(1)}k cerrado</p>
        </div>
      </div>

      {/* Deals table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Todas las oportunidades</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-[11px] font-semibold text-gray-500 px-6 py-3">Deal</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 px-4 py-3">Contacto</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 px-4 py-3">Empresa</th>
                <th className="text-right text-[11px] font-semibold text-gray-500 px-4 py-3">Valor</th>
                <th className="text-left text-[11px] font-semibold text-gray-500 px-4 py-3">Etapa</th>
                <th className="text-right text-[11px] font-semibold text-gray-500 px-4 py-3">Prob.</th>
                <th className="text-right text-[11px] font-semibold text-gray-500 px-6 py-3">Cierre est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[...deals].sort((a, b) => b.value - a.value).map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3.5">
                    <p className="text-sm font-medium text-gray-900">{d.title}</p>
                    {d.notes && (
                      <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{d.notes}</p>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-700">{d.contact}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-gray-500">{d.company}</p>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-bold text-gray-900">€{d.value.toLocaleString("es")}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${stageBadge[d.stage]}`}>
                      {stageLabels[d.stage]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-bold ${probColor(d.probability)}`}>{d.probability}%</span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${d.probability >= 75 ? "bg-emerald-500" : d.probability >= 50 ? "bg-orange-400" : "bg-zinc-300"}`}
                          style={{ width: `${d.probability}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span className="text-xs text-gray-500">{formatDate(d.dueDate)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
