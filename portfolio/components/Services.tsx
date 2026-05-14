"use client";
import { useEffect, useRef } from "react";
import { MessageSquare, LayoutDashboard, Workflow, Headphones, BarChart3 } from "lucide-react";

const services = [
  {
    Icon: MessageSquare,
    title: "Automatización WhatsApp + CRM",
    desc: "Integro WhatsApp Business con tu CRM. Los leads entran, se clasifican y reciben seguimiento automático — sin intervención manual.",
  },
  {
    Icon: LayoutDashboard,
    title: "CRMs Personalizados",
    desc: "Sistemas de gestión de clientes construidos para tu negocio, con los flujos y métricas que realmente necesitas.",
  },
  {
    Icon: Workflow,
    title: "Automatizaciones n8n",
    desc: "Conecto tus herramientas y automatizo procesos repetitivos. Shopify, Google Sheets, Gmail, Telegram y mucho más.",
  },
  {
    Icon: Headphones,
    title: "Sistemas de Atención al Cliente",
    desc: "Agentes de IA que resuelven consultas frecuentes, escalan tickets y mantienen al cliente informado en cada paso.",
  },
  {
    Icon: BarChart3,
    title: "Dashboards Operativos",
    desc: "Visibilidad en tiempo real sobre tu negocio. Pedidos, stock, ventas y métricas clave — todo en un solo lugar.",
  },
];

export default function Services() {
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
    <section id="servicios" className="py-32 px-6 bg-[#f5f5f7]" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="reveal section-label">Servicios</span>
          <h2 className="reveal headline-lg mb-5">Lo que construyo</h2>
          <p className="reveal text-[#6e6e73] text-base leading-relaxed">
            Sistemas que resuelven problemas operativos reales,
            no demos bonitas que nadie termina usando.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ Icon, title, desc }, i) => (
            <div key={i} className="reveal card-clean p-7" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] border border-[#a7f3d0] flex items-center justify-center mb-6">
                <Icon size={20} className="text-[#10b981]" />
              </div>
              <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3 leading-snug">{title}</h3>
              <p className="text-sm text-[#6e6e73] leading-relaxed">{desc}</p>
            </div>
          ))}

          {/* Extra card */}
          <div className="reveal card-clean p-7 border-dashed flex flex-col justify-center" style={{ transitionDelay: "360ms" }}>
            <p className="text-sm font-semibold text-[#1d1d1f] mb-2">¿Algo específico?</p>
            <p className="text-xs text-[#86868b] leading-relaxed mb-5">
              Si tienes un proceso que no encaja aquí, cuéntamelo. Si tiene solución, lo resolvemos.
            </p>
            <a href="#contacto" className="text-sm font-semibold text-[#10b981] hover:text-[#059669] transition-colors">
              Hablemos →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
