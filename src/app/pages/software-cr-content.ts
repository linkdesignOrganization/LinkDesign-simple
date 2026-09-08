import type { SystemSlug } from './systems-content';

import type { FaqItem } from '../components/faq-accordion.component';
import type { ProjectStage } from '../components/project-stages.component';
import type { Lang } from '../services/language.service';

/**
 * Contenido de la landing «Desarrollo de software a la medida en Costa Rica»
 * (/desarrollo-de-software-costa-rica) en ES (`SOFTWARE_CR`) y EN (`SOFTWARE_CR_EN`). Los
 * componentes leen por `getSoftwareCrContent(lang)` y `getSoftwareCrLabels(lang)`.
 *
 * Fuente: investigacion-contenido-seo/copy-hub-software-cr-v1.md (2026-09-04), revisado por
 * Robert. Valores provisionales que faltan confirmar (marcados PROVISIONAL en cada campo, en los
 * dos idiomas, para que la confirmación toque ambos): año de inicio, cantidad de proyectos, plazo
 * de la propuesta, garantía, costo mensual de infraestructura, integraciones ya hechas y
 * descripciones de los casos reales (permiso).
 *
 * Los rangos de inversión salen de las 58 propuestas con monto del CRM (mar a sep 2026). El EN
 * copia los mismos dígitos y solo cambia el formato («1.500 a 4.000*» en ES, «1,500 to 4,000*»
 * en EN).
 */

export type SoftwareCrPriceRow = {
  type: string;
  range: string;
  timeline: string;
  /** Página de tipo de sistema (/software/:slug) que muestra esta fila en su sección de costo. */
  system?: SystemSlug;
};

export type SoftwareCrIntegration = {
  icon: 'receipt' | 'credit-card' | 'message-circle' | 'calculator' | 'calendar-days' | 'key-round';
  text: string;
};

/** Enlace dentro de un párrafo, por ejemplo la marca Nolõ hacia nolo.ar. */
export type SoftwareCrLink = { text: string; href: string };

