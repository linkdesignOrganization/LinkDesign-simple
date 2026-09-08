/**
 * Fichas de los sistemas de demostración (viewcases de software) para la landing
 * «Desarrollo de software a la medida en Costa Rica»: /desarrollo-de-software-costa-rica/:slug.
 *
 * Cada ficha explica el demo como si fuera un caso: la operación antes, qué cambia con el sistema,
 * qué se copió de la operación, qué hay en el demo, cuánto cuesta un sistema así y el acceso al demo
 * navegable. Los sistemas de clientes reales no se muestran por confidencialidad; para eso existen
 * estos demos, y son ejemplos, no el resultado que el cliente va a recibir.
 *
 * Contenido verificado entrando a cada demo el 2026-09-07 (menús, tableros, entidades y acciones).
 * Regla: nada que no se vea en el demo. Solo software: nada de e-commerce ni sitios web.
 * Rangos calculados sobre las 58 propuestas con monto del CRM (mar a sep 2026), con asterisco
 * porque son referencias y ningún proyecto es estandarizado.
 *
 * Idiomas: el ES es la fuente (SOFTWARE_CR_CASES). El EN es una capa (SOFTWARE_CR_CASES_EN) con solo
 * los campos de texto, que getSoftwareCrCases('en') superpone ficha por ficha; slug, system, poster,
 * video y link se toman siempre del ES. Los componentes hablan con los getters por idioma.
 */

import type { Lang } from '../services/language.service';
import type { SystemSlug } from './systems-content';

/** Los seis demos, en el orden del hub. */
export type SoftwareCrCaseSlug =
  | 'pulso'
  | 'cumbre'
  | 'estudio-dental-mendieta'
  | 'tornos-del-sur'
  | 'punto-cero'
  | 'vertice-seguridad-industrial';

export type SoftwareCrCase = {
  slug: SoftwareCrCaseSlug;
  /** Página de tipo de sistema (/software/:slug) donde este demo se muestra como ejemplo. */
  system?: SystemSlug;
  /** Nombre del demo (Pulso, Cumbre…). */
  name: string;
  /** Tipo de solución, corto (ERP, RRHH, …): la etiqueta destacada de la tarjeta del hub. */
  kind: string;
  /** Categoría del sistema: es lo que se lista en el hub. */
  category: string;
  /** Para quién es, en una línea. */
  forWhom: string;
  /** Resumen de una frase para la tarjeta del hub y el hero de la ficha. */
  summary: string;
  poster: string;
  video: string;
  link: string;
  before: string;
  after: string;
  copied: string[];
  /** Qué vas a encontrar al navegar el demo. */
  inside: string[];
  range: string;
  timeline: string;
};

