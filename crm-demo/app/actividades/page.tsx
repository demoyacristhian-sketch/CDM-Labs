import { activities, activityTypeLabel, activityTypeColors } from "@/lib/data";
import { Phone, Mail, Users2, FileText, CalendarClock, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const activityIcon: Record<string, React.ReactNode> = {
  llamada:     <Phone size={13} />,
  email:       <Mail size={13} />,
  reunion:     <Users2 size={13} />,
  nota:        <FileText size={13} />,
  seguimiento: <CalendarClock size={13} />,
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es", { day: "numeric", month: "short", year: "2-digit" }) +
    " · " + d.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "2-digit" });
}

function isOverdue(iso: string) {
  return new Date(iso) < new Date();
}

export default function ActividadesPage() {
  const completed  = activities.filter(a => a.completedAt);
  const pending    = activities.filter(a => a.scheduledAt && !a.completedAt);
  const overdue    = pending.filter(a => a.scheduledAt && isOverdue(a.scheduledAt));
  const upcoming   = pending.filter(a => a.scheduledAt && !isOverdue(a.scheduledAt));

  const sortedAll = [...activities].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1000px] w-full mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Actividades</h1>
        <p className="text-sm text-gray-500 mt-1">
          {activities.length} actividades · {pending.length} seguimientos pendientes
        </p>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Overdue */}
        <div className={`rounded-xl border p-4 ${overdue.length > 0 ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={14} className={overdue.length > 0 ? "text-red-500" : "text-gray-400"} />
            <span className={`text-xs font-bold ${overdue.length > 0 ? "text-red-700" : "text-gray-500"}`}>
              Vencidos ({overdue.length})
            </span>
          </div>
          {overdue.length === 0 ? (
            <p className="text-xs text-gray-400">Sin seguimientos vencidos 🎉</p>
          ) : (
            <div className="space-y-2">
              {overdue.slice(0, 3).map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] shrink-0 ${activityTypeColors[a.type]}`}>
                    {activityIcon[a.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-red-800 truncate">{a.contactName}</p>
                    <p className="text-[10px] text-red-500">{a.scheduledAt ? formatDate(a.scheduledAt) : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className={`rounded-xl border p-4 ${upcoming.length > 0 ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} className={upcoming.length > 0 ? "text-amber-500" : "text-gray-400"} />
            <span className={`text-xs font-bold ${upcoming.length > 0 ? "text-amber-700" : "text-gray-500"}`}>
              Próximos ({upcoming.length})
            </span>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-xs text-gray-400">Sin próximos seguimientos</p>
          ) : (
            <div className="space-y-2">
              {upcoming.slice(0, 3).map(a => (
                <div key={a.id} className="flex items-start gap-2">
                  <span className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full text-[10px] shrink-0 ${activityTypeColors[a.type]}`}>
                    {activityIcon[a.type]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-amber-800 truncate">{a.contactName}</p>
                    <p className="text-[10px] text-amber-600">{a.scheduledAt ? formatDate(a.scheduledAt) : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity timeline */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Historial completo</h2>
        </div>

        <div className="divide-y divide-gray-50">
          {sortedAll.map((a) => {
            const isPending = a.scheduledAt && !a.completedAt;
            const isDone    = !!a.completedAt;

            return (
              <div key={a.id} className="px-6 py-4 flex items-start gap-4">
                {/* Icon */}
                <div className={`mt-0.5 flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${activityTypeColors[a.type]}`}>
                  {activityIcon[a.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activityTypeColors[a.type]}`}>
                      {activityTypeLabel[a.type]}
                    </span>
                    <span className="text-xs font-semibold text-gray-900">{a.contactName}</span>
                    {a.dealTitle && (
                      <>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs text-gray-500">{a.dealTitle}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.description}</p>
                  {a.scheduledAt && (
                    <p className="text-[10px] text-amber-500 mt-1 font-medium">
                      📅 Programado: {formatDate(a.scheduledAt)}
                    </p>
                  )}
                </div>

                {/* Status + date */}
                <div className="shrink-0 text-right">
                  {isDone ? (
                    <div className="flex items-center gap-1 text-emerald-600 justify-end">
                      <CheckCircle2 size={12} />
                      <span className="text-[10px] font-semibold">Completado</span>
                    </div>
                  ) : isPending ? (
                    <div className="flex items-center gap-1 text-amber-500 justify-end">
                      <Clock size={12} />
                      <span className="text-[10px] font-semibold">Pendiente</span>
                    </div>
                  ) : null}
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {formatDate(a.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