/** Un párrafo es un texto plano o una lista de trozos con enlaces intercalados. */
export type SoftwareCrParagraph = string | ReadonlyArray<string | SoftwareCrLink>;

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
      'Cada tipo de sistema tiene un demo completo que puedes navegar con datos de prueba. Los sistemas de nuestros clientes no se muestran por confidencialidad; estos los construimos nosotros para que veas cómo se siente un software hecho alrededor de una operación. Son ejemplos, no el resultado que vas a recibir: cada desarrollo parte de tu operación y es distinto. Solo software: los sitios y las tiendas en línea son del brazo web.',
    integrationsTitle: 'Se conecta con lo que ya usas en Costa Rica',
    integrationsIntro:
      'Un sistema a la medida no reemplaza todo lo que tienes: se conecta. Estas son las integraciones que más nos piden y que ya hemos resuelto en proyectos reales.',
    // PROVISIONAL: confirmar cuáles están hechas antes de publicar.
    integrations: [
      {
        icon: 'receipt',
        text: 'Facturación electrónica de Hacienda: el sistema emite o recibe comprobantes sin salir de la operación.'
      },
      {
        icon: 'credit-card',
        text: 'SINPE Móvil y pasarelas de pago locales para cobrar en línea.'
      },
      {
        icon: 'message-circle',
        text: 'WhatsApp Business: pedidos, confirmaciones y atención con bot e inteligencia artificial, integrados al sistema.'
      },
      {
        icon: 'calculator',
        text: 'Tu contabilidad o tu ERP actual, para que la operación y la facturación no vivan en mundos separados.'
      },
      {
        icon: 'calendar-days',
        text: 'Correo, calendario y usuarios de Microsoft 365 o Google Workspace, para que tu equipo entre con la cuenta que ya tiene.'
      },
      {
        icon: 'key-round',
        text: 'Cuentas de clientes con inicio de sesión propio, para tiendas y portales donde el cliente se atiende solo.'
      }
    ] as SoftwareCrIntegration[]
  },

  pricing: {
    lead: 'Un sistema a la medida con nosotros cuesta entre USD 1.500 y 15.000, según el alcance. La mayoría de los proyectos que cotizamos en los últimos doce meses está entre USD 3.000 y 9.000. Estos son los rangos por tipo de sistema, calculados sobre nuestras propuestas de 2026.',
    columns: ['Tipo de sistema', 'Inversión (USD)*', 'Plazo típico*'],
    rows: [
      { type: 'Herramienta interna para un solo flujo (liquidaciones, comisiones, control de visitas)', range: '1.500 a 4.000*', timeline: '4 a 6 semanas*' },
      { type: 'CRM a la medida', system: 'crm-a-medida', range: '2.600 a 8.000*', timeline: '6 a 10 semanas*' },
      { type: 'E-commerce con lógica propia', system: 'ecommerce-logica-propia', range: '1.600 a 3.500*', timeline: '6 a 10 semanas*' },
      { type: 'Reservas, agenda o gestión clínica', system: 'reservas-y-agenda', range: '4.000 a 9.000*', timeline: '8 a 12 semanas*' },
      { type: 'Ticketing con marca propia', system: 'ticketing-marca-propia', range: '2.800 a 6.000*', timeline: '8 a 12 semanas*' },
      { type: 'ERP de operación e inventario', system: 'erp-operacion-inventario', range: '4.500 a 8.000*', timeline: '10 a 14 semanas*' },
      { type: 'Automatización con IA aplicada', system: 'automatizacion-ia', range: '2.000 a 5.000*', timeline: '4 a 10 semanas*' },
      { type: 'Plataforma completa o multisede', range: '9.000 a 15.000 o más*', timeline: '3 a 5 meses*' }
    ] as SoftwareCrPriceRow[],
    note:
      '* Rangos y plazos de referencia. Cada proyecto se cotiza según su alcance: nunca tenemos un precio listo, porque nunca son soluciones estandarizadas.',
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
        title: 'Capacitación y seguimiento.',
        body: 'Capacitamos a cada equipo en el sistema y acompañamos las primeras semanas de uso. Sin manuales: el sistema se aprende usándolo, con nosotros al lado.'
      },
      {
        // PROVISIONAL: plazo de garantía.
        title: 'Un año de garantía de funcionamiento.',
        body: 'Durante el primer año corregimos sin costo cualquier error de lo entregado. No incluye cambios, mejoras ni modificaciones sobre lo que se estableció en los alcances del proyecto.'
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
      { title: 'Pide navegar algo que hayan construido, aunque sea una demostración.', body: 'Una presentación no te dice cómo se siente usar su software; un demo, aunque no sea tu sistema, sí.' },
      { title: 'Pregunta quién va a hablar con tu equipo.', body: 'Si el que vende no es el que va a entender tu operación, el discovery se pierde en el camino.' },
      { title: 'Exige precio y plazo cerrados antes de empezar.', body: '«Depende» es aceptable en la primera llamada, no en la propuesta.' },
      { title: 'Confirma de quién es el código y dónde queda.', body: 'Si el código no es tuyo, no estás comprando un sistema: estás alquilándolo.' },
      { title: 'Pregunta qué pasa el día después del lanzamiento.', body: 'Quién corrige errores, en cuánto tiempo y a qué costo.' },
      { title: 'Pide una referencia real.', body: 'Un cliente al que puedas llamar y preguntarle cómo fue trabajar con ellos y qué pasa cuando algo falla.' },
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
      'Estamos en San José y trabajamos con empresas de toda la Gran Área Metropolitana: San José, Heredia, Alajuela y Cartago, con reuniones presenciales cuando hacen falta. Con empresas del resto del país trabajamos de forma remota, y el discovery se hace en sitio cuando la operación lo requiere. También trabajamos con empresas fuera de Costa Rica: hoy tenemos clientes en Estados Unidos, México y España.'
  },

  about: {
    paragraphs: [
      [
        'Somos Link Design, un estudio de diseño y desarrollo de software en San José, Costa Rica. Desde 2020 construimos sitios y sistemas para empresas de Costa Rica y, con nuestra marca ',
        { text: 'Nolõ', href: 'https://nolo.ar' },
        ', para empresas de Argentina; hoy también tenemos clientes en Estados Unidos, México y España. Somos un equipo de diseño, desarrollo, control de calidad y arquitectura que trabaja junto en cada proyecto, sin intermediarios ni subcontratación.'
      ],
      'Usamos nuestro propio software para operar: el sistema con el que damos seguimiento a cada propuesta, cada reunión y cada cliente lo construimos nosotros, con las mismas reglas que aplicamos a los tuyos.'
    ],
    contact:
      'Escríbenos a hola@linkdesign.cr o al +506 7232 5943. Atendemos de lunes a viernes, de 8 a 17. Sábados y domingos, descansamos.'
  },

  faq: [
    {
      question: '¿Cuánto cuesta desarrollar un software a la medida en Costa Rica?',
      answer:
        'Entre USD 1.500 y 15.000 según el alcance. La mayoría de nuestros proyectos está entre USD 3.000 y 9.000: un CRM a la medida ronda los USD 2.600 a 8.000 y un ERP de operación e inventario los USD 4.500 a 8.000. Son referencias: nunca tenemos un precio listo, porque nunca son soluciones estandarizadas. El precio queda cerrado por alcance antes de empezar. Arriba tienes la tabla completa por tipo de sistema.'
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
        'Sí. Con la Gran Área Metropolitana nos reunimos en persona cuando hace falta. Con el resto del país trabajamos de forma remota y hacemos el discovery en sitio si la operación lo requiere. Y también fuera de Costa Rica: hoy tenemos clientes en Estados Unidos, México y España.'
    },
    {
      question: '¿Qué pasa después del lanzamiento?',
      answer:
        'Durante el primer año corregimos sin costo cualquier error de lo entregado. La garantía no incluye cambios, mejoras ni modificaciones sobre los alcances del proyecto: eso se cotiza aparte. Después puedes contratar un plan de soporte con tiempos de respuesta acordados, o llamarnos solo cuando necesites una mejora.'
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
        'Sí, como ejemplos. Los seis sistemas de demostración de arriba los construimos nosotros para que veas cómo se siente un software hecho alrededor de una operación: el nivel de detalle, la velocidad y cómo resolvemos flujos parecidos al tuyo. No son lo que vas a recibir: cada desarrollo es distinto, porque parte de tu operación y no de una plantilla.'
    }
  ] as FaqItem[]
};

