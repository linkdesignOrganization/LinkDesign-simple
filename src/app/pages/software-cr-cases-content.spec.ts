import { routes } from '../app.routes';
import type { Viewcase } from '../components/viewcases.component';
import type { Lang } from '../services/language.service';
import type { LandingData } from './landing-page';
import {
  SOFTWARE_CR_CASES,
  SOFTWARE_CR_CASES_EN,
  SOFTWARE_CR_CASE_LABELS,
  SOFTWARE_CR_CASE_LABELS_EN,
  SOFTWARE_CR_CASE_SLUGS,
  SoftwareCrCase,
  getSoftwareCrCase,
  getSoftwareCrCaseForSystem,
  getSoftwareCrCaseLabels,
  getSoftwareCrCases
} from './software-cr-cases-content';

/**
 * Paridad ES/EN de las fichas de los demos (PLAN-EN-SOFTWARE-CR.md §4.2 y §7.2): el inglés es una
 * capa sobre el español que conserva enlaces, media, cifras y los rótulos citados de los demos, y
 * dice la misma categoría que la tarjeta de /software. Sin fugas de español, con prueba de que el
 * detector caza.
 */

// Regex de fuga de §7.1 del plan, copiada tal cual (sin retipear).
const SPANISH_LEAK =
  /¿|ñ|[áéíóúÁÉÍÓÚ]|\b(de la|de los|para que|porque|también|desde|cada|sistemas?|empresas?|nosotros|contigo|puedes|tu|tus)\b/g;

// Nombres propios que el inglés conserva (§7.1): se quitan antes de buscar fugas.
const PROPER_NAMES =
  /Vértice Seguridad Industrial|Nolõ|San José|Estudio Dental Mendieta|Tornos del Sur|Punto Cero|SINPE Móvil|Mercado Pago|Costa Rica|Link Design|Gran Área Metropolitana/g;

// Campos que no son texto traducible: vienen del ES y quedan fuera del escaneo de fugas.
const INVARIANT_KEYS = new Set(['slug', 'system', 'poster', 'video', 'videoMobile', 'link']);

/** Quita las citas «…» (rótulos de los demos, en español a propósito) y los nombres propios. */
function stripAllowed(text: string): string {
  return text.replace(/«[^»]*»/g, '').replace(PROPER_NAMES, '');
}

/** Marcas de español que quedan en un texto inglés tras la limpieza. */
function leaks(text: string): string[] {
  return stripAllowed(text).match(SPANISH_LEAK) ?? [];
}

type Leaf = { path: string; value: string };

/** Todas las hojas string de un objeto, con su ruta (`pulso.inside[2]`) para leer el fallo. */
function stringLeaves(node: unknown, path: string, skip: ReadonlySet<string> = new Set()): Leaf[] {
  if (typeof node === 'string') return [{ path, value: node }];
  if (Array.isArray(node)) {
    return node.flatMap((item, i) => stringLeaves(item, `${path}[${i}]`, skip));
  }
  if (node && typeof node === 'object') {
    return Object.entries(node as Record<string, unknown>)
      .filter(([key]) => !skip.has(key))
      .flatMap(([key, value]) => stringLeaves(value, `${path}.${key}`, skip));
  }
  return [];
}

const digits = (text: string) => text.replace(/\D/g, '');
const quotes = (text: string) => text.match(/«[^»]*»/g) ?? [];

/** Tarjetas del bloque `viewcases` de /software en app.routes.ts, por árbol de idioma. */
function viewcaseItems(lang: Lang): Viewcase[] {
  const tree = routes.find((r) => r.path === (lang === 'en' ? 'en' : ''));
  const software = tree?.children?.find((r) => r.path === 'software');
  const data = software?.data?.[lang] as LandingData | undefined;
  return data?.viewcases?.items ?? [];
}

