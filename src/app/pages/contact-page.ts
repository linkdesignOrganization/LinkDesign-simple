import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowUpRight,
  LucideCalendar,
  LucideCheck,
  LucideCopy,
  LucideMail
} from '@lucide/angular';

import { ContactFooterComponent, ContactInfo } from '../components/contact-footer.component';
import { LeadFormComponent } from '../components/lead-form.component';
import { WhatsappIconComponent } from '../components/whatsapp-icon.component';
import { DarkZoneDirective } from '../directives/dark-zone.directive';
import { TrackSectionDirective } from '../directives/track-section.directive';
import { LanguageService } from '../services/language.service';
import { AdsService } from '../services/ads.service';
import { COMPANY_SCHEDULE } from '../company-info';
import { LocalizeUrlPipe } from '../services/localize-url.pipe';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LeadFormComponent,
    RouterLink,
    LocalizeUrlPipe,
    ContactFooterComponent,
    DarkZoneDirective,
    TrackSectionDirective,
    LucideMail,
    WhatsappIconComponent,
    LucideCalendar,
    LucideArrowUpRight,
    LucideCopy,
    LucideCheck
  ],
  template: `
    <section class="contact" appTrackSection="contacto" [attr.aria-label]="t().aria">
      <div class="contact-grid">
        <div class="ct-brand">
          <h1 class="ct-title">
            <span>Link</span>
            <span>Design</span>
          </h1>
        </div>

        <div class="ct-cards">
          <!-- Interruptor: misma mecánica que el de idioma (pulgar que viaja), pero ancho
               completo porque las palabras son largas. Queda fijo arriba del recuadro. -->
          <div class="ct-switchbar">
            <button
              type="button"
              class="ct-switch"
              [class.is-form]="panel() === 'form'"
              role="switch"
              [attr.aria-checked]="panel() === 'form'"
              [attr.aria-label]="t().switchAria"
              (click)="togglePanel()"
            >
              <span class="ct-switch__thumb" aria-hidden="true"></span>
              <span class="ct-switch__opt" [class.is-active]="panel() === 'info'">{{ t().tabInfo }}</span>
              <span class="ct-switch__opt" [class.is-active]="panel() === 'form'">{{ t().tabForm }}</span>
            </button>
          </div>

          <!-- Los dos paneles viven en una sola tira vertical: al cambiar, la información baja y
               el formulario entra desde arriba. La ventana recorta y acompaña con su altura. -->
          <div class="ct-window" [style.height.px]="windowHeight()">
            <div class="ct-strip" [style.transform]="stripTransform()">
              <div class="ct-panel" [style.min-height.px]="windowHeight()">
                <div class="ct-panel__inner" #panelInfo>
          <article class="ct-card">
            <span class="ct-card__label">{{ t().channels }}</span>
            <ul class="ct-list">
              <li class="ct-mail">
                <a class="ct-row" [href]="'mailto:' + info.email">
                  <span class="ct-row__icon" aria-hidden="true">
                    <svg lucideMail [size]="20" [strokeWidth]="1"></svg>
                  </span>
                  <span class="ct-row__text">{{ info.email }}</span>
                </a>
                <button
                  type="button"
                  class="ct-copy"
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
              <li>
                <a class="ct-row" [href]="info.whatsappLink" target="_blank" rel="noopener noreferrer" (click)="onWhatsapp()">
                  <!-- 17 y no 20 como sus vecinos: el logotipo de WhatsApp dibuja hasta el
                       borde de su caja y los Lucide dejan ~2 de 24 de aire, así que a igual
                       tamaño el círculo sobresale de la fila. 20 x 20/24 ≈ 17 los empareja. -->
                  <span class="ct-row__icon" aria-hidden="true">
                    <app-whatsapp-icon [size]="17" />
                  </span>
                  <span class="ct-row__text">{{ t().whatsapp }}</span>
                </a>
              </li>
              <li>
                <a class="ct-row" [href]="lang() === 'en' && info.calendarLinkEn ? info.calendarLinkEn : info.calendarLink" target="_blank" rel="noopener noreferrer" (click)="onSchedule()">
                  <span class="ct-row__icon" aria-hidden="true">
                    <svg lucideCalendar [size]="20" [strokeWidth]="1"></svg>
                  </span>
                  <span class="ct-row__text">{{ t().calendar }}</span>
                </a>
              </li>
            </ul>
          </article>

          <article class="ct-card">
            <span class="ct-card__label">{{ t().info }}</span>
            <ul class="ct-info">
              <li>{{ info.location }}</li>
              <li>{{ t().schedule }}</li>
              <li>{{ t().response }}</li>
            </ul>
          </article>

          <article class="ct-card">
            <span class="ct-card__label">{{ t().areas }}</span>
            <ul class="ct-list">
              <li>
                <a class="ct-area" [routerLink]="'/software' | localizeUrl">
                  <span class="ct-area__text">{{ t().software }}</span>
                  <span class="ct-area__arrow" aria-hidden="true">
                    <svg lucideArrowUpRight [size]="22" [strokeWidth]="1"></svg>
                  </span>
                </a>
              </li>
              <li>
                <a class="ct-area" [routerLink]="'/web' | localizeUrl">
                  <span class="ct-area__text">{{ t().web }}</span>
                  <span class="ct-area__arrow" aria-hidden="true">
                    <svg lucideArrowUpRight [size]="22" [strokeWidth]="1"></svg>
                  </span>
                </a>
              </li>
            </ul>
          </article>
                </div>
              </div>

              <div class="ct-panel" [style.min-height.px]="windowHeight()">
                <div class="ct-panel__inner" #panelForm>
                <article class="ct-card ct-card--form">
                  <app-lead-form
                    formLocation="contact_page"
                    idPrefix="ctf"
                    variant="light"
                    density="compact"
                    [pageContext]="formPageContext"
                  />
                </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-contact-footer appDarkZone id="hablemos" appTrackSection="hablemos" [info]="info" />
  `,
  styles: `
    :host {
      display: block;
    }

    /* La primera pantalla (título + recuadro) ocupa el alto del viewport menos el topbar,
       así todo entra en ~100vh y el footer queda debajo. */
    .contact {
      /* Por encima del artefacto de grilla del shell (z-index 0). El artefacto está
         posicionado, así que sin esto se pinta SOBRE el contenido estático y la grilla queda
         encima del card. Al subir la sección, el card opaco tapa la grilla y las zonas vacías
         (transparentes) la siguen dejando ver en el fondo. */
      position: relative;
      z-index: 1;
      display: grid;
      min-height: calc(100svh - 5.25rem);
      padding: 0 0 clamp(2rem, 4vw, 3.5rem);
    }

    /* Desktop: título gigante a la izquierda (toda su columna), recuadro de cards a la derecha. */
    .contact-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 26rem);
      gap: clamp(2rem, 4vw, 4rem);
      align-items: stretch;
      width: 100%;
    }

    .ct-brand {
      display: flex;
      align-items: flex-end;
      /* Container query: el título se mide contra el ancho de SU columna, no del viewport,
         así el wordmark llena la columna sin desbordar hacia el recuadro. */
      container-type: inline-size;
    }

    /* "Link" / "Design" apilados; la palabra más larga ("Design") llena el ancho de la columna. */
    .ct-title {
      display: flex;
      flex-direction: column;
      margin: 0;
      color: var(--ink);
      font-size: 30cqw;
      font-weight: 600;
      letter-spacing: -0.06em;
      line-height: 0.82;
      /* Wordmark decorativo: no se selecciona ni se copia con el cursor. */
      cursor: default;
      user-select: none;
      -webkit-user-select: none;
    }

    /* Cards unidas en vertical: radio solo en los extremos del bloque, borde compartido
       (mismo patrón que dev-types / portfolio). */
    /* UN solo recuadro: el borde, el radio y el fondo viven acá. Adentro, el interruptor arriba y
       la tira con los dos paneles; las secciones se separan con un divisor, no con bordes propios. */
    .ct-cards {
      display: flex;
      flex-direction: column;
      align-self: start;
      overflow: hidden;
      border: 1px solid var(--line-strong);
      border-radius: 0.9rem;
      /* Opaco a propósito: tapa la grilla técnica del fondo. Cambia de color con el tema
         (claro↔oscuro) de forma suave junto con el resto de la página. */
      background: #fafafa;
      transition: background-color 450ms ease, border-color 450ms ease;
    }

    .ct-card {
      display: flex;
      flex-direction: column;
      /* Un poco más pegado que antes (Robert, 19 sep): en una laptop de 681 px de alto el
         recuadro terminaba a 1 px del borde del viewport. Cada card cede ~5 px por lado. */
      gap: 0.9rem;
      padding: clamp(1.25rem, 2vw, 1.75rem);
    }

    .ct-card + .ct-card {
      border-top: 1px solid var(--line-strong);
    }

    /* Tema oscuro (cuando el footer activa la dark-zone): recuadro elevado oscuro + borde claro,
       para que el cambio a negro sea cuidado y no quede un panel claro sobre fondo oscuro. */
    :host-context(.app-dark) .ct-cards {
      background: #161616;
      border-color: rgba(255, 255, 255, 0.16);
    }

    :host-context(.app-dark) .ct-card + .ct-card {
      border-top-color: rgba(255, 255, 255, 0.16);
    }

    /* --- Interruptor Información / Formulario --------------------------------------------
       Copia la mecánica del de idioma (app.scss .lang-toggle): el pulgar es absoluto, ocupa la
       mitad y viaja con translateX. Acá va a ancho completo porque las palabras son largas. */
    .ct-switchbar {
      padding: 0.7rem 0.7rem 0;
    }

    .ct-switch {
      width: 100%;
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 0.28rem;
      border: 1px solid var(--line-strong);
      border-radius: 0.55rem;
      background: transparent;
      cursor: pointer;
    }

    .ct-switch__thumb {
      position: absolute;
      top: 0.28rem;
      left: 0.28rem;
      width: calc(50% - 0.28rem);
      height: calc(100% - 0.56rem);
      border-radius: 0.4rem;
      background: var(--ink);
      transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .ct-switch.is-form .ct-switch__thumb {
      transform: translateX(100%);
    }

    .ct-switch__opt {
      position: relative;
      z-index: 1;
      padding-block: 0.36rem;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-align: center;
      transition: color 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .ct-switch__opt.is-active {
      color: var(--surface);
    }

    /* --- La tira: los dos paneles, uno debajo del otro --------------------------------- */
    .ct-panel > .ct-card:first-child {
      padding-top: clamp(1rem, 1.6vw, 1.25rem);
    }

    .ct-window {
      overflow: hidden;
      transition: height 620ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* Sin medida todavía (prerender y primer frame): se ve el panel de información entero. */
    .ct-window:not([style*='height']) {
      height: auto;
    }

    .ct-strip {
      display: flex;
      flex-direction: column;
      transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .ct-panel {
      flex: none;
    }

    .ct-panel__inner {
      display: flex;
      flex-direction: column;
    }

    /* El panel del formulario arranca pegado al interruptor, como el de información. */
    .ct-card--form {
      padding-top: clamp(1rem, 1.6vw, 1.25rem);
    }

    @media (prefers-reduced-motion: reduce) {
      .ct-switch__thumb,
      .ct-window,
      .ct-strip {
        transition: none;
      }
    }

    .ct-card__label {
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .ct-list,
    .ct-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    /* Filas de canales (icono + texto). */
    .ct-row {
      display: inline-flex;
      align-items: center;
      gap: 0.8rem;
      color: var(--ink);
      font-size: 1.05rem;
      text-decoration: none;
      transition: color 180ms ease;
    }

    .ct-row__icon {
      display: inline-flex;
      flex-shrink: 0;
      color: var(--muted);
      transition: color 180ms ease;
    }

    .ct-row:hover .ct-row__icon,
    .ct-row:focus-visible .ct-row__icon {
      color: var(--accent);
    }

    .ct-row:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
      border-radius: 2px;
    }

    /* Fila del correo: link mailto + botón de copiar al portapapeles. */
    .ct-mail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ct-copy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 0.3rem;
      border: 0;
      background: none;
      color: var(--muted);
      cursor: pointer;
      transition: color 180ms ease;
    }

    .ct-copy:hover,
    .ct-copy:focus-visible {
      color: var(--ink);
      outline: none;
    }

    /* Información: líneas de texto. */
    .ct-info li {
      color: var(--ink);
      font-size: 1.02rem;
      line-height: 1.5;
    }

    /* Áreas de trabajo: link con flecha. */
    .ct-area {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      color: var(--ink);
      font-size: 1.15rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      text-decoration: none;
      transition: color 180ms ease;
    }

    .ct-area__arrow {
      display: inline-flex;
      flex-shrink: 0;
      color: var(--muted);
      transition: color 180ms ease, transform 200ms ease;
    }

    .ct-area:hover .ct-area__arrow,
    .ct-area:focus-visible .ct-area__arrow {
      color: var(--accent);
      transform: translate(2px, -2px);
    }

    .ct-area:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
      border-radius: 2px;
    }

    /* Mobile / tablet: una sola columna; título arriba, cards debajo. */
    @media (max-width: 900px) {
      .contact {
        display: block;
        min-height: 0;
        padding: clamp(1.5rem, 4vw, 2.5rem) 0 var(--section-py);
      }

      .contact-grid {
        grid-template-columns: 1fr;
        gap: clamp(2rem, 6vw, 3rem);
      }

      .ct-brand {
        align-items: flex-start;
      }

      .ct-title {
        font-size: clamp(4rem, 22vw, 9rem);
      }
    }
  `
})
export class ContactPageComponent {
  /** Panel visible en el recuadro. Arranca en la información, como hasta ahora. */
  protected readonly panel = signal<'info' | 'form'>('info');