export const SOFTWARE_CR_CASES: SoftwareCrCase[] = [
  {
    slug: 'pulso',
    system: 'dashboards-y-reporting',
    kind: 'Gestión y cobros',
    name: 'Pulso',
    category: 'Sistema de gestión para gimnasios y wellness',
    forWhom: 'Para gimnasios, estudios y cadenas wellness con socios, planes, clases y más de una sede.',
    summary:
      'Socios, planes, cobros, asistencia y clases de una cadena de gimnasios en un solo panel, con una capa de IA que avisa quién está por irse.',
    poster: '/media/software/pulso.jpg',
    video: '/media/software/pulso.mp4',
    link: 'https://jolly-stone-0869f530f.7.azurestaticapps.net',
    before:
      'Membresías que vencen sin aviso, clases con cupo en una pizarra, cobros que se persiguen por WhatsApp y cuatro sedes que nadie ve juntas.',
    after:
      'Cada socio tiene su plan, su pago y su riesgo de baja a la vista. La clase muestra el cupo real, los vencidos aparecen el mismo día y la cadena completa se lee en un solo tablero.',
    copied: [
      'Planes con sus beneficios y precios, del mensual al anual, corporativo, familiar y day pass.',
      'Cobros con vencidos, pendientes y rechazados por sede.',
      'Clases por entrenador, sede y horario, con cupo real.',
      'Asistencia con check-in en tiempo real.',
      'Comunicación segmentada por plan, antigüedad o pago vencido.'
    ],
    inside: [
      'El «Panel de operación» con socios activos, ingresos del mes, vencidos de hoy, retención, altas y ocupación.',
      '«Socios en zona roja», los que la IA detecta con riesgo de cancelar.',
      'La ficha de cada socio con sus datos, plan, pagos, asistencia, clases y análisis.',
      'El calendario de clases con cupo y la marca de «Completa».',
      '«Reportes con IA» como predicción de bajas y recomendaciones de precios.',
      'El selector de sede para ver toda la cadena o una sola.'
    ],
    range: 'USD 4.000 a 7.500*',
    timeline: '8 a 12 semanas*'
  },
  {
    slug: 'cumbre',
    system: 'automatizacion-ia',
    kind: 'RRHH',
    name: 'Cumbre',
    category: 'Sistema de gestión de recursos humanos',
    forWhom: 'Para empresas con más de 20 colaboradores y un área de personal que administra a mano.',
    summary:
      'Legajo completo, organigrama, vacaciones y licencias, selección por vacante y evaluaciones, con alertas de riesgo de renuncia.',
    poster: '/media/software/cumbre.jpg',
    video: '/media/software/cumbre.mp4',
    link: 'https://orange-forest-0713c560f.7.azurestaticapps.net',
    before:
      'Vacaciones, permisos e incapacidades en correos y hojas de cálculo, legajos repartidos en carpetas y una selección que se sigue de memoria.',
    after:
      'Cada colaborador pide y consulta sus ausencias desde su cuenta, la jefatura aprueba o rechaza en un clic, cada vacante avanza por etapas y el legajo entero vive en un solo lugar.',
    copied: [
      'Niveles de aprobación de ausencias, con saldo por persona.',
      'Legajo con contrato, sueldo, jornada y próxima revisión salarial.',
      'Pipeline de selección por vacante en cinco etapas.',
      'Evaluaciones por período, con puntaje y evaluador.'
    ],
    inside: [
      'El tablero con empleados activos, posiciones abiertas y ausencias del mes.',
      '«Alertas críticas» con riesgo de renuncia, evaluación próxima y aniversarios.',
      'El legajo de cada empleado con datos, contrato, desempeño, ausencias, capacitaciones y documentos.',
      'El organigrama por área.',
      'El calendario de vacaciones y licencias con las solicitudes pendientes.',
      '«Reportes con IA» como riesgo de renuncia y análisis salarial.'
    ],
    range: 'USD 3.000 a 6.000*',
    timeline: '6 a 10 semanas*'
  },
  {
    slug: 'estudio-dental-mendieta',
    system: 'reservas-y-agenda',
    kind: 'Agenda y expediente',
    name: 'Estudio Dental Mendieta',
    category: 'Software de gestión clínica',
    forWhom: 'Para clínicas y consultorios que agendan por profesional y cobran por tratamiento.',
    summary:
      'Agenda por profesional, ficha del paciente con odontograma, tratamientos por etapas y el circuito completo de presupuestos, pagos y obras sociales.',
    poster: '/media/software/dental.jpg',
    video: '/media/software/dental.mp4',
    link: 'https://happy-coast-044ea7e0f.7.azurestaticapps.net/agenda',
    before:
      'Agenda en papel o en una app genérica que no sabe de tratamientos por etapas, ni de obras sociales, ni de cuánto debe cada paciente.',
    after:
      'La agenda se ve por profesional en mes, semana o día. Cada paciente tiene su odontograma y su historial, cada tratamiento avanza por etapas y el dinero se sigue desde el presupuesto hasta el cobro.',
    copied: [
      'Tratamientos de varias citas, con avance por etapa.',
      'Presupuestos por tratamiento contra un catálogo con precio y duración.',
      'Historia clínica y odontograma pieza por pieza.',
      'Cobros por efectivo, tarjeta o Mercado Pago, y deuda por obra social.'
    ],
    inside: [
      'La agenda mensual, semanal y diaria por profesional.',
      'La ficha del paciente con odontograma, historial, tratamientos, documentos y pagos.',
      'Los 35 tratamientos en curso con su etapa y su próxima fecha.',
      'Presupuestos, facturas y convenios con obras sociales.',
      'Reportes de pacientes, tratamientos, financiero y productividad.'
    ],
    range: 'USD 4.000 a 7.500*',
    timeline: '8 a 12 semanas*'
  },
  {
    slug: 'tornos-del-sur',
    system: 'erp-operacion-inventario',
    kind: 'ERP',
    name: 'Tornos del Sur',
    category: 'ERP industrial',
    forWhom: 'Para talleres y plantas que producen por orden de trabajo.',
    summary:
      'La orden de trabajo de un taller metalúrgico de punta a punta, con materiales, horas máquina y costo real contra estimado, más planificación por máquina, inventario y mermas.',
    poster: '/media/software/tornos.jpg',
    video: '/media/software/tornos.mp4',
    link: 'https://app-tornosops.azurewebsites.net/dashboard',
    before:
      'Órdenes de trabajo en un cuaderno, materia prima que se acaba a mitad de una pieza, máquinas que se pisan en el calendario y costos que se conocen al final del mes.',
    after:
      'Cada orden lleva su consumo real de material y sus horas por máquina y operario. El inventario avisa antes de quedarse bajo mínimo, el calendario detecta superposiciones y el costo por pieza se ve mientras se produce.',
    copied: [
      'La orden de trabajo con sus estados, desde Cotizada hasta Cobrada.',
      'Materiales y tiempos por etapa, estimados contra reales.',
      'Calendario de máquinas con las superposiciones marcadas.',
      'Stock de materia prima con mínimo por ubicación.',
      'Mermas por causa, con costo y operario.'
    ],
    inside: [
      'El tablero con órdenes activas, por entregar, atrasadas y facturación del mes.',
      'El detalle de una orden con piezas, materiales, tiempos, costos y desvío.',
      'La planificación por máquina en día, semana y mes.',
      'El inventario de 23 materiales con estado bajo mínimo.',
      'Máquinas, operarios, clientes y proveedores.',
      'Reportes de producción, margen y eficiencia por máquina.'
    ],
    range: 'USD 4.500 a 8.000*',
    timeline: '10 a 14 semanas*'
  },
  {
    slug: 'punto-cero',
    kind: 'Mantenimiento',
    name: 'Punto Cero',
    category: 'Sistema de mantenimiento por suscripción',
    forWhom: 'Para empresas de servicios técnicos que venden mantenimiento por suscripción, con técnicos en ruta.',
    summary:
      'Un sistema con tres caras, gerencia, cliente y técnico, para vender y operar mantenimiento por suscripción.',
    poster: '/media/software/puntocero.jpg',
    video: '/media/software/puntocero.mp4',
    link: 'https://victorious-desert-032f8750f.1.azurestaticapps.net/acceso',
    before:
      'Contratos de mantenimiento con visitas que se olvidan, técnicos sin ruta, clientes que no saben cuándo los visitan y reportes que nadie aprueba.',
    after:
      'Las visitas se programan solas según el plan, gerencia asigna al técnico y aprueba sus reportes, el cliente sigue sus equipos y sus visitas desde su cuenta, y el técnico cierra cada visita desde el celular con checklist, mediciones, evidencia y firma.',
    copied: [
      'Planes por suscripción, con visitas y equipos incluidos.',
      'Catálogo de servicios con SLA, duración y precio.',
      'Asignación de operador según score y disponibilidad.',
      'Cierre de visita con checklist, mediciones, evidencia y firma.',
      'Clientes en riesgo según su estado de pago.'
    ],
    inside: [
      'Tres perfiles para entrar, gerente, cliente y operador.',
      'El resumen de gerencia con visitas sin asignar, operadores disponibles, ingresos del mes y reportes por aprobar.',
      'La agenda con visitas programadas y asignación de operador.',
      'La vista del cliente con sus sedes, equipos críticos y próximas visitas.',
      'La app del operador con la ruta del día, mensajes con gerencia e historial.',
      'Ganancias por plan y por mes.'
    ],
    range: 'USD 4.000 a 7.500*',
    timeline: '8 a 12 semanas*'
  },
  {
    slug: 'vertice-seguridad-industrial',
    system: 'crm-a-medida',
    kind: 'ERP',
    name: 'Vértice Seguridad Industrial',
    category: 'ERP comercial y de inventario',
    forWhom: 'Para distribuidoras con precios por cliente, varias bodegas y despacho propio.',
    summary:
      'Del cliente a la nota de crédito. Cotización con margen, pedido, despacho y devolución, con stock reservado y disponible en seis ubicaciones.',
    poster: '/media/software/vertice.jpg',
    video: '/media/software/vertice.mp4',
    link: 'https://icy-meadow-07f007e0f.6.azurestaticapps.net/dashboard/home',
    before:
      'Precios por cliente en la cabeza del vendedor, cotizaciones que tardan días, stock que nadie confía y despachos que se pierden entre bodegas.',
    after:
      'La cotización sale con la lista de precios de ese cliente y su margen, el pedido reserva stock en la ubicación correcta, el despacho y la devolución quedan registrados, y cada movimiento deja rastro en la auditoría.',
    copied: [
      'Listas de precio por tipo de cliente y término de pago.',
      'Margen visible en cada cotización.',
      'Stock reservado y disponible por ubicación, con mínimo.',
      'Transferencias entre bodegas y tiendas.',
      'Devoluciones con nota de crédito.'
    ],
    inside: [
      'El tablero ejecutivo con OTIF, atrasados, quiebres, rotación, ventas y conversión.',
      'El CRM con lista de precios, término de pago y vendedor por cliente.',
      'Cotizaciones y pedidos con sus estados.',
      'El inventario en seis ubicaciones, con transferencias y reposición por familia.',
      'Despachos y devoluciones.',
      'La auditoría global por usuario y cargo.'
    ],
    range: 'USD 4.500 a 8.000*',
    timeline: '10 a 14 semanas*'
  }
];

