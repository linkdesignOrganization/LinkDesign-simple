import { Lang } from './language.service';
import { SeoData } from './seo.service';
import { getSystemDetail, SystemDetail } from '../pages/systems-content';
import { getIndustryDetail, IndustryDetail } from '../pages/industries-content';

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
      title: 'Software a medida para empresas | Link Design CR',
      description:
        'Aplicaciones internas, automatización e integración tecnológica. Creamos software a medida que ordena procesos y mejora la productividad.',
      keywords:
        'software a medida, desarrollo de software, aplicaciones internas, automatización, integración tecnológica, costa rica',
      canonicalPath: '/software'
    },
    en: {
      title: 'Custom software for companies | Link Design CR',
      description:
        'Internal apps, automation and tech integration. We build custom software that organizes processes and boosts productivity.',
      keywords:
        'custom software, software development, internal apps, automation, tech integration, costa rica',
      canonicalPath: '/software',
      locale: 'en_US'
    }
  },
  '/web': {
    es: {
      title: 'Desarrollo web a medida | Link Design Costa Rica',
      description:
        'Sitios web corporativos, e-commerce y landing pages a medida. Diseño moderno, rendimiento y escalabilidad para empresas en Costa Rica.',
      keywords:
        'desarrollo web, sitios corporativos, e-commerce, landing pages, diseño web, costa rica',
      canonicalPath: '/web'
    },
    en: {
      title: 'Custom web development | Link Design Costa Rica',
      description:
        'Custom corporate websites, e-commerce and landing pages. Modern design, performance and scalability for companies in Costa Rica.',
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
        'Software y sitios web a medida para tu sector en Costa Rica: industria, distribución y logística, salud, servicios profesionales y técnicos, fitness y educación.',
      keywords:
        'industrias, soluciones por industria, software a medida, sitios web, costa rica, link design',
      canonicalPath: '/industrias'
    },
    en: {
      title: 'Custom solutions by industry | Link Design CR',
      description:
        'Custom software and websites for your sector in Costa Rica: industry, distribution and logistics, health, professional and technical services, fitness and education.',
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
        "Let's talk about your project in Costa Rica. Reach us by email or WhatsApp and book a meeting with our digital team.",
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

function metaDescription(text: string, max = 158): string {
  const para = text.split('\n\n')[0].trim();
  if (para.length <= max) return para;

  const window = para.slice(0, max + 1);
  const sentenceEnd = Math.max(
    lastSentenceBoundary(window, '.'),
    lastSentenceBoundary(window, '!'),
    lastSentenceBoundary(window, '?')
  );
  if (sentenceEnd >= 80) return para.slice(0, sentenceEnd + 1).trim();

  const colon = window.lastIndexOf(':');
  if (colon >= 80) return para.slice(0, colon).trim() + '.';

  const cut = para.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

// SEO derivado del contenido aprobado de cada sistema (no es copy nuevo: el title usa el nombre
// del sistema y la descripción es su párrafo "Qué es" recortado para el meta).
function systemSeo(detail: SystemDetail, lang: Lang): SeoData {
  const description = metaDescription(detail.whatItIs);
  const suffix = lang === 'en' ? 'Custom software — Link Design' : 'Software a medida — Link Design';
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
    title: `${detail.pageTitle} | Link Design`,
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
  const withCanonical = (data: SeoData): SeoData => ({
    ...data,
    canonicalPath: toCanonical(data.canonicalPath ?? base)
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

  const entry = SEO_CONTENT[base] ?? SEO_FALLBACK;
  return withCanonical(entry[lang]);
}
