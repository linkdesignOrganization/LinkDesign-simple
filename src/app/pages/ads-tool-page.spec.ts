import { TestBed } from '@angular/core/testing';

import { AdsToolPageComponent } from './ads-tool-page';

describe('AdsToolPageComponent', () => {
  it('muestra el nombre de la app y explica su propósito (verificación de marca OAuth)', async () => {
    await TestBed.configureTestingModule({
      imports: [AdsToolPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AdsToolPageComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toContain('LinkDesign');
    expect(el.textContent).toContain('Google Ads');
    expect(el.textContent).toContain('OAuth');
  });
});