  private readonly panelInfo = viewChild<ElementRef<HTMLElement>>('panelInfo');
  private readonly panelForm = viewChild<ElementRef<HTMLElement>>('panelForm');
  private readonly infoHeight = signal(0);
  private readonly formHeight = signal(0);

  /**
   * Alto de la ventana: FIJO, el del panel de información (decisión de Robert, 18 sep: «el cuadro
   * no se mueve, se mueve el contenido que tiene adentro»). El formulario va compacto para entrar
   * en ese alto. Vale 0 hasta la primera medición (prerender y primer frame), y ahí el CSS lo
   * deja en `auto`.
   */
  protected readonly windowHeight = computed(() => {
    // El mayor de los dos: en escritorio el formulario compacto entra en el alto de la
    // información; en celular va a una columna y es más alto, y no puede cortarse el botón.
    const h = Math.max(this.infoHeight(), this.formHeight());
    return h > 0 ? h : null;
  });

  /**
   * La tira sube exactamente una ventana. Cada panel mide como mínimo la ventana (min-height),
   * así el panel más corto se rellena con aire y NUNCA deja asomar la cabeza del otro por debajo,
   * que era el error que Robert vio el 19 sep con el formulario más alto que la información.
   */
  protected readonly stripTransform = computed(() => {
    const h = this.windowHeight();
    return this.panel() === 'form' && h ? `translateY(-${h}px)` : 'translateY(0)';
  });