/**
 * Forma del contenido del hub. Sin el `as const` del objeto, `typeof` ensancha los textos a
 * `string` pero conserva la unión de `icon` y el `system?: SystemSlug` de los `as X[]` internos.
 */
export type SoftwareCrContent = typeof SOFTWARE_CR;

/**
 * Versión en inglés del hub. Misma forma, mismas claves, mismos largos de lista y mismo orden que
 * `SOFTWARE_CR`; los campos invariantes (`system`, `icon`, `order`, `href`, dígitos de rangos, plazos
 * y stats) se copian tal cual. Traducción con sentido, no literal: ver PLAN-EN-SOFTWARE-CR.md §6.
 */
export const SOFTWARE_CR_EN: SoftwareCrContent = {
  hero: {
    eyebrow: 'Custom software',
    title: 'Custom software development in Costa Rica',
    lead: 'We are Link Design, a San José studio that builds custom software for companies that can no longer run their operation on spreadsheets, WhatsApp and workarounds. We do not bend your company to fit a system. We copy how your operation works and turn it into software. Since 2020 we have put 26 projects into production for Costa Rican companies in manufacturing, logistics, healthcare, professional services and retail.',
    // PROVISIONAL: 2020 (primera captura de linkdesign.cr), 26 (portafolio), 8 a 13 semanas (proceso).
    stats: [
      { value: '26', label: 'projects in production' },
      { value: '06', label: 'systems you can try today' },
      { value: '8 to 13', label: 'weeks from the first meeting to a working system' }
    ],
    ctaPrimary: 'Book a 30-minute meeting',
    ctaSecondary: 'Message us on WhatsApp',
    // PROVISIONAL: plazo de la propuesta.
    promise:
      'After the first meeting, we send you a written proposal within 5 business days. Free of charge, with no commitment.',
    updated: 'Updated: September 2026'
  },

  forWhom: {
    intro:
      "We work with companies that have a real operation and a specific problem. If any of these situations sounds familiar, let's talk.",
    fits: [
      'Your operation lives in spreadsheets that only one person understands. When that person is out, everything stops.',
      'Orders, appointments or quotes come in through WhatsApp, and someone copies them by hand somewhere else, every day.',
      'You bought an off-the-shelf system, and your team keeps parallel spreadsheets because it does not fit how they sell or dispatch.',
      'You have two or more branches, warehouses or teams, and no one can see the inventory or the real state of things across all of them at once.',
      'Your accounting software or ERP works fine for invoicing, but it does not cover the operational side: production, maintenance, routes, commissions, collections.',
      'You need your customers to do something on their own: book, pay, buy a ticket, check the status of their order.'
    ],
    notFor:
      'If what you are looking for is a generic app to sell in the app stores, or a product for the mass market, we are not the best option. We will tell you so on the first call.'
  },

  how: {
    statement: [
      'Most software asks the company to change: to enter data the way the system wants, to follow the steps the system defines, to give up the exceptions that make the company work.',
      'We do the opposite. First we understand how your operation really works: who does what, in what order, under which rules and with which exceptions. Then we write the code around that.'
    ],
    examplesTitle: 'Three examples of what that means in practice',
    examples: [
      {
        if: 'If your warehouse dispatches in batches and your sales reps earn their commission when the customer pays, not at signing,',
        then: 'the system dispatches in batches and calculates the commission when the payment comes in. Not the other way around.'
      },
      {
        if: 'If your wholesale customers have different price lists and payment terms negotiated one by one,',
        then: "those terms live inside the system, not in your sales manager's memory."
      },
      {
        if: 'If your clinic schedules by practitioner, by room and by equipment,',
        then: 'availability takes all three into account, because that is how your clinic works.'
      }
    ],
    closing: [
      'This has a cost: it takes time to understand the operation before building anything. That is why discovery is the first stage of the project, and the most important one.',
      'And it has a benefit you notice on day one: your team adopts the system without pushback, because the system speaks their language.'
    ]
  },

  systems: {
    intro:
      "Every type of system has a full demo you can browse with sample data. For confidentiality, we do not show our clients' systems. We built these ourselves so you can feel what it is like to use software built around an operation. They are examples, not the result you will receive: every build starts from your operation and is different. Software only: websites and online stores belong to the web side of the studio.",
    integrationsTitle: 'It connects with what you already use in Costa Rica',
    integrationsIntro:
      'A custom system does not replace everything you have. It connects to it. These are the integrations we are asked for most often and have already solved in real projects.',
    // PROVISIONAL: confirmar cuáles están hechas antes de publicar.
    integrations: [
      {
        icon: 'receipt',
        text: "Electronic invoicing with Hacienda, Costa Rica's tax authority: the system issues or receives invoices without leaving the operation."
      },
      {
        icon: 'credit-card',
        text: 'SINPE Móvil, the local mobile payment system, and Costa Rican payment gateways for taking payments online.'
      },
      {
        icon: 'message-circle',
        text: 'WhatsApp Business: orders, confirmations and customer service with a bot and artificial intelligence, integrated into the system.'
      },
      {
        icon: 'calculator',
        text: 'Your current accounting software or ERP, so the operation and invoicing do not live in separate worlds.'
      },
      {
        icon: 'calendar-days',
        text: 'Email, calendar and user accounts from Microsoft 365 or Google Workspace, so your team signs in with the account they already have.'
      },
      {
        icon: 'key-round',
        text: 'Customer accounts with their own login, for stores and portals where customers serve themselves.'
      }
    ]
  },

  pricing: {
    lead: 'A custom system with us costs between USD 1,500 and 15,000, depending on scope. Most of the projects we quoted in the last twelve months fall between USD 3,000 and 9,000. These are the ranges by system type, calculated from our 2026 proposals.',
    columns: ['System type', 'Investment (USD)*', 'Typical timeline*'],
    rows: [
      { type: 'Internal tool for a single flow (settlements, commissions, visit tracking)', range: '1,500 to 4,000*', timeline: '4 to 6 weeks*' },
      { type: 'Custom CRM', system: 'crm-a-medida', range: '2,600 to 8,000*', timeline: '6 to 10 weeks*' },
      { type: 'E-commerce with its own logic', system: 'ecommerce-logica-propia', range: '1,600 to 3,500*', timeline: '6 to 10 weeks*' },
      { type: 'Booking, scheduling or clinic management', system: 'reservas-y-agenda', range: '4,000 to 9,000*', timeline: '8 to 12 weeks*' },
      { type: 'Own-brand ticketing', system: 'ticketing-marca-propia', range: '2,800 to 6,000*', timeline: '8 to 12 weeks*' },
      { type: 'Operations & inventory ERP', system: 'erp-operacion-inventario', range: '4,500 to 8,000*', timeline: '10 to 14 weeks*' },
      { type: 'Applied AI automation', system: 'automatizacion-ia', range: '2,000 to 5,000*', timeline: '4 to 10 weeks*' },
      { type: 'Full platform or multi-site system', range: '9,000 to 15,000 or more*', timeline: '3 to 5 months*' }
    ],
    note:
      '* Reference ranges and timelines. Every project is quoted by its scope: we never have a ready-made price, because these are never standardized solutions.',
    factorsTitle: 'What moves the price within each range',
    factors: [
      'How many flows and how many different roles use the system. One module with two roles does not cost the same as five modules for management, warehouse, sales and customers.',
      'Integrations: every external system it has to talk to (invoicing, payments, WhatsApp, your ERP) adds work and testing.',
      'Data migration: bringing over years of spreadsheets or an old system, then cleaning and validating that data.',
      'Use in the field: if technicians or sales reps use it from their phones, without signal, with photos.',
      'Artificial intelligence: reading documents or audio, or automatic classification.'
    ],
    paymentTitle: 'How you pay',
    payment:
      'The price is fixed by scope before we start. If the scope changes along the way, we quote the change separately and you decide. The schemes we use most: deposit and balance on delivery (30/70), milestone payments by stage, or a monthly fee with support included when you would rather not make a large upfront investment. The project starts with the discovery deposit.',
    afterTitle: 'What you pay afterward',
    // PROVISIONAL: rango de infraestructura.
    after:
      'The infrastructure is in your name and is paid directly to the provider: between USD 20 and 80 a month for most systems, somewhat more if they use artificial intelligence heavily. Support with agreed response times is optional and is quoted when the project closes.'
  },

  process: {
    title: 'Timelines and process',
    intro:
      'From the first conversation to software running in your operation. Four stages with real timelines and a concrete deliverable at each one.',
    stages: [
      {
        order: '01',
        name: 'First contact',
        duration: 'Today',
        description:
          'We understand what you need to solve and check whether a custom build makes sense. Deliverable: a first estimated scope and a date to sit down together.'
      },
      {
        order: '02',
        name: 'Discovery',
        duration: '2 to 4 weeks',
        description:
          'We map the real flow of your operation with the people who run it. We define rules, roles, exceptions, integrations and architecture. Deliverable: the map of your operation, the final scope and a proposal with a fixed price and timeline.'
      },
      {
        order: '03',
        name: 'Development',
        duration: '5 to 8 weeks',
        description:
          'We build the system module by module. Every two weeks your team tests what already works in a test environment and corrects us with real data. Deliverable: working modules, validated by the people who will use them.'
      },
      {
        order: '04',
        name: 'Launch',
        duration: '1 week',
        description:
          'We take the system live, train the team by role and stay close through the first weeks of use. Deliverable: the software running in your operation, with the team working in it.'
      }
    ],
    closing:
      'In total, between 8 and 13 weeks from the first meeting. Multi-site projects, or projects with many integrations, take 3 to 5 months, and you know that from discovery, not halfway through.'
  },

  included: {
    items: [
      {
        title: 'The code is yours.',
        body: "It lives in a repository under your company's name, with documentation. If you want to continue with another team tomorrow, you can."
      },
      {
        title: 'The infrastructure is yours.',
        body: 'The cloud accounts are in your name and the monthly bill goes to you. We manage it for as long as you want.'
      },
      {
        title: 'Training and follow-up.',
        body: 'We train each team on the system and stay close through the first weeks of use. No manuals: you learn the system by using it, with us beside you.'
      },
      {
        // PROVISIONAL: plazo de garantía.
        title: 'A one-year warranty on what we deliver.',
        body: 'During the first year we fix any error in what was delivered, at no cost. It does not include changes, improvements or modifications to what was set in the project scope.'
      },
      {
        title: 'Support afterward.',
        body: 'Plans with agreed response times for questions, errors and improvements as the operation changes. Agreed when the project closes. It is optional.'
      },
      {
        title: 'What it does not include.',
        body: 'Third-party service licenses (payment gateways, WhatsApp Business, AI tools), hardware or devices, and the work of cleaning historical data, which we quote separately when needed.'
      }
    ]
  },

  choose: {
    intro:
      'There are good software companies in Costa Rica, and not all of them are good for the same thing. Before you hire anyone, us included, check these seven things.',
    items: [
      { title: 'Ask to browse something they have built, even if it is a demo.', body: 'A slide deck does not tell you what using their software feels like. A demo does, even if it is not your system.' },
      { title: 'Ask who will talk to your team.', body: 'If the person selling is not the person who will understand your operation, discovery gets lost along the way.' },
      { title: 'Insist on a fixed price and timeline before starting.', body: '"It depends" is acceptable on the first call, not in the proposal.' },
      { title: 'Confirm who owns the code and where it lives.', body: 'If the code is not yours, you are not buying a system. You are renting one.' },
      { title: 'Ask what happens the day after launch.', body: 'Who fixes errors, how fast and at what cost.' },
      { title: 'Ask for a real reference.', body: 'A client you can call and ask what working with them was like, and what happens when something breaks.' },
      { title: 'Be wary if they never say no.', body: 'A serious company will tell you when an off-the-shelf product serves you better and costs you less.' }
    ],
    honestTitle: 'Custom is not always the right call.',
    honest:
      'If your process is standard, fewer than five people will use the system and you do not need to integrate it with anything, a well-configured off-the-shelf product may be the best decision. We tell you so in the first meeting.'
  },

  industries: {
    heading: 'We build it for your industry',
    intro:
      'We build systems for physical operations and teams that work in the field, on the plant floor or at the counter. Pick your industry and see what software would make sense for your operation.',
    zonesTitle: 'Where we work',
    // PROVISIONAL: confirmar discovery en sitio fuera de la GAM.
    zones:
      'We are based in San José and work with companies across the Greater Metropolitan Area: San José, Heredia, Alajuela and Cartago, with in-person meetings when they are needed. With companies in the rest of the country we work remotely, and discovery happens on site when the operation requires it. We also work with companies outside Costa Rica: today we have clients in the United States, Mexico and Spain.'
  },

  about: {
    paragraphs: [
      [
        'We are Link Design, a design and software development studio in San José, Costa Rica. Since 2020 we have built websites and systems for companies in Costa Rica and, under our ',
        { text: 'Nolõ', href: 'https://nolo.ar' },
        ' brand, for companies in Argentina. Today we also have clients in the United States, Mexico and Spain. We are one team covering design, development, quality assurance and architecture, working together on every project, with no intermediaries and no subcontracting.'
      ],
      'We run on our own software: the system we use to track every proposal, every meeting and every client was built by us, under the same rules we apply to yours.'
    ],
    contact:
      'Reach us at hola@linkdesign.cr or +506 7232 5943. We are available Monday to Friday, 8am to 5pm. Saturdays and Sundays, we rest.'
  },

  faq: [
    {
      question: 'How much does custom software development cost in Costa Rica?',
      answer:
        'Between USD 1,500 and 15,000, depending on scope. Most of our projects fall between USD 3,000 and 9,000: a custom CRM runs around USD 2,600 to 8,000 and an operations and inventory ERP around USD 4,500 to 8,000. These are reference figures: we never have a ready-made price, because these are never standardized solutions. The price is fixed by scope before we start. The full table by system type is above.'
    },
    {
      question: 'How long does it take?',
      answer:
        'Between 8 and 13 weeks from the first meeting for most systems: 2 to 4 weeks of discovery, 5 to 8 of development and 1 for launch. Multi-site projects, or projects with many integrations, take 3 to 5 months.'
    },
    {
      question: 'How do we start?',
      answer:
        'With a free 30-minute meeting where you tell us how your operation works today. If it makes sense, we send you a written proposal within 5 business days. The project starts with the discovery deposit.'
    },
    {
      question: 'Is the code mine?',
      answer:
        "Yes. It lives in a repository under your company's name, with documentation, and the infrastructure is in your name too. You can continue with another team whenever you want."
    },
    {
      question: 'Does it integrate with what I already use?',
      answer:
        "Yes. We connect with your accounting software or ERP, with electronic invoicing, payment gateways, WhatsApp and your team's Microsoft or Google accounts. During discovery we define what gets integrated and how."
    },
    {
      question: 'What happens to my spreadsheets and my current data?',
      answer:
        'We migrate them. Before launch, we move your historical data into the system, clean it and validate it with you. If there are years of messy information, we quote that separately and tell you how much is worth recovering.'
    },
    {
      question: 'Do you work with companies outside San José?',
      answer:
        'Yes. Within the Greater Metropolitan Area we meet in person when needed. With the rest of the country we work remotely and do discovery on site if the operation requires it. And outside Costa Rica too: today we have clients in the United States, Mexico and Spain.'
    },
    {
      question: 'What happens after launch?',
      answer:
        'During the first year we fix any error in what was delivered, at no cost. The warranty does not include changes, improvements or modifications to the project scope: those are quoted separately. After that you can hire a support plan with agreed response times, or call us only when you need an improvement.'
    },
    {
      question: 'How do I pay?',
      answer:
        'Deposit and balance on delivery (30/70), milestone payments by stage, or a monthly fee with support included. We agree on it in the first conversation, based on what works best for your company.'
    },
    {
      question: 'What technologies do you build with?',
      answer:
        'Mainly Angular for the screens, Node for the server and Azure for the infrastructure and database. We also use Python, React and other tools when the project calls for them. The final decision is made during discovery.'
    },
    {
      question: 'What if an off-the-shelf system works for me?',
      answer:
        'We tell you. If your process is standard, you have few users and you do not need integrations, a well-configured off-the-shelf product may be better and cheaper. We do not take projects that make no sense as custom builds.'
    },
    {
      question: 'Can I try something before deciding?',
      answer:
        'Yes, as examples. We built the six demo systems above ourselves so you can feel what it is like to use software built around an operation: the level of detail, the speed and how we solve flows similar to yours. They are not what you will receive: every build is different, because it starts from your operation and not from a template.'
    }
  ]
};

