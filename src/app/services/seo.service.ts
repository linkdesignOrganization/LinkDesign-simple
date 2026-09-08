import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  /** Path canónico (ej. '/software'); se resuelve contra siteUrl. */
  canonicalPath?: string;
  /** Imagen OG/Twitter (URL absoluta); sin ella va la genérica del sitio, de 1200×630. */
  image?: string;
  /** Dimensiones de `image`; si no vienen se asumen las de la genérica (1200×630). */
  imageWidth?: number;
  imageHeight?: number;
  /** Texto alternativo de `image` (og:image:alt y twitter:image:alt); sin él va el del sitio por idioma. */
  imageAlt?: string;
  locale?: string;
  robots?: string;
  /** Última actualización del contenido (YYYY-MM-DD); va al `dateModified` del WebPage. */
  dateModified?: string;
  /**
   * Ruta fuera de los árboles de idioma: una sola URL sirve ES+EN (no existe la variante
   * `/en/...`). Mantiene el canonical sin prefijo y apunta los tres hreflang a esa misma URL,
   * en vez de declarar un `/en/...` que daría 404.
   */
  singleUrl?: boolean;
}

const SOFTWARE_CR_HUB = '/desarrollo-de-software-costa-rica';

// Nombre corto del padre en el breadcrumb de las páginas de detalle (/software/:slug,
// /industrias/:slug y las fichas del hub de software CR), por idioma. SEO_CONTENT no tiene nombre
// corto (su title es largo para una miga) y este servicio no importa seo-content (sería un ciclo).
const BREADCRUMB_PARENTS: Record<string, { es: string; en: string }> = {
  '/software': { es: 'Software', en: 'Software' },
  '/industrias': { es: 'Industrias', en: 'Industries' },
  [SOFTWARE_CR_HUB]: {
    es: 'Desarrollo de software Costa Rica',
    en: 'Software development Costa Rica'
  }
};

