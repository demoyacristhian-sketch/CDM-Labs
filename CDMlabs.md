# CDM Labs — Documento Maestro del Proyecto
**Autor:** Cristhian De Moya  
**Email:** demoyacristhian@gmail.com  
**Repositorio:** https://github.com/demoyacristhian-sketch/CDM-Labs  
**Última actualización:** 14 Mayo 2026

---

## ¿Qué es CDM Labs?

**CDM Labs** es la marca personal y empresa de desarrollo de Cristhian De Moya. El proyecto nació con el objetivo de construir un ecosistema digital completo que sirva como:

1. **Escaparate profesional** — un portfolio que demuestra capacidades reales
2. **Herramienta de captación** — automatización de contenido en LinkedIn para generar leads
3. **Producto demostrable** — un CRM demo que muestra el tipo de sistemas que construye para clientes

> Cristhian De Moya transforma operaciones manuales en sistemas digitales inteligentes. CRMs, automatizaciones con IA y workflows que trabajan mientras el negocio se enfoca en lo que importa.

---

## Estructura completa del proyecto

```
CDM-Labs/
│
├── README.md                    ← Overview rápido del proyecto
├── MANUAL-DESARROLLO.md         ← Manual técnico completo
├── CDMlabs.md                   ← Este documento (estructura y evolución)
├── .gitignore                   ← Exclusiones para git
├── push.ps1                     ← Script de push rápido a GitHub
│
├── portfolio/                   ← Web de marca personal
│   ├── app/
│   │   ├── layout.tsx           ← Root layout, Geist font, SEO meta
│   │   ├── page.tsx             ← Importa todos los componentes
│   │   └── globals.css          ← Tailwind v4, animaciones, clases de botones
│   ├── components/
│   │   ├── Nav.tsx              ← Navbar fija, logo CDM+Labs, blur on scroll
│   │   ├── Hero.tsx             ← Sección hero con tagline y HeroVisual
│   │   ├── HeroVisual.tsx       ← Diagrama orbital animado (9 herramientas)
│   │   ├── About.tsx            ← Bio, stats, foto cristhian-about.jpg
│   │   ├── Services.tsx         ← 5 servicios + tarjeta "¿Algo específico?"
│   │   ├── Projects.tsx         ← EKIO CRM Demo / EKIO Coach / LinkedIn Auto
│   │   ├── Stack.tsx            ← Tecnologías por categoría
│   │   ├── Contact.tsx          ← LinkedIn + email + teléfono + España
│   │   └── Footer.tsx           ← CDM Labs logo + © 2026 · España
│   ├── public/
│   │   ├── cristhian-about.jpg  ← Foto sección About
│   │   └── cristhian-hero.jpg   ← Foto original (no usada, reemplazada por HeroVisual)
│   ├── package.json
│   ├── tsconfig.json
│   └── postcss.config.mjs
│
├── crm-demo/                    ← Demo CRM con datos ficticios
│   ├── app/
│   │   ├── layout.tsx           ← Root layout, importa Sidebar
│   │   ├── globals.css          ← Tailwind v4, estilos base
│   │   ├── page.tsx             ← Dashboard principal
│   │   ├── contactos/
│   │   │   └── page.tsx         ← Lista de 12 contactos
│   │   ├── pipeline/
│   │   │   └── page.tsx         ← Kanban 5 columnas
│   │   ├── deals/
│   │   │   └── page.tsx         ← Lista de deals con tabla
│   │   ├── pedidos/
│   │   │   └── page.tsx         ← Gestión de pedidos y órdenes
│   │   └── actividades/
│   │       └── page.tsx         ← Timeline de actividades
│   ├── components/
│   │   └── Sidebar.tsx          ← Navegación lateral, 6 secciones
│   ├── lib/
│   │   └── data.ts              ← Todos los datos ficticios del CRM
│   ├── package.json
│   ├── tsconfig.json
│   └── postcss.config.mjs
│
└── .claude/
    └── update-repo.sh           ← Hook de auto-sync con GitHub
```

---

## URLs en producción

