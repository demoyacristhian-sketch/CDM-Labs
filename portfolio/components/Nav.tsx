"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#e5e5ea]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-baseline gap-1 select-none">
          <span className="text-sm font-bold tracking-[0.18em] text-[#1d1d1f] uppercase">CDM</span>
          <span className="text-[10px] font-semibold tracking-widest text-[#10b981] uppercase">Labs</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contacto" className="hidden md:inline-flex btn-green text-sm">
          Hablemos
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#e5e5ea] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#1d1d1f] hover:text-[#10b981] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn-green text-center" onClick={() => setOpen(false)}>
            Hablemos
          </a>
        </div>
      )}
    </nav>
  );
}
