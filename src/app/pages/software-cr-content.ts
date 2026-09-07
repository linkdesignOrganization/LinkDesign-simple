import type { FaqItem } from '../components/faq-accordion.component';
import type { ProjectStage } from '../components/project-stages.component';

/**
 * Contenido de la landing «Desarrollo de software a la medida en Costa Rica»
 * (/desarrollo-de-software-costa-rica). Solo ES por ahora.
 *
 * Fuente: investigacion-contenido-seo/copy-hub-software-cr-v1.md (2026-09-04), revisado por
 * Robert. Valores provisionales que faltan confirmar (marcados PROVISIONAL en cada campo):
 * año de inicio, cantidad de proyectos, plazo de la propuesta, garantía, costo mensual de
 * infraestructura, integraciones ya hechas y descripciones de los casos reales (permiso).
 *
 * Los rangos de inversión salen de las 58 propuestas con monto del CRM (mar a sep 2026).
 */

export type SoftwareCrSystem = {
  slug: string;
  title: string;
  body: string;
  forWhom: string;
};

export type SoftwareCrDemo = {
  name: string;
  category: string;
  poster: string;
  link: string;
  before: string;
  after: string;
  copied: string;
  range: string;
};

export type SoftwareCrRealCase = {
  name: string;
  what: string;
  description: string;
  range: string;
};

export type SoftwareCrPriceRow = {
  type: string;
  range: string;
  timeline: string;
};

export type SoftwareCrIncluded = {
  title: string;
  body: string;
};

