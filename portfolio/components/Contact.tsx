"use client";
import { Mail, Phone } from "lucide-react";
import { useEffect, useRef } from "react";

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" className="py-32 px-6 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Main card */}
        <div className="relative rounded-3xl overflow-hidden bg-[#f5f5f7] border border-[#e5e5ea] p-12 sm:p-16 text-center">

          {/* Green glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10" ref={ref}>
            <span className="reveal section-label">Contacto</span>

            <h2 className="reveal headline-lg mb-6">
              ¿Tienes un proceso que
              <br />
              <span className="text-[#6e6e73]">merece un sistema?</span>
            </h2>

            <p className="reveal text-[#6e6e73] text-base max-w-xl mx-auto leading-relaxed mb-12">
              Si tienes operaciones manuales que se están convirtiendo en un cuello
              de botella, hablemos. Revisamos el problema juntos y vemos qué se
              puede automatizar.
            </p>

            {/* Contact buttons */}
            <div className="reveal flex flex-wrap gap-3 justify-center mb-8">
              <a
                href="https://www.linkedin.com/in/cristhian-de-moya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
              <a href="mailto:demoyacristhian@gmail.com" className="btn-secondary">
                <Mail size={15} />
                demoyacristhian@gmail.com
              </a>
              <a href="tel:+34642298084" className="btn-secondary">
                <Phone size={15} />
                +34 642 298 084
              </a>
            </div>

            {/* Response time */}
            <div className="reveal flex flex-col items-center gap-2 mt-8">
              <div className="flex items-center gap-4 w-full max-w-xs">
                <div className="h-px flex-1 bg-[#e5e5ea]" />
                <span className="text-xs text-[#86868b]">respuesta en menos de 24h</span>
                <div className="h-px flex-1 bg-[#e5e5ea]" />
              </div>
              <span className="text-xs font-semibold text-[#10b981] tracking-wide">España</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