export const SOFTWARE_CR_CASE_SLUGS = SOFTWARE_CR_CASES.map((c) => c.slug);

/** Campos traducibles; slug, system, poster, video y link se toman siempre del ES. */
export type SoftwareCrCaseText = Omit<
  SoftwareCrCase,
  'slug' | 'system' | 'poster' | 'video' | 'link'
>;

/**
 * Versión en inglés de cada ficha. Mismos hechos y cifras que el ES, mismos largos de lista. Los
 * rótulos citados con «…» son textos literales de los demos (en español) y se conservan tal cual,
 * con la descripción en inglés delante, para que el lector los encuentre al entrar al demo. La
 * `category` es exactamente la del bloque `viewcases` EN de app.routes.ts, así tarjeta y ficha dicen
 * lo mismo. `range` y `timeline` van en formato inglés con los mismos dígitos.
 */
export const SOFTWARE_CR_CASES_EN: Record<SoftwareCrCaseSlug, SoftwareCrCaseText> = {
  pulso: {
    name: 'Pulso',
    kind: 'Management & billing',
    category: 'Gym & wellness management system',
    forWhom:
      'For gyms, studios and wellness chains with members, plans, classes and more than one location.',
    summary:
      'Members, plans, billing, attendance and classes for a gym chain in a single dashboard, with an AI layer that flags who is about to leave.',
    before:
      'Memberships that expire without notice, class capacity on a whiteboard, payments chased over WhatsApp and four locations that no one sees as a whole.',
    after:
      'Every member has their plan, their payment and their churn risk in plain view. Each class shows its real capacity, overdue payments show up the same day and you see the entire chain on a single dashboard.',
    copied: [
      'Plans with their benefits and prices, from monthly to annual, corporate, family and day pass.',
      'Billing with overdue, pending and declined payments by location.',
      'Classes by trainer, location and time slot, with real capacity.',
      'Attendance with real-time check-in.',
      'Segmented messaging by plan, length of membership or overdue payment.'
    ],
    inside: [
      "The operations dashboard («Panel de operación») with active members, revenue for the month, today's overdue payments, retention, sign-ups and occupancy.",
      'Members at churn risk («Socios en zona roja»), the ones the AI flags as likely to cancel.',
      "Each member's profile with their details, plan, payments, attendance, classes and analysis.",
      'The class calendar with capacity and the full-class mark («Completa»).',
      'AI reports («Reportes con IA») such as churn prediction and pricing recommendations.',
      'The location selector to see the whole chain or a single location.'
    ],
    range: 'USD 4,000 to 7,500*',
    timeline: '8 to 12 weeks*'
  },
  cumbre: {
    name: 'Cumbre',
    kind: 'HR',
    category: 'HR management system',
    forWhom: 'For companies with more than 20 employees and an HR area run by hand.',
    summary:
      'Complete employee files, org chart, vacation and leave, recruiting by vacancy and performance reviews, with resignation risk alerts.',
    before:
      'Vacation, time off and sick leave in emails and spreadsheets, employee files spread across folders and a recruiting process tracked from memory.',
    after:
      'Each employee requests and checks their absences from their own account, management approves or rejects in one click, every vacancy moves through its stages and the entire employee file lives in one place.',
    copied: [
      "Absence approval levels, with each person's leave balance.",
      'Employee file with contract, salary, working hours and next salary review.',
      'A five-stage recruiting pipeline per vacancy.',
      'Performance reviews by period, with score and reviewer.'
    ],
    inside: [
      'The dashboard with active employees, open positions and absences for the month.',
      'Critical alerts («Alertas críticas») for resignation risk, upcoming reviews and work anniversaries.',
      "Each employee's file with personal details, contract, performance, absences, training and documents.",
      'The org chart by department.',
      'The vacation and leave calendar with pending requests.',
      'AI reports («Reportes con IA») such as resignation risk and salary analysis.'
    ],
    range: 'USD 3,000 to 6,000*',
    timeline: '6 to 10 weeks*'
  },
  'estudio-dental-mendieta': {
    name: 'Estudio Dental Mendieta',
    kind: 'Scheduling & records',
    category: 'Clinic management software',
    forWhom: 'For clinics and practices that schedule by practitioner and bill by treatment.',
    summary:
      'Scheduling by practitioner, patient records with a dental chart, treatments in stages and the full cycle of treatment estimates, payments and insurance plans.',
    before:
      'A schedule on paper, or in a generic app that knows nothing about treatments in stages, insurance plans or how much each patient owes.',
    after:
      'You see the schedule by practitioner, by month, week or day. Each patient has a dental chart and a history, each treatment moves through its stages and the money is tracked from the estimate to the payment.',
    copied: [
      'Multi-appointment treatments, with progress by stage.',
      'Treatment estimates built from a catalog with price and duration.',
      'Clinical record and tooth-by-tooth dental chart.',
      'Payments by cash, card or Mercado Pago, and outstanding balances by insurance plan.'
    ],
    inside: [
      'The monthly, weekly and daily schedule by practitioner.',
      'The patient record with dental chart, history, treatments, documents and payments.',
      'The 35 treatments in progress, each with its stage and its next appointment.',
      'Treatment estimates, invoices and insurance plan agreements.',
      'Patient, treatment, financial and productivity reports.'
    ],
    range: 'USD 4,000 to 7,500*',
    timeline: '8 to 12 weeks*'
  },
  'tornos-del-sur': {
    name: 'Tornos del Sur',
    kind: 'ERP',
    category: 'Industrial ERP',
    forWhom: 'For workshops and plants that produce by work order.',
    summary:
      "A metalworking shop's work order from end to end, with materials, machine hours and actual cost versus estimate, plus planning by machine, inventory and scrap.",
    before:
      'Work orders in a notebook, raw material that runs out halfway through a part, machines double-booked on the calendar and costs that only become known at the end of the month.',
    after:
      'Every order carries its actual material consumption and its hours by machine and operator. Inventory warns before it drops below minimum, the calendar catches overlaps and the cost per part is visible while the part is being made.',
    copied: [
      'The work order with its statuses, from Quoted to Paid.',
      'Materials and times by stage, estimated versus actual.',
      'Machine calendar with overlaps flagged.',
      'Raw material stock with a minimum per location.',
      'Scrap by cause, with cost and operator.'
    ],
    inside: [
      'The dashboard with active orders, orders due for delivery, late orders and billing for the month.',
      "An order's detail view with parts, materials, times, costs and variance.",
      'Planning by machine in day, week and month views.',
      'The inventory of 23 materials with below-minimum status.',
      'Machines, operators, customers and suppliers.',
      'Reports on production, margin and efficiency by machine.'
    ],
    range: 'USD 4,500 to 8,000*',
    timeline: '10 to 14 weeks*'
  },
  'punto-cero': {
    name: 'Punto Cero',
    kind: 'Maintenance',
    category: 'Subscription-based maintenance system',
    forWhom:
      'For technical service companies that sell maintenance by subscription, with technicians on route.',
    summary:
      'One system with three sides: management, client and technician, for selling and running maintenance by subscription.',
    before:
      'Maintenance contracts with visits that get forgotten, technicians without a route, clients who do not know when the next visit is and reports that no one approves.',
    after:
      'Visits are scheduled automatically according to the plan, management assigns the technician and approves their reports, the client tracks their equipment and their visits from their own account, and the technician closes each visit from their phone with a checklist, measurements, evidence and a signature.',
    copied: [
      'Subscription plans, with visits and equipment included.',
      'Service catalog with SLA, duration and price.',
      'Operator assignment based on score and availability.',
      'Visit close-out with checklist, measurements, evidence and signature.',
      'At-risk clients based on payment status.'
    ],
    inside: [
      'Three profiles to log in with: manager, client and operator.',
      'The management summary with unassigned visits, available operators, revenue for the month and reports awaiting approval.',
      'The schedule with planned visits and operator assignment.',
      'The client view with their locations, critical equipment and upcoming visits.',
      "The operator app with the day's route, messages with management and history.",
      'Earnings by plan and by month.'
    ],
    range: 'USD 4,000 to 7,500*',
    timeline: '8 to 12 weeks*'
  },
  'vertice-seguridad-industrial': {
    name: 'Vértice Seguridad Industrial',
    kind: 'ERP',
    category: 'Commercial & inventory ERP',
    forWhom: 'For distributors with per-customer pricing, several warehouses and in-house dispatch.',
    summary:
      'From the customer to the credit note. Quote with margin, order, dispatch and return, with reserved and available stock across six locations.',
    before:
      "Customer prices kept in the sales rep's head, quotes that take days, stock that no one trusts and dispatches that get lost between warehouses.",
    after:
      "The quote goes out with that customer's price list and its margin, the order reserves stock in the right location, dispatch and return are recorded, and every movement leaves a trace in the audit trail.",
    copied: [
      'Price lists by customer type and payment terms.',
      'Margin visible on every quote.',
      'Reserved and available stock by location, with minimums.',
      'Transfers between warehouses and stores.',
      'Returns with credit notes.'
    ],
    inside: [
      'The executive dashboard with OTIF, late orders, stockouts, turnover, sales and conversion.',
      'The CRM with price list, payment terms and sales rep per customer.',
      'Quotes and orders with their statuses.',
      'Inventory across six locations, with transfers and replenishment by product family.',
      'Dispatches and returns.',
      'The global audit trail by user and role.'
    ],
    range: 'USD 4,500 to 8,000*',
    timeline: '10 to 14 weeks*'
  }
};

