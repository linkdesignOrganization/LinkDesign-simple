import { INDUSTRY_SLUGS } from '../pages/industries-content';
import { getSoftwareCrCase, SOFTWARE_CR_CASE_SLUGS } from '../pages/software-cr-cases-content';
import { SYSTEM_SLUGS } from '../pages/systems-content';
import { Lang } from './language.service';
import { SEO_CONTENT, seoForUrl } from './seo-content';

/**
 * SEO del hub «Desarrollo de software a la medida en Costa Rica» y de sus fichas en los dos idiomas
 * (PLAN-EN-SOFTWARE-CR.md §3.3, §4.3, §7.2 y §9; auditoría SEO del 2026-09-08, puntos M1, B3, M4 y
 * M7): canonical por idioma, sin `singleUrl`, descriptions de 120 a 160 caracteres, título de ficha
 * con sufijo corto, póster propio como og:image y `dateModified`.
 *
 * Desde el encendido del 2026-09-08 las catorce páginas son indexables: no declaran `robots`, así
 * que SeoService les aplica su valor por defecto, el mismo del resto del sitio («index, follow,
 * max-image-preview:large, max-snippet:-1, max-video-preview:-1»). Las dos únicas rutas que sí
 * declaran `robots` son /ads y /404, y los tests del final lo fijan para que nadie las encienda por
 * accidente. El bloque «higiene de SEO_CONTENT» cubre el resto del sitio: rango de la description,
 * campos completos por idioma y ningún guion largo en los títulos.
 */

// Regex de fuga de §7.1 del plan, para las tres cadenas SEO en inglés.
const SPANISH_LEAK =
  /¿|ñ|[áéíóúÁÉÍÓÚ]|\b(de la|de los|para que|porque|también|desde|cada|sistemas?|empresas?|nosotros|contigo|puedes|tu|tus)\b/g;
const PROPER_NAMES =
  /Vértice Seguridad Industrial|Nolõ|San José|Estudio Dental Mendieta|Tornos del Sur|Punto Cero|SINPE Móvil|Mercado Pago|Costa Rica|Link Design|Gran Área Metropolitana/g;
const leaks = (text: string) =>
  text.replace(/«[^»]*»/g, '').replace(PROPER_NAMES, '').match(SPANISH_LEAK) ?? [];

const HUB = '/desarrollo-de-software-costa-rica';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const LANGS: Lang[] = ['es', 'en'];

