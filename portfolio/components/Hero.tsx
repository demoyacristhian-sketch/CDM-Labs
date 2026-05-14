import { ArrowRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden hero-gradient">

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1d1d1f 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top radial light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.07)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="lg:col-span-3 space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#059669] bg-[#f0fdf4] border border-[#a7f3d0] px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Disponible para proyectos
            </div>

            {/* Name */}
            <h1 className="headline-xl">
              Cristhian
              <br />
              <span className="text-[#6e6e73]">De Moya</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-[#1d1d1f] font-semibold leading-snug max-w-lg">
              Desarrollador de sistemas modernos
              <br />
              <span className="text-[#10b981]">para negocios.</span>
            </p>

            {/* Description */}
            <p className="text-base text-[#6e6e73] leading-relaxed max-w-md">
              Transformo operaciones manuales en sistemas digitales inteligentes.
              CRMs, automatizaciones con IA y workflows que trabajan mientras
              tú te enfocas en lo que realmente importa.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#proyectos" className="btn-primary group">
                Ver proyectos
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a href="#contacto" className="btn-secondary">
                Hablemos
              </a>
            </div>
          </div>

          {/* ── Right: Animated Visual ── */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
