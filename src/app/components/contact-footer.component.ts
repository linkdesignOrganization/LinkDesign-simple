import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../services/language.service';
import { LocalizeUrlPipe } from '../services/localize-url.pipe';
import { AdsService } from '../services/ads.service';
import { COMPANY_LEGAL, COMPANY_SCHEDULE } from '../company-info';
import { LeadFormComponent } from './lead-form.component';
import {
  LucideCalendar,
  LucideCheck,
  LucideCopy,
  LucideMail,
  LucideMessageCircle
} from '@lucide/angular';

export type ContactInfo = {
  calendarLink: string;
  // Link de reunión en inglés (cal.com). Opcional: si falta, se usa calendarLink.
  calendarLinkEn?: string;
  email: string;
  location: string;
  whatsappLink: string;
};

/**
 * Contexto del sistema cuando el form vive en una página /software/<slug>.
 * Sirve para identificar mejor el lead del lado del CRM (qué sistema estaba viendo).
 */
export type SystemContext = {
  /** Nombre legible del sistema, ya resuelto al idioma activo (ej. "CRM a la medida"). */
  name: string;
  /** Slug de la URL (ej. "crm-a-medida"). */
  slug: string;
};

@Component({
  selector: 'app-contact-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    LocalizeUrlPipe,
    LeadFormComponent,
    LucideMail,
    LucideCopy,
    LucideCalendar,
    LucideMessageCircle,
    LucideCheck
  ],
  host: {
    'class': 'contact-footer'
  },
  template: `
    <div class="cf-inner">
      <aside class="cf-aside">
        <h2 class="cf-title">{{ t().title }}</h2>
        <p class="cf-sub">{{ t().sub }}</p>

        <ul class="cf-contacts">
          <li class="cf-contact">
            <span class="cf-contact__icon" aria-hidden="true">
              <svg lucideMail [size]="20" [strokeWidth]="1"></svg>
            </span>
            <span class="cf-contact__label">{{ info().email }}</span>
            <button
              type="button"
              class="cf-copy"
              [attr.aria-label]="copied() ? t().copied : t().copy"
              (click)="copyEmail()"
            >
              @if (copied()) {
                <svg lucideCheck [size]="16" [strokeWidth]="1.5"></svg>
              } @else {
                <svg lucideCopy [size]="16" [strokeWidth]="1"></svg>
              }
            </button>
          </li>

          <li class="cf-contact">
            <a class="cf-contact__link" [href]="info().whatsappLink" (click)="onWhatsapp()">
              <span class="cf-contact__icon" aria-hidden="true">
                <svg lucideMessageCircle [size]="20" [strokeWidth]="1"></svg>
              </span>
              <span class="cf-contact__label">{{ t().whatsapp }}</span>
            </a>
          </li>

          <li class="cf-contact">
            <a class="cf-contact__link" [href]="lang() === 'en' && info().calendarLinkEn ? info().calendarLinkEn : info().calendarLink" target="_blank" rel="noopener noreferrer" (click)="onSchedule()">
              <span class="cf-contact__icon" aria-hidden="true">
                <svg lucideCalendar [size]="20" [strokeWidth]="1"></svg>
              </span>
              <span class="cf-contact__label">{{ t().calendar }}</span>
            </a>
          </li>
        </ul>

        <p class="cf-location">{{ info().location }}</p>
        @for (line of footerLines(); track line) {
          <p class="cf-location cf-location--meta">{{ line }}</p>
        }
      </aside>

      <app-lead-form
        formLocation="footer"
        idPrefix="cf"
        [systemContext]="systemContext()"
        [industryContext]="industryContext()"
      />
    </div>

    <div class="cf-legal">
      <p class="cf-legal__copy">© {{ year }} Link Design. {{ t().rights }}</p>
      <a class="cf-legal__link" [routerLink]="'/politicas-de-privacidad' | localizeUrl">{{ t().privacy }}</a>
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      z-index: 1;
      /* Bottom chico: la barra legal es el cierre real del sitio, sin colchón debajo. */
      padding: var(--section-py) 0 clamp(1.8rem, 3.5vw, 2.5rem);
    }

    /* Fondo full-bleed: toma --surface (negro en tema oscuro) y tapa la grilla en los márgenes.
       Es la última sección → el negro llega hasta el fondo. */
    :host::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% - 50vw);
      width: 100vw;
      z-index: -1;
      background: var(--surface);
      transition: background-color 450ms ease;
    }

    .cf-inner {
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      gap: clamp(2.5rem, 5vw, 5rem);
      align-items: start;
    }

    /* Columna izquierda: datos de contacto. Texto claro hardcodeado (en oscuro --ink sigue negro). */
    .cf-title {
      margin: 0;
      max-width: 12ch;
      color: #f4f4f4;
      font-size: clamp(2.4rem, 5vw, 4rem);
      font-weight: 500;
      letter-spacing: -0.045em;
      line-height: 1;
      text-wrap: balance;
    }

    .cf-sub {
      margin: 1.3rem 0 0;
      color: #b2b2b2;
      font-family: var(--font-mono);
      font-size: 0.9rem;
    }

    .cf-contacts {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      margin: clamp(2rem, 4vw, 3rem) 0 0;
      padding: 0;
      list-style: none;
    }

    .cf-contact {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .cf-contact__icon {
      display: inline-flex;
      flex-shrink: 0;
      color: #f0f0f0;
    }

    .cf-contact__label {
      color: #f0f0f0;
      font-size: 1.05rem;
    }

    .cf-contact__link {
      display: inline-flex;
      align-items: center;
      gap: 0.85rem;
      color: #f0f0f0;
      text-decoration: none;
      transition: color 180ms ease;
    }

    .cf-contact__link:hover .cf-contact__label,
    .cf-contact__link:focus-visible .cf-contact__label {
      color: #ffffff;
    }

    .cf-contact__link:hover .cf-contact__icon,
    .cf-contact__link:focus-visible .cf-contact__icon {
      color: var(--accent);
    }

    .cf-copy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem;
      border: 0;
      background: none;
      color: #8a8a8a;
      cursor: pointer;
      transition: color 180ms ease;
    }

    /* Objetivo táctil de 44 px sin tocar el aspecto: el padding agranda el área que responde
       al dedo y el margen negativo la devuelve al mismo lugar. El botón no tiene fondo ni
       borde (background: none), así que no se ve crecer. */
    @media (pointer: coarse) {
      .cf-copy {
        padding: calc(0.3rem + 9px);
        margin: -9px;
      }
    }

    .cf-copy:hover,
    .cf-copy:focus-visible {
      color: #ffffff;
      outline: none;
    }

    .cf-location {
      margin: 1.6rem 0 0;
      color: #8a8a8a;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    /* Horario y datos legales: mismas letra y color que la ubicación, pegados debajo. */
    .cf-location--meta {
      margin-top: 0.35rem;
    }

    /* Barra de cierre del sitio: copyright + privacidad, centrada. */
    .cf-legal {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.85rem;
      margin-top: clamp(3.5rem, 6vw, 5.5rem);
      text-align: center;
    }

    .cf-legal__copy {
      margin: 0;
      color: #9a9a9a;
      font-size: 0.92rem;
      letter-spacing: 0.01em;
    }

    .cf-legal__link {
      color: #c4c4c4;
      font-size: 0.92rem;
      text-decoration: none;
      transition: color 180ms ease;
    }

    /* Objetivo táctil de 44 px sin tocar el aspecto: mismo truco de padding + margen negativo.
       Necesita inline-block para que el padding vertical cuente en el área del enlace. */
    @media (pointer: coarse) {
      .cf-legal__link {
        display: inline-block;
        padding-block: 13px;
        margin-block: -13px;
      }
    }

    .cf-legal__link:hover,
    .cf-legal__link:focus-visible {
      color: #ffffff;
    }

    @media (prefers-reduced-motion: reduce) {
      .cf-contact__link,
      .cf-copy,
      .cf-legal__link {
        transition: none;
      }
    }

    @media (max-width: 860px) {
      .cf-inner {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }
    }

    /* Mobile: subir el cuerpo gris a casi-blanco para que se lea bien (en desktop el texto es mayor). */
    @media (max-width: 760px) {
      .cf-sub {
        color: #f4f4f4;
      }
    }
  `
})
export class ContactFooterComponent {
  readonly info = input.required<ContactInfo>();

