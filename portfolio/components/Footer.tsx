export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5ea] py-8 px-6 bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-bold tracking-[0.18em] text-[#1d1d1f] uppercase">CDM</span>
          <span className="text-[9px] font-semibold tracking-widest text-[#10b981] uppercase">Labs</span>
          <span className="text-xs text-[#86868b] ml-2">© 2026 · España</span>
        </div>
        <p className="text-xs text-[#86868b]">
          Construido con Next.js · Desplegado en Vercel
        </p>
      </div>
    </footer>
  );
}
