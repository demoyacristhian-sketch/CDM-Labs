"use client";

const ORBIT_R = 160;
const CENTER = 240;
const SIZE   = 480;

const nodes = [
  { label: "n8n",       color: "#f97316", angle: 0   },
  { label: "Sheets",    color: "#22c55e", angle: 40  },
  { label: "Telegram",  color: "#3b82f6", angle: 80  },
  { label: "WhatsApp",  color: "#25D366", angle: 120 },
  { label: "Gmail",     color: "#ea4335", angle: 160 },
  { label: "Instagram", color: "#C13584", angle: 200 },
  { label: "Vercel",    color: "#6e6e73", angle: 240 },
  { label: "Supabase",  color: "#10b981", angle: 280 },
  { label: "Claude",    color: "#a855f7", angle: 320 },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

function ToolIcon({ name, color }: { name: string; color: string }) {
  const s = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none",
    stroke: color, strokeWidth: 2,
    strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (name === "n8n")
    return <span style={{ fontSize: 7.5, fontWeight: 900, color, letterSpacing: "0.05em", lineHeight: 1 }}>n8n</span>;

  if (name === "Sheets")
    return <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;

  if (name === "Telegram")
    return <svg {...s}><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>;

  if (name === "WhatsApp")
    return <svg {...s}><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z"/></svg>;

  if (name === "Gmail")
    return <svg {...s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;

  if (name === "Instagram")
    return <svg {...s}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/></svg>;

  if (name === "Vercel")
    return <svg width={14} height={14} viewBox="0 0 24 24" fill={color}><path d="M12 2L2 20h20L12 2z"/></svg>;

  if (name === "Supabase")
    return <svg width={14} height={14} viewBox="0 0 24 24" fill={color}><path d="M11.9 2L2 17h10v5l10-15H12V2z"/></svg>;

  if (name === "Claude")
    return <svg {...s}><circle cx="12" cy="12" r="3" fill={color}/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="5.6" y1="5.6" x2="8.5" y2="8.5"/><line x1="15.5" y1="15.5" x2="18.4" y2="18.4"/><line x1="5.6" y1="18.4" x2="8.5" y2="15.5"/><line x1="15.5" y1="8.5" x2="18.4" y2="5.6"/></svg>;

  return null;
}

export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center select-none">

      {/* Ambient glow — blends with hero gradient */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 560,
          height: 560,
          background: "radial-gradient(ellipse, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.05) 40%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320,
          height: 320,
          background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 65%)",
          filter: "blur(24px)",
        }}
      />

      {/* Orbit container — transparent, floats on hero bg */}
      <div
        className="relative"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* SVG: orbit rings + connection lines */}
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {/* Outer subtle ring */}
          <circle cx={CENTER} cy={CENTER} r={ORBIT_R + 40}
            fill="none" stroke="#d2d2d7" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.5" />
          {/* Main orbit ring */}
          <circle cx={CENTER} cy={CENTER} r={ORBIT_R}
            fill="none" stroke="#c7c7cc" strokeWidth="1" strokeDasharray="3 7" opacity="0.8" />

          {/* Connection lines from centre to each node */}
          {nodes.map((n) => {
            const nx = CENTER + ORBIT_R * Math.cos(toRad(n.angle));
            const ny = CENTER + ORBIT_R * Math.sin(toRad(n.angle));
            return (
              <line key={n.label}
                x1={CENTER} y1={CENTER} x2={nx} y2={ny}
                stroke={n.color} strokeWidth="0.8" strokeOpacity="0.2"
              />
            );
          })}
        </svg>

        {/* Orbiting nodes — rotate + counter-rotate so labels stay upright */}
        <div
          className="absolute inset-0"
          style={{ animation: "orbitSpin 30s linear infinite" }}
        >
          {nodes.map((n) => {
            const nx = CENTER + ORBIT_R * Math.cos(toRad(n.angle));
            const ny = CENTER + ORBIT_R * Math.sin(toRad(n.angle));
            return (
              <div
                key={n.label}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${(nx / SIZE) * 100}%`,
                  top:  `${(ny / SIZE) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="flex flex-col items-center justify-center gap-[3px] rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
                  style={{
                    width: 54,
                    height: 54,
                    borderColor: n.color,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                    animation: "orbitCounter 30s linear infinite",
                  }}
                >
                  <ToolIcon name={n.label} color={n.color} />
                  <span
                    className="font-bold leading-none text-center"
                    style={{ color: n.color, fontSize: 6.5, maxWidth: 46 }}
                  >
                    {n.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CDM Labs centre card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative flex flex-col items-center justify-center">
            {/* Outer glow */}
            <div
              className="absolute rounded-2xl"
              style={{
                width: 110,
                height: 110,
                background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #1d1d1f 100%)",
                opacity: 0.18,
                filter: "blur(10px)",
              }}
            />
            {/* Logo card */}
            <div
              className="relative flex flex-col items-center justify-center rounded-2xl"
              style={{
                width: 96,
                height: 96,
                background: "#1d1d1f",
                boxShadow: "0 8px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-10 h-[1.5px] rounded-full mb-2"
                style={{ background: "linear-gradient(90deg, transparent, #10b981, transparent)" }} />
              <span
                className="text-white font-black tracking-[0.08em] text-[1.4rem] leading-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                CDM
              </span>
              <span
                className="font-bold tracking-[0.28em] text-[7px] mt-[5px] uppercase"
                style={{ color: "#10b981", fontFamily: "var(--font-geist-sans)" }}
              >
                Labs
              </span>
              <div className="w-10 h-[1.5px] rounded-full mt-2"
                style={{ background: "linear-gradient(90deg, transparent, #10b981, transparent)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbitCounter {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
