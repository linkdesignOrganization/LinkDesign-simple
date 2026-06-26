import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClickTrackingService } from '../lead-form/services/click-tracking.service';

declare var gtag: Function;

/**
 * Conversion actions de Google Ads (cuenta AW-16767245191).
 * Mismos send_to que el sitio en producción (LinkDesign2.0).
 *
 * En la cuenta solo existen DOS acciones de conversión que vienen del sitio:
 *  - CONTACTO (qSMFCN2ek…): agrupa WhatsApp, copiar correo, agendar reunión y formulario (value variable).
 *  - SCROLL   (qZoeCOfls…): scroll al 50% de la página (value 1).
 */
export const ADS_CONVERSIONS = {
  /** "Contacto" en Ads: WhatsApp, copiar correo, agendar reunión y formulario. */
  CONTACTO: 'AW-16767245191/qSMFCN2ek-YZEIe3n7s-',
  /** "Scroll" en Ads: scroll al 50% de la página. */
  SCROLL: 'AW-16767245191/qZoeCOfls-oZEIe3n7s-'
} as const;

/**
 * AdsService — dispara conversiones de Google Ads para los clicks y el scroll del sitio.
 * (El form de leads dispara la suya desde LeadFormService, con value por scoring, también a CONTACTO.)
 * No-op seguro si gtag no está disponible (SSR, dev sin script, ad-blocker).
 */
@Injectable({ providedIn: 'root' })
export class AdsService {
  private readonly isBrowser: boolean;
  private readonly clicks = inject(ClickTrackingService);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  fireConversion(sendTo: string, value: number, currency = 'USD'): void {
    if (!this.isBrowser || typeof gtag !== 'function') return;
    try {
      gtag('event', 'conversion', { send_to: sendTo, value, currency });
    } catch {
      // silencioso — el tracking no debe romper la UX
    }
  }

  /** Click en WhatsApp (value 5). */
  whatsapp(): void {
    this.clicks.record('WhatsApp');
    this.fireConversion(ADS_CONVERSIONS.CONTACTO, 5);
  }

  /** Copiar el correo (value 25). */
  emailCopy(): void {
    this.clicks.record('Copiar correo');
    this.fireConversion(ADS_CONVERSIONS.CONTACTO, 25);
  }

  /** Click en "Agendar reunión" (value 30). */
  scheduleMeeting(): void {
    this.clicks.record('Agendar reunión');
    this.fireConversion(ADS_CONVERSIONS.CONTACTO, 30);
  }

  /** Scroll al 50% de la página (value 1, una sola vez por página). */
  scroll(): void {
    this.fireConversion(ADS_CONVERSIONS.SCROLL, 1);
  }
}