describe('seoForUrl (hub de software CR y fichas)', () => {
  it('resolves the hub in English with a /en canonical, indexable and no singleUrl', () => {
    const seo = seoForUrl(`/en${HUB}`, 'en');

    expect(seo.canonicalPath).toBe(`/en${HUB}`);
    // Sin `robots` propio: SeoService aplica el «index, follow, …» del resto del sitio.
    expect(seo.robots).toBeUndefined();
    expect(seo.singleUrl).toBeFalsy();
    expect(seo.locale).toBe('en_US');
    expect(seo.title).toBe(SEO_CONTENT[HUB].en.title);
    expect(seo.dateModified).toMatch(ISO_DATE);
    // El hub usa la imagen genérica del sitio (la pone SeoService).
    expect(seo.image).toBeUndefined();
    expect(leaks(`${seo.title} ${seo.description} ${seo.keywords}`)).toEqual([]);

    // El fragment del nav (#precios) y el query no cambian el canonical.
    expect(seoForUrl(`/en${HUB}#precios`, 'en').canonicalPath).toBe(`/en${HUB}`);
    expect(seoForUrl(`/en${HUB}?x=1`, 'en').canonicalPath).toBe(`/en${HUB}`);
  });

  it('resolves the hub in Spanish without the language prefix', () => {
    const seo = seoForUrl(HUB, 'es');

    expect(seo.canonicalPath).toBe(HUB);
    expect(seo.robots).toBeUndefined();
    expect(seo.singleUrl).toBeFalsy();
    expect(seo.title).toBe(SEO_CONTENT[HUB].es.title);
    expect(seo.dateModified).toMatch(ISO_DATE);
  });

  it('resolves an English case with its English category and description under /en', () => {
    const seo = seoForUrl(`/en${HUB}/pulso`, 'en');

    expect(seo.title).toBe('Pulso: Gym & wellness management system | Link Design');
    expect(seo.description).toBe(
      'Demo of a custom gym & wellness management system built in Costa Rica: it costs USD 4,000 to 7,500* and takes 8 to 12 weeks*. Browse the full Pulso demo.'
    );
    expect(seo.canonicalPath).toBe(`/en${HUB}/pulso`);
    expect(seo.robots).toBeUndefined();
    expect(seo.singleUrl).toBeFalsy();
    expect(seo.locale).toBe('en_US');
    expect(seo.keywords).toContain('link design');
    // Póster propio del demo como og:image, con sus dimensiones y su alt.
    expect(seo.image).toMatch(/^https?:\/\/.+\/media\/software\/pulso\.jpg$/);
    expect(seo.imageWidth).toBe(1280);
    expect(seo.imageHeight).toBe(682);
    expect(seo.imageAlt).toBe('Pulso: Gym & wellness management system');
    expect(seo.dateModified).toMatch(ISO_DATE);
    expect(leaks(`${seo.title} ${seo.description} ${seo.keywords}`)).toEqual([]);
  });

  it('resolves every case in English from its own English content', () => {
    for (const slug of SOFTWARE_CR_CASE_SLUGS) {
      const c = getSoftwareCrCase(slug, 'en')!;
      const seo = seoForUrl(`/en${HUB}/${slug}`, 'en');

      expect(seo.title, slug).toBe(`${c.name}: ${c.category} | Link Design`);
      expect(seo.description, slug).toMatch(/^Demo of a custom /);
      expect(seo.description, slug).toContain('built in Costa Rica');
      expect(seo.description, slug).toContain(c.range);
      expect(seo.description, slug).toContain(c.timeline);
      expect(seo.description, slug).toMatch(/Browse the full (?:.+ )?demo\.$/);
      expect(seo.keywords, slug).toContain(c.category.toLowerCase());
      expect(seo.canonicalPath, slug).toBe(`/en${HUB}/${slug}`);
      expect(seo.image, slug).toMatch(new RegExp(`^https?://.+${c.poster.replace('.', '\\.')}$`));
      expect(seo.imageAlt, slug).toBe(`${c.name}: ${c.category}`);
      expect(seo.robots, slug).toBeUndefined();
      expect(seo.singleUrl, slug).toBeFalsy();
      expect(leaks(`${seo.title} ${seo.description} ${seo.keywords}`), slug).toEqual([]);
    }
  });

  it('resolves the Spanish case with the Spanish sentence and no prefix', () => {
    const seo = seoForUrl(`${HUB}/pulso`, 'es');

    expect(seo.title).toBe('Pulso: Sistema de gestión para gimnasios y wellness | Link Design');
    expect(seo.description).toBe(
      'Demo de un sistema de gestión para gimnasios y wellness hecho a la medida en Costa Rica: cuesta USD 4.000 a 7.500* y toma 8 a 12 semanas*. Navégalo completo.'
    );
    expect(seo.canonicalPath).toBe(`${HUB}/pulso`);
    expect(seo.robots).toBeUndefined();
    expect(seo.singleUrl).toBeFalsy();
    expect(seo.imageAlt).toBe('Pulso: Sistema de gestión para gimnasios y wellness');
  });

  it('resolves every case in Spanish with category, country, range and timeline', () => {
    for (const slug of SOFTWARE_CR_CASE_SLUGS) {
      const c = getSoftwareCrCase(slug, 'es')!;
      const seo = seoForUrl(`${HUB}/${slug}`, 'es');

      expect(seo.title, slug).toBe(`${c.name}: ${c.category} | Link Design`);
      expect(seo.description, slug).toMatch(/^Demo de un /);
      expect(seo.description, slug).toContain('hecho a la medida en Costa Rica');
      expect(seo.description, slug).toContain(c.range);
      expect(seo.description, slug).toContain(c.timeline);
      expect(seo.description, slug).toMatch(/Navégalo completo\.$/);
      expect(seo.canonicalPath, slug).toBe(`${HUB}/${slug}`);
      expect(seo.robots, slug).toBeUndefined();
      expect(seo.dateModified, slug).toMatch(ISO_DATE);
    }
  });

  it('lowercases the category inside the description unless it starts with an acronym', () => {
    expect(seoForUrl(`${HUB}/cumbre`, 'es').description).toContain(
      'Demo de un sistema de gestión de recursos humanos hecho'
    );
    expect(seoForUrl(`${HUB}/tornos-del-sur`, 'es').description).toContain(
      'Demo de un ERP industrial hecho'
    );
    expect(seoForUrl(`/en${HUB}/cumbre`, 'en').description).toContain(
      'Demo of a custom HR management system built'
    );
    expect(seoForUrl(`/en${HUB}/tornos-del-sur`, 'en').description).toContain(
      'Demo of a custom industrial ERP built'
    );
  });

  it('keeps the demo name in the English call to action only when it fits in 160 characters', () => {
    expect(seoForUrl(`/en${HUB}/pulso`, 'en').description).toMatch(/Browse the full Pulso demo\.$/);
    expect(seoForUrl(`/en${HUB}/estudio-dental-mendieta`, 'en').description).toMatch(
      /weeks\*\. Browse the full demo\.$/
    );
  });

  it('keeps every description of the hub and the twelve cases between 120 and 160 characters', () => {
    const pages = [
      seoForUrl(HUB, 'es'),
      seoForUrl(`/en${HUB}`, 'en'),
      ...SOFTWARE_CR_CASE_SLUGS.flatMap((slug) => [
        seoForUrl(`${HUB}/${slug}`, 'es'),
        seoForUrl(`/en${HUB}/${slug}`, 'en')
      ])
    ];

    expect(pages).toHaveLength(14);
    for (const page of pages) {
      expect(page.description.length, page.canonicalPath).toBeLessThanOrEqual(160);
      expect(page.description.length, page.canonicalPath).toBeGreaterThanOrEqual(120);
    }
  });

  it('keeps /ads as a single URL for both languages, and out of the index', () => {
    for (const lang of LANGS) {
      const seo = seoForUrl('/ads', lang);
      expect(seo.singleUrl, lang).toBe(true);
      expect(seo.canonicalPath, lang).toBe('/ads');
      // A propósito y por contrato con Google (CLAUDE.md del repo): la homepage de la app OAuth de
      // Google Ads no es contenido del sitio. `follow` para que los enlaces salientes sigan valiendo.
      expect(seo.robots, lang).toBe('noindex, follow');
    }
  });

  it('keeps /404 out of the index in both languages', () => {
    for (const lang of LANGS) {
      const seo = seoForUrl('/404', lang);
      expect(seo.robots, lang).toBe('noindex, follow');
    }
  });
});