  /**
   * Contexto opcional del sistema cuando el form se renderiza en una página
   * /software/<slug> (y, en este sitio, en una ficha del hub de Costa Rica).
   * Viaja al CRM en `source.page_context`, su propio campo del payload, para que
   * el correo de aviso y la ficha sepan qué sistema estaba viendo.
   *
   * Hasta la v1.6.0 esto se anteponía al mensaje entre corchetes, porque el
   * esquema del CRM no tenía dónde ponerlo. El mensaje volvió a ser solo lo que
   * escribió la persona.
   *
   * Se pasa tal cual al `app-lead-form`, que es quien lo mete en el payload.
   */
  readonly systemContext = input<SystemContext | null>(null);

  /**
   * Igual que systemContext pero para una página de industria
   * (/industrias/<slug>). Solo uno de los dos está activo por página.
   */
  readonly industryContext = input<SystemContext | null>(null);

  private readonly i18n = inject(LanguageService);
  private readonly ads = inject(AdsService);
  protected readonly lang = this.i18n.lang;
  protected readonly t = computed(() => FOOTER_TEXT[this.lang()]);

  /**
   * Líneas debajo de la ubicación: horario corto, razón social (solo donde no es el mismo número
   * que la cédula) y cédula o CUIT. Transparencia de la empresa para la nota de página de destino.
   */
  protected readonly footerLines = computed(() => {
    const lang = this.lang();
    const lines: string[] = [COMPANY_SCHEDULE[lang].short];
    if (COMPANY_LEGAL.showLegalName) lines.push(COMPANY_LEGAL.legalName);
    lines.push(`${COMPANY_LEGAL.label[lang]} ${COMPANY_LEGAL.taxId}`);
    return lines;
  });

  protected readonly year = new Date().getFullYear();

  protected readonly copied = signal(false);

  protected copyEmail(): void {
    this.ads.emailCopy();
    const email = this.info().email;
    const clip = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
    if (!clip) {
      return;
    }
    clip
      .writeText(email)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 1800);
      })
      .catch(() => {});
  }

  protected onWhatsapp(): void {
    this.ads.whatsapp();
  }

  protected onSchedule(): void {
    this.ads.scheduleMeeting();
  }
}

const FOOTER_TEXT = {
  es: {
    title: 'Comencemos a trabajar hoy',
    sub: 'Esperamos tu mensaje',
    whatsapp: 'Mandar WhatsApp',
    calendar: 'Agendar reunión',
    copy: 'Copiar correo',
    copied: 'Correo copiado',
    rights: 'Todos los derechos reservados.',
    privacy: 'Política de privacidad'
  },
  en: {
    title: "Let's build something",
    sub: "Tell us what you're building.",
    whatsapp: 'Message on WhatsApp',
    calendar: 'Book a meeting',
    copy: 'Copy email',
    copied: 'Email copied',
    rights: 'All rights reserved.',
    privacy: 'Privacy policy'
  }
} as const;
