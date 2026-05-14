import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "CDM Labs · CRM Demo",
  description: "Demo del sistema CRM desarrollado por CDM Labs — datos ficticios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-w-0 bg-gray-50 pt-14 md:pt-0">{children}</main>
      </body>
    </html>
  );
}
