import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ClickTrackingService } from '../lead-form/services/click-tracking.service';
import { LeadTrackingService } from '../lead-form/services/lead-tracking.service';
import { modulateValueBySession } from '../lead-form/utils/lead-score';

declare var gtag: Function;

/**
 * Conversion actions de Google Ads (cuenta AW-16767245191).
 *
 * Un canal, una acción. Hasta el 13 ago 2026 los cuatro canales de contacto
 * compartían una sola acción ("Contacto", qSMFCN2ek…), así que ningún informe
 * podía decir si un contacto era un WhatsApp o un formulario — ni Smart Bidding
 * distinguirlos al pujar. La revisión de ese día encontró que la campaña
 * "Búsqueda" llevaba veinte días produciendo WhatsApp y nada más, invisible bajo
 * el número agregado. Ver docs/bitacora-ads-values-troas.md.
 *
 * Las cuatro nuevas son CONTACT/WEBSITE igual que la vieja, y eso NO es
 * cosmético: "Búsqueda" y "Software" tienen campaign_conversion_goal =
 * CONTACT/WEBSITE, así que otra categoría las habría dejado fuera de la puja sin
 * ningún aviso.
 *
 * "Contacto" queda ENABLED en la cuenta pero ya no se dispara desde acá: conserva
 * su histórico en los informes y deja de acumular.
 */
export const ADS_CONVERSIONS = {
  /** "Contacto WhatsApp": click en WhatsApp (value base 10, modulado). */
  CONTACTO_WHATSAPP: 'AW-16767245191/PFEECM2UquEcEIe3n7s-',
  /** "Contacto Correo": click en copiar el correo (value base 50, modulado). */
  CONTACTO_CORREO: 'AW-16767245191/U_F7CMiVquEcEIe3n7s-',
  /** "Contacto Reunión": click en agendar reunión (value base 60, modulado). */
  CONTACTO_REUNION: 'AW-16767245191/WVgrCMuVquEcEIe3n7s-',
  /** "Contacto Formulario": envío del formulario (value por scoring; lo dispara LeadFormService). */
  CONTACTO_FORMULARIO: 'AW-16767245191/VGKrCL6XquEcEIe3n7s-',
  /** "Scroll" en Ads: scroll al 50% de la página. */
  SCROLL: 'AW-16767245191/qZoeCOfls-oZEIe3n7s-'
} as const;

/**
 * Values base (USD) de cada click de contacto, ANTES de modular por calidad de
 * sesión. Reflejan la intención intrínseca del canal:
 *   agendar (60) > copiar correo (50) > WhatsApp (10).
 * Escala ×2 desde jul 2026 para ampliar el contraste contra SCROLL (value 1)
 * en Smart Bidding — ver docs/bitacora-ads-values-troas.md.
 * El value final se multiplica por `sessionQualityFactor` (0.7–1.0): una sesión
 * floja baja el value, una excelente lo deja en el base (techo = base, para que
 * el formulario siga siendo el techo del sitio). Ver utils/lead-score.ts.
 */
export const CONTACTO_BASE_VALUE = {
  whatsapp: 10,
  emailCopy: 50,
  scheduleMeeting: 60
} as const;

/**
 * AdsService — dispara conversiones de Google Ads para los clicks y el scroll del sitio.
 *
 * Los clicks de contacto (WhatsApp, copiar correo, agendar) reportan un value
 * MODULADO por la calidad de la sesión actual (no un fijo): la misma señal de
 * sesión que usa el lead scoring, normalizada a un factor 0.7–1.0. Así Smart
 * Bidding distingue un click de una sesión profunda de uno de un rebote.
 * (El form de leads dispara su conversión desde LeadFormService, con value por
 * scoring completo, a CONTACTO_FORMULARIO.)
 *
 * No-op seguro si gtag no está disponible (SSR, dev sin script, ad-blocker).
 */
@Injectable({ providedIn: 'root' })
export class AdsService {
  private readonly isBrowser: boolean;
  private readonly clicks = inject(ClickTrackingService);
  private readonly tracking = inject(LeadTrackingService);

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

  /**
   * Modula un value base por la calidad de la sesión actual (Opción A: solo
   * penaliza sesiones flojas; techo en el value base). Devuelve el value listo
   * para reportar a Ads, redondeado a 2 decimales.
   */
  private modulatedValue(base: number): number {
    return modulateValueBySession(base, this.tracking.getSessionSignals());
  }

  /** Click en WhatsApp (value base 10, modulado por calidad de sesión). */
  whatsapp(): void {
    this.clicks.record('WhatsApp');
    this.fireConversion(
      ADS_CONVERSIONS.CONTACTO_WHATSAPP,
      this.modulatedValue(CONTACTO_BASE_VALUE.whatsapp)
    );
  }

  /** Copiar el correo (value base 50, modulado por calidad de sesión). */
  emailCopy(): void {
    this.clicks.record('Copiar correo');
    this.fireConversion(
      ADS_CONVERSIONS.CONTACTO_CORREO,
      this.modulatedValue(CONTACTO_BASE_VALUE.emailCopy)
    );
  }

  /** Click en "Agendar reunión" (value base 60, modulado por calidad de sesión). */
  scheduleMeeting(): void {
    this.clicks.record('Agendar reunión');
    this.fireConversion(
      ADS_CONVERSIONS.CONTACTO_REUNION,
      this.modulatedValue(CONTACTO_BASE_VALUE.scheduleMeeting)
    );
  }

  /**
   * Scroll al 50% de la página (value 1, una sola vez por página).
   * No se modula: señal de engagement débil y es OTRA acción de conversión (SCROLL).
   */
  scroll(): void {
    this.fireConversion(ADS_CONVERSIONS.SCROLL, 1);
  }
}
