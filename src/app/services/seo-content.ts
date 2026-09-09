import { Lang } from './language.service';
import { SeoData } from './seo.service';
import { getSystemDetail, SystemDetail } from '../pages/systems-content';
import { getIndustryDetail, IndustryDetail } from '../pages/industries-content';
import { getSoftwareCrCase, SoftwareCrCase } from '../pages/software-cr-cases-content';
import { environment } from '../../environments/environment';

/** Origen del sitio para las imágenes OG propias (el póster de cada ficha); igual que viewcases. */
const SITE_ORIGIN = (environment.siteUrl || 'https://linkdesign.cr').replace(/\/+$/, '');

/**
 * Contenido SEO por ruta e idioma (ES/EN). Textos reales del sitio en producción
 * (LinkDesign2.0), adaptados a la marca "Link Design" y a las rutas de este sitio.
 */
export const SEO_CONTENT: Record<string, Record<Lang, SeoData>> = {
  '/': {
    es: {
      title: 'Link Design | Desarrollo web y software a medida en Costa Rica',
      description:
        'Diseñamos sitios web rápidos y software a medida en Costa Rica. Desarrollo web, software empresarial y soluciones digitales para empresas que buscan resultados.',
      keywords:
        'desarrollo web, software a medida, diseño web, costa rica, sitios web, aplicaciones, seo, marketing digital',
      canonicalPath: '/'
    },
    en: {
      title: 'Link Design | Custom Web & Software Development in Costa Rica',
      description:
        'We build fast websites and custom software in Costa Rica. Web development, business software and digital solutions for results-driven companies.',
      keywords:
        'web development, custom software, web design, costa rica, websites, apps, seo, digital marketing',
      canonicalPath: '/',
      locale: 'en_US'
    }
  },
  '/software': {
    es: {
      title: 'Desarrollo de software a medida | Link Design Costa Rica',
      description:
        'Empresa de desarrollo de software en Costa Rica: aplicaciones internas, automatización e integración tecnológica para ordenar procesos y ganar productividad.',
      keywords:
        'software a medida, desarrollo de software, aplicaciones internas, automatización, integración tecnológica, costa rica',
      canonicalPath: '/software'
    },
    en: {
      title: 'Custom software development | Link Design Costa Rica',
      description:
        'Custom software development company in Costa Rica: internal apps, automation and tech integration that organize processes and boost productivity.',
      keywords:
        'custom software, software development, internal apps, automation, tech integration, costa rica',
      canonicalPath: '/software',
      locale: 'en_US'
    }
  },
  '/web': {
    es: {
      title: 'Diseño y desarrollo de páginas web | Link Design Costa Rica',
      description:
        'Páginas web corporativas, e-commerce y landing pages a medida. Diseño y desarrollo web con rendimiento y escalabilidad para empresas en Costa Rica.',
      keywords:
        'desarrollo web, sitios corporativos, e-commerce, landing pages, diseño web, costa rica',
      canonicalPath: '/web'
    },
    en: {
      title: 'Web design and development | Link Design Costa Rica',
      description:
        'Custom web design and development in Costa Rica: corporate websites, e-commerce and landing pages, with performance and scalability for growing companies.',
      keywords:
        'web development, corporate websites, e-commerce, landing pages, web design, costa rica',
      canonicalPath: '/web',
      locale: 'en_US'
    }
  },
  '/industrias': {
    es: {
      title: 'Soluciones a medida por industria | Link Design CR',
      description:
        'Software y sitios web a medida para tu sector en Costa Rica: industria, logística, salud, servicios profesionales y técnicos, fitness, wellness y educación.',
      keywords:
        'industrias, soluciones por industria, software a medida, sitios web, costa rica, link design',
      canonicalPath: '/industrias'
    },
    en: {
      title: 'Custom solutions by industry | Link Design CR',
      description:
        'Custom software and websites for your sector in Costa Rica: industry, logistics, health, professional and technical services, fitness, wellness and education.',
      keywords: 'industries, solutions by industry, custom software, websites, costa rica, link design',
      canonicalPath: '/industrias',
      locale: 'en_US'
    }
  },
  '/contacto': {
    es: {
      title: 'Contacto y reunión de proyecto | Link Design Costa Rica',
      description:
        'Conversemos sobre tu proyecto en Costa Rica. Escríbenos por correo o WhatsApp y agenda una reunión con nuestro equipo digital.',
      keywords: 'contacto, link design, correo, whatsapp, reunión, costa rica',
      canonicalPath: '/contacto'
    },
    en: {
      title: 'Contact & project meeting | Link Design Costa Rica',
      description:
        "Let's talk about your project in Costa Rica. Reach us by email or WhatsApp and book a meeting with the Link Design digital team.",
      keywords: 'contact, link design, email, whatsapp, meeting, costa rica',
      canonicalPath: '/contacto',
      locale: 'en_US'
    }
  },
  '/politicas-de-privacidad': {
    es: {
      title: 'Política de privacidad y datos | Link Design Costa Rica',
      description:
        'Conoce cómo recopilamos, usamos y protegemos tus datos personales en Link Design, incluyendo finalidades, derechos y medios de contacto.',
      keywords:
        'política de privacidad, protección de datos, privacidad digital, link design, costa rica',
      canonicalPath: '/politicas-de-privacidad'
    },
    en: {
      title: 'Privacy & data policy | Link Design Costa Rica',
      description:
        'Learn how we collect, use and protect your personal data at Link Design, including purposes, rights and privacy contact channels.',
      keywords: 'privacy policy, data protection, digital privacy, link design, costa rica',
      canonicalPath: '/politicas-de-privacidad',
      locale: 'en_US'
    }
  },
  // Página principal de la app OAuth interna de Google Ads: existe porque la verificación de marca
  // de Google Auth Platform exige una homepage accesible que explique su propósito. NO es contenido
  // del sitio: `noindex` y sin enlaces entrantes, porque describe una herramienta de uso interno.
  //
  // El noindex sólo funciona desde acá: App aplica seoForUrl() en un effect por ruta, así que un
  // Meta.updateTag en el componente pierde siempre (por eso la página servía el SEO del home, con
  // canonical a '/', hasta el 25 jul 2026).
  //
  // `singleUrl`: vive fuera de los árboles de idioma, una sola URL sirve ES+EN (no hay /en/ads).
  '/ads': {
    es: {
      title: 'Link Design | Aplicación de gestión de Google Ads',
      description:
        'Link Design es la aplicación interna con la que el equipo de linkdesign.cr analiza y gestiona campañas de Google Ads mediante la API de Google Ads.',
      keywords: 'link design, google ads api, aplicación interna, costa rica',
      canonicalPath: '/ads',
      singleUrl: true,
      robots: 'noindex, follow'
    },
    en: {
      title: 'Link Design | Google Ads management app',
      description:
        'Link Design is the internal application the linkdesign.cr team uses to analyze and manage Google Ads campaigns through the Google Ads API.',
      keywords: 'link design, google ads api, internal tool, costa rica',
      canonicalPath: '/ads',
      locale: 'en_US',
      singleUrl: true,
      robots: 'noindex, follow'
    }
  },
  // Landing «Desarrollo de software a la medida en Costa Rica» (/desarrollo-de-software-costa-rica),
  // en ES y EN (/en/…): sin `singleUrl`, `withCanonical` antepone /en al canonical en inglés y
  // SeoService declara el par hreflang recíproco. INDEXABLE desde el 2026-09-08, cuando Robert lo
  // autorizó: sin `robots` propio hereda el del resto del sitio (`index, follow,
  // max-image-preview:large, …`, el valor por defecto de SeoService), ya no lleva cabecera
  // X-Robots-Tag en staticwebapp.config.json y entra al sitemap y al llms.txt en el mismo push
  // (meta y cabecera tienen que viajar juntas o la página sigue sin indexarse). Las fichas
  // (/…/:slug) se resuelven en seoForUrl (rama caseMatch), con el mismo criterio.
  '/desarrollo-de-software-costa-rica': {
    es: {
      title: 'Empresa de desarrollo de software en Costa Rica | Link Design',
      // 160 caracteres: rango de la tabla de precios y llamada a la acción dentro del recorte de Google.
      description:
        'Empresa de desarrollo de software a la medida en Costa Rica. Rangos reales de USD 1.500 a 15.000, plazos por tipo de sistema y seis demos que puedes probar hoy.',
      keywords:
        'desarrollo de software costa rica, empresas de desarrollo de software costa rica, software a la medida costa rica, link design',
      canonicalPath: '/desarrollo-de-software-costa-rica',
      dateModified: '2026-09-08'
    },
    en: {
      title: 'Custom software development company in Costa Rica | Link Design',
      description:
        'Custom software development company in Costa Rica. Real ranges from USD 1,500 to 15,000, timelines by system type and six demos you can try today.',
      keywords: 'custom software development costa rica, software company costa rica, link design',
      canonicalPath: '/desarrollo-de-software-costa-rica',
      locale: 'en_US',
      dateModified: '2026-09-08'
    }
  },
  '/404': {
    es: {
      title: 'Página no encontrada | Link Design Costa Rica',
      description:
        'La página que buscas no existe o se movió. Vuelve al inicio de Link Design.',
      keywords: 'link design, costa rica',
      canonicalPath: '/404',
      robots: 'noindex, follow'
    },
    en: {
      title: 'Page not found | Link Design Costa Rica',
      description:
        "The page you're looking for doesn't exist or has moved. Head back to the Link Design home.",
      keywords: 'link design, costa rica',
      canonicalPath: '/404',
      locale: 'en_US',
      robots: 'noindex, follow'
    }
  }
};

