import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var gtag: Function;

/**
 * Conversion actions de Google Ads (cuenta AW-16767245191).
 * Mismos send_to que el sitio en producción (LinkDesign2.0).
 */
export const ADS_CONVERSIONS = {
  /** Engagement de bajo/medio intent: WhatsApp, copiar email, teléfono. */
  ENGAGEMENT: 'AW-16767245191/qSMFCN2ek-YZEIe3n7s-',
  /** Alto intent: agendar reunión, form "hot". */
  HIGH_INTENT: 'AW-16767245191/qZoeCOfls-oZEIe3n7s-'
} as const;

/**
 * AdsService — dispara conversiones de Google Ads para clicks del sitio
 * (el form de leads dispara las suyas desde LeadFormService con value por scoring).
 * No-op seguro si gtag no está disponible (SSR, dev sin script, ad-blocker).
 */
@Injectable({ providedIn: 'root' })
export class AdsService {
  private readonly isBrowser: boolean;

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
    this.fireConversion(ADS_CONVERSIONS.ENGAGEMENT, 5);
  }

  /** Copiar el correo (value 25). */
  emailCopy(): void {
    this.fireConversion(ADS_CONVERSIONS.ENGAGEMENT, 25);
  }

  /** Click en "Agendar reunión" (alto intent, value 30). */
  scheduleMeeting(): void {
    this.fireConversion(ADS_CONVERSIONS.HIGH_INTENT, 30);
  }
}
