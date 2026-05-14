import { deals, stageLabels, stageColors, stageBorderColors, type DealStage } from "@/lib/data";

const stages: DealStage[] = ["prospecto", "contactado", "propuesta", "negociacion", "cerrado"];

export default function PipelinePage() {
  const byStage = stages.map(stage => ({
    stage,
    deals: deals.filter(d => d.stage === stage),
    total: deals.filter(d => d.stage === stage).reduce((s, d) => s + d.value, 0),
  }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline de Ventas</h1>
        <p className="text-sm text-gray-500 mt-1">
          {deals.length} deals · €{deals.reduce((s,d)=>s+d.value,0).toLocaleString("es")} en pipeline total
        </p>
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {byStage.map(({ stage, deals: stageDeals, total }) => (
          <div key={stage} className="shrink-0 w-64">
            {/* Column header */}
            <div className={`bg-white rounded-xl border-t-2 border border-gray-200 ${stageBorderColors[stage]} px-4 py-3 mb-3`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-700">{stageLabels[stage]}</p>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center">
                  {stageDeals.length}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 mt-1">€{total.toLocaleString("es")}</p>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {stageDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow cursor-default">
                  <p className="text-sm font-semibold text-gray-900 mb-1 leading-snug">{deal.title}</p>
                  <p className="text-xs text-gray-500 mb-3">{deal.company}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">€{deal.value.toLocaleString("es")}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stageColors[deal.stage]}`}>
                      {deal.probability}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{deal.contact}</span>
                    <span className="text-[10px] text-gray-400">{deal.dueDate}</span>
                  </div>

                  {deal.notes && (
                    <p className="text-[10px] text-gray-400 italic mt-2 leading-relaxed line-clamp-2">{deal.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
