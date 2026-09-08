import {
  SOFTWARE_CR,
  SOFTWARE_CR_EN,
  SOFTWARE_CR_LABELS,
  SOFTWARE_CR_LABELS_EN,
  SoftwareCrContent,
  SoftwareCrLink,
  getSoftwareCrContent,
  getSoftwareCrLabels,
  getSoftwareCrPriceForSystem
} from './software-cr-content';

/**
 * Paridad ES/EN del hub «Desarrollo de software a la medida en Costa Rica» (PLAN-EN-SOFTWARE-CR.md
 * §4.1 y §7.2): misma forma, mismos largos, mismos invariantes y mismas cifras; y el inglés sin
 * fugas de español, con la prueba de que el detector caza.
 */

// Regex de fuga de §7.1 del plan, copiada tal cual (sin retipear).
const SPANISH_LEAK =
  /¿|ñ|[áéíóúÁÉÍÓÚ]|\b(de la|de los|para que|porque|también|desde|cada|sistemas?|empresas?|nosotros|contigo|puedes|tu|tus)\b/g;

// Nombres propios que el inglés conserva (§7.1): se quitan antes de buscar fugas.
const PROPER_NAMES =
  /Vértice Seguridad Industrial|Nolõ|San José|Estudio Dental Mendieta|Tornos del Sur|Punto Cero|SINPE Móvil|Mercado Pago|Costa Rica|Link Design|Gran Área Metropolitana/g;

// Claves que no son texto (enlaces, identificadores): fuera del escaneo de fugas.
const NON_TEXT_KEYS = new Set(['href', 'system', 'icon']);

/** Quita las citas «…» (rótulos de los demos, en español a propósito) y los nombres propios. */
function stripAllowed(text: string): string {
  return text.replace(/«[^»]*»/g, '').replace(PROPER_NAMES, '');
}

/** Marcas de español que quedan en un texto inglés tras la limpieza. */
function leaks(text: string): string[] {
  return stripAllowed(text).match(SPANISH_LEAK) ?? [];
}

type Leaf = { path: string; value: string };

/** Todas las hojas string de un objeto, con su ruta (`faq[2].answer`) para que el fallo se lea. */
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

/** Estructura de un objeto (claves ordenadas y largos de listas), sin los textos. */
function shape(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(shape);
  if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record)
        .sort()
        .map((key) => [key, shape(record[key])])
    );
  }
  return typeof node;
}

const digits = (text: string) => text.replace(/\D/g, '');

/** `href` de los trozos con enlace de cada párrafo de «Quiénes somos». */
function paragraphLinks(content: SoftwareCrContent): SoftwareCrLink[][] {
  return content.about.paragraphs.map((paragraph) =>
    typeof paragraph === 'string'
      ? []
      : paragraph.filter((part): part is SoftwareCrLink => typeof part !== 'string')
  );
}

const LISTS: ReadonlyArray<[string, (c: SoftwareCrContent) => ReadonlyArray<unknown>]> = [
  ['hero.stats', (c) => c.hero.stats],
  ['forWhom.fits', (c) => c.forWhom.fits],
  ['how.statement', (c) => c.how.statement],
  ['how.examples', (c) => c.how.examples],
  ['how.closing', (c) => c.how.closing],
  ['systems.integrations', (c) => c.systems.integrations],
  ['pricing.columns', (c) => c.pricing.columns],
  ['pricing.rows', (c) => c.pricing.rows],
  ['pricing.factors', (c) => c.pricing.factors],
  ['process.stages', (c) => c.process.stages],
  ['included.items', (c) => c.included.items],
  ['choose.items', (c) => c.choose.items],
  ['about.paragraphs', (c) => c.about.paragraphs],
  ['faq', (c) => c.faq]
];

