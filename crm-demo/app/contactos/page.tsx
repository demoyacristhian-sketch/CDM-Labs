import { contacts } from "@/lib/data";
import { Mail, Phone } from "lucide-react";

const statusStyle: Record<string, string> = {
  activo:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  lead:     "bg-blue-50 text-blue-700 border-blue-200",
  inactivo: "bg-zinc-50 text-zinc-500 border-zinc-200",
};

const tempConfig: Record<string, { label: string; dot: string; badge: string }> = {
  caliente: { label: "Caliente 🔥", dot: "bg-red-400",    badge: "bg-red-50 text-red-700 border-red-200" },
  tibio:    { label: "Tibio",        dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200" },
  frio:     { label: "Frío",         dot: "bg-zinc-300",   badge: "bg-zinc-50 text-zinc-500 border-zinc-200" },
};

const sourceLabel: Record<string, string> = {
  whatsapp:  "WhatsApp",
  instagram: "Instagram",
  referido:  "Referido",
  web:       "Web",
  llamada:   "Llamada",
  email:     "Email",
  evento:    "Evento",
};

export default function ContactosPage() {
  const activos   = contacts.filter(c => c.status === "activo").length;
  const leads     = contacts.filter(c => c.status === "lead").length;
  const inactivos = contacts.filter(c => c.status === "inactivo").length;
  const calientes = contacts.filter(c => c.temperature === "caliente").length;

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] w-full mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
          <p className="text-sm text-gray-500 mt-1">{contacts.length} contactos registrados</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Activo ({activos})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Lead ({leads})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-300 inline-block" /> Inactivo ({inactivos})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Calientes ({calientes})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {contacts.map((c) => {
          const temp = tempConfig[c.temperature];
          return (
            <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">

              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 relative">
                    <span className="text-sm font-bold text-gray-600">
                      {c.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                    </span>
                    {/* Temperature dot */}
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${temp.dot}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.company}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize shrink-0 ${statusStyle[c.status]}`}>
                  {c.status}
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400 font-medium">Score</span>
                  <span className="text-[10px] font-bold text-gray-700">{c.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      c.score >= 80 ? "bg-emerald-500" :
                      c.score >= 50 ? "bg-orange-400" : "bg-zinc-300"
                    }`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Mail size={11} className="shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={11} className="shrink-0" />
                  <span>{c.phone}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-2">
                <div className="flex flex-wrap gap-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${temp.badge}`}>
                    {temp.label}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                    {sourceLabel[c.source]}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-900 shrink-0">€{c.value.toLocaleString("es")}</span>
              </div>

              {/* Tags */}
              {c.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Notes */}
              {c.notes && (
                <p className="text-[10px] text-gray-400 italic mt-2 leading-relaxed line-clamp-2">
                  {c.notes}
                </p>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
