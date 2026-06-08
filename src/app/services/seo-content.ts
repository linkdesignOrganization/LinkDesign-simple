import { Lang } from './language.service';
import { SeoData } from './seo.service';

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

/** Resuelve el contenido SEO de una URL (limpiando query/fragment). */
export function seoForUrl(url: string, lang: Lang): SeoData {
  const path = (url || '/').split('#')[0].split('?')[0] || '/';
  const entry = SEO_CONTENT[path] ?? SEO_FALLBACK;
  return entry[lang];
}