/**
 * Higiene de la tabla SEO de todo el sitio, no solo del hub: largo de la description, campos
 * completos por idioma y nada de guiones largos en los títulos (el sitio los prohíbe en sus copys).
 */
describe('SEO_CONTENT (todo el sitio)', () => {
  // /404 no se indexa: su description no compite por ningún recorte de Google.
  const INDEXABLE = Object.keys(SEO_CONTENT).filter((route) => route !== '/404');

  it('declares robots only on /ads and /404', () => {
    const withRobots = Object.entries(SEO_CONTENT)
      .filter(([, entry]) => LANGS.some((lang) => entry[lang].robots))
      .map(([route]) => route);

    expect(withRobots.sort()).toEqual(['/404', '/ads']);
  });

  it('keeps every indexable description between 120 and 160 characters', () => {
    for (const route of INDEXABLE) {
      for (const lang of LANGS) {
        const { description } = SEO_CONTENT[route][lang];
        expect(description.length, `${route} (${lang})`).toBeGreaterThanOrEqual(120);
        expect(description.length, `${route} (${lang})`).toBeLessThanOrEqual(160);
      }
    }
  });

  it('fills title, description, keywords and canonicalPath in both languages', () => {
    for (const [route, entry] of Object.entries(SEO_CONTENT)) {
      for (const lang of LANGS) {
        const data = entry[lang];
        expect(data.title.length, `${route} (${lang})`).toBeGreaterThan(0);
        expect(data.keywords.length, `${route} (${lang})`).toBeGreaterThan(0);
        expect(data.canonicalPath, `${route} (${lang})`).toBe(route);
      }
      // El idioma que le toca a cada entrada: la inglesa marca su locale y ninguna repite el texto
      // de la otra (síntoma de haber copiado la entrada del otro idioma).
      expect(entry.en.locale, route).toBe('en_US');
      expect(entry.es.locale, route).toBeUndefined();
      expect(entry.en.title, route).not.toBe(entry.es.title);
      expect(entry.en.description, route).not.toBe(entry.es.description);
      // Las keywords sí pueden coincidir: las de /404 son solo nombres propios («link design,
      // costa rica»), iguales en los dos idiomas por definición.
      // Sin restos del español en la entrada inglesa.
      const en = `${entry.en.title} ${entry.en.description} ${entry.en.keywords}`;
      expect(leaks(en), route).toEqual([]);
    }
  });

  it('resolves the canonical of every route by language, except the single-URL ones', () => {
    for (const [route, entry] of Object.entries(SEO_CONTENT)) {
      expect(seoForUrl(route, 'es').canonicalPath, route).toBe(route);

      const en = seoForUrl(route === '/' ? '/en' : `/en${route}`, 'en');
      expect(en.canonicalPath, route).toBe(
        entry.en.singleUrl ? route : `/en${route === '/' ? '' : route}`
      );
    }
  });
});

