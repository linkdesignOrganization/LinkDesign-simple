import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactPageComponent } from './contact-page';

describe('ContactPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('renders the three contact cards', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const labels = [...el.querySelectorAll('.ct-card__label')].map((n) => n.textContent?.trim());

    expect(labels).toEqual(['Canales', 'Información', 'Áreas de trabajo']);
  });

  it('el interruptor alterna entre la información y el formulario dentro del recuadro', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    const sw = el.querySelector('.ct-switch') as HTMLButtonElement;
    const strip = () => el.querySelector('.ct-strip') as HTMLElement;
    const opts = [...el.querySelectorAll('.ct-switch__opt')].map((n) => n.textContent?.trim());

    expect(opts).toEqual(['Información', 'Formulario']);
    // Arranca en la información: el interruptor apagado y la tira sin desplazar.
    expect(sw.getAttribute('aria-checked')).toBe('false');
    expect(strip().style.transform).toBe('translateY(0)');

    sw.click();
    fixture.detectChanges();

    expect(sw.getAttribute('aria-checked')).toBe('true');
    // Sube por el alto del panel de información; en pruebas no hay layout, así que es 0px, pero
    // lo que importa es que pasó a desplazarse.
    expect(strip().style.transform).toContain('translateY(-');

    sw.click();
    fixture.detectChanges();
    expect(sw.getAttribute('aria-checked')).toBe('false');
    expect(strip().style.transform).toBe('translateY(0)');
  });

  it('el formulario del recuadro se identifica como el de la página de contacto', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    // Dos formularios en la página: el del recuadro y el del pie. Los ids no se pisan, y el CRM
    // tiene que poder distinguir cuál convirtió.
    expect(el.querySelector('#ctf-name')).not.toBeNull();
    expect(el.querySelector('#cf-name')).not.toBeNull();
  });

  it('links the email via mailto and the work areas to /software and /web', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    const mailto = el.querySelector('a.ct-row[href^="mailto:"]');
    expect(mailto?.getAttribute('href')).toBe('mailto:hola@linkdesign.cr');

    const areas = [...el.querySelectorAll('a.ct-area')].map((a) => a.getAttribute('href'));
    expect(areas).toEqual(['/software', '/web']);
  });

  it('renders the site contact footer as the page closing', () => {
    const fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-contact-footer')).toBeTruthy();
  });
});