/**
 * SeoService — title + meta tags (description, keywords, robots), Open Graph,
 * Twitter card y canonical, por ruta e idioma. Portado de LinkDesign2.0.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteOrigin = this.normalizeOrigin(environment.siteUrl) || 'https://linkdesign.cr';
  private readonly defaultImage = 'https://linkdesign.cr/og-image.png';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  apply(data: SeoData): void {
    const image = data.image || this.defaultImage;
    const locale = data.locale || 'es_CR';
    const isEn = locale === 'en_US';
    const imageAlt =
      data.imageAlt ||
      (isEn
        ? 'Link Design: web and software development in Costa Rica'
        : 'Link Design: desarrollo web y software en Costa Rica');
    const robots =
      data.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const url = this.absoluteUrl(data.canonicalPath ?? this.currentPath());

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ name: 'robots', content: robots });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: String(data.imageWidth ?? 1200) });
    this.meta.updateTag({ property: 'og:image:height', content: String(data.imageHeight ?? 630) });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    // El otro idioma de la misma página. Las rutas sin par /en (`singleUrl`) no lo declaran, y hay
    // que quitarlo: el <head> sobrevive a la navegación y quedaría el de la página anterior.
    if (data.singleUrl) {
      this.meta.removeTag('property="og:locale:alternate"');
    } else {
      this.meta.updateTag({ property: 'og:locale:alternate', content: isEn ? 'es_CR' : 'en_US' });
    }

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    this.setCanonical(url);
    this.setHreflang(data.canonicalPath ?? this.currentPath(), data.singleUrl);
    this.setJsonLd(data, url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  // Sitio single-URL bilingüe (toggle client-side): declaramos 'es' y 'x-default' a la URL canónica.
  // No declaramos 'en' porque la misma URL no sirve inglés por defecto a los crawlers (evita una señal
  // contradictoria); el SEO bilingüe pleno requeriría URLs por idioma.
  // hreflang recíproco a partir del path base (ES, sin /en): cada página declara su par es↔en
  // + x-default (= ES). Vale igual en páginas ES y EN.
  // `singleUrl`: la ruta no tiene par /en (ver SeoData) → los tres apuntan a ella misma. Hay que
  // reescribirlos igual: los <link> viven en el <head> y sobreviven a la navegación, así que sin
  // esto quedarían los de la página anterior.
  private setHreflang(canonicalPath: string, singleUrl?: boolean): void {
    if (singleUrl) {
      const self = this.absoluteUrl(canonicalPath);
      this.setAlternate('es', self);
      this.setAlternate('en', self);
      this.setAlternate('x-default', self);
      return;
    }
    const base = (canonicalPath || '/').replace(/^\/en(?=\/|$)/, '') || '/';
    const enPath = base === '/' ? '/en' : '/en' + base;
    this.setAlternate('es', this.absoluteUrl(base));
    this.setAlternate('en', this.absoluteUrl(enPath));
    this.setAlternate('x-default', this.absoluteUrl(base));
  }

  private setAlternate(hreflang: string, url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${hreflang}"]`
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  // JSON-LD por ruta: WebPage (inLanguage según idioma), Breadcrumb y Service para las dos líneas de
  // negocio. Se conecta al Organization/WebSite estáticos del index.html por @id.
  private setJsonLd(data: SeoData, url: string): void {
    const locale = data.locale || 'es_CR';
    const isEn = locale === 'en_US';
    const inLanguage = locale.replace('_', '-');
    // Path base (sin /en) SOLO para las comparaciones: así las rutas EN también reciben
    // Breadcrumb/Service correctos. `url` y los @id conservan la URL canónica (con /en).
    const path =
      ((data.canonicalPath ?? '/').split('#')[0].split('?')[0] || '/').replace(
        /^\/en(?=\/|$)/,
        ''
      ) || '/';
    const shortName = data.title.split('|')[0].trim();
    const langPrefix = isEn ? '/en' : '';

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: data.title,
        description: data.description,
        inLanguage,
        ...(data.dateModified ? { dateModified: data.dateModified } : {}),
        isPartOf: { '@id': `${this.siteOrigin}/#website` }
      }
    ];

    if (path !== '/') {
      // Inicio → padre (solo en las páginas de detalle, ver BREADCRUMB_PARENTS) → página actual,
      // con los nombres y las URLs del idioma activo.
      const crumbs: { name: string; item: string }[] = [
        {
          name: isEn ? 'Home' : 'Inicio',
          item: isEn ? this.absoluteUrl('/en') : `${this.siteOrigin}/`
        }
      ];
      const segments = path.split('/').filter(Boolean);
      const parent = segments.length === 2 ? BREADCRUMB_PARENTS['/' + segments[0]] : undefined;
      if (parent) {
        crumbs.push({
          name: isEn ? parent.en : parent.es,
          item: this.absoluteUrl(`${langPrefix}/${segments[0]}`)
        });
      }
      crumbs.push({ name: shortName, item: url });
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          ...crumb
        }))
      });
    }

    const isIndustry = path === '/industrias' || path.startsWith('/industrias/');
    const isSoftwareCr = path === SOFTWARE_CR_HUB || path.startsWith(`${SOFTWARE_CR_HUB}/`);
    if (
      path === '/software' ||
      path === '/web' ||
      path.startsWith('/software/') ||
      isIndustry ||
      isSoftwareCr
    ) {
      graph.push({
        '@type': 'Service',
        '@id': `${url}#service`,
        name: shortName,
        description: data.description,
        serviceType:
          path === '/web'
            ? 'Web development'
            : isIndustry
              ? 'Custom software & web development'
              : isSoftwareCr && !isEn
                ? 'Desarrollo de software a la medida'
                : 'Custom software development',
        areaServed: { '@type': 'Country', name: 'Costa Rica' },
        provider: { '@id': `${this.siteOrigin}/#organization` },
        // Solo el hub: el rango que dicen su tabla de precios y la respuesta 01 de su FAQ.
        ...(path === SOFTWARE_CR_HUB
          ? {
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'USD',
                lowPrice: 1500,
                highPrice: 15000
              }
            }
          : {})
      });
    }

    let script = this.doc.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-seo="route"]'
    );
    if (!script) {
      script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'route');
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }

  private currentPath(): string {
    return this.doc.location ? this.doc.location.pathname : '/';
  }

  private absoluteUrl(path: string): string {
    const clean = (path || '/').split('#')[0].split('?')[0];
    const normalized = clean === '/' ? '/' : '/' + clean.replace(/^\/+|\/+$/g, '');
    return `${this.siteOrigin}${normalized}`;
  }

  private normalizeOrigin(url?: string): string | null {
    if (!url) return null;
    try {
      return new URL(url).origin;
    } catch {
      return url.replace(/\/+$/, '');
    }
  }
}