/** Fallback (home) para rutas no mapeadas. */
export const SEO_FALLBACK = SEO_CONTENT['/'];

// Recorta el primer párrafo de "Qué es" a una meta-descripción limpia (~158 chars): prioriza
// terminar en fin de oración; si no entra, cierra en el ":" de una enumeración; en último caso
// corta en límite de palabra + elipsis. Nunca corta a media palabra (lo que se veía roto en SERP).
function lastSentenceBoundary(s: string, punct: string): number {
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === punct && (i + 1 >= s.length || s[i + 1] === ' ')) return i;
  }
  return -1;
}

// `min` es el piso del rango que el sitio se fija para las descriptions (120 a 160): un corte
// limpio por oración o por dos puntos solo se acepta si llega a ese piso; si no, se prefiere
// aprovechar el párrafo hasta `max` y cerrar con elipsis, porque una description de 96 caracteres
// desaprovecha el snippet. Nunca se agrega texto que no esté en el contenido.
/** Tope de ancho del <title> que el sitio se fija para que el buscador no lo recorte. */
const TITLE_MAX = 70;

function fitsTitle(title: string): boolean {
  return title.length <= TITLE_MAX;
}

function metaDescription(text: string, max = 158, min = 120): string {
  const para = text.split('\n\n')[0].trim();
  if (para.length <= max) return para;

  const window = para.slice(0, max + 1);
  const sentenceEnd = Math.max(
    lastSentenceBoundary(window, '.'),
    lastSentenceBoundary(window, '!'),
    lastSentenceBoundary(window, '?')
  );
  if (sentenceEnd + 1 >= min) return para.slice(0, sentenceEnd + 1).trim();

  const colon = window.lastIndexOf(':');
  if (colon >= min) return para.slice(0, colon).trim() + '.';

  const cut = para.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

// Baja la inicial de la categoría para meterla dentro de una frase, salvo si la primera palabra es
// una sigla (ERP, HR, CRM): la misma regla que demoIntro en system-detail-page.ts.
function lowerFirst(text: string): string {
  const first = text.split(' ')[0];
  if (first.length > 1 && first === first.toUpperCase()) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

// Description de una ficha, entre 120 y 160 caracteres: categoría, país, rango, plazo y llamada a la
// acción. En EN la llamada lleva el nombre del demo; si con él se pasa de 160 (Estudio Dental
// Mendieta, Punto Cero y Vértice Seguridad Industrial) va sin nombre, porque recortarla con
// metaDescription() dejaría a Dental en 119 y sin llamada. El helper queda como último resguardo.
function caseDescription(c: SoftwareCrCase, lang: Lang): string {
  const category = lowerFirst(c.category);
  if (lang !== 'en') {
    return metaDescription(
      `Demo de un ${category} hecho a la medida en Costa Rica: cuesta ${c.range} y toma ${c.timeline}. Navégalo completo.`,
      160
    );
  }
  const lead = `Demo of a custom ${category} built in Costa Rica: it costs ${c.range} and takes ${c.timeline}.`;
  const named = `${lead} Browse the full ${c.name} demo.`;
  return metaDescription(named.length <= 160 ? named : `${lead} Browse the full demo.`, 160);
}

// SEO derivado del contenido aprobado de cada sistema (no es copy nuevo: el title usa el nombre
// del sistema y la descripción es su párrafo "Qué es" recortado para el meta). El separador es la
// barra, como en el resto de los títulos del sitio: el guion largo está prohibido en los copys y
// salía en el <title> de las siete páginas de sistema. El título más largo queda en 66 caracteres.
function systemSeo(detail: SystemDetail, lang: Lang): SeoData {
  const description = metaDescription(detail.whatItIs);
  const suffix = lang === 'en' ? 'Custom software | Link Design' : 'Software a medida | Link Design';
  const keywords =
    lang === 'en'
      ? `${detail.name.toLowerCase()}, custom software, software development, costa rica, link design`
      : `${detail.name.toLowerCase()}, software a medida, desarrollo de software, costa rica, link design`;
  return {
    title: `${detail.name} | ${suffix}`,
    description,
    keywords,
    canonicalPath: `/software/${detail.slug}`,
    locale: lang === 'en' ? 'en_US' : 'es_CR'
  };
}

// SEO derivado del contenido de cada industria (title = "Título de página"; description = el
// subtítulo recortado). Mismo patrón que systemSeo.
function industrySeo(detail: IndustryDetail, lang: Lang): SeoData {
  const description = metaDescription(detail.subtitle);
  const keywords =
    lang === 'en'
      ? `${detail.name.toLowerCase()}, custom software, web development, costa rica, link design`
      : `${detail.name.toLowerCase()}, software a medida, sitios web, costa rica, link design`;
  return {
    // El h1 usa `pageTitle` completo; el <title> cae al nombre de la industria cuando ese
    // encabezado no cabe en el ancho que muestra el buscador (regla del sitio: 70 caracteres).
    title: fitsTitle(`${detail.pageTitle} | Link Design`)
      ? `${detail.pageTitle} | Link Design`
      : `${detail.name} | Link Design`,
    description,
    keywords,
    canonicalPath: `/industrias/${detail.slug}`,
    locale: lang === 'en' ? 'en_US' : 'es_CR'
  };
}

/**
 * Resuelve el contenido SEO de una URL (limpiando query/fragment). El diccionario usa rutas SIN
 * prefijo de idioma; acá se quita el `/en` para el lookup y se deriva el `canonicalPath` por idioma
 * (EN → `/en/...`), así cada página declara su URL canónica correcta. Maneja /software/<slug>.
 */
export function seoForUrl(url: string, lang: Lang): SeoData {
  const raw = (url || '/').split('#')[0].split('?')[0] || '/';
  const base = raw.replace(/^\/en(?=\/|$)/, '') || '/';
  const toCanonical = (p: string) => (lang === 'en' ? '/en' + (p === '/' ? '' : p) : p);
  // `singleUrl` (rutas sin variante /en) conserva su canonical tal cual: prefijarlo apuntaría
  // a una URL que no existe cuando el idioma activo es inglés.
  const withCanonical = (data: SeoData): SeoData => ({
    ...data,
    canonicalPath: data.singleUrl
      ? (data.canonicalPath ?? base)
      : toCanonical(data.canonicalPath ?? base)
  });

  // Detalle de sistema: /software/<slug>
  const detailMatch = base.match(/^\/software\/([^/]+)$/);
  if (detailMatch) {
    const detail = getSystemDetail(detailMatch[1], lang);
    if (detail) return withCanonical(systemSeo(detail, lang));
  }

  // Detalle de industria: /industrias/<slug>
  const industryMatch = base.match(/^\/industrias\/([^/]+)$/);
  if (industryMatch) {
    const detail = getIndustryDetail(industryMatch[1], lang);
    if (detail) return withCanonical(industrySeo(detail, lang));
  }

  // Ficha de un demo de la landing de software CR: /desarrollo-de-software-costa-rica/<slug>, en ES
  // y EN (/en/…). Sin `singleUrl`: withCanonical antepone /en al canonical en inglés y SeoService
  // declara el par hreflang recíproco. INDEXABLE como el hub desde el 2026-09-08: sin `robots`
  // propio hereda el `index, follow, …` de SeoService, ya no lleva cabecera X-Robots-Tag y las doce
  // URLs (seis fichas × dos idiomas) entran al sitemap, al de videos y al llms.txt en el mismo push.
  const caseMatch = base.match(/^\/desarrollo-de-software-costa-rica\/([^/]+)$/);
  if (caseMatch) {
    const c = getSoftwareCrCase(caseMatch[1], lang);
    if (c) {
      return withCanonical({
        // Sufijo corto: la categoría ya es la keyword de la ficha y el país va en la description.
        // Todos los títulos del sitio cierran con la marca, también cuando el nombre del demo es
        // largo: con «Vértice Seguridad Industrial» el título llega a 73 caracteres y el buscador
        // recorta el sufijo, que es la parte prescindible. La alternativa, omitir la marca solo en
        // esa ficha, dejaba el par ES/EN desparejo.
        title: `${c.name}: ${c.category} | Link Design`,
        description: caseDescription(c, lang),
        keywords:
          lang === 'en'
            ? `${c.category.toLowerCase()}, custom software costa rica, link design`
            : `${c.category.toLowerCase()}, software a la medida costa rica, link design`,
        canonicalPath: `/desarrollo-de-software-costa-rica/${c.slug}`,
        // Póster propio del demo (1280×682) en vez de la imagen genérica del sitio.
        image: SITE_ORIGIN + c.poster,
        imageWidth: 1280,
        imageHeight: 682,
        imageAlt: `${c.name}: ${c.category}`,
        dateModified: '2026-09-08',
        ...(lang === 'en' ? { locale: 'en_US' } : {})
      });
    }
  }

  const entry = SEO_CONTENT[base] ?? SEO_FALLBACK;
  return withCanonical(entry[lang]);
}