/** Rótulos de la ficha. */
export const SOFTWARE_CR_CASE_LABELS = {
  eyebrowPrefix: 'Sistema de demostración',
  before: 'La operación antes',
  after: 'Con el sistema',
  copied: 'Lo que copiamos de la operación',
  inside: 'Qué vas a encontrar en el demo',
  cost: 'Cuánto cuesta un sistema así en Costa Rica',
  rangeLabel: 'Inversión',
  timelineLabel: 'Plazo',
  costNote:
    'El precio queda cerrado por alcance antes de empezar. Anticipo y saldo contra entrega, pagos por hito o cuota mensual con soporte incluido.',
  costDisclaimer:
    '* Rango y plazo de referencia. Cada proyecto se cotiza según su alcance. Nunca tenemos un precio listo, porque nunca son soluciones estandarizadas.',
  costLink: 'Ver todos los rangos por tipo de sistema',
  /** Enlace a la página del tipo de sistema (/software/:slug); `{system}` es el nombre del sistema. */
  systemExample: 'Este demo es un ejemplo de {system}',
  confidentialityTitle: 'Por qué un demo y no un cliente',
  confidentiality:
    'Los sistemas que construimos para nuestros clientes no se muestran, porque son su operación y su información. Por eso construimos estos sistemas de demostración. Puedes navegar uno completo, con datos de prueba, y ver cómo se siente un software hecho alrededor de una operación. Es un ejemplo, no el resultado. Lo que construyamos para ti va a ser distinto, porque parte de tu operación.',
  tryCta: 'Navegar el demo',
  /** Nombre accesible del marco del video, que abre el demo; `{name}` es el nombre del demo. */
  videoLabel: 'Navegar el demo de {name}',
  meetCta: 'Agendar reunión de 30 minutos',
  others: 'Otros sistemas que puedes probar',
  backToHub: 'Volver a desarrollo de software a la medida'
} as const;