export const SOFTWARE_CR = {
  hero: {
    eyebrow: 'Software a la medida',
    title: 'Desarrollo de software a la medida en Costa Rica',
    lead: 'Somos Link Design, un estudio de San José que construye software a la medida para empresas que ya no pueden sostener su operación con hojas de cálculo, WhatsApp y parches. No adaptamos tu empresa a un sistema: copiamos cómo trabaja tu operación y la convertimos en software. Desde 2020 hemos puesto en producción 26 proyectos para empresas de Costa Rica, en producción, logística, salud, servicios profesionales y comercio.',
    // PROVISIONAL: 2020 (primera captura de linkdesign.cr), 26 (portafolio), 8 a 13 semanas (proceso).
    stats: [
      { value: '26', label: 'proyectos en producción' },
      { value: '06', label: 'sistemas que puedes probar hoy' },
      { value: '8 a 13', label: 'semanas de la primera reunión al sistema funcionando' }
    ],
    ctaPrimary: 'Agendar reunión de 30 minutos',
    ctaSecondary: 'Escribir por WhatsApp',
    // PROVISIONAL: plazo de la propuesta.
    promise:
      'Después de la primera reunión te enviamos una propuesta escrita en 5 días hábiles. Sin costo y sin compromiso.',
    updated: 'Actualizado: septiembre 2026'
  },

  forWhom: {
    intro:
      'Trabajamos con empresas que tienen una operación real y un problema concreto. Si te reconoces en alguna de estas situaciones, hablemos.',
    fits: [
      'Tu operación vive en hojas de cálculo que solo una persona entiende. Cuando esa persona no está, todo se frena.',
      'Los pedidos, las citas o las cotizaciones entran por WhatsApp y alguien los pasa a mano a otro lado, todos los días.',
      'Compraste un sistema enlatado y tu equipo trabaja con planillas paralelas, porque el sistema no calza con cómo venden o despachan.',
      'Tienes dos o más sucursales, bodegas o equipos, y nadie ve el inventario o el estado real de las cosas al mismo tiempo.',
      'Tu contabilidad o tu ERP funcionan bien para facturar, pero no cubren la parte operativa: producción, mantenimiento, rutas, comisiones, cobros.',
      'Necesitas que tu cliente haga algo por sí mismo: reservar, pagar, comprar una entrada, consultar el estado de su pedido.'
    ],
    notFor:
      'Si lo que buscas es una app genérica para vender en tiendas de aplicaciones, o un producto para el mercado masivo, no somos la mejor opción. Te lo vamos a decir en la primera llamada.'
  },

  how: {
    statement: [
      'La mayoría del software le pide a la empresa que cambie: que cargue los datos como el sistema quiere, que siga los pasos que el sistema define, que renuncie a las excepciones que la hacen funcionar.',
      'Nosotros hacemos lo contrario. Primero entendemos cómo trabaja tu operación de verdad: quién hace qué, en qué orden, con qué reglas y con qué excepciones. Después escribimos el código alrededor de eso.'
    ],
    examplesTitle: 'Tres ejemplos de lo que significa en la práctica',
    examples: [
      {
        if: 'Si tu bodega despacha por lotes y tus vendedores ganan comisión cuando el cliente paga, no cuando firma,',
        then: 'el sistema despacha por lotes y calcula la comisión cuando entra el pago. No al revés.'
      },
      {
        if: 'Si tus clientes mayoristas tienen listas de precio distintas y condiciones de pago negociadas una por una,',
        then: 'esas condiciones viven dentro del sistema, no en la memoria de tu gerente comercial.'
      },
      {
        if: 'Si tu clínica agenda por profesional, por sala y por equipo,',
        then: 'la disponibilidad se calcula con las tres cosas, porque así funciona tu clínica.'
      }
    ],
    closing: [
      'Esto tiene un costo: hay que dedicar tiempo a entender la operación antes de construir. Por eso el discovery es la primera etapa y la más importante del proyecto.',
      'Y tiene un beneficio que se nota el primer día: tu equipo adopta el sistema sin resistencia, porque el sistema habla su idioma.'
    ]
  },

  systems: {
    intro:
      'Cada tipo de sistema representa una capacidad que ya tenemos en producción en empresas de Costa Rica. No vendemos un producto empaquetado: construimos el tuyo.',
    items: [
      {
        slug: 'crm-a-medida',
        title: 'CRM a la medida',
        body: 'WhatsApp, llamadas y correo en un mismo flujo de venta, con la cotización armada según tus reglas.',
        forWhom: 'Para equipos comerciales que pierden el seguimiento entre herramientas.'
      },
      {
        slug: 'erp-operacion-inventario',
        title: 'ERP de operación e inventario',
        body: 'Stock por bodega o sucursal, despacho y trazabilidad de cada movimiento.',
        forWhom: 'Para distribuidoras, fábricas y comercios con más de un punto.'
      },
      {
        slug: 'ecommerce-logica-propia',
        title: 'E-commerce con lógica propia',
        body: 'Tipos de cliente, listas de precio, condiciones de pago y descuentos dentro de la tienda.',
        forWhom: 'Para empresas que venden a mayoristas y minoristas con reglas distintas.'
      },
      {
        slug: 'ticketing-marca-propia',
        title: 'Ticketing con marca propia',
        body: 'Venta de entradas desde tu sitio, tickets con QR y control de acceso en el evento.',
        forWhom: 'Para artistas, productoras y espacios.'
      },
      {
        slug: 'reservas-y-agenda',
        title: 'Plataformas de reservas y agenda',
        body: 'Disponibilidad real, recordatorios automáticos y pago en línea.',
        forWhom: 'Para clínicas, talleres, gimnasios y cualquier servicio que trabaje con cita.'
      },
      {
        slug: 'automatizacion-ia',
        title: 'Automatización con IA aplicada',
        body: 'Flujos que leen documentos, clasifican datos y completan tareas que hoy se hacen a mano.',
        forWhom: 'Para operaciones con mucho papel o mucho WhatsApp.'
      }
    ] as SoftwareCrSystem[],
    integrationsTitle: 'Se conecta con lo que ya usas en Costa Rica',
    integrationsIntro:
      'Un sistema a la medida no reemplaza todo lo que tienes: se conecta. Estas son las integraciones que más nos piden y que ya hemos resuelto en proyectos reales.',
    // PROVISIONAL: confirmar cuáles están hechas antes de publicar.
    integrations: [
      'Facturación electrónica de Hacienda: el sistema emite o recibe comprobantes sin salir de la operación.',
      'SINPE Móvil y pasarelas de pago locales para cobrar en línea.',
      'WhatsApp Business: pedidos, confirmaciones y atención con bot e inteligencia artificial, integrados al sistema.',
      'Tu contabilidad o tu ERP actual, para que la operación y la facturación no vivan en mundos separados.',
      'Correo, calendario y usuarios de Microsoft 365 o Google Workspace, para que tu equipo entre con la cuenta que ya tiene.',
      'Cuentas de clientes con inicio de sesión propio, para tiendas y portales donde el cliente se atiende solo.'
    ]
  },

  cases: {
    intro:
      'Cada demo es un sistema funcional que construimos nosotros para que recorras la operación completa de una industria distinta. Entra, haz clic, crea un registro, cambia un dato. Debajo de cada uno te decimos qué copiamos de la operación, cuánto cuesta y cuánto tarda un sistema así.',
    demos: [
      {
        name: 'Pulso',
        category: 'Gestión para gimnasios y wellness',
        poster: '/media/software/pulso.jpg',
        link: 'https://jolly-stone-0869f530f.7.azurestaticapps.net',
        before:
          'Membresías que vencen sin que nadie avise, clases con cupo en una pizarra y cobros que se persiguen por WhatsApp.',
        after:
          'El socio entra con su plan vigente, la clase muestra el cupo real y el cobro recurrente se dispara solo.',
        copied: 'Planes con congelamiento, clases por instructor y por sede, control de acceso en la puerta.',
        range: 'USD 4.000 a 7.500 · 8 a 12 semanas'
      },
      {
        name: 'Cumbre',
        category: 'Gestión de recursos humanos',
        poster: '/media/software/cumbre.jpg',
        link: 'https://orange-forest-0713c560f.7.azurestaticapps.net',
        before:
          'Vacaciones, permisos e incapacidades en correos y hojas de cálculo; la planilla se arma a mano cada quincena.',
        after:
          'Cada colaborador pide y consulta desde su cuenta, la jefatura aprueba en un clic y el cierre de planilla sale con los datos ya validados.',
        copied: 'Niveles de aprobación, feriados de Costa Rica, tipos de contrato.',
        range: 'USD 3.000 a 6.000 · 6 a 10 semanas'
      },
      {
        name: 'Estudio Dental Mendieta',
        category: 'Gestión clínica',
        poster: '/media/software/dental.jpg',
        link: 'https://happy-coast-044ea7e0f.7.azurestaticapps.net/agenda',
        before:
          'Agenda en papel o en una app genérica que no sabe de sillones ni de tratamientos por etapas.',
        after:
          'Agenda por profesional y por sillón, expediente con odontograma y plan de tratamiento, recordatorios automáticos y cobro por sesión.',
        copied: 'Tratamientos de varias citas, presupuestos por pieza, historia clínica.',
        range: 'USD 4.000 a 7.500 · 8 a 12 semanas'
      },
      {
        name: 'Tornos del Sur',
        category: 'ERP industrial',
        poster: '/media/software/tornos.jpg',
        link: 'https://app-tornosops.azurewebsites.net/dashboard',
        before:
          'Órdenes de trabajo en un cuaderno, materia prima que se acaba a mitad de una pieza y costos que se conocen al final del mes.',
        after:
          'Cada orden lleva su consumo real de material y de horas máquina, el inventario avisa antes de quedarse sin stock y el costo por pieza se ve mientras se produce.',
        copied: 'Rutas de producción, mermas, órdenes por cliente.',
        range: 'USD 5.500 a 9.000 · 10 a 14 semanas'
      },
      {
        name: 'Punto Cero',
        category: 'Mantenimiento por suscripción',
        poster: '/media/software/puntocero.jpg',
        link: 'https://victorious-desert-032f8750f.1.azurestaticapps.net/',
        before:
          'Contratos de mantenimiento con visitas que se olvidan, técnicos sin ruta y facturas que no calzan con lo que se hizo.',
        after:
          'Cada contrato genera sus visitas, el técnico ve su ruta del día y reporta desde el celular con fotos, y la factura se arma con lo ejecutado.',
        copied: 'Planes por equipo, lista de chequeo por tipo de visita, evidencia en sitio.',
        range: 'USD 4.000 a 7.500 · 8 a 12 semanas'
      },
      {
        name: 'Vértice Seguridad Industrial',
        category: 'ERP comercial y de inventario',
        poster: '/media/software/vertice.jpg',
        link: 'https://icy-meadow-07f007e0f.6.azurestaticapps.net/dashboard/home',
        before:
          'Catálogo grande, precios por cliente, cotizaciones que tardan días y un inventario en el que nadie confía.',
        after:
          'Cotización en minutos con los precios de ese cliente, reserva de stock al confirmar, despacho y trazabilidad por lote.',
        copied: 'Listas de precio, márgenes mínimos, productos con certificaciones y vencimientos.',
        range: 'USD 5.500 a 9.000 · 10 a 14 semanas'
      }
    ] as SoftwareCrDemo[],
    realTitle: 'Con clientes reales',
    // PROVISIONAL: publicar solo con permiso de cada cliente; descripciones por verificar.
    real: [
      {
        name: 'Arroz Imperio',
        what: 'tienda en línea con gestión interna',
        description:
          'Tienda para consumidor final con cuentas de cliente, panel interno para el equipo de ventas y despacho, y más de 170 compradores registrados.',
        range: 'USD 4.000 a 9.000'
      },
      {
        name: 'Asembis',
        what: 'citas y tienda para una clínica y óptica',
        description:
          'Reserva de citas en línea integrada con la operación de la clínica y venta de productos desde el mismo sistema.',
        range: 'USD 4.000 a 7.500'
      },
      {
        name: 'Uga Comediante',
        what: 'venta de entradas con marca propia',
        description:
          'El público compra desde el sitio oficial del artista, recibe su entrada con QR y entra al show sin ticketera externa.',
        range: 'USD 5.000 a 8.000'
      },
      {
        name: 'Zacate Tierra Fértil',
        what: 'pedidos y atención por WhatsApp con IA',
        description:
          'Los clientes escriben por WhatsApp, un asistente con inteligencia artificial entiende el pedido, incluso por audio, y lo deja registrado para el equipo.',
        range: 'USD 3.000 a 8.000'
      },
      {
        name: 'Facio & Cañas',
        what: 'asistente con IA para un bufete',
        description:
          'Un asistente que responde a los visitantes con los documentos y las áreas de práctica del bufete, con panel de administración para el equipo.',
        range: 'USD 3.000 a 8.000'
      }
    ] as SoftwareCrRealCase[]
  },

  pricing: {
    lead: 'Un sistema a la medida con nosotros cuesta entre USD 2.000 y 15.000, según el alcance. La mayoría de los proyectos que cotizamos en los últimos doce meses está entre USD 3.000 y 9.000. Estos son los rangos por tipo de sistema, calculados sobre nuestras propuestas de 2026.',
    columns: ['Tipo de sistema', 'Inversión (USD)', 'Plazo típico'],
    rows: [
      { type: 'Herramienta interna para un solo flujo (liquidaciones, comisiones, control de visitas)', range: '2.000 a 4.000', timeline: '4 a 6 semanas' },
      { type: 'CRM a la medida', range: '3.000 a 6.000', timeline: '6 a 10 semanas' },
      { type: 'E-commerce con lógica propia', range: '2.500 a 6.000', timeline: '6 a 10 semanas' },
      { type: 'Reservas, agenda o gestión clínica', range: '4.000 a 7.500', timeline: '8 a 12 semanas' },
      { type: 'Ticketing con marca propia', range: '5.000 a 8.000', timeline: '8 a 12 semanas' },
      { type: 'ERP de operación e inventario', range: '5.500 a 9.000', timeline: '10 a 14 semanas' },
      { type: 'Automatización con IA aplicada', range: '3.000 a 8.000', timeline: '4 a 10 semanas' },
      { type: 'Plataforma completa o multisede', range: '9.000 a 15.000 o más', timeline: '3 a 5 meses' }
    ] as SoftwareCrPriceRow[],
    factorsTitle: 'Qué mueve el precio dentro de cada rango',
    factors: [
      'Cuántos flujos y cuántos roles distintos usan el sistema. Un módulo con dos roles no cuesta lo mismo que cinco módulos con jefatura, bodega, ventas y cliente.',
      'Integraciones: cada sistema externo con el que hay que hablar (facturación, pagos, WhatsApp, tu ERP) suma trabajo y pruebas.',
      'Migración de datos: pasar años de hojas de cálculo o de un sistema viejo, limpiarlos y validarlos.',
      'Uso en campo: si técnicos o vendedores lo usan desde el celular, sin señal, con fotos.',
      'Inteligencia artificial: lectura de documentos, audio o clasificación automática.'
    ],
    paymentTitle: 'Cómo se paga',
    payment:
      'El precio queda cerrado por alcance antes de empezar. Si el alcance cambia en el camino, lo cotizamos aparte y lo decides tú. Los esquemas que más usamos: anticipo y saldo contra entrega (30/70), pagos por hito según etapas, o una cuota mensual con soporte incluido cuando prefieres no hacer una inversión inicial grande. El proyecto arranca con el anticipo del discovery.',
    afterTitle: 'Lo que se paga después',
    // PROVISIONAL: rango de infraestructura.
    after:
      'La infraestructura queda a tu nombre y se paga directo al proveedor: entre USD 20 y 80 al mes para la mayoría de los sistemas, algo más si usan inteligencia artificial de forma intensiva. El soporte con tiempos de respuesta acordados es opcional y se cotiza al cierre.'
  },

  process: {
    title: 'Plazos y proceso',
    intro:
      'De la primera conversación al software funcionando en tu operación. Cuatro etapas con tiempos reales y un entregable concreto en cada una.',
    stages: [
      {
        order: '01',
        name: 'Primer contacto',
        duration: 'Hoy mismo',
        description:
          'Entendemos qué necesitas resolver y validamos si tiene sentido hacerlo a la medida. Entregable: un primer alcance estimado y una fecha para sentarnos.'
      },
      {
        order: '02',
        name: 'Discovery',
        duration: '2 a 4 semanas',
        description:
          'Mapeamos el flujo real de tu operación con las personas que lo ejecutan. Definimos reglas, roles, excepciones, integraciones y arquitectura. Entregable: el mapa de tu operación, el alcance final y la propuesta cerrada en precio y plazo.'
      },
      {
        order: '03',
        name: 'Desarrollo',
        duration: '5 a 8 semanas',
        description:
          'Construimos el sistema por módulos. Cada dos semanas tu equipo prueba lo que ya funciona en un ambiente de prueba y nos corrige con datos reales. Entregable: módulos funcionando y validados por quienes los van a usar.'
      },
      {
        order: '04',
        name: 'Lanzamiento',
        duration: '1 semana',
        description:
          'Pasamos el sistema a producción, capacitamos al equipo por rol y acompañamos las primeras semanas de uso. Entregable: el software funcionando en tu operación, con el equipo trabajando en él.'
      }
    ] as ProjectStage[],
    closing:
      'En total, entre 8 y 13 semanas desde la primera reunión. Los proyectos multisede o con muchas integraciones toman de 3 a 5 meses, y lo sabes desde el discovery, no a mitad de camino.'
  },

  included: {
    items: [
      {
        title: 'El código es tuyo.',
        body: 'Queda en un repositorio a nombre de tu empresa, con documentación. Si mañana quieres seguir con otro equipo, puedes.'
      },
      {
        title: 'La infraestructura es tuya.',
        body: 'Las cuentas de nube quedan a tu nombre y la factura mensual te llega a ti. Nosotros la administramos mientras quieras.'
      },
      {
        title: 'Capacitación por rol.',
        body: 'Sesiones con cada equipo y manuales cortos de lo que cada uno usa, no un manual de 200 páginas.'
      },
      {
        // PROVISIONAL: plazo de garantía.
        title: 'Garantía de funcionamiento.',
        body: 'Durante 60 días después del lanzamiento corregimos sin costo cualquier error de lo entregado.'
      },
      {
        title: 'Soporte después.',
        body: 'Planes con tiempos de respuesta acordados para consultas, errores y mejoras conforme cambia la operación. Se acuerda al cierre; no es obligatorio.'
      },
      {
        title: 'Lo que no incluye.',
        body: 'Licencias de servicios de terceros (pasarelas de pago, WhatsApp Business, herramientas de IA), equipos o dispositivos, y el trabajo de limpiar datos históricos, que cotizamos aparte cuando hace falta.'
      }
    ] as SoftwareCrIncluded[]
  },

  choose: {
    intro:
      'Hay buenas empresas de software en Costa Rica y no todas sirven para lo mismo. Antes de contratar, a nosotros o a cualquiera, revisa estas siete cosas.',
    items: [
      { title: 'Pide ver un sistema funcionando, no una presentación.', body: 'Si no te dejan tocar algo real, no sabes qué vas a recibir.' },
      { title: 'Pregunta quién va a hablar con tu equipo.', body: 'Si el que vende no es el que va a entender tu operación, el discovery se pierde en el camino.' },
      { title: 'Exige precio y plazo cerrados antes de empezar.', body: '«Depende» es aceptable en la primera llamada, no en la propuesta.' },
      { title: 'Confirma de quién es el código y dónde queda.', body: 'Si el código no es tuyo, no estás comprando un sistema: estás alquilándolo.' },
      { title: 'Pregunta qué pasa el día después del lanzamiento.', body: 'Quién corrige errores, en cuánto tiempo y a qué costo.' },
      { title: 'Pide hablar con un cliente.', body: 'No con el logo en la página: con la persona que usa el sistema todos los días.' },
      { title: 'Desconfía si nunca te dicen que no.', body: 'Una empresa seria te va a decir cuándo un enlatado te sirve mejor y te sale más barato.' }
    ],
    honestTitle: 'No siempre conviene a la medida.',
    honest:
      'Si tu proceso es estándar, tienes menos de cinco personas usando el sistema y no necesitas integrarlo con nada, un producto enlatado bien configurado puede ser la mejor decisión. Te lo decimos en la primera reunión.'
  },

  industries: {
    heading: 'Lo construimos para tu industria',
    intro:
      'Construimos sistemas para operaciones físicas y equipos que trabajan en campo, en planta o en mostrador. Entra a tu industria y mira qué software tendría sentido para tu operación.',
    zonesTitle: 'Dónde trabajamos',
    // PROVISIONAL: confirmar discovery en sitio fuera de la GAM.
    zones:
      'Estamos en San José y trabajamos con empresas de toda la Gran Área Metropolitana: San José, Heredia, Alajuela y Cartago, con reuniones presenciales cuando hacen falta. Con empresas del resto del país trabajamos de forma remota, y el discovery se hace en sitio cuando la operación lo requiere.'
  },

  about: {
    paragraphs: [
      'Somos Link Design, un estudio de diseño y desarrollo de software en San José, Costa Rica. Desde 2020 construimos sitios y sistemas para empresas de Costa Rica y, con nuestra marca Nolo, para empresas de Argentina. Somos un equipo de diseño, desarrollo, control de calidad y arquitectura que trabaja junto en cada proyecto, sin intermediarios ni subcontratación.',
      'Usamos nuestro propio software para operar: el sistema con el que damos seguimiento a cada propuesta, cada reunión y cada cliente lo construimos nosotros, con las mismas reglas que aplicamos a los tuyos.'
    ],
    contact:
      'Escríbenos a hola@linkdesign.cr o al +506 7232 5943. Atendemos de lunes a viernes, de 8 a 17. Sábados y domingos, descansamos.'
  },

  faq: [
    {
      question: '¿Cuánto cuesta desarrollar un software a la medida en Costa Rica?',
      answer:
        'Entre USD 2.000 y 15.000 según el alcance. La mayoría de nuestros proyectos está entre USD 3.000 y 9.000: un CRM a la medida ronda los USD 3.000 a 6.000 y un ERP de operación e inventario los USD 5.500 a 9.000. El precio queda cerrado antes de empezar. Arriba tienes la tabla completa por tipo de sistema.'
    },
    {
      question: '¿Cuánto tarda?',
      answer:
        'Entre 8 y 13 semanas desde la primera reunión para la mayoría de los sistemas: 2 a 4 semanas de discovery, 5 a 8 de desarrollo y 1 de lanzamiento. Los proyectos multisede o con muchas integraciones toman de 3 a 5 meses.'
    },
    {
      question: '¿Cómo empezamos?',
      answer:
        'Con una reunión de 30 minutos, sin costo, donde nos cuentas cómo funciona hoy tu operación. Si tiene sentido, te enviamos una propuesta escrita en 5 días hábiles. El proyecto arranca con el anticipo del discovery.'
    },
    {
      question: '¿El código es mío?',
      answer:
        'Sí. Queda en un repositorio a nombre de tu empresa, con documentación, y la infraestructura también queda a tu nombre. Puedes seguir con otro equipo cuando quieras.'
    },
    {
      question: '¿Se integra con lo que ya uso?',
      answer:
        'Sí. Nos conectamos con tu contabilidad o tu ERP, con facturación electrónica, pasarelas de pago, WhatsApp y las cuentas de Microsoft o Google de tu equipo. En el discovery definimos qué se integra y cómo.'
    },
    {
      question: '¿Qué pasa con mis hojas de cálculo y mis datos actuales?',
      answer:
        'Los migramos. Antes de lanzar, pasamos tus datos históricos al sistema, los limpiamos y los validamos contigo. Si hay años de información desordenada, lo cotizamos aparte y te decimos cuánto vale la pena rescatar.'
    },
    {
      question: '¿Trabajan con empresas fuera de San José?',
      answer:
        'Sí. Con la Gran Área Metropolitana nos reunimos en persona cuando hace falta. Con el resto del país trabajamos de forma remota y hacemos el discovery en sitio si la operación lo requiere.'
    },
    {
      question: '¿Qué pasa después del lanzamiento?',
      answer:
        'Corregimos sin costo cualquier error de lo entregado durante los primeros 60 días. Después puedes contratar un plan de soporte con tiempos de respuesta acordados, o llamarnos solo cuando necesites una mejora.'
    },
    {
      question: '¿Cómo se paga?',
      answer:
        'Anticipo y saldo contra entrega (30/70), pagos por hito según etapas, o una cuota mensual con soporte incluido. Lo definimos en la primera conversación según lo que le convenga a tu empresa.'
    },
    {
      question: '¿Con qué tecnologías construyen?',
      answer:
        'Principalmente Angular para las pantallas, Node para el servidor y Azure para la infraestructura y la base de datos. También usamos Python, React y otras herramientas cuando el proyecto lo pide. La decisión final se toma en el discovery.'
    },
    {
      question: '¿Y si un sistema enlatado me sirve?',
      answer:
        'Te lo decimos. Si tu proceso es estándar, tienes pocos usuarios y no necesitas integraciones, un producto enlatado bien configurado puede ser mejor y más barato. No tomamos proyectos que no tienen sentido a la medida.'
    },
    {
      question: '¿Puedo probar algo antes de decidir?',
      answer:
        'Sí. Arriba tienes seis sistemas de demostración funcionando, uno por industria. Entra, crea registros y recorre la operación completa. Es la forma más rápida de saber si esto es lo que necesitas.'
    }
  ] as FaqItem[]
} as const;

/** Rótulos de las secciones (títulos de la página). */
export const SOFTWARE_CR_LABELS = {
  forWhom: 'Esta página es para ti si',
  how: 'Cómo trabajamos: copiamos tu operación, no al revés',
  systems: 'Qué construimos',
  cases: 'Casos: sistemas que puedes probar',
  pricing: 'Cuánto cuesta desarrollar software a la medida en Costa Rica',
  included: 'Qué incluye y de quién es',
  choose: 'Cómo elegir una empresa de desarrollo de software en Costa Rica',
  about: 'Quiénes somos',
  faq: 'Preguntas frecuentes',
  fitsTag: 'Te reconoces',
  notForTag: 'No somos la opción',
  demoTry: 'Probar el sistema',
  demoBefore: 'Antes',
  demoAfter: 'Con el sistema',
  demoCopied: 'Lo que copiamos de la operación',
  demoRange: 'Un sistema así',
  systemLink: 'Ver el sistema',
  exampleIf: 'Si',
  exampleThen: 'entonces'
} as const;
