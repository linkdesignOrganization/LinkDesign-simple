import { TestBed } from '@angular/core/testing';

import { AdsToolPageComponent } from './ads-tool-page';
import { SEO_CONTENT } from '../services/seo-content';

describe('AdsToolPageComponent', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsToolPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AdsToolPageComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('muestra el nombre de la app y explica su propósito (verificación de marca OAuth)', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Link Design');
    expect(el.textContent).toContain('Google Ads');
    expect(el.textContent).toContain('OAuth');
  });

  // La página describe la herramienta para las revisiones de Google (brand verification OAuth y,
  // si entran a la URL, compliance de la API). El alcance de cuentas debe incluir las de clientes
  // que administramos por encargo: declararlas como "solo propias" contradice lo que muestra el MCC.
  it('declara modelo de negocio, alcance de cuentas y uso interno', () => {
    const text = el.textContent ?? '';
    expect(text).toContain('agencia');
    expect(text).toContain('clientes de la agencia cuyas campañas administramos');
    expect(text).toContain('no se comparten con terceros');
    expect(text).toContain('interfaz web pública');
    expect(text).toContain('internal tool');
  });

  // Sin entrada propia en SEO_CONTENT la ruta cae en SEO_FALLBACK (el home) y se canonicaliza a
  // '/', que es lo que pasaba en producción: title del home, canonical al home y el noindex del
  // componente descartado. El noindex tiene que vivir acá para que llegue al HTML.
  it('tiene SEO propio, noindex y de una sola URL bilingüe', () => {
    const entry = SEO_CONTENT['/ads'];
    expect(entry).toBeDefined();
    for (const lang of ['es', 'en'] as const) {
      expect(entry[lang].canonicalPath).toBe('/ads');
      expect(entry[lang].singleUrl).toBe(true);
      expect(entry[lang].robots).toContain('noindex');
    }
  });
});
