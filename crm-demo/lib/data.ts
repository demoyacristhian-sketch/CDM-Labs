// ─── Types ────────────────────────────────────────────────────────────────────

export type Temperature = "frio" | "tibio" | "caliente";
export type ContactSource = "whatsapp" | "instagram" | "referido" | "web" | "llamada" | "email" | "evento";
export type ContactStatus = "activo" | "lead" | "inactivo";
export type DealStage = "prospecto" | "contactado" | "propuesta" | "negociacion" | "cerrado";
export type OrderStatus = "pendiente" | "en_preparacion" | "en_transito" | "completado" | "incidencia" | "cancelado" | "reembolsado";
export type ActivityType = "llamada" | "email" | "reunion" | "nota" | "seguimiento";

export type Contact = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ContactStatus;
  temperature: Temperature;
  score: number;        // 0–100
  source: ContactSource;
  value: number;
  lastContact: string;
  tags: string[];
  notes?: string;
};

export type Deal = {
  id: string;
  title: string;
  contact: string;
  contactId: string;
  company: string;
  value: number;
  stage: DealStage;
  probability: number;
  dueDate: string;
  notes?: string;
};

export type OrderItem = {
  sku: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingGls?: string;
  address: string;
  createdAt: string;
  notes?: string;
};

export type Activity = {
  id: string;
  type: ActivityType;
  contactName: string;
  contactId: string;
  description: string;
  dealTitle?: string;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
};

// ─── Contacts ─────────────────────────────────────────────────────────────────