| Recurso | URL | Estado |
|---|---|---|
| Portfolio personal | https://portfolio-cdmlabs.vercel.app | ✅ Público |
| CRM Demo | https://crm-demo-cdmlabs.vercel.app | ✅ Público |
| Repositorio GitHub | https://github.com/demoyacristhian-sketch/CDM-Labs | ✅ Público |
| n8n (automatización) | https://cristhian-de-moya-lab-1-n8n.idv05l.easypanel.host | ✅ Activo |
| Google Sheets (posts) | https://docs.google.com/spreadsheets/d/1B5iXgUaW2jq3u4wG9ocxDpTvqcRYMaJMCuHYHztkuUk | ✅ Activo |

---

## Evolución del proyecto — Desde el minuto 1

### BLOQUE 1 — Infraestructura base y automatización LinkedIn

**Objetivo:** Crear un sistema de publicación autónoma en LinkedIn que funcione sin intervención humana.

#### Paso 1 — Setup n8n en EasyPanel
- Se desplegó n8n v1.123.21 en servidor self-hosted (EasyPanel)
- URL: `cristhian-de-moya-lab-1-n8n.idv05l.easypanel.host`
- Se configuró la API key de n8n para acceso programático
- Se conectaron credenciales: LinkedIn OAuth2, Google Sheets API, Telegram Bot

#### Paso 2 — Workflow: Renovar Token LinkedIn (`LBTI6DbIgl8jPNvF`)
- **Problema resuelto:** Los tokens OAuth2 de LinkedIn caducan y hay que renovarlos manualmente
- **Solución:** Workflow que se ejecuta cada 50 días, renueva el token automáticamente Y se auto-actualiza a sí mismo vía API de n8n para programar la siguiente ejecución
- **Patrón:** Self-updating workflow (el workflow modifica su propio cron trigger)
- Notificación por Telegram al completar

#### Paso 3 — Workflow: Publicador Automático (`EnlLRxiecoFqhbfe`)
- Lee el primer post marcado como "pendiente" en Google Sheets
- Publica en LinkedIn via API oficial
- Marca el post como "publicado" en Sheets
- Cron: Lunes, Miércoles y Viernes a las 9:00

#### Paso 4 — Workflow: Generador IA (`c55lyyUtU0RZ0QvT`)
- Usa Claude AI (Anthropic) para generar contenido semanal sobre automatización y desarrollo
- Envía el post generado al webhook de inyección
- Cron: Miércoles a las 9:00

#### Paso 5 — Workflow: Inyectar Post (`yCehkrdSdVhT0CJ3`)
- Webhook que recibe posts del generador IA
- Los escribe en Google Sheets (columna: pendiente)
- Notifica por Telegram: "Post añadido a la cola"

#### Paso 6 — Scheduled Task externo: `linkedin-weekly-post`
- Tarea programada que dispara todo el proceso cada miércoles a las 9:03
- Se ejecuta fuera de n8n para mayor robustez
- Hace POST al webhook de inyección

**Resultado del Bloque 1:** Sistema completamente autónomo de publicación en LinkedIn. Genera contenido con IA, lo guarda en Sheets, lo publica 3 veces por semana, y renueva los tokens OAuth2 automáticamente cada 50 días.

---

### BLOQUE 2 — Portfolio de marca personal

**Objetivo:** Crear una web profesional de nivel world-class que demuestre las capacidades de CDM Labs.

#### Paso 7 — Setup del proyecto portfolio
- Creado con Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Fuente: Geist (Google Fonts via Next.js)
- Deploy en Vercel team `ekio`

#### Paso 8 — Diseño y componentes base
Se construyeron 9 componentes:

**Nav.tsx**
- Navbar fija con blur al hacer scroll
- Logo: "CDM" (bold negro) + "Labs" (verde esmeralda)
- Menú desktop + hamburger mobile

**Hero.tsx**
- Grid 5 columnas: texto (3) + visual (2)
- Tagline: "Desarrollador de sistemas modernos para negocios."
- Badge animado: "Disponible para proyectos"
- CTAs: "Ver proyectos" + "Hablemos"
- Background: gradiente animado verde/azul/blanco (18s loop)

