# Manual de Desarrollo — CDM Labs
**Autor:** Cristhian De Moya  
**Email:** demoyacristhian@gmail.com  
**Última actualización:** Mayo 2026  

---

## Índice

1. [Visión general del proyecto](#1-visión-general)
2. [Arquitectura y stack tecnológico](#2-arquitectura)
3. [Infraestructura y credenciales](#3-infraestructura)
4. [Proyecto 1: Portfolio personal](#4-portfolio)
5. [Proyecto 2: CRM Demo](#5-crm-demo)
6. [Proyecto 3: Automatizaciones n8n](#6-automatizaciones-n8n)
7. [Historial de desarrollo paso a paso](#7-historial)
8. [Tareas pendientes](#8-pendientes)
9. [Guía de instalación en nuevo ordenador](#9-setup-nuevo-ordenador)
10. [Protocolo de actualización](#10-protocolo-de-actualización)

---

## 1. Visión General

**CDM Labs** es el ecosistema digital de marca personal de Cristhian De Moya como desarrollador de sistemas modernos para negocios. El proyecto engloba:

- **Marca personal**: Web portfolio profesional que muestra servicios, proyectos y forma de contacto.
- **Demostración de producto**: CRM Demo con datos ficticios que muestra el valor completo de un CRM operativo.
- **Automatización**: Sistema de publicación autónoma en LinkedIn con agente IA y renovación automática de tokens OAuth2.

### Propuesta de valor

> Cristhian transforma operaciones manuales en sistemas digitales inteligentes. CRMs, automatizaciones con IA y workflows que trabajan mientras el negocio se enfoca en lo importante.

### URLs en producción

| Recurso | URL |
|---|---|
| Portfolio | https://portfolio-ekio.vercel.app |
| CRM Demo | https://crm-demo-ekio.vercel.app |
| n8n (self-hosted) | https://cristhian-de-moya-lab-1-n8n.idv05l.easypanel.host |
| Google Sheet posts | https://docs.google.com/spreadsheets/d/1B5iXgUaW2jq3u4wG9ocxDpTvqcRYMaJMCuHYHztkuUk |

---

## 2. Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CDM Labs Ecosystem                            │
│                                                                       │
│  ┌──────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │   PORTFOLIO      │    │   CRM DEMO       │    │  n8n AUTOMÁT. │  │
│  │  Next.js 16      │    │  Next.js 16      │    │  EasyPanel    │  │
│  │  Tailwind v4     │    │  Tailwind v4     │    │  v1.123.21    │  │
│  │  Vercel          │    │  Vercel          │    │               │  │
│  └──────────────────┘    └──────────────────┘    └───────┬───────┘  │
│                                                            │          │
│                          ┌─────────────────────────────────▼───────┐ │
│                          │  INTEGRACIONES EXTERNAS                  │ │
│                          │  LinkedIn API · Google Sheets · Telegram │ │
│                          │  Claude AI (Anthropic)                   │ │
│                          └──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Infraestructura y Credenciales

> ⚠️ **IMPORTANTE**: No subir credenciales al repositorio. Este archivo es solo referencia — las credenciales reales están almacenadas en n8n y en las variables de entorno de Vercel.

### 3.1 Vercel

- **Team**: `ekio`
- **Proyectos**: `portfolio`, `crm-demo`
- **CLI**: `npx vercel --prod --yes` desde cada carpeta de proyecto
- **Dashboard**: https://vercel.com/ekio

### 3.2 n8n (EasyPanel)

- **URL**: `https://cristhian-de-moya-lab-1-n8n.idv05l.easypanel.host`
- **Versión**: 1.123.21
- **API Key**: Guardada en gestión de contraseñas personal (NO en este repo)

#### Workflows activos

| ID | Nombre | Función | Trigger |
|---|---|---|---|
| `LBTI6DbIgl8jPNvF` | LinkedIn - Renovar Token | Renueva OAuth2 token cada 50 días, se auto-actualiza | Cron cada 50 días |
| `yCehkrdSdVhT0CJ3` | Inyectar Post Generado | Recibe post desde scheduled task y lo encola en Sheets | Webhook POST |
| `EnlLRxiecoFqhbfe` | LinkedIn - Publicador Automático | Publica posts desde Google Sheets en LinkedIn | Cron Lun/Mié/Vie 9:00 |
| `c55lyyUtU0RZ0QvT` | LinkedIn - Generador IA | Genera post semanal con Claude AI y lo envía al webhook | Cron miércoles 9:00 |

#### Scheduled Task (external)

- **Nombre**: `linkedin-weekly-post`
- **Cron**: Todos los miércoles a las 09:03
- **Acción**: Genera post y hace POST a `/webhook/inject-post`

### 3.3 LinkedIn OAuth2

- **Credencial en n8n**: `ftI3qXCFI4ypwHyi` (LinkedIn OAuth2)
- **Renovación**: Automática cada 50 días mediante workflow `LBTI6DbIgl8jPNvF`
- **Patrón**: El workflow renueva el token Y se auto-actualiza a sí mismo via API de n8n

### 3.4 Google Sheets

- **Sheet ID**: `1B5iXgUaW2jq3u4wG9ocxDpTvqcRYMaJMCuHYHztkuUk`
- **Hoja**: `posts`
- **Credencial en n8n**: `A29YLZfSQKbqdASd`
- **Columnas**: título, contenido, estado (pendiente/publicado), fecha_publicacion

### 3.5 Telegram

- **Credencial en n8n**: `ftI3qXCFI4ypwHyi`
- **Chat ID**: `5045299056`
- **Uso**: Notificaciones de publicaciones y errores

---

## 4. Portfolio Personal

**Carpeta**: `portfolio/`  
**URL producción**: https://portfolio-ekio.vercel.app  
**Vercel project**: `ekio/portfolio`

### 4.1 Stack técnico

```
Next.js 16 (App Router)
TypeScript (strict)
Tailwind CSS v4 (@import "tailwindcss")
Geist font (next/font/google)
Lucide React (iconos)
CSS Scroll-Driven Animations (parallax)
IntersectionObserver (reveal animations)
CSS @keyframes (orbitalSpin / orbitCounter)
```

### 4.2 Estructura de archivos

```
portfolio/
├── app/
│   ├── layout.tsx          ← Root layout: Geist font, meta SEO
│   ├── page.tsx            ← Imports all section components
│   └── globals.css         ← Tailwind v4, hero gradient, animations, btn clases
├── components/
│   ├── Nav.tsx             ← Fixed navbar, CDM+Labs logo, blur on scroll, mobile menu
│   ├── Hero.tsx            ← Hero section: text left, HeroVisual right
│   ├── HeroVisual.tsx      ← Orbital SVG animation: 9 tools orbiting CDM Labs logo
│   ├── About.tsx           ← Bio, stats (3+ años / 7+ proyectos / 2 sectores), foto
│   ├── Services.tsx        ← 5 tarjetas de servicio + "¿Algo específico?"
│   ├── Projects.tsx        ← 3 proyectos: EKIO CRM Demo / EKIO Coach / LinkedIn Auto
│   ├── Stack.tsx           ← Tecnologías organizadas por categoría
│   ├── Contact.tsx         ← LinkedIn + email + teléfono + España
│   └── Footer.tsx          ← CDM Labs logo + © 2026 · España
└── public/
    ├── cristhian-hero.jpg  ← Foto no usada en hero (reemplazada por HeroVisual)
    └── cristhian-about.jpg ← Foto en sección About
```

### 4.3 HeroVisual — Diagrama orbital

9 herramientas orbitando el logo CDM Labs:

| Herramienta | Color | Ángulo |
|---|---|---|
| n8n | #f97316 (naranja) | 0° |
| Sheets | #22c55e (verde) | 40° |
| Telegram | #3b82f6 (azul) | 80° |
| WhatsApp | #25D366 (verde WhatsApp) | 120° |
| Gmail | #ea4335 (rojo) | 160° |
| Instagram | #C13584 (rosa) | 200° |
| Vercel | #6e6e73 (gris) | 240° |
| Supabase | #10b981 (esmeralda) | 280° |
| Claude | #a855f7 (violeta) | 320° |

**Parámetros de animación**: `orbitSpin 30s linear infinite` + `orbitCounter 30s linear infinite`  
**Integración visual**: Sin tarjeta blanca exterior — flota sobre el gradiente del hero.

### 4.4 Sección Proyectos

| Proyecto | Estado | Link | Nota |
|---|---|---|---|
| EKIO CRM Demo | ✅ Live | https://crm-demo-ekio.vercel.app | Datos ficticios (LDPD) |
| EKIO Coach | ✅ Live | https://ekio-coach.vercel.app | App real |
| LinkedIn Automation | 🔒 Interno | — | Sistema interno CDM Labs |

### 4.5 Despliegue

```bash
cd portfolio
npm run build          # verificar build limpio
npx vercel --prod --yes
```

---

## 5. CRM Demo

**Carpeta**: `crm-demo/`  
**URL producción**: https://crm-demo-ekio.vercel.app  
**Vercel project**: `ekio/crm-demo`

### 5.1 Stack técnico

```
Next.js 16 (App Router, static export)
TypeScript
Tailwind CSS v4 (@import "tailwindcss")
@tailwindcss/postcss (postcss.config.mjs)
Lucide React (iconos)
Datos 100% estáticos en lib/data.ts (sin base de datos)
```

### 5.2 Páginas

| Ruta | Descripción |
|---|---|
| `/` | Dashboard: 6 KPIs, gráfico pipeline, top deals, contactos, pedidos, actividad reciente |
| `/contactos` | 12 contactos con temperatura 🔥/tibio/frío, score bar, fuente, tags, notas |
| `/pipeline` | Kanban 5 columnas: Prospecto → Contactado → Propuesta → Negociación → Cerrado |
| `/deals` | Lista completa de deals con tabla, filtros por etapa, probabilidad |
| `/pedidos` | 13 pedidos con items/SKU, 7 estados, alertas de incidencias |
| `/actividades` | Timeline con alertas de vencidos/próximos, 5 tipos de actividad |

### 5.3 Estructura de datos (lib/data.ts)

```typescript
Contact: { id, name, company, email, phone, status, temperature, score(0-100),
           source, value, lastContact, tags, notes }

Deal: { id, title, contact, contactId, company, value, stage, probability,
        dueDate, notes }

Order: { id, orderNumber, customerName, email, phone, items[], total,
         status, paymentMethod, trackingGls, address, createdAt, notes }

Activity: { id, type, contactName, contactId, description, dealTitle,
            scheduledAt, completedAt, createdAt }
```

**Volumen de datos demo:**
- 12 contactos
- 12 deals en 5 etapas
- 13 pedidos con 7 estados distintos
- 15 actividades (llamadas, emails, reuniones, notas, seguimientos)

### 5.4 Estados de pedidos

| Estado | Color | Descripción |
|---|---|---|
| pendiente | Ámbar | Esperando confirmación/pago |
| en_preparacion | Azul | En desarrollo |
| en_transito | Púrpura | En revisión por el cliente |
| completado | Verde | Entregado y cerrado |
| incidencia | Rojo | Requiere atención |
| cancelado | Gris | Cancelado por el cliente |
| reembolsado | Gris claro | Reembolso procesado |

### 5.5 Nota LDPD

> El CRM Demo usa datos **100% ficticios**. El EKIO CRM real (sistema en producción) contiene datos reales de clientes protegidos por la Ley de Protección de Datos (LDPD). El acceso público al CRM real está restringido.

### 5.6 Despliegue

```bash
cd crm-demo
npm run build
npx vercel --prod --yes
```

---

## 6. Automatizaciones n8n

### 6.1 Flujo de publicación en LinkedIn

```
[Scheduled Task - Miércoles 9:03]
         │
         ▼
[Workflow: Generador IA]
  · Llama a Claude API
  · Genera post sobre automatización/desarrollo
  · POST al webhook de inyección
         │
         ▼
[Webhook: Inyectar Post]
  · Recibe el post generado
  · Lo añade a Google Sheets (columna: pendiente)
  · Notifica por Telegram
         │
         ▼
[Cron: Publicador Automático - Lun/Mié/Vie 9:00]
  · Lee primer post "pendiente" de Sheets
  · Publica en LinkedIn via API
  · Marca como "publicado" en Sheets
  · Notifica por Telegram
```

### 6.2 Renovación automática de token LinkedIn

```
[Cron: cada 50 días]
         │
         ▼
[Workflow: Renovar Token]
  · Hace refresh del token OAuth2 de LinkedIn
  · Actualiza la credencial en n8n via API
  · Se auto-actualiza a sí mismo (siguiente ejecución en 50 días)
  · Notifica por Telegram
```

### 6.3 Estructura Google Sheets (posts)

| Columna | Tipo | Descripción |
|---|---|---|
| título | texto | Título del post |
| contenido | texto largo | Cuerpo completo del post LinkedIn |
| estado | enum | pendiente / publicado |
| fecha_publicacion | fecha | Cuándo se publicó |

---

## 7. Historial de Desarrollo

### Fase 0 — Configuración inicial (Mayo 2026)

- [x] Setup n8n v1.123.21 en EasyPanel (servidor self-hosted)
- [x] Configuración API key de n8n
- [x] Configuración de permisos permanentes en Claude Code (`~/.claude/settings.json`)

### Fase 1A — Automatización LinkedIn (Mayo 2026)

- [x] **Workflow: Renovar Token Automático** (`LBTI6DbIgl8jPNvF`)
  - Cron cada 50 días
  - Refresh token OAuth2 LinkedIn
  - Auto-actualización del propio workflow (patrón self-updating)
  - Notificación Telegram al completar
  
- [x] **Workflow: Inyectar Post Generado** (`yCehkrdSdVhT0CJ3`)
  - Webhook POST en `/webhook/inject-post`
  - Recibe post de la tarea programada
  - Escribe en Google Sheets
  
- [x] **Workflow: Publicador Automático** (`EnlLRxiecoFqhbfe`)
  - Cron Lun/Mié/Vie 9:00
  - Lee de Google Sheets
  - Publica en LinkedIn API
  
- [x] **Workflow: Generador IA** (`c55lyyUtU0RZ0QvT`)
  - Claude AI genera contenido semanal
  - Temática: automatización, desarrollo, sistemas
  
- [x] **Scheduled Task**: `linkedin-weekly-post` (miércoles 9:03)
  - Dispara generador → inyector cada semana

### Fase 1B — Portfolio personal (Mayo 2026)

- [x] **Creación del proyecto** Next.js 16 + Tailwind v4 + TypeScript
- [x] **Diseño**: Light/Apple-style, gradiente hero animado
- [x] **Componentes creados**:
  - `Nav.tsx` — Logo CDM+Labs, blur on scroll, mobile menu
  - `Hero.tsx` — Tagline "Desarrollador de sistemas modernos para negocios."
  - `HeroVisual.tsx` — Diagrama orbital animado (9 herramientas + CDM Labs)
  - `About.tsx` — Bio, stats, foto
  - `Services.tsx` — 5 servicios
  - `Projects.tsx` — EKIO CRM Demo, EKIO Coach, LinkedIn Automation
  - `Stack.tsx` — Tecnologías por categoría
  - `Contact.tsx` — LinkedIn, email, teléfono, España
  - `Footer.tsx` — CDM Labs + año + España
- [x] **Despliegue** en Vercel team `ekio` → `portfolio-ekio.vercel.app`

#### Correcciones aplicadas al portfolio

1. Tagline cambiado de "Arquitecto" → "Desarrollador de sistemas modernos para negocios"
2. Hero foto reemplazada por diagrama orbital animado (HeroVisual)
3. Fondo blanco de HeroVisual eliminado — integrado con gradiente de landing
4. HeroVisual ampliado a 480px (antes 400px)
5. Herramientas actualizadas: React y Next.js → WhatsApp, Instagram, Gmail
6. Información duplicada en Contact eliminada
7. "España" separado a su propia línea debajo de "respuesta en menos de 24h"
8. Footer: "España" añadido
9. Logo CDM Labs corregido en Nav y Sidebar
10. EKIO CRM eliminado como link directo (LDPD) → reemplazado por CRM Demo
11. Email actualizado a `demoyacristhian@gmail.com`
12. Móvil actualizado a `+34 642 298 084`

### Fase 1C — CRM Demo (Mayo 2026)

#### Construcción inicial

- [x] Scaffolding manual (sin create-next-app por conflicto de directorio)
- [x] Fix: eliminado `"type": "commonjs"` de package.json (conflicto ESM)
- [x] Fix: migración a Tailwind v4 (`@tailwindcss/postcss` + `@import "tailwindcss"`)
- [x] Datos ficticios en `lib/data.ts` (8 contactos, 8 deals)
- [x] Páginas: Dashboard, Contactos, Pipeline
- [x] Sidebar: CDM Labs logo, nav básico
- [x] Primer despliegue → `crm-demo-ekio.vercel.app`
- [x] Portfolio actualizado: enlaza al CRM Demo

#### Expansión completa del CRM Demo

Replicado el real CRM (auto-crm) con datos ficticios:

- [x] **`lib/data.ts`** expandido con tipos completos:
  - 12 contactos con temperatura / score / source / notas
  - 12 deals con notas y contactId
  - 13 pedidos con items/SKU y 7 estados
  - 15 actividades (llamadas, emails, reuniones, notas, seguimientos)
  
- [x] **Dashboard** (`/`) mejorado:
  - 6 KPIs: contactos activos, leads calientes, pipeline total, ingresos cerrados, deals activos, pedidos activos
  - Gráfico de barras del pipeline por etapas
  - Panel de seguimientos pendientes
  - Top deals, contactos recientes, pedidos recientes
  - Timeline de actividad reciente (5 tarjetas)
  
- [x] **Contactos** (`/contactos`) mejorado:
  - 12 contactos (antes 8)
  - Score bar (0-100%) con color
  - Badge de temperatura (🔥 caliente / tibio / frío)
  - Badge de fuente (WhatsApp / Instagram / Web / Referido…)
  - Punto indicador en avatar
  - Tags y notas visibles
  
- [x] **Pipeline** (`/pipeline`) actualizado:
  - Ahora usa tipos desde `lib/data.ts`
  - 12 deals distribuidos en 5 columnas
  - Notas visibles en tarjetas
  
- [x] **Deals** (`/deals`) — NUEVA página:
  - Tabla completa ordenada por valor
  - Cards resumen por etapa (6 cards)
  - Columnas: Deal, Contacto, Empresa, Valor, Etapa, Probabilidad, Cierre est.
  - Barra de probabilidad por deal
  - Link al kanban pipeline
  
- [x] **Pedidos** (`/pedidos`) — NUEVA página:
  - 4 KPIs: ingresos, activos, completados, incidencias
  - Alerta roja si hay incidencias
  - Tarjetas por pedido con items/SKU desglosados
  - 7 estados con colores e iconos
  - Dirección, método de pago, tracking GLS
  
- [x] **Actividades** (`/actividades`) — NUEVA página:
  - Alertas de vencidos (rojo) y próximos (ámbar)
  - Timeline cronológico inverso
  - 5 tipos: llamada, email, reunión, nota, seguimiento
  - Estado: completado ✅ / pendiente ⏳
  - Link al deal asociado
  
- [x] **Sidebar** actualizado con 6 secciones: Dashboard / Contactos / Pipeline / Deals / Pedidos / Actividades

---

## 8. Tareas Pendientes

### Alta prioridad

- [ ] **Bug n8n**: Nodo "Marcar Publicado" en workflow Publicador Automático falla en n8n v1.123.21 con Google Sheets update. Posible workaround: cambiar a HTTP Request directo a Sheets API.

- [ ] **Perfil LinkedIn**: Optimizar bio, banner y sección "Acerca de" con el posicionamiento de CDM Labs.

### Media prioridad

- [ ] **Dominio propio**: Comprar dominio (ej. `cristhiandemoya.com` o `cdmlabs.dev`) y apuntar el portfolio.

- [ ] **SEO portfolio**: Añadir meta tags OG, sitemap.xml, robots.txt.

- [ ] **Formulario de contacto**: Reemplazar botones de email/LinkedIn por formulario integrado (Resend o Formspree).

- [ ] **CRM Demo — páginas de detalle**: Páginas `/contactos/[id]` y `/deals/[id]` con detalle completo (actividades del contacto, deals asociados).

- [ ] **CRM Demo — filtros interactivos**: Filtro por temperatura en Contactos, filtro por estado en Pedidos (actualmente todo estático, sin React hooks por ser server components).

### Baja prioridad

- [ ] **Analytics**: Añadir Vercel Analytics o Plausible al portfolio.

- [ ] **Modo oscuro**: Implementar dark mode en portfolio y CRM Demo.

- [ ] **Blog/Contenido**: Sección de artículos en el portfolio (MDX).

- [ ] **Automatización — más plataformas**: Extender publicación a Instagram y X (Twitter).

---

## 9. Guía de instalación en nuevo ordenador

### 9.1 Requisitos previos

```bash
# Instalar Node.js (v20+)
# https://nodejs.org

# Instalar Git
# https://git-scm.com

# Instalar GitHub CLI
winget install --id GitHub.cli

# Instalar Vercel CLI
npm install -g vercel

# Autenticarse en GitHub
gh auth login

# Autenticarse en Vercel
npx vercel login
```

### 9.2 Clonar el repositorio

```bash
git clone https://github.com/demoyacristhian-sketch/CDM-Labs.git
cd CDM-Labs
```

### 9.3 Setup del Portfolio

```bash
cd portfolio
npm install
npm run dev    # localhost:3000
```

Para desplegar:
```bash
npx vercel --prod --yes
# Vercel lo detecta automáticamente como proyecto "ekio/portfolio"
```

### 9.4 Setup del CRM Demo

```bash
cd crm-demo
npm install
npm run dev    # localhost:3001 (si portfolio ya corre en 3000)
```

Para desplegar:
```bash
npx vercel --prod --yes
# Vercel lo detecta como "ekio/crm-demo"
```

### 9.5 Verificar n8n

1. Abrir https://cristhian-de-moya-lab-1-n8n.idv05l.easypanel.host
2. Verificar que los 4 workflows están activos
3. Hacer test de conexión de Google Sheets y LinkedIn OAuth2
4. Verificar que el Scheduled Task `linkedin-weekly-post` está activo

### 9.6 Variables de entorno

El portfolio y CRM Demo no necesitan variables de entorno (todo estático).

Los workflows de n8n tienen sus credenciales almacenadas internamente en n8n. No necesitan `.env` local.

### 9.7 Configuración de Claude Code

```json
// ~/.claude/settings.json
{
  "language": "spanish",
  "permissions": {
    "allow": [
      "Bash(*)", "Read(*)", "Write(*)", "Edit(*)",
      "Glob(*)", "Grep(*)", "WebFetch(*)", "WebSearch(*)",
      "mcp__Claude_in_Chrome__*",
      "mcp__scheduled-tasks__*",
      "mcp__ccd_session__*"
    ]
  }
}
```

---

## 10. Protocolo de Actualización

Cada vez que se realice un cambio en cualquier proyecto, seguir este protocolo:

### 10.1 Cambios en código

```bash
# 1. Hacer los cambios en el código
# 2. Verificar build local
cd [carpeta-proyecto] && npm run build

# 3. Desplegar
npx vercel --prod --yes

# 4. Actualizar este manual (MANUAL-DESARROLLO.md):
#    - Añadir entrada en sección 7 (Historial)
#    - Actualizar sección 8 (Pendientes) si corresponde

# 5. Hacer commit y push al repositorio GitHub
cd "C:\Users\me-la\OneDrive\Escritorio\CRISTHIAN DE MOYA LAB"
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

### 10.2 Cambios en workflows n8n

1. Modificar el workflow en la interfaz de n8n
2. Exportar el workflow como JSON (botón "Download")
3. Guardar en `docs/n8n-workflows/[nombre-workflow].json`
4. Commit y push al repo

### 10.3 Convención de commits

```
feat:     nueva funcionalidad
fix:      corrección de bug
update:   mejora de funcionalidad existente
docs:     cambios en documentación
deploy:   solo cambios de despliegue
style:    cambios visuales/CSS
refactor: refactorización sin cambio funcional
```

---

## Changelog

| Fecha | Versión | Cambios |
|---|---|---|
| 2026-05-14 | v1.3 | CRM Demo expandido: +Deals, +Pedidos, +Actividades, 12 contactos, 13 pedidos, 15 actividades |
| 2026-05-14 | v1.2 | HeroVisual renovado: sin tarjeta blanca, +WhatsApp/Instagram/Gmail, iconos SVG, 480px |
| 2026-05-14 | v1.1 | CRM Demo v1: Dashboard + Contactos + Pipeline. Deploy en Vercel |
| 2026-05-13 | v1.0 | Portfolio completo en producción. n8n workflows activos |
| 2026-05-12 | v0.3 | Correcciones portfolio: España, duplicados, CDM Labs logo |
| 2026-05-11 | v0.2 | Portfolio creado y desplegado. Automatizaciones LinkedIn activas |
| 2026-05-10 | v0.1 | Setup inicial: n8n, credenciales, workflows base |