export const contacts: Contact[] = [
  {
    id: "C001",
    name: "Marcos Fernández",
    company: "Distribuciones Atlántico S.L.",
    email: "m.fernandez@distatlantico.es",
    phone: "+34 612 445 871",
    status: "activo",
    temperature: "caliente",
    score: 88,
    source: "referido",
    value: 8400,
    lastContact: "2026-05-12",
    tags: ["ecommerce", "automatización"],
    notes: "Muy interesado en automatizar gestión de pedidos y alertas de stock.",
  },
  {
    id: "C002",
    name: "Laura Vidal",
    company: "Clínica Estética Vidal",
    email: "lvidal@clinicavidal.com",
    phone: "+34 699 332 210",
    status: "lead",
    temperature: "tibio",
    score: 62,
    source: "instagram",
    value: 3200,
    lastContact: "2026-05-08",
    tags: ["crm", "whatsapp"],
    notes: "Quiere integrar WhatsApp con su agenda de citas.",
  },
  {
    id: "C003",
    name: "Antonio Ruiz",
    company: "Construcciones Ruiz & Hijos",
    email: "aruiz@ruizhijos.es",
    phone: "+34 655 781 223",
    status: "activo",
    temperature: "caliente",
    score: 94,
    source: "referido",
    value: 12500,
    lastContact: "2026-05-13",
    tags: ["dashboard", "automatización", "crm"],
    notes: "Cliente estratégico. Quiere dashboard de obras, presupuestos y equipo.",
  },
  {
    id: "C004",
    name: "Sofía Montero",
    company: "Agencia Montero Digital",
    email: "sofia@monterodigital.com",
    phone: "+34 677 456 900",
    status: "activo",
    temperature: "tibio",
    score: 71,
    source: "web",
    value: 6700,
    lastContact: "2026-05-11",
    tags: ["n8n", "crm"],
    notes: "Agencia de marketing digital. Interesa n8n + CRM para clientes.",
  },
  {
    id: "C005",
    name: "Pedro Álvarez",
    company: "Importaciones Álvarez",
    email: "pedro@importalvarez.es",
    phone: "+34 634 112 773",
    status: "lead",
    temperature: "tibio",
    score: 45,
    source: "llamada",
    value: 4100,
    lastContact: "2026-05-07",
    tags: ["whatsapp", "automatización"],
    notes: "Importador. Quiere alertas automáticas de llegada de mercancía.",
  },
  {
    id: "C006",
    name: "Carmen Torres",
    company: "Asesoría Torres & Asociados",
    email: "c.torres@torresynasoc.com",
    phone: "+34 641 887 345",
    status: "inactivo",
    temperature: "frio",
    score: 18,
    source: "email",
    value: 1800,
    lastContact: "2026-04-20",
    tags: ["dashboard"],
    notes: "No respondió propuesta. Seguimiento en junio.",
  },
  {
    id: "C007",
    name: "Diego Herrera",
    company: "Tech Solutions Herrera",
    email: "dherrera@techsherrera.com",
    phone: "+34 656 990 121",
    status: "activo",
    temperature: "caliente",
    score: 91,
    source: "whatsapp",
    value: 9300,
    lastContact: "2026-05-13",
    tags: ["crm", "n8n", "automatización"],
    notes: "Empresa tech con equipo de ventas. Necesita pipeline + actividades.",
  },
  {
    id: "C008",
    name: "Isabel Moreno",
    company: "Inmobiliaria Moreno Premium",
    email: "imoreno@morenopremium.es",
    phone: "+34 688 234 567",
    status: "lead",
    temperature: "tibio",
    score: 58,
    source: "instagram",
    value: 5500,
    lastContact: "2026-05-09",
    tags: ["crm", "whatsapp"],
    notes: "Agencia inmobiliaria. Interés en CRM con seguimiento de clientes.",
  },
  {
    id: "C009",
    name: "Javier Castillo",
    company: "Restaurantes Castillo Group",
    email: "j.castillo@castillogroup.es",
    phone: "+34 623 778 401",
    status: "lead",
    temperature: "caliente",
    score: 79,
    source: "referido",
    value: 7200,
    lastContact: "2026-05-14",
    tags: ["automatización", "whatsapp", "crm"],
    notes: "Grupo de 4 restaurantes. Quiere gestión centralizada de reservas y pedidos.",
  },
  {
    id: "C010",
    name: "Marta Iglesias",
    company: "Farmacia Iglesias Online",
    email: "marta@farmaciaIglesias.com",
    phone: "+34 691 203 884",
    status: "activo",
    temperature: "tibio",
    score: 66,
    source: "web",
    value: 4800,
    lastContact: "2026-05-10",
    tags: ["ecommerce", "automatización"],
    notes: "Farmacia con tienda online. Pedidos de Shopify sin automatizar.",
  },
  {
    id: "C011",
    name: "Raúl Sánchez",
    company: "Clínica Dental Sánchez",
    email: "rsanchez@clinicasanchez.com",
    phone: "+34 645 119 230",
    status: "lead",
    temperature: "frio",
    score: 27,
    source: "evento",
    value: 2400,
    lastContact: "2026-04-28",
    tags: ["crm", "whatsapp"],
    notes: "Conocido en evento. Interesado pero pendiente de presupuesto.",
  },
  {
    id: "C012",
    name: "Ana Belén Ortiz",
    company: "Estudio Ortiz Arquitectura",
    email: "ana@estudioortiz.com",
    phone: "+34 670 554 778",
    status: "activo",
    temperature: "caliente",
    score: 85,
    source: "whatsapp",
    value: 11000,
    lastContact: "2026-05-13",
    tags: ["crm", "dashboard", "automatización"],
    notes: "Estudio con 8 proyectos activos. Quiere CRM + seguimiento de obras.",
  },
];

// ─── Deals ────────────────────────────────────────────────────────────────────