export type SoftwareCrCaseLabels = Record<keyof typeof SOFTWARE_CR_CASE_LABELS, string>;

/**
 * Rótulos de la ficha en inglés. costNote y costDisclaimer repiten SECTION_LABELS.en de la página de
 * sistema (mismo texto en ES). La última frase de confidentiality es la única afirmación que el EN
 * agrega sobre el ES: los demos están en español (decisión 2.3 del plan).
 */
export const SOFTWARE_CR_CASE_LABELS_EN: SoftwareCrCaseLabels = {
  eyebrowPrefix: 'Demo system',
  before: 'Before the system',
  after: 'With the system',
  copied: 'What we copied from the operation',
  inside: 'What you will find in the demo',
  cost: 'What a system like this costs in Costa Rica',
  rangeLabel: 'Investment',
  timelineLabel: 'Timeline',
  costNote:
    'The price is fixed by scope before we start. Deposit and balance on delivery, milestone payments or a monthly fee with support included.',
  costDisclaimer:
    '* Reference range and timeline. Every project is quoted by its scope. We never have a ready-made price, because these are never standardized solutions.',
  costLink: 'See all ranges by system type',
  systemExample: 'This demo is an example of {system}',
  confidentialityTitle: 'Why a demo and not a client',
  confidentiality:
    "We do not show the systems we build for our clients, because each one is that company's operation and information. That is why we built these demo systems. You can browse one end to end and see what software built around an operation feels like. It is an example, not the result. What we build for you will be different, because it starts from your operation. The demos are in Spanish, with sample data.",
  tryCta: 'Browse the demo',
  videoLabel: 'Browse the {name} demo',
  meetCta: 'Book a 30-minute meeting',
  others: 'Other systems you can try',
  backToHub: 'Back to custom software development'
};