/** Rótulos de las secciones (títulos de la página). */
export const SOFTWARE_CR_LABELS = {
  forWhom: 'Esta página es para ti si',
  how: 'Cómo trabajamos: copiamos tu operación, no al revés',
  systems: 'Qué construimos: sistemas que puedes probar',
  pricing: 'Cuánto cuesta desarrollar software a la medida en Costa Rica',
  included: 'Qué incluye y de quién es',
  choose: 'Cómo elegir una empresa de desarrollo de software en Costa Rica',
  about: 'Quiénes somos',
  faq: 'Preguntas frecuentes',
  fitsTag: 'Te reconoces',
  notForTag: 'No somos la opción',
  systemLink: 'Ver el sistema',
  exampleIf: 'Si',
  exampleThen: 'entonces'
} as const;

export type SoftwareCrLabels = Record<keyof typeof SOFTWARE_CR_LABELS, string>;

/** Rótulos de las secciones en inglés: cortos y en sentence case, como `SECTION_LABELS.en`. */
export const SOFTWARE_CR_LABELS_EN: SoftwareCrLabels = {
  forWhom: 'This page is for you if',
  how: 'How we work: we copy your operation, not the other way around',
  systems: 'What we build: systems you can try',
  pricing: 'What custom software development costs in Costa Rica',
  included: 'What is included and who owns it',
  choose: 'How to choose a software development company in Costa Rica',
  about: 'Who we are',
  faq: 'Frequently asked questions',
  fitsTag: 'Sounds like you',
  notForTag: 'Not the right fit',
  systemLink: 'See the system',
  exampleIf: 'If',
  exampleThen: 'then'
};

/** Contenido del hub en el idioma pedido: 'en' da `SOFTWARE_CR_EN`, cualquier otro el ES. */
export function getSoftwareCrContent(lang: Lang): SoftwareCrContent {
  return lang === 'en' ? SOFTWARE_CR_EN : SOFTWARE_CR;
}

/** Rótulos de sección en el idioma pedido. */
export function getSoftwareCrLabels(lang: Lang): SoftwareCrLabels {
  return lang === 'en' ? SOFTWARE_CR_LABELS_EN : SOFTWARE_CR_LABELS;
}

/**
 * Fila de precios del hub para una página de tipo de sistema, en el idioma pedido; null si no
 * tiene fila propia.
 */
export function getSoftwareCrPriceForSystem(system: string | null, lang: Lang): SoftwareCrPriceRow | null {
  return getSoftwareCrContent(lang).pricing.rows.find((r) => r.system === system) ?? null;
}