export const deals: Deal[] = [
  {
    id: "D001",
    title: "Sistema CRM completo",
    contact: "Antonio Ruiz",
    contactId: "C003",
    company: "Construcciones Ruiz & Hijos",
    value: 12500,
    stage: "negociacion",
    probability: 75,
    dueDate: "2026-05-30",
    notes: "Propuesta enviada. Esperando validación de junta directiva.",
  },
  {
    id: "D002",
    title: "Automatización WhatsApp + citas",
    contact: "Laura Vidal",
    contactId: "C002",
    company: "Clínica Estética Vidal",
    value: 3200,
    stage: "propuesta",
    probability: 55,
    dueDate: "2026-05-25",
    notes: "Propuesta enviada por email. Demo programada el 20 mayo.",
  },
  {
    id: "D003",
    title: "Dashboard operativo + n8n",
    contact: "Marcos Fernández",
    contactId: "C001",
    company: "Distribuciones Atlántico S.L.",
    value: 8400,
    stage: "cerrado",
    probability: 100,
    dueDate: "2026-05-01",
    notes: "Proyecto entregado y en producción.",
  },
  {
    id: "D004",
    title: "Integración CRM + Shopify",
    contact: "Sofía Montero",
    contactId: "C004",
    company: "Agencia Montero Digital",
    value: 6700,
    stage: "contactado",
    probability: 40,
    dueDate: "2026-06-10",
  },
  {
    id: "D005",
    title: "Automatización pedidos y alertas",
    contact: "Pedro Álvarez",
    contactId: "C005",
    company: "Importaciones Álvarez",
    value: 4100,
    stage: "prospecto",
    probability: 20,
    dueDate: "2026-06-20",
  },
  {
    id: "D006",
    title: "CRM + pipeline ventas equipo",
    contact: "Diego Herrera",
    contactId: "C007",
    company: "Tech Solutions Herrera",
    value: 9300,
    stage: "negociacion",
    probability: 80,
    dueDate: "2026-05-28",
    notes: "Segunda reunión positiva. Ajustando módulo de actividades.",
  },
  {
    id: "D007",
    title: "Bot WhatsApp captación leads",
    contact: "Isabel Moreno",
    contactId: "C008",
    company: "Inmobiliaria Moreno Premium",
    value: 5500,
    stage: "propuesta",
    probability: 60,
    dueDate: "2026-06-05",
  },
  {
    id: "D008",
    title: "Flujos n8n + notificaciones",
    contact: "Carmen Torres",
    contactId: "C006",
    company: "Asesoría Torres & Asociados",
    value: 1800,
    stage: "contactado",
    probability: 30,
    dueDate: "2026-06-15",
  },
  {
    id: "D009",
    title: "Gestión centralizada restaurantes",
    contact: "Javier Castillo",
    contactId: "C009",
    company: "Restaurantes Castillo Group",
    value: 7200,
    stage: "propuesta",
    probability: 65,
    dueDate: "2026-05-31",
    notes: "Muy interesado. Esperan propuesta formal con módulo de reservas.",
  },
  {
    id: "D010",
    title: "Automatización Shopify + stock",
    contact: "Marta Iglesias",
    contactId: "C010",
    company: "Farmacia Iglesias Online",
    value: 4800,
    stage: "contactado",
    probability: 45,
    dueDate: "2026-06-08",
  },
  {
    id: "D011",
    title: "CRM obras + seguimiento proyectos",
    contact: "Ana Belén Ortiz",
    contactId: "C012",
    company: "Estudio Ortiz Arquitectura",
    value: 11000,
    stage: "negociacion",
    probability: 85,
    dueDate: "2026-05-27",
    notes: "Reunión presencial muy positiva. Cerrando condiciones.",
  },
  {
    id: "D012",
    title: "Setup CRM básico",
    contact: "Raúl Sánchez",
    contactId: "C011",
    company: "Clínica Dental Sánchez",
    value: 2400,
    stage: "prospecto",
    probability: 25,
    dueDate: "2026-06-25",
  },
];

// ─── Orders ───────────────────────────────────────────────────────────────────