/** Las fichas en inglés, ya superpuestas al ES (slug, system, poster, video y link vienen del ES). */
const CASES_EN: SoftwareCrCase[] = SOFTWARE_CR_CASES.map((c) => ({
  ...c,
  ...SOFTWARE_CR_CASES_EN[c.slug]
}));

/** Las seis fichas en el idioma pedido, en el orden del hub (el del ES). */
export function getSoftwareCrCases(lang: Lang): SoftwareCrCase[] {
  return lang === 'en' ? CASES_EN : SOFTWARE_CR_CASES;
}

export function getSoftwareCrCase(slug: string | null, lang: Lang): SoftwareCrCase | null {
  if (!slug) return null;
  return getSoftwareCrCases(lang).find((c) => c.slug === slug) ?? null;
}

/** Demo que ejemplifica una página de tipo de sistema; null si ese sistema no tiene demo. */
export function getSoftwareCrCaseForSystem(
  system: string | null,
  lang: Lang
): SoftwareCrCase | null {
  return getSoftwareCrCases(lang).find((c) => c.system === system) ?? null;
}

export function getSoftwareCrCaseLabels(lang: Lang): SoftwareCrCaseLabels {
  return lang === 'en' ? SOFTWARE_CR_CASE_LABELS_EN : SOFTWARE_CR_CASE_LABELS;
}