describe('SOFTWARE_CR_CASES (paridad ES/EN de las fichas)', () => {
  it('lists the six demos in the hub order and resolves them by language', () => {
    expect(SOFTWARE_CR_CASE_SLUGS).toEqual([
      'pulso',
      'cumbre',
      'estudio-dental-mendieta',
      'tornos-del-sur',
      'punto-cero',
      'vertice-seguridad-industrial'
    ]);
    expect(getSoftwareCrCases('es')).toBe(SOFTWARE_CR_CASES);
    expect(getSoftwareCrCases('en').map((c) => c.slug)).toEqual(SOFTWARE_CR_CASE_SLUGS);
    expect(Object.keys(SOFTWARE_CR_CASES_EN).sort()).toEqual([...SOFTWARE_CR_CASE_SLUGS].sort());

    expect(getSoftwareCrCase('no-existe', 'en')).toBeNull();
    expect(getSoftwareCrCase(null, 'en')).toBeNull();
    expect(viewcaseItems('es').length).toBe(6);
    expect(viewcaseItems('en').length).toBe(6);
  });

  for (const slug of SOFTWARE_CR_CASE_SLUGS) {
    describe(slug, () => {
      const es = getSoftwareCrCase(slug, 'es')!;
      const en = getSoftwareCrCase(slug, 'en')!;

      it('keeps slug, system, media, link and name from the Spanish source', () => {
        expect(en).not.toBe(es);
        expect(en.slug).toBe(es.slug);
        expect(en.system).toBe(es.system);
        expect(en.poster).toBe(es.poster);
        expect(en.video).toBe(es.video);
        expect(en.videoMobile).toBe(es.videoMobile);
        expect(en.link).toBe(es.link);
        expect(en.name).toBe(es.name);
        // La capa EN se aplicó de verdad: el texto cambia.
        expect(en.category).not.toBe(es.category);
        expect(en.summary).not.toBe(es.summary);
      });

      it('keeps list lengths and the same figures', () => {
        expect(es.copied.length).toBeGreaterThan(0);
        expect(es.inside.length).toBeGreaterThan(0);
        expect(en.copied.length).toBe(es.copied.length);
        expect(en.inside.length).toBe(es.inside.length);

        expect(digits(en.range)).toBe(digits(es.range));
        expect(digits(en.timeline)).toBe(digits(es.timeline));
        expect(es.range).toMatch(/^USD \d{1,2}\.\d{3} a \d{1,2}\.\d{3}\*$/);
        expect(es.timeline).toMatch(/^\d+ a \d+ semanas\*$/);
        expect(en.range).toMatch(/^USD \d{1,2},\d{3} to \d{1,2},\d{3}\*$/);
        expect(en.timeline).toMatch(/^\d+ to \d+ weeks\*$/);
      });

      it('keeps every quoted demo label «…» verbatim in the same English item', () => {
        es.inside.forEach((item, i) => {
          for (const quote of quotes(item)) {
            expect(en.inside[i], `${slug}.inside[${i}]`).toContain(quote);
          }
        });
        // Y el inglés no inventa ni pierde citas: las mismas, ítem por ítem.
        expect(en.inside.map(quotes)).toEqual(es.inside.map(quotes));
        const allQuotes = (c: SoftwareCrCase) =>
          stringLeaves(c, slug, INVARIANT_KEYS)
            .flatMap((leaf) => quotes(leaf.value))
            .sort();
        expect(allQuotes(en)).toEqual(allQuotes(es));
      });

      it('says the same category as its card in the viewcases block of /software', () => {
        const cardEs = viewcaseItems('es').find((v) => v.label === es.name);
        const cardEn = viewcaseItems('en').find((v) => v.label === es.name);
        expect(cardEs, `tarjeta ES de ${es.name}`).toBeDefined();
        expect(cardEn, `tarjeta EN de ${es.name}`).toBeDefined();

        expect(en.category).toBe(cardEn!.category);
        expect(es.category).toBe(cardEs!.category);
        for (const card of [cardEs!, cardEn!]) {
          expect(card.detail).toBe(`/desarrollo-de-software-costa-rica/${slug}`);
          expect(card.link).toBe(es.link);
          expect(card.poster).toBe(es.poster);
          expect(card.videoSrc).toBe(es.video);
        }
      });
    });
  }

  it('finds the demo of a system type page by language', () => {
    const crmEn = getSoftwareCrCaseForSystem('crm-a-medida', 'en');
    const crmEs = getSoftwareCrCaseForSystem('crm-a-medida', 'es');
    expect(crmEn?.name).toBe('Vértice Seguridad Industrial');
    expect(crmEn?.category).toBe('Commercial & inventory ERP');
    expect(crmEs?.name).toBe('Vértice Seguridad Industrial');
    expect(getSoftwareCrCaseForSystem('dashboards-y-reporting', 'en')?.slug).toBe('pulso');
    expect(getSoftwareCrCaseForSystem('no-existe', 'en')).toBeNull();
    expect(getSoftwareCrCaseForSystem(null, 'en')).toBeNull();
  });

  it('keeps the same label keys and adds only the demo-language note in English', () => {
    expect(Object.keys(SOFTWARE_CR_CASE_LABELS_EN).sort()).toEqual(
      Object.keys(SOFTWARE_CR_CASE_LABELS).sort()
    );
    expect(getSoftwareCrCaseLabels('en')).toBe(SOFTWARE_CR_CASE_LABELS_EN);
    expect(getSoftwareCrCaseLabels('es')).toBe(SOFTWARE_CR_CASE_LABELS);
    // Decisión 2.3 del plan: la única afirmación que el EN agrega sobre el ES.
    expect(SOFTWARE_CR_CASE_LABELS_EN.confidentiality).toMatch(
      /The demos are in Spanish, with sample data\.$/
    );
    expect(SOFTWARE_CR_CASE_LABELS.confidentiality).not.toMatch(/español/);
  });

  it('has no Spanish leaks in the English copy', () => {
    const leaves = [
      ...getSoftwareCrCases('en').flatMap((c) => stringLeaves(c, c.slug, INVARIANT_KEYS)),
      ...stringLeaves(SOFTWARE_CR_CASE_LABELS_EN, 'SOFTWARE_CR_CASE_LABELS_EN')
    ];
    // El recorrido de verdad visita el copy (6 fichas + 19 rótulos: 136 cadenas).
    expect(leaves.length).toBeGreaterThan(100);

    const found = leaves
      .filter((leaf) => leaks(leaf.value).length > 0)
      .map((leaf) => `${leaf.path}: ${leaks(leaf.value).join(', ')}`);
    expect(found).toEqual([]);
  });

  it('proves the leak detector catches a planted Spanish sentence', () => {
    expect(leaks('¿Prueba para que la vea?')).toEqual(['¿', 'para que']);
    // La limpieza ignora las citas «…» y los nombres propios, pero no el texto suelto.
    expect(
      leaks('Members at churn risk («Socios en zona roja») at Estudio Dental Mendieta')
    ).toEqual([]);
    expect(leaks('Members at churn risk (Socios en zona roja)')).toEqual([]);
    expect(leaks('Members at churn risk (Socios en zona roja) para que la vea')).toEqual([
      'para que'
    ]);
  });

  it('uses no em dashes in either language', () => {
    const leaves = [
      ...SOFTWARE_CR_CASES.flatMap((c) => stringLeaves(c, `es.${c.slug}`)),
      ...getSoftwareCrCases('en').flatMap((c) => stringLeaves(c, `en.${c.slug}`)),
      ...stringLeaves(SOFTWARE_CR_CASE_LABELS, 'SOFTWARE_CR_CASE_LABELS'),
      ...stringLeaves(SOFTWARE_CR_CASE_LABELS_EN, 'SOFTWARE_CR_CASE_LABELS_EN')
    ];
    expect(leaves.filter((leaf) => leaf.value.includes('—')).map((leaf) => leaf.path)).toEqual([]);
  });
  // El clip de celular es el mismo video en 720 px: mismo nombre con sufijo -mobile, para que
  // nadie apunte a un archivo que no existe al agregar una ficha.
  it('cada ficha declara el clip de celular derivado de su video', () => {
    for (const c of Object.values(SOFTWARE_CR_CASES)) {
      expect(c.videoMobile).toBe(c.video.replace('.mp4', '-mobile.mp4'));
    }
  });
});