export const orders: Order[] = [
  {
    id: "O001",
    orderNumber: "#1047",
    customerName: "Marcos Fernández",
    email: "m.fernandez@distatlantico.es",
    phone: "+34 612 445 871",
    items: [
      { sku: "CRM-PRO",   name: "CRM Pro anual",         quantity: 1, price: 4200 },
      { sku: "AUTO-N8N",  name: "Setup n8n workflows",   quantity: 1, price: 1800 },
      { sku: "DASH-OPS",  name: "Dashboard operativo",   quantity: 1, price: 2400 },
    ],
    total: 8400,
    status: "completado",
    paymentMethod: "Transferencia bancaria",
    address: "Pol. Industrial Norte, Nave 12, 28100 Madrid",
    createdAt: "2026-05-01",
    notes: "Proyecto entregado. Cliente muy satisfecho.",
  },
  {
    id: "O002",
    orderNumber: "#1052",
    customerName: "Antonio Ruiz",
    email: "aruiz@ruizhijos.es",
    phone: "+34 655 781 223",
    items: [
      { sku: "CRM-ENT",   name: "CRM Enterprise",        quantity: 1, price: 7500 },
      { sku: "DASH-OPS",  name: "Dashboard operativo",   quantity: 1, price: 2400 },
      { sku: "SOPORTE",   name: "Soporte prioritario 6m", quantity: 1, price: 2600 },
    ],
    total: 12500,
    status: "en_preparacion",
    paymentMethod: "Transferencia bancaria",
    address: "Calle Industria 44, 08040 Barcelona",
    createdAt: "2026-05-05",
    notes: "Contrato firmado. En desarrollo módulo obras.",
  },
  {
    id: "O003",
    orderNumber: "#1031",
    customerName: "Ana Belén Ortiz",
    email: "ana@estudioortiz.com",
    phone: "+34 670 554 778",
    items: [
      { sku: "CRM-PRO",   name: "CRM Pro anual",         quantity: 1, price: 4200 },
      { sku: "AUTO-N8N",  name: "Setup n8n workflows",   quantity: 1, price: 1800 },
      { sku: "FORM-INT",  name: "Integración formularios", quantity: 3, price: 1000 },
    ],
    total: 9000,
    status: "en_transito",
    paymentMethod: "Tarjeta",
    address: "Paseo de la Castellana 120, 28046 Madrid",
    createdAt: "2026-04-28",
    notes: "En revisión final por el cliente.",
  },
  {
    id: "O004",
    orderNumber: "#1055",
    customerName: "Diego Herrera",
    email: "dherrera@techsherrera.com",
    phone: "+34 656 990 121",
    items: [
      { sku: "CRM-PRO",   name: "CRM Pro anual",         quantity: 1, price: 4200 },
      { sku: "PIPE-SETUP", name: "Setup pipeline ventas", quantity: 1, price: 1800 },
      { sku: "ACT-MOD",   name: "Módulo actividades",    quantity: 1, price: 1500 },
      { sku: "WAPP-BOT",  name: "Bot WhatsApp",          quantity: 1, price: 1800 },
    ],
    total: 9300,
    status: "en_preparacion",
    paymentMethod: "Transferencia bancaria",
    address: "Calle Gran Vía 35, 28013 Madrid",
    createdAt: "2026-05-08",
  },
  {
    id: "O005",
    orderNumber: "#1041",
    customerName: "Javier Castillo",
    email: "j.castillo@castillogroup.es",
    phone: "+34 623 778 401",
    items: [
      { sku: "CRM-ENT",   name: "CRM Enterprise",        quantity: 1, price: 7500 },
    ],
    total: 7500,
    status: "pendiente",
    paymentMethod: "Pendiente de confirmar",
    address: "Avenida del Puerto 8, 46021 Valencia",
    createdAt: "2026-05-13",
    notes: "Pendiente de firma de contrato.",
  },
  {
    id: "O006",
    orderNumber: "#1038",
    customerName: "Isabel Moreno",
    email: "imoreno@morenopremium.es",
    phone: "+34 688 234 567",
    items: [
      { sku: "WAPP-BOT",  name: "Bot WhatsApp captación", quantity: 1, price: 2200 },
      { sku: "CRM-START", name: "CRM Starter",            quantity: 1, price: 1800 },
      { sku: "FORM-INT",  name: "Integración formularios", quantity: 1, price: 1000 },
    ],
    total: 5000,
    status: "completado",
    paymentMethod: "Tarjeta",
    address: "Paseo Marítimo 55, 29016 Málaga",
    createdAt: "2026-04-15",
    notes: "Proyecto completado y en producción.",
  },
  {
    id: "O007",
    orderNumber: "#1048",
    customerName: "Sofía Montero",
    email: "sofia@monterodigital.com",
    phone: "+34 677 456 900",
    items: [
      { sku: "AUTO-N8N",  name: "Setup n8n workflows",   quantity: 1, price: 1800 },
      { sku: "SHOPIFY-INT", name: "Integración Shopify", quantity: 1, price: 2400 },
      { sku: "SOPORTE",   name: "Soporte 3 meses",       quantity: 1, price: 1200 },
    ],
    total: 5400,
    status: "en_preparacion",
    paymentMethod: "Transferencia bancaria",
    address: "Ronda de Outeiro 12, 15001 A Coruña",
    createdAt: "2026-05-06",
  },
  {
    id: "O008",
    orderNumber: "#1022",
    customerName: "Carmen Torres",
    email: "c.torres@torresynasoc.com",
    phone: "+34 641 887 345",
    items: [
      { sku: "CRM-START", name: "CRM Starter",            quantity: 1, price: 1800 },
    ],
    total: 1800,
    status: "incidencia",
    paymentMethod: "Tarjeta",
    address: "Calle Alcalá 220, 28028 Madrid",
    createdAt: "2026-04-10",
    notes: "⚠ Cliente reporta error en módulo de contactos. Revisando.",
  },
  {
    id: "O009",
    orderNumber: "#1019",
    customerName: "Pedro Álvarez",
    email: "pedro@importalvarez.es",
    phone: "+34 634 112 773",
    items: [
      { sku: "AUTO-N8N",  name: "Consultoría n8n (4h)",  quantity: 4, price: 250 },
    ],
    total: 1000,
    status: "completado",
    paymentMethod: "Bizum",
    address: "Polígono Asipo, Nave 7, 33428 Llanera",
    createdAt: "2026-04-02",
  },
  {
    id: "O010",
    orderNumber: "#1057",
    customerName: "Marta Iglesias",
    email: "marta@farmaciaIglesias.com",
    phone: "+34 691 203 884",
    items: [
      { sku: "SHOPIFY-INT", name: "Integración Shopify + stock", quantity: 1, price: 2800 },
      { sku: "AUTO-N8N",    name: "Automatización pedidos",      quantity: 1, price: 1800 },
    ],
    total: 4600,
    status: "pendiente",
    paymentMethod: "Transferencia bancaria",
    address: "Calle Real 18, 15960 Ribeira",
    createdAt: "2026-05-12",
    notes: "Esperando pago inicial para comenzar.",
  },
  {
    id: "O011",
    orderNumber: "#1011",
    customerName: "Laura Vidal",
    email: "lvidal@clinicavidal.com",
    phone: "+34 699 332 210",
    items: [
      { sku: "WAPP-BOT",  name: "Bot WhatsApp citas",    quantity: 1, price: 2000 },
    ],
    total: 2000,
    status: "cancelado",
    paymentMethod: "Tarjeta",
    address: "Avenida Diagonal 450, 08037 Barcelona",
    createdAt: "2026-03-28",
    notes: "Cliente canceló por cambio de prioridades.",
  },
  {
    id: "O012",
    orderNumber: "#1033",
    customerName: "Raúl Sánchez",
    email: "rsanchez@clinicasanchez.com",
    phone: "+34 645 119 230",
    items: [
      { sku: "CRM-START", name: "CRM Starter",            quantity: 1, price: 1800 },
      { sku: "FORM-INT",  name: "Integración formularios", quantity: 1, price: 600 },
    ],
    total: 2400,
    status: "reembolsado",
    paymentMethod: "Tarjeta",
    address: "Paseo de Gracia 100, 08008 Barcelona",
    createdAt: "2026-04-19",
    notes: "Reembolso procesado el 30/04. Cliente no satisfecho.",
  },
  {
    id: "O013",
    orderNumber: "#1058",
    customerName: "Javier Castillo",
    email: "j.castillo@castillogroup.es",
    phone: "+34 623 778 401",
    items: [
      { sku: "CONSULTA",  name: "Consultoría inicial 2h", quantity: 1, price: 500 },
    ],
    total: 500,
    status: "completado",
    paymentMethod: "Bizum",
    address: "Avenida del Puerto 8, 46021 Valencia",
    createdAt: "2026-05-14",
    notes: "Sesión de diagnóstico completada.",
  },
];