**HeroVisual.tsx** *(componente estrella)*
- Diagrama orbital animado SVG
- 9 herramientas orbitando el logo CDM Labs:
  n8n (naranja), Sheets (verde), Telegram (azul), WhatsApp (verde), Gmail (rojo), Instagram (rosa), Vercel (gris), Supabase (esmeralda), Claude AI (violeta)
- Animación: `orbitSpin 30s linear infinite` + `orbitCounter 30s` (para que los labels no giren)
- Sin tarjeta blanca exterior — flota directamente sobre el gradiente del hero
- Cada nodo tiene: icono SVG + texto del nombre de la herramienta
- CDM Labs en el centro: tarjeta negra redondeada (#1d1d1f), "CDM" blanco bold, "LABS" verde, barras de acento verdes

**About.tsx**
- Foto cristhian-about.jpg
- Estadísticas: 3+ años · 7+ proyectos · 2 sectores
- Historia de transición y enfoque

**Services.tsx**
- 5 servicios: CRM personalizado, Automatización IA, Dashboards operativos, Integraciones API, Sistemas a medida
- Tarjeta extra: "¿Algo específico?" con CTA a contacto

**Projects.tsx**
- EKIO CRM Demo → enlace a crm-demo-cdmlabs.vercel.app (datos ficticios, LDPD)
- EKIO Coach → enlace a ekio-coach.vercel.app
- LinkedIn Automation → proyecto interno (sin enlace)
- Nota legal LDPD: el CRM real está protegido

**Stack.tsx**
- Tecnologías organizadas por categoría: Frontend, Backend, Automatización, IA, Infraestructura

**Contact.tsx**
- Botón LinkedIn: https://www.linkedin.com/in/cristhian-de-moya
- Botón Email: demoyacristhian@gmail.com
- Botón Teléfono: +34 642 298 084
- Divisor: "respuesta en menos de 24h" / "España" (línea propia, verde)

**Footer.tsx**
- Logo CDM Labs
- © 2026 · España

#### Paso 9 — Correcciones y mejoras del portfolio
Tras revisión con screenshots:
1. Tagline cambiado: "Arquitecto" → "Desarrollador"
2. Hero foto → reemplazada por HeroVisual (diagrama orbital)
3. Fondo blanco eliminado del HeroVisual → se integra con el gradiente
4. HeroVisual ampliado de 400px → 480px
5. Herramientas actualizadas: React/Next.js → WhatsApp/Instagram/Gmail
6. Iconos SVG añadidos a cada nodo del orbital
7. Información duplicada eliminada en Contact
8. "España" a su propia línea (antes estaba junto a "respuesta en menos de 24h")
9. Email correcto: demoyacristhian@gmail.com
10. Móvil correcto: +34 642 298 084
11. CDM Labs logo corregido en Nav (CDM bold + Labs esmeralda)
12. Proyecto EKIO CRM: eliminado link directo (LDPD) → reemplazado con "Ver demo"

#### Paso 10 — Deploy del portfolio
- Deploy en Vercel: https://portfolio-cdmlabs.vercel.app
- SSO Protection desactivada para acceso público sin cuenta Vercel
- Accesible por cualquier persona sin login

---

### BLOQUE 3 — CRM Demo

**Objetivo:** Crear una versión demo completa del CRM real (EKIO CRM) con datos ficticios para demostrar el valor del producto sin exponer datos reales.

#### Contexto
El EKIO CRM real es un sistema en producción integrado con Shopify, GLS, Holded y SeQura con datos reales de clientes. Por la Ley de Protección de Datos (LDPD), no puede mostrarse públicamente.

#### Paso 11 — Setup del proyecto CRM Demo
- Creado manualmente (no con create-next-app, por conflicto de directorio)
- **Fix 1:** Eliminado `"type": "commonjs"` de package.json (conflicto ESM)
- **Fix 2:** Migración Tailwind v3 → v4 (`@tailwindcss/postcss` + `@import "tailwindcss"`)
- Stack: Next.js 16 + TypeScript + Tailwind v4 + Lucide React
- Datos 100% estáticos en `lib/data.ts` (sin base de datos)

#### Paso 12 — Datos ficticios (lib/data.ts)
Creados datos realistas que representan el tipo de negocio:

**12 Contactos** con campos:
- temperature (frio/tibio/caliente 🔥)
- score (0-100%)
- source (WhatsApp/Instagram/Web/Referido/Llamada/Email/Evento)
- tags, notas, valor estimado

**12 Deals** distribuidos en 5 etapas:
- Prospecto (2) → Contactado (3) → Propuesta (3) → Negociación (3) → Cerrado (1)
- Valores: entre €1.800 y €12.500
- Total pipeline: ~€75.000

**13 Pedidos** con 7 estados:
- pendiente, en_preparacion, en_transito, completado, incidencia, cancelado, reembolsado
- Items con SKU desglosados

**15 Actividades** de 5 tipos:
- llamada, email, reunión, nota, seguimiento

#### Paso 13 — Páginas del CRM Demo

**Dashboard** (`/`)
- 6 KPIs: contactos activos, leads calientes, pipeline total, ingresos cerrados, deals activos, pedidos activos
- Gráfico de barras: pipeline por etapa
- Panel: seguimientos pendientes
- Tablas: top deals, contactos recientes, pedidos recientes
- Timeline: 5 actividades recientes

**Contactos** (`/contactos`)
- 12 tarjetas con temperatura, score bar, fuente, tags, notas
- Punto de temperatura en avatar (rojo/naranja/gris)
- Valor estimado por contacto

**Pipeline** (`/pipeline`)
- Kanban 5 columnas
- 12 deal cards con: valor, probabilidad (%), barra de progreso, notas
- Totales por columna

**Deals** (`/deals`) — Nueva página
- Tabla ordenada por valor
- 6 cards resumen por etapa
- Columnas: título, contacto, empresa, valor, etapa, probabilidad (con barra), cierre estimado
- Tasa de conversión

**Pedidos** (`/pedidos`) — Nueva página
- 4 KPIs: ingresos totales, activos, completados, incidencias
- Alerta roja si hay pedidos con incidencia
- 13 tarjetas con: items/SKU desglosados, estado coloreado, dirección, método de pago, notas

**Actividades** (`/actividades`) — Nueva página
- Alertas separadas: Vencidos (rojo) + Próximos (ámbar)
- Timeline cronológico inverso
- Estado: ✅ Completado / ⏳ Pendiente
- Vinculación con deal asociado

**Sidebar** actualizado con 6 secciones + logo CDM Labs + badge "Versión Demo"

#### Paso 14 — Deploy del CRM Demo
- Deploy en Vercel: https://crm-demo-cdmlabs.vercel.app
- SSO Protection desactivada (acceso público)
- Portfolio actualizado: card EKIO CRM enlaza al demo

---

### BLOQUE 4 — Repositorio GitHub

**Objetivo:** Documentar y versionar todo el proyecto para portabilidad a nuevo ordenador y trazabilidad del desarrollo.

#### Paso 15 — Creación del repositorio
- Instalado GitHub CLI (`winget install GitHub.cli`)
- Autenticado vía device flow: https://github.com/login/device
- Repo creado: https://github.com/demoyacristhian-sketch/CDM-Labs
- 49 archivos subidos en commit inicial
- Rama: `master`

#### Paso 16 — Documentación creada
3 documentos en el root del repo:

- **README.md** — Overview rápido, tabla de proyectos, links
- **MANUAL-DESARROLLO.md** — Manual técnico completo con guía de setup para nuevo ordenador
- **CDMlabs.md** — Este documento (estructura y evolución completa)

#### Paso 17 — Herramientas de mantenimiento
- **push.ps1** — Script PowerShell para push rápido: `.\push.ps1 "descripción"`
- **.claude/update-repo.sh** — Hook para auto-sync desde Claude Code

---

## Estado actual del proyecto (14 Mayo 2026)

### ✅ Completado

| Sistema | URL | Estado |
|---|---|---|
| Portfolio personal | portfolio-cdmlabs.vercel.app | En producción |
| CRM Demo | crm-demo-cdmlabs.vercel.app | En producción |
| Automatización LinkedIn | n8n EasyPanel | Activo |
| Token LinkedIn (auto-renovación) | n8n workflow | Activo (50 días) |
| Publicador LinkedIn | n8n workflow | Activo (Lun/Mié/Vie) |
| Generador IA semanal | n8n workflow | Activo (miércoles) |
| Repositorio GitHub | github.com/…/CDM-Labs | Sincronizado |
| Acceso público | Sin login Vercel | ✅ Corregido |

### ⏳ Pendiente

| Tarea | Prioridad |
|---|---|
| Bug "Marcar Publicado" en n8n Sheets | 🔴 Alta |
| Optimizar perfil LinkedIn (bio, banner, Acerca de) | 🔴 Alta |
| Comprar dominio propio (ej. cristhiandemoya.com) | 🟡 Media |
| SEO portfolio: meta OG tags, sitemap, robots.txt | 🟡 Media |
| Formulario de contacto con backend (Resend) | 🟡 Media |
| Páginas detalle CRM Demo (/contactos/[id], /deals/[id]) | 🟡 Media |
| Filtros interactivos en CRM Demo (React client components) | 🟡 Media |
| Analytics (Vercel Analytics o Plausible) | 🟢 Baja |
| Dark mode en portfolio y CRM Demo | 🟢 Baja |
| Blog/artículos en portfolio (MDX) | 🟢 Baja |

---

## Stack tecnológico completo

### Frontend
- Next.js 16 (App Router, Static Site Generation)
- TypeScript (strict mode)
- Tailwind CSS v4 (`@import "tailwindcss"`, `@tailwindcss/postcss`)
- Lucide React (iconos)
- Geist font (via next/font/google)

### CSS & Animaciones
- CSS Scroll-Driven Animations (parallax nativo)
- IntersectionObserver API (reveal on scroll)
- CSS `@keyframes` (orbitSpin, orbitCounter, gradientFlow)
- `backdrop-filter: blur()` (glassmorphism en nodos del orbital)

### Automatización
- n8n v1.123.21 (self-hosted en EasyPanel)
- LinkedIn OAuth2 API (publicación)
- Google Sheets API (cola de posts)
- Telegram Bot API (notificaciones)
- Claude AI / Anthropic API (generación de contenido)

### Infraestructura
- Vercel (deploy portfolio + CRM Demo)
- EasyPanel (hosting n8n)
- GitHub (versionado)
- Google Sheets (base de datos ligera para posts)

### Herramientas de desarrollo
- Claude Code (agente de desarrollo principal)
- GitHub CLI (`gh`)
- Vercel CLI (`npx vercel`)

---

## Guía rápida para retomar en nuevo ordenador

```bash
# 1. Instalar Node.js v20+, Git, GitHub CLI, Vercel CLI
winget install OpenJS.NodeJS
winget install Git.Git
winget install GitHub.cli
npm install -g vercel

# 2. Clonar el repositorio
git clone https://github.com/demoyacristhian-sketch/CDM-Labs.git
cd CDM-Labs

# 3. Setup portfolio
cd portfolio && npm install && npm run dev

# 4. Setup CRM Demo (en otra terminal)
cd crm-demo && npm install && npm run dev

# 5. Autenticarse en Vercel
npx vercel login   # usar la cuenta con el team 'ekio'

# 6. Autenticarse en GitHub
gh auth login

# 7. Para desplegar cambios:
cd portfolio && npx vercel --prod --yes
cd crm-demo && npx vercel --prod --yes

# 8. Para subir cambios al repo:
cd "CRISTHIAN DE MOYA LAB" && .\push.ps1 "descripción del cambio"
```

---

## Protocolo: actualización del manual tras cada cambio

Cada vez que se realice un cambio:

1. **Actualizar este archivo** (CDMlabs.md) — añadir entrada en la sección de evolución
2. **Actualizar MANUAL-DESARROLLO.md** si el cambio es técnico
3. **Push al repo:**
   ```powershell
   .\push.ps1 "descripción del cambio"
   ```

---

*Documento mantenido con Claude Code — CDM Labs · Cristhian De Moya · demoyacristhian@gmail.com*
