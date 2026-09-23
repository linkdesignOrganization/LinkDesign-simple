import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DarkZoneDirective } from './dark-zone.directive';

/**
 * La zona oscura decide contra lo que la persona VE. El caso que la motivó: en iOS, al tocar el
 * área de mensaje del recuadro de /contacto, el teclado achica el visual viewport sin tocar
 * `innerHeight` y el sistema baja la página; el pie quedaba «adentro» del viewport por debajo del
 * teclado y encendía el negro sobre un formulario claro (Robert, 22 sep 2026).
 */
@Component({
  standalone: true,
  imports: [DarkZoneDirective],
  template: '<div appDarkZone></div>'
})
class HostComponent {}

type VisualViewportMock = { height: number; offsetTop: number; addEventListener: () => void; removeEventListener: () => void };

function setViewport(width: number, height: number, visual: { height: number; offsetTop: number } | null): void {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true, writable: true });
  const mock: VisualViewportMock | undefined = visual
    ? { ...visual, addEventListener: () => undefined, removeEventListener: () => undefined }
    : undefined;
  Object.defineProperty(window, 'visualViewport', { value: mock, configurable: true, writable: true });
}

describe('DarkZoneDirective — mide contra lo que se ve', () => {
  let zone: DebugElement;
  let directive: { update(): void };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    zone = fixture.debugElement.query(By.directive(DarkZoneDirective));
    directive = zone.injector.get(DarkZoneDirective) as unknown as { update(): void };
  });

  afterEach(() => {
    document.documentElement.classList.remove('app-dark');
    setViewport(1024, 768, null);
  });

  function zoneAt(top: number, bottom: number): void {
    vi.spyOn(zone.nativeElement as HTMLElement, 'getBoundingClientRect').mockReturnValue({
      top,
      bottom,
      left: 0,
      right: 0,
      width: 0,
      height: bottom - top,
      x: 0,
      y: top,
      toJSON: () => ({})
    } as DOMRect);
    directive.update();
  }

  const isDark = (): boolean => document.documentElement.classList.contains('app-dark');

  it('en escritorio enciende el negro cuando la zona cruza la mitad, como siempre', () => {
    setViewport(1280, 800, null);
    zoneAt(450, 2000);
    expect(isDark()).toBe(false);
    zoneAt(350, 2000);
    expect(isDark()).toBe(true);
  });

  it('en celular con el teclado abierto, el pie que queda debajo del teclado NO enciende el negro', () => {
    // innerHeight sigue en 800 (iOS no lo cambia); lo visible son 450 px.
    setViewport(390, 800, { height: 450, offsetTop: 0 });
    // Con innerHeight, 500 < 800 × 0,7 = 560 encendía el negro. Con lo visible, 500 > 315: no.
    zoneAt(500, 2000);
    expect(isDark()).toBe(false);
  });

  it('en celular con el teclado abierto, sí enciende cuando la zona domina lo visible', () => {
    setViewport(390, 800, { height: 450, offsetTop: 0 });
    zoneAt(300, 2000);
    expect(isDark()).toBe(true);
  });

  it('descuenta el desplazamiento del visual viewport dentro de la ventana', () => {
    setViewport(390, 800, { height: 450, offsetTop: 200 });
    // A 500 de la ventana pero a 300 de lo visible: domina lo que se ve.
    zoneAt(500, 2000);
    expect(isDark()).toBe(true);
  });

  it('sin visualViewport (navegadores viejos) cae a innerHeight', () => {
    setViewport(390, 800, null);
    zoneAt(500, 2000);
    expect(isDark()).toBe(true);
  });
});