// ─── Activities ───────────────────────────────────────────────────────────────

export const activities: Activity[] = [
  {
    id: "A001",
    type: "llamada",
    contactName: "Antonio Ruiz",
    contactId: "C003",
    description: "Llamada de seguimiento. Confirma interés en módulo de obras y equipo. Pide propuesta formal antes del 25 mayo.",
    dealTitle: "Sistema CRM completo",
    completedAt: "2026-05-13T10:30:00",
    createdAt: "2026-05-13T10:30:00",
  },
  {
    id: "A002",
    type: "reunion",
    contactName: "Ana Belén Ortiz",
    contactId: "C012",
    description: "Reunión presencial en su estudio. Revisión de flujos actuales y necesidades de automatización por proyecto.",
    dealTitle: "CRM obras + seguimiento proyectos",
    completedAt: "2026-05-13T16:00:00",
    createdAt: "2026-05-13T16:00:00",
  },
  {
    id: "A003",
    type: "email",
    contactName: "Diego Herrera",
    contactId: "C007",
    description: "Enviado presupuesto detallado con módulo de pipeline y actividades. Adjunto demo acceso.",
    dealTitle: "CRM + pipeline ventas equipo",
    completedAt: "2026-05-12T09:15:00",
    createdAt: "2026-05-12T09:15:00",
  },
  {
    id: "A004",
    type: "seguimiento",
    contactName: "Javier Castillo",
    contactId: "C009",
    description: "Enviar propuesta formal con módulo de reservas para grupo de restaurantes.",
    dealTitle: "Gestión centralizada restaurantes",
    scheduledAt: "2026-05-15T11:00:00",
    createdAt: "2026-05-14T08:00:00",
  },
  {
    id: "A005",
    type: "llamada",
    contactName: "Sofía Montero",
    contactId: "C004",
    description: "Primera llamada de contacto. Interesada en n8n + integración Shopify. Siguiente paso: enviar casos de uso.",
    dealTitle: "Integración CRM + Shopify",
    completedAt: "2026-05-11T12:00:00",
    createdAt: "2026-05-11T12:00:00",
  },
  {
    id: "A006",
    type: "nota",
    contactName: "Marcos Fernández",
    contactId: "C001",
    description: "Proyecto en producción. Cliente satisfecho. Pedir valoración para portfolio el próximo mes.",
    completedAt: "2026-05-10T14:00:00",
    createdAt: "2026-05-10T14:00:00",
  },
  {
    id: "A007",
    type: "seguimiento",
    contactName: "Laura Vidal",
    contactId: "C002",
    description: "Demo de automatización WhatsApp + citas. Preparar entorno de pruebas.",
    dealTitle: "Automatización WhatsApp + citas",
    scheduledAt: "2026-05-20T10:00:00",
    createdAt: "2026-05-08T09:00:00",
  },
  {
    id: "A008",
    type: "email",
    contactName: "Javier Castillo",
    contactId: "C009",
    description: "Enviado resumen de la consultoría y próximos pasos. Pendiente de confirmar reunión para propuesta.",
    dealTitle: "Gestión centralizada restaurantes",
    completedAt: "2026-05-14T17:30:00",
    createdAt: "2026-05-14T17:30:00",
  },
  {
    id: "A009",
    type: "llamada",
    contactName: "Isabel Moreno",
    contactId: "C008",
    description: "Llamada de cualificación. Necesita bot WhatsApp para captar leads de pisos. Budget: 4-6k€.",
    dealTitle: "Bot WhatsApp captación leads",
    completedAt: "2026-05-09T11:30:00",
    createdAt: "2026-05-09T11:30:00",
  },
  {
    id: "A010",
    type: "seguimiento",
    contactName: "Carmen Torres",
    contactId: "C006",
    description: "Retomar contacto. Han pasado 3 semanas sin respuesta. Intentar llamada corta.",
    scheduledAt: "2026-05-16T10:00:00",
    createdAt: "2026-05-05T08:00:00",
  },
  {
    id: "A011",
    type: "reunion",
    contactName: "Diego Herrera",
    contactId: "C007",
    description: "Segunda reunión por videollamada. Equipo de 5 comerciales. Quieren ver la demo del módulo de actividades.",
    dealTitle: "CRM + pipeline ventas equipo",
    completedAt: "2026-05-10T16:00:00",
    createdAt: "2026-05-10T16:00:00",
  },
  {
    id: "A012",
    type: "nota",
    contactName: "Ana Belén Ortiz",
    contactId: "C012",
    description: "Valoración positiva de la reunión. Posiblemente el deal más grande del trimestre. Priorizar.",
    dealTitle: "CRM obras + seguimiento proyectos",
    completedAt: "2026-05-13T18:00:00",
    createdAt: "2026-05-13T18:00:00",
  },
  {
    id: "A013",
    type: "seguimiento",
    contactName: "Marta Iglesias",
    contactId: "C010",
    description: "Confirmar recepción de factura proforma y resolver dudas sobre integración Shopify.",
    scheduledAt: "2026-05-14T12:00:00",
    createdAt: "2026-05-12T10:00:00",
  },
  {
    id: "A014",
    type: "email",
    contactName: "Pedro Álvarez",
    contactId: "C005",
    description: "Enviados casos de uso de automatización para importadores. Incluido ejemplo con alertas Telegram.",
    dealTitle: "Automatización pedidos y alertas",
    completedAt: "2026-05-07T10:00:00",
    createdAt: "2026-05-07T10:00:00",
  },
  {
    id: "A015",
    type: "seguimiento",
    contactName: "Raúl Sánchez",
    contactId: "C011",
    description: "Llamar para ver si siguen interesados tras el reembolso anterior. Ofrecer propuesta más ajustada.",
    scheduledAt: "2026-06-01T10:00:00",
    createdAt: "2026-05-01T08:00:00",
  },
];