  protected togglePanel(): void {
    this.panel.update((p) => (p === 'info' ? 'form' : 'info'));
  }

  /** Contexto que viaja al CRM con el lead, para distinguirlo del formulario del pie. */
  protected readonly formPageContext = {
    name: 'Formulario de la página de contacto',
    slug: 'contacto/formulario',
  };

  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(LanguageService);
  private readonly ads = inject(AdsService);
  protected readonly lang = this.i18n.lang;
  protected readonly t = computed(() => CONTACT_TEXT[this.lang()]);

  constructor() {
    // Solo en el browser: `afterNextRender` no corre en el prerender. Se remide cuando cambian
    // los paneles (idioma, ancho, la altura del formulario al mostrar errores o el estado
    // enviado), así el recuadro nunca queda con un alto viejo.
    afterNextRender(() => {
      if (typeof ResizeObserver === 'undefined') {
        return;
      }
      const observer = new ResizeObserver(() => this.measurePanels());
      const info = this.panelInfo()?.nativeElement;
      const form = this.panelForm()?.nativeElement;
      if (info) observer.observe(info);
      if (form) observer.observe(form);
      this.measurePanels();
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private measurePanels(): void {
    const info = this.panelInfo()?.nativeElement;
    const form = this.panelForm()?.nativeElement;
    if (info) this.infoHeight.set(Math.round(info.getBoundingClientRect().height));
    if (form) this.formHeight.set(Math.round(form.getBoundingClientRect().height));
  }

  protected readonly info: ContactInfo = {
    email: 'hola@linkdesign.cr',
    whatsappLink: 'https://wa.me/50672325943',
    calendarLink: 'https://cal.com/linkdesign.cr/reunion-con-link-design',
    calendarLinkEn: 'https://cal.com/linkdesign.cr/meeting-with-link-design',
    location: 'San José, Costa Rica'
  };

  protected readonly copied = signal(false);

  // Copia el correo al portapapeles y muestra el check por un instante.
  protected copyEmail(): void {
    this.ads.emailCopy();
    const clip = typeof navigator !== 'undefined' ? navigator.clipboard : undefined;
    if (!clip) {
      return;
    }
    clip
      .writeText(this.info.email)
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

const CONTACT_TEXT = {
  es: {
    aria: 'Contacto',
    tabInfo: 'Información',
    tabForm: 'Formulario',
    switchAria: 'Cambiar entre información de contacto y formulario',
    channels: 'Canales',
    info: 'Información',
    areas: 'Áreas de trabajo',
    whatsapp: 'Escríbenos por WhatsApp',
    calendar: 'Agenda una reunión',
    schedule: COMPANY_SCHEDULE.es.long,
    response: 'Sábados y domingos, descansamos',
    software: 'Software a medida',
    web: 'Página web',
    copy: 'Copiar correo',
    copied: 'Correo copiado'
  },
  en: {
    aria: 'Contact',
    tabInfo: 'Details',
    tabForm: 'Form',
    switchAria: 'Switch between contact details and form',
    channels: 'Channels',
    info: 'Information',
    areas: 'What we do',
    whatsapp: 'Message us on WhatsApp',
    calendar: 'Book a meeting',
    schedule: COMPANY_SCHEDULE.en.long,
    response: 'Saturdays and Sundays, we rest',
    software: 'Custom software',
    web: 'Websites',
    copy: 'Copy email',
    copied: 'Email copied'
  }
} as const;
