"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const stats = [
  { value: "3+", label: "Años en operaciones" },
  { value: "7+", label: "Workflows activos" },
  { value: "2", label: "Sistemas en producción" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre-mi" className="py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Photo */}
          <div className="reveal flex justify-center lg:justify-start">
            <div className="relative aspect-[3/4] w-full max-w-sm rounded-3xl overflow-hidden shadow-xl shadow-black/8">
              <Image
                src="/cristhian-about.jpg"
                alt="Cristhian De Moya"
                fill
                className="object-cover object-[center_20%]"
                sizes="384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="reveal section-label">Sobre mí</span>
            <h2 className="reveal headline-lg mb-8">
              De coordinar operaciones
              <br />a construir los sistemas
              <br />
              <span className="text-[#6e6e73]">que las reemplazan.</span>
            </h2>

            <div className="space-y-5 text-[#6e6e73] text-base leading-relaxed">
              <p className="reveal">
                Durante años coordiné operaciones, logística y ecommerce. Aprendí
                de primera mano que los procesos manuales que escalan son los que
                eventualmente se rompen.
              </p>
              <p className="reveal">
                Hoy diseño los sistemas que yo hubiera necesitado: CRMs a medida,
                automatizaciones con n8n y agentes de IA que trabajan en segundo
                plano, 24/7, sin fricción.
              </p>
              <p className="reveal">
                Sin gurú, sin humo.{" "}
                <span className="text-[#1d1d1f] font-medium">
                  Construcción pública, ejecución real y resultados medibles.
                </span>
              </p>
            </div>

            {/* Stats */}
            <div className="reveal grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#e5e5ea]">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#10b981]">{s.value}</p>
                  <p className="text-xs text-[#86868b] mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