// ─── Stage metadata ───────────────────────────────────────────────────────────

export const stageLabels: Record<DealStage, string> = {
  prospecto:   "Prospecto",
  contactado:  "Contactado",
  propuesta:   "Propuesta",
  negociacion: "Negociación",
  cerrado:     "Cerrado ✓",
};

export const stageColors: Record<DealStage, string> = {
  prospecto:   "bg-zinc-100 text-zinc-600",
  contactado:  "bg-blue-50 text-blue-700",
  propuesta:   "bg-yellow-50 text-yellow-700",
  negociacion: "bg-orange-50 text-orange-700",
  cerrado:     "bg-green-50 text-green-700",
};

export const stageBorderColors: Record<DealStage, string> = {
  prospecto:   "border-t-zinc-400",
  contactado:  "border-t-blue-400",
  propuesta:   "border-t-yellow-400",
  negociacion: "border-t-orange-400",
  cerrado:     "border-t-emerald-500",
};

// ─── Order status metadata ─────────────────────────────────────────────────────

export const orderStatusLabel: Record<OrderStatus, string> = {
  pendiente:       "Pendiente",
  en_preparacion:  "En preparación",
  en_transito:     "En revisión",
  completado:      "Completado",
  incidencia:      "Incidencia",
  cancelado:       "Cancelado",
  reembolsado:     "Reembolsado",
};

export const orderStatusColors: Record<OrderStatus, string> = {
  pendiente:       "bg-amber-50 text-amber-700 border-amber-200",
  en_preparacion:  "bg-blue-50 text-blue-700 border-blue-200",
  en_transito:     "bg-purple-50 text-purple-700 border-purple-200",
  completado:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  incidencia:      "bg-red-50 text-red-700 border-red-200",
  cancelado:       "bg-zinc-100 text-zinc-500 border-zinc-200",
  reembolsado:     "bg-zinc-100 text-zinc-400 border-zinc-200",
};

// ─── Activity metadata ────────────────────────────────────────────────────────

export const activityTypeLabel: Record<ActivityType, string> = {
  llamada:     "Llamada",
  email:       "Email",
  reunion:     "Reunión",
  nota:        "Nota",
  seguimiento: "Seguimiento",
};

export const activityTypeColors: Record<ActivityType, string> = {
  llamada:     "bg-blue-50 text-blue-700",
  email:       "bg-zinc-100 text-zinc-600",
  reunion:     "bg-purple-50 text-purple-700",
  nota:        "bg-amber-50 text-amber-700",
  seguimiento: "bg-orange-50 text-orange-700",
};
