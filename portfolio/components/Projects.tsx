"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Lock, Clock } from "lucide-react";

const projects = [
  {
    title: "EKIO CRM",
    subtitle: "Sistema operativo completo",
    desc: "CRM en producción real para gestión de pedidos, stock, facturación, atención al cliente y seguimiento diario. Integrado con Shopify, GLS, Holded y SeQura.",
    tags: ["React", "Supabase", "Vercel", "n8n", "Shopify API"],
    url: "https://crm-demo-ekio.vercel.app",
    status: "live",
    statusLabel: "Ver demo",
    accentBg: "bg-[#f0fdf4]",
    accentText: "text-[#10b981]",
    accentBorder: "border-[#a7f3d0]",
    tagStyle: "bg-[#f0fdf4] text-[#059669] border-[#a7f3d0]",
  },
  {
    title: "EKIO Coach",
    subtitle: "App de gestión y seguimiento",
    desc: "Plataforma de gestión operativa con dashboards en tiempo real, seguimiento de KPIs y automatizaciones conectadas al stack de producción.",
    tags: ["React", "PostgreSQL", "Tailwind", "REST API"],
    url: "https://ekio-coach.vercel.app",
    status: "live",
    statusLabel: "Ver proyecto",
    accentBg: "bg-[#eff6ff]",
    accentText: "text-[#3b82f6]",
    accentBorder: "border-[#bfdbfe]",
    tagStyle: "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]",
  },
  {
    title: "LinkedIn Automation",
    subtitle: "Sistema de marca personal",
    desc: "Publicación autónoma en LinkedIn: agente IA que genera contenido semanal, publisher automático Lun/Mié/Vie y renovación de tokens OAuth cada 50 días sin intervención.",
    tags: ["n8n", "Claude AI", "Google Sheets", "Telegram API", "OAuth2"],
    status: "internal",
    statusLabel: "Proyecto interno",
    accentBg: "bg-[#f5f3ff]",
    accentText: "text-[#7c3aed]",
    accentBorder: "border-[#ddd6fe]",
    tagStyle: "bg-[#f5f3ff] text-[#6d28d9] border-[#ddd6fe]",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos" className="py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="reveal section-label">Proyectos</span>
          <h2 className="reveal headline-lg mb-5">Sistemas en producción</h2>
          <p className="reveal text-[#6e6e73] text-base leading-relaxed">
            No casos de estudio hipotéticos. Sistemas reales, corriendo ahora mismo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="reveal card-clean flex flex-col overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Accent top stripe */}
              <div className={`h-1 w-full ${p.accentBg}`} />

              <div className="flex flex-col flex-1 p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1d1d1f]">{p.title}</h3>
                    <p className={`text-xs mt-0.5 font-medium ${p.accentText}`}>{p.subtitle}</p>
                  </div>

                  {/* Status badge */}
                  {p.status === "live" && p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${p.accentBg} ${p.accentText} ${p.accentBorder}`}
                    >
                      <ArrowUpRight size={11} />
                      {p.statusLabel}
                    </a>
                  ) : p.status === "demo" ? (
                    <span className={`shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${p.accentBg} ${p.accentText} ${p.accentBorder}`}>
                      <Clock size={11} />
                      {p.statusLabel}
                    </span>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border bg-[#f5f5f7] text-[#6e6e73] border-[#e5e5ea]">
                      <Lock size={11} />
                      {p.statusLabel}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#6e6e73] leading-relaxed flex-1">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#f5f5f7]">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${p.tagStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EKIO CRM notice */}
        <p className="reveal text-xs text-[#86868b] text-center mt-8 max-w-lg mx-auto leading-relaxed">
          * EKIO CRM demo usa datos ficticios. El sistema en producción contiene datos reales protegidos por LDPD.
        </p>

      </div>
    </section>
  );
}