describe('SOFTWARE_CR (paridad ES/EN del hub)', () => {
  it('keeps every list the same length in both languages', () => {
    for (const [name, pick] of LISTS) {
      expect(pick(SOFTWARE_CR).length, name).toBeGreaterThan(0);
      expect(pick(SOFTWARE_CR_EN).length, name).toBe(pick(SOFTWARE_CR).length);
    }
  });

  it('keeps the same keys and nesting in both languages', () => {
    expect(shape(SOFTWARE_CR_EN)).toEqual(shape(SOFTWARE_CR));
    expect(Object.keys(SOFTWARE_CR_LABELS_EN).sort()).toEqual(
      Object.keys(SOFTWARE_CR_LABELS).sort()
    );
  });

  it('copies the invariant fields verbatim: system, icon, order and the about links', () => {
    expect(SOFTWARE_CR_EN.pricing.rows.map((r) => r.system)).toEqual(
      SOFTWARE_CR.pricing.rows.map((r) => r.system)
    );
    expect(SOFTWARE_CR_EN.systems.integrations.map((i) => i.icon)).toEqual(
      SOFTWARE_CR.systems.integrations.map((i) => i.icon)
    );
    expect(SOFTWARE_CR_EN.process.stages.map((s) => s.order)).toEqual(
      SOFTWARE_CR.process.stages.map((s) => s.order)
    );

    const linksEs = paragraphLinks(SOFTWARE_CR);
    const linksEn = paragraphLinks(SOFTWARE_CR_EN);
    expect(linksEs.flat().map((l) => l.href)).toEqual(['https://nolo.ar']);
    const hrefs = (links: SoftwareCrLink[][]) => links.map((p) => p.map((l) => l.href));
    const texts = (links: SoftwareCrLink[][]) => links.map((p) => p.map((l) => l.text));
    expect(hrefs(linksEn)).toEqual(hrefs(linksEs));
    expect(texts(linksEn)).toEqual(texts(linksEs));
  });

  it('keeps the same figures in ranges, timelines, stats and durations', () => {
    const rowsEs = SOFTWARE_CR.pricing.rows;
    const rowsEn = SOFTWARE_CR_EN.pricing.rows;
    expect(rowsEn.map((r) => digits(r.range))).toEqual(rowsEs.map((r) => digits(r.range)));
    expect(rowsEn.map((r) => digits(r.timeline))).toEqual(rowsEs.map((r) => digits(r.timeline)));
    expect(SOFTWARE_CR_EN.hero.stats.map((s) => digits(s.value))).toEqual(
      SOFTWARE_CR.hero.stats.map((s) => digits(s.value))
    );
    expect(SOFTWARE_CR_EN.process.stages.map((s) => digits(s.duration))).toEqual(
      SOFTWARE_CR.process.stages.map((s) => digits(s.duration))
    );
    expect(digits(SOFTWARE_CR_EN.hero.updated)).toBe(digits(SOFTWARE_CR.hero.updated));

    // El asterisco sigue pegado al número y cada idioma usa su formato (§4.1).
    for (const row of rowsEs) {
      expect(row.range).toMatch(/^\d{1,2}\.\d{3} a \d{1,2}\.\d{3}( o más)?\*$/);
      expect(row.timeline).toMatch(/^\d+ a \d+ (semanas|meses)\*$/);
    }
    for (const row of rowsEn) {
      expect(row.range).toMatch(/^\d{1,2},\d{3} to \d{1,2},\d{3}( or more)?\*$/);
      expect(row.timeline).toMatch(/^\d+ to \d+ (weeks|months)\*$/);
    }
    expect(SOFTWARE_CR_EN.pricing.columns).toEqual([
      'System type',
      'Investment (USD)*',
      'Typical timeline*'
    ]);

    // Correo y teléfono idénticos (brief §6, regla 2).
    for (const content of [SOFTWARE_CR, SOFTWARE_CR_EN]) {
      expect(content.about.contact).toContain('hola@linkdesign.cr');
      expect(content.about.contact).toContain('+506 7232 5943');
    }
  });

  it('has no Spanish leaks in the English copy', () => {
    const leaves = [
      ...stringLeaves(SOFTWARE_CR_EN, 'SOFTWARE_CR_EN', NON_TEXT_KEYS),
      ...stringLeaves(SOFTWARE_CR_LABELS_EN, 'SOFTWARE_CR_LABELS_EN')
    ];
    // El recorrido de verdad visita el copy (153 cadenas traducidas + 13 rótulos).
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
      leaks('The dashboard («Panel de operación») for Vértice Seguridad Industrial')
    ).toEqual([]);
    expect(leaks('The dashboard (Panel de operación) for the chain')).toEqual(['ó']);
  });

  it('uses no em dashes in either language', () => {
    const leaves = [
      ...stringLeaves(SOFTWARE_CR, 'SOFTWARE_CR'),
      ...stringLeaves(SOFTWARE_CR_EN, 'SOFTWARE_CR_EN'),
      ...stringLeaves(SOFTWARE_CR_LABELS, 'SOFTWARE_CR_LABELS'),
      ...stringLeaves(SOFTWARE_CR_LABELS_EN, 'SOFTWARE_CR_LABELS_EN')
    ];
    expect(leaves.filter((leaf) => leaf.value.includes('—')).map((leaf) => leaf.path)).toEqual([]);
  });

  it('resolves content, labels and price rows by language', () => {
    expect(getSoftwareCrContent('en')).toBe(SOFTWARE_CR_EN);
    expect(getSoftwareCrContent('es')).toBe(SOFTWARE_CR);
    expect(getSoftwareCrLabels('en')).toBe(SOFTWARE_CR_LABELS_EN);
    expect(getSoftwareCrLabels('es')).toBe(SOFTWARE_CR_LABELS);

    expect(getSoftwareCrPriceForSystem('crm-a-medida', 'en')?.range).toContain('2,600 to 8,000');
    expect(getSoftwareCrPriceForSystem('crm-a-medida', 'en')?.type).toBe('Custom CRM');
    expect(getSoftwareCrPriceForSystem('crm-a-medida', 'es')?.range).toContain('2.600 a 8.000');
    expect(getSoftwareCrPriceForSystem('no-existe', 'en')).toBeNull();
    expect(getSoftwareCrPriceForSystem(null, 'en')).toBeNull();
  });
});
