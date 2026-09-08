import { getSoftwareCrCase, SOFTWARE_CR_CASE_SLUGS } from '../pages/software-cr-cases-content';
import { SEO_CONTENT, seoForUrl } from './seo-content';

/**
 * SEO del hub «Desarrollo de software a la medida en Costa Rica» y de sus fichas en los dos idiomas
 * (PLAN-EN-SOFTWARE-CR.md §3.3, §4.3 y §7.2; auditoría SEO del 2026-09-08, puntos M1, B3, M4 y M7):
 * canonical por idioma, `noindex, nofollow`, sin `singleUrl`; descriptions de 120 a 160 caracteres;
 * título de ficha con sufijo corto; póster propio como og:image; `dateModified`; y /ads sigue siendo
 * una sola URL.
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

describe('seoForUrl (hub de software CR y fichas)', () => {
  it('resolves the hub in English with a /en canonical, noindex and no singleUrl', () => {
    const seo = seoForUrl(`/en${HUB}`, 'en');

    expect(seo.canonicalPath).toBe(`/en${HUB}`);
    expect(seo.robots).toBe('noindex, nofollow');
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
    expect(seo.robots).toBe('noindex, nofollow');
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
    expect(seo.robots).toBe('noindex, nofollow');
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
      expect(seo.robots, slug).toBe('noindex, nofollow');
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
    expect(seo.robots).toBe('noindex, nofollow');
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
      expect(seo.robots, slug).toBe('noindex, nofollow');
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

  it('keeps /ads as a single URL for both languages', () => {
    for (const lang of ['es', 'en'] as const) {
      const seo = seoForUrl('/ads', lang);
      expect(seo.singleUrl, lang).toBe(true);
      expect(seo.canonicalPath, lang).toBe('/ads');
      expect(seo.robots, lang).toBe('noindex, follow');
    }
  });
});