/**
 * Títulos derivados (sistemas, industrias y fichas): el separador es la barra y nunca el guion
 * largo, que el sitio prohíbe en sus copys y que hasta el 2026-09-08 salía en el <title> de las
 * siete páginas de sistema.
 */
describe('títulos derivados', () => {
  // Las páginas de detalle, que componen su SEO en seo-content.ts y no en la tabla.
  const derived = () => [
    ...SYSTEM_SLUGS.flatMap((slug) => [
      seoForUrl(`/software/${slug}`, 'es'),
      seoForUrl(`/en/software/${slug}`, 'en')
    ]),
    ...INDUSTRY_SLUGS.flatMap((slug) => [
      seoForUrl(`/industrias/${slug}`, 'es'),
      seoForUrl(`/en/industrias/${slug}`, 'en')
    ]),
    ...SOFTWARE_CR_CASE_SLUGS.flatMap((slug) => [
      seoForUrl(`${HUB}/${slug}`, 'es'),
      seoForUrl(`/en${HUB}/${slug}`, 'en')
    ])
  ];

  const everySeo = () => [
    ...Object.keys(SEO_CONTENT).flatMap((route) => [
      seoForUrl(route, 'es'),
      seoForUrl(route === '/' ? '/en' : `/en${route}`, 'en')
    ]),
    ...derived()
  ];

  it('never uses an em dash anywhere in the SEO strings', () => {
    for (const seo of everySeo()) {
      expect(`${seo.title} ${seo.description} ${seo.keywords}`, seo.canonicalPath).not.toContain(
        '—'
      );
      expect(seo.title, seo.canonicalPath).toContain('Link Design');
    }
  });

  it('closes every derived title with the brand', () => {
    // La tabla no entra: el título del home abre con la marca en vez de cerrar con ella.
    for (const seo of derived()) {
      expect(seo.title, seo.canonicalPath).toMatch(/Link Design$/);
    }
  });

  it('never lets a derived description pass 160 characters', () => {
    // Solo el tope: metaDescription() corta en fin de oración y nunca a media palabra, así que tres
    // páginas de sistema quedan cortas (automatización con IA en los dos idiomas, 101 y 96, y el ERP
    // en inglés, 116) porque su segunda oración no entra en 158. Subirlas de 120 pide reescribir el
    // párrafo «Qué es» en systems-content.ts, que es copy aprobado y no se toca desde acá.
    for (const seo of derived()) {
      expect(seo.description.length, seo.canonicalPath).toBeLessThanOrEqual(160);
    }
  });

  it('keeps the seven system titles under 70 characters', () => {
    for (const slug of SYSTEM_SLUGS) {
      for (const lang of LANGS) {
        const seo = seoForUrl(lang === 'en' ? `/en/software/${slug}` : `/software/${slug}`, lang);
        expect(seo.title.length, `${slug} (${lang})`).toBeLessThanOrEqual(70);
        const tail = `| ${lang === 'en' ? 'Custom software' : 'Software a medida'} | Link Design`;
        expect(seo.title, `${slug} (${lang})`).toContain(tail);
      }
    }
  });
});
