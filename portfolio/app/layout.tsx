import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cristhian De Moya — Desarrollador de sistemas modernos para negocios",
  description:
    "Transformo operaciones manuales en sistemas digitales inteligentes. CRMs personalizados, automatizaciones con n8n y agentes de IA.",
  openGraph: {
    title: "Cristhian De Moya — CDM Labs",
    description: "Desarrollador de sistemas modernos para negocios.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="bg-white text-[#1d1d1f] font-[family-name:var(--font-geist-sans)]">
        {children}
      </body>
    </html>
  );
}
