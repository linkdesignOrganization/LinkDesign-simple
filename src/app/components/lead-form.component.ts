import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LanguageService } from '../services/language.service';
import { LeadFormService, LeadSubmitContext } from '../lead-form/services/lead-form.service';
import { TimelineService } from '../lead-form/services/timeline.service';
import { LeadFormRawValue, LeadPageContext } from '../lead-form/models/lead-payload.model';
import {
  FormLocation,
  NeedOption,
  PreferredContactOption
} from '../lead-form/models/lead-form-options';
import { LucideCheck, LucideMail, LucidePhone } from '@lucide/angular';
import { WhatsappIconComponent } from './whatsapp-icon.component';

type NeedChip = { key: string; es: string; en: string };
type ContactMethod = { key: string; icon: 'mail' | 'message' | 'phone'; es: string; en: string };

// Mapeo de las keys del form (diseño nuevo) al contrato exacto que espera el CRM.
const NEED_MAP: Record<string, NeedOption> = {
  software: 'software_a_medida',
  web: 'sitio_web',
  ecommerce: 'ecommerce',
  other: 'otro'
};
const CONTACT_MAP: Record<string, PreferredContactOption> = {
  email: 'correo',
  whatsapp: 'whatsapp',
  call: 'llamada'
};

/**
 * El formulario de leads, extraído del pie de página para poder montarlo más de
 * una vez (el pie y la página de contacto). El marcado, las clases y el orden de
 * los campos son los mismos que tenía dentro de `app-contact-footer`.
 *
 * Lo único que se parametrizó es lo que no puede repetirse en una misma página:
 * los ids del DOM (`idPrefix`) y de dónde dice el lead que viene (`formLocation`).
 */
@Component({
  selector: 'app-lead-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, LucideMail, LucidePhone, LucideCheck, WhatsappIconComponent],
  template: `
    <form class="cf-form" [class.cf-form--light]="variant() === 'light'" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      @if (sent()) {
        <div class="cf-sent" role="status">
          <span class="cf-sent__icon" aria-hidden="true">
            <svg lucideCheck [size]="30" [strokeWidth]="1.5"></svg>
          </span>
          <h3>{{ t().sentTitle }}</h3>
          <p>{{ t().sentBody }}</p>
        </div>
      } @else {
        <div class="cf-grid">
          <div class="cf-field">
            <label [attr.for]="ids().name">{{ t().name }} <span class="cf-req" aria-hidden="true">*</span></label>
            <input
              [attr.id]="ids().name"
              type="text"
              formControlName="name"
              [placeholder]="t().namePh"
              autocomplete="name"
              [attr.aria-invalid]="invalid('name') || null"
            />
            @if (invalid('name')) {
              <span class="cf-error">{{ t().nameErr }}</span>
            }
          </div>

          <div class="cf-field">
            <label [attr.for]="ids().company">{{ t().company }}</label>
            <input
              [attr.id]="ids().company"
              type="text"
              formControlName="company"
              [placeholder]="t().companyPh"
              autocomplete="organization"
            />
          </div>

          <div class="cf-field">
            <label [attr.for]="ids().email">{{ t().email }} <span class="cf-req" aria-hidden="true">*</span></label>
            <input
              [attr.id]="ids().email"
              type="email"
              formControlName="email"
              [placeholder]="t().emailPh"
              autocomplete="email"
              [attr.aria-invalid]="invalid('email') || null"
            />
            @if (invalid('email')) {
              <span class="cf-error">{{ t().emailErr }}</span>
            }
          </div>

          <div class="cf-field">
            <label [attr.for]="ids().phone">{{ t().phone }} <span class="cf-req" aria-hidden="true">*</span></label>
            <input
              [attr.id]="ids().phone"
              type="tel"
              formControlName="phone"
              [placeholder]="t().phonePh"
              autocomplete="tel"
              [attr.aria-invalid]="invalid('phone') || null"
            />
            @if (invalid('phone')) {
              <span class="cf-error">{{ t().phoneErr }}</span>
            }
          </div>
        </div>

        <div class="cf-chips-row">
          <fieldset class="cf-chips">
            <legend class="cf-chips__label">{{ t().needsLegend }}</legend>
            <div class="cf-chips__row">
              @for (need of NEEDS; track need.key) {
                <button
                  type="button"
                  class="cf-chip"
                  [class.is-active]="isNeed(need.key)"
                  [attr.aria-pressed]="isNeed(need.key)"
                  (click)="toggleNeed(need.key)"
                >
                  {{ need[lang()] }}
                </button>
              }
            </div>
          </fieldset>

          <fieldset class="cf-chips">
            <legend class="cf-chips__label">
              {{ t().contactLegend }} <span class="cf-req" aria-hidden="true">*</span>
            </legend>
            <div class="cf-chips__row">
              @for (method of CONTACT_METHODS; track method.key) {
                <button
                  type="button"
                  class="cf-chip cf-chip--icon"
                  [class.is-active]="isContact(method.key)"
                  [attr.aria-pressed]="isContact(method.key)"
                  (click)="toggleContact(method.key)"
                >
                  @switch (method.icon) {
                    @case ('mail') { <svg lucideMail [size]="14" [strokeWidth]="1"></svg> }
                    @case ('message') { <app-whatsapp-icon [size]="12" /> }
                    @case ('phone') { <svg lucidePhone [size]="14" [strokeWidth]="1"></svg> }
                  }
                  <span>{{ method[lang()] }}</span>
                </button>
              }
            </div>
            @if (submitted() && contactPrefs().size === 0) {
              <span class="cf-error">{{ t().contactErr }}</span>
            }
          </fieldset>
        </div>

        <div class="cf-field">
          <label [attr.for]="ids().message">{{ t().message }}</label>
          <textarea
            [attr.id]="ids().message"
            formControlName="message"
            rows="4"
            [placeholder]="t().messagePh"
          ></textarea>
        </div>

        @if (submitError()) {
          <p class="cf-error" role="alert">{{ submitError() }}</p>
        }
        <button type="submit" class="cf-submit" [disabled]="submitting()">
          <span>{{ submitting() ? t().sending : t().submit }}</span>
          <span class="cf-submit__arrow" aria-hidden="true">→</span>
        </button>
      }
    </form>
  `,
  styles: `
    /* En el pie este componente ocupa el lugar que antes ocupaba el <form>: la
       columna derecha de .cf-inner. Como bloque toma el ancho de la columna y el
       alto de su contenido, igual que el form, así que el layout no cambia. */
    :host {
      /* Paleta del formulario en tokens: por defecto la de siempre (claro sobre el pie oscuro).
         La página de contacto lo monta sobre un recuadro claro y solo redefine estas variables
         con la clase cf-form--light, sin duplicar ni una regla. */
      --lf-label: #ececec;
      --lf-text: #f0f0f0;
      --lf-placeholder: #6f6f6f;
      --lf-line: rgba(255, 255, 255, 0.22);
      --lf-chip-line: rgba(255, 255, 255, 0.18);
      --lf-chip-text: #d6d6d6;
      --lf-chip-hover-line: rgba(255, 255, 255, 0.4);
      --lf-chip-strong: #ffffff;
      --lf-error: #ff9090;
      --lf-error-line: #ff7a7a;

      display: block;
    }

    /* Form minimal, sin panel ni cajas. Cada campo es una sola línea inferior
       (como el website): label en mayúsculas y el input en mono sobre el negro.
       Flex column para poder alinear el botón a la derecha. */
    /* Variante clara: mismo formulario sobre un fondo claro (el recuadro de /contacto). */
    .cf-form--light {
      --lf-label: #3c3c3c;
      --lf-text: #111111;
      --lf-placeholder: #9a9a9a;
      --lf-line: rgba(17, 17, 17, 0.22);
      --lf-chip-line: rgba(17, 17, 17, 0.18);
      --lf-chip-text: #3c3c3c;
      --lf-chip-hover-line: rgba(17, 17, 17, 0.45);
      --lf-chip-strong: #111111;
      --lf-error: #c62828;
      --lf-error-line: #c62828;
    }

    /* Y si el pie de esa misma página pinta su zona oscura, vuelve a la paleta original. */
    :host-context(.app-dark) .cf-form--light {
      --lf-label: #ececec;
      --lf-text: #f0f0f0;
      --lf-placeholder: #6f6f6f;
      --lf-line: rgba(255, 255, 255, 0.22);
      --lf-chip-line: rgba(255, 255, 255, 0.18);
      --lf-chip-text: #d6d6d6;
      --lf-chip-hover-line: rgba(255, 255, 255, 0.4);
      --lf-chip-strong: #ffffff;
      --lf-error: #ff9090;
      --lf-error-line: #ff7a7a;
    }

    .cf-form {
      display: flex;
      flex-direction: column;
      padding: 0;
    }

    .cf-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.1rem, 2.2vw, 1.5rem);
    }

    .cf-field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .cf-field label {
      color: var(--lf-label);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .cf-req {
      color: var(--accent);
    }

    .cf-field input,
    .cf-field textarea {
      width: 100%;
      padding: 0.35rem 0;
      border: 0;
      border-bottom: 1px solid var(--lf-line);
      border-radius: 0;
      background: transparent;
      color: var(--lf-text);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      transition: border-color 160ms ease;
    }

    .cf-field textarea {
      min-height: 4rem;
      resize: vertical;
    }

    .cf-field input::placeholder,
    .cf-field textarea::placeholder {
      color: var(--lf-placeholder);
    }

    .cf-field input:focus,
    .cf-field textarea:focus {
      outline: none;
      border-bottom-color: var(--accent);
    }

    .cf-field input[aria-invalid='true'],
    .cf-field textarea[aria-invalid='true'] {
      border-bottom-color: var(--lf-error-line);
    }

    .cf-error {
      color: var(--lf-error);
      font-size: 0.72rem;
    }

    /* Los dos grupos de chips, uno al lado del otro. */
    .cf-chips-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1.2rem, 2.4vw, 2.2rem);
      margin: clamp(1.2rem, 2.4vw, 1.7rem) 0 0;
    }

    /* Chips seleccionables (multi). Mismo lenguaje que el resto: acento al activar. */
    .cf-chips {
      margin: 0;
      padding: 0;
      border: 0;
      min-width: 0;
    }

    .cf-chips__label {
      margin-bottom: 0.65rem;
      padding: 0;
      color: var(--lf-label);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .cf-chips__row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .cf-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.32rem 0.62rem;
      border: 1px solid var(--lf-chip-line);
      border-radius: 0.5rem;
      background: transparent;
      color: var(--lf-chip-text);
      font: inherit;
      font-size: 0.74rem;
      cursor: pointer;
      transition: color 160ms ease, border-color 160ms ease, background-color 160ms ease;
    }

    .cf-chip:hover {
      border-color: var(--lf-chip-hover-line);
      color: var(--lf-chip-strong);
    }

    .cf-chip:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .cf-chip.is-active {
      border-color: var(--accent);
      background: rgba(61, 81, 255, 0.18);
      color: var(--lf-chip-strong);
    }

    /* Aire entre los chips y el campo Mensaje. */
    .cf-chips-row + .cf-field {
      margin-top: clamp(1.2rem, 2.4vw, 1.7rem);
    }

    /* Botón de envío: azul compacto, alineado a la derecha del form (no full-width). */
    .cf-submit {
      display: inline-flex;
      align-self: flex-end;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: auto;
      margin-top: clamp(1.4rem, 2.6vw, 1.9rem);
      padding: 0.7rem 1.3rem;
      border: 0;
      border-radius: 0.6rem;
      background: var(--accent);
      color: #ffffff;
      font: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      cursor: pointer;
      transition: background-color 180ms ease, transform 180ms ease;
    }

    .cf-submit:hover {
      background: #2f43f0;
      transform: translateY(-1px);
    }

    .cf-submit:focus-visible {
      outline: 2px solid #ffffff;
      outline-offset: 2px;
    }

    .cf-submit__arrow {
      font-size: 0.95rem;
    }

    /* Estado enviado: centrado en su columna, con un check de acento animado
       (pop-in + el trazo que se dibuja + un anillo que late) que acompaña al mensaje. */
    .cf-sent {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: clamp(14rem, 30vh, 20rem);
      padding: clamp(2rem, 5vw, 4rem) 0;
    }

    .cf-sent__icon {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 4rem;
      height: 4rem;
      margin-bottom: 1.5rem;
      border: 1px solid var(--accent);
      border-radius: 999px;
      background: rgba(61, 81, 255, 0.14);
      color: var(--accent);
      animation: cf-sent-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    /* Anillo que emana del check (latido sutil, en bucle). */
    .cf-sent__icon::after {
      content: '';
      position: absolute;
      inset: -1px;
      border: 1px solid var(--accent);
      border-radius: 999px;
      opacity: 0;
      animation: cf-sent-ring 2.4s ease-out 360ms infinite;
    }

    /* El check se dibuja solo al aparecer. */
    .cf-sent__icon svg {
      position: relative;
    }

    .cf-sent__icon svg path {
      stroke-dasharray: 28;
      stroke-dashoffset: 28;
      animation: cf-sent-check 460ms ease 300ms forwards;
    }

    @keyframes cf-sent-pop {
      0% {
        transform: scale(0.4);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes cf-sent-ring {
      0% {
        transform: scale(1);
        opacity: 0.5;
      }
      80% {
        transform: scale(1.6);
        opacity: 0;
      }
      100% {
        transform: scale(1.6);
        opacity: 0;
      }
    }

    @keyframes cf-sent-check {
      to {
        stroke-dashoffset: 0;
      }
    }

    .cf-sent h3 {
      margin: 0 0 0.6rem;
      color: #f4f4f4;
      font-size: clamp(1.4rem, 2.5vw, 1.9rem);
      font-weight: 500;
      letter-spacing: -0.02em;
    }

    .cf-sent p {
      margin: 0;
      color: #b2b2b2;
      font-size: 1rem;
      line-height: 1.6;
    }

    @media (prefers-reduced-motion: reduce) {
      .cf-field input,
      .cf-field textarea,
      .cf-chip,
      .cf-submit {
        transition: none;
      }

      .cf-submit:hover {
        transform: none;
      }

      .cf-sent__icon,
      .cf-sent__icon::after,
      .cf-sent__icon svg path {
        animation: none;
      }

      .cf-sent__icon svg path {
        stroke-dashoffset: 0;
      }
    }

    /* Mobile: subir el cuerpo gris a casi-blanco para que se lea bien (en desktop el texto es mayor). */
    @media (max-width: 760px) {
      .cf-sent p {
        color: #f4f4f4;
      }
    }

    @media (max-width: 560px) {
      .cf-grid,
      .cf-chips-row {
        grid-template-columns: 1fr;
      }

      /* Apilado a 1 columna: más aire vertical entre campos (los gap pensados para 2 columnas colapsaban). */
      .cf-grid {
        gap: 1.6rem;
      }

      .cf-field {
        gap: 0.5rem;
      }

      .cf-chips-row {
        gap: 1.5rem;
        margin-top: 1.7rem;
      }

      .cf-chips-row + .cf-field {
        margin-top: 1.7rem;
      }

      .cf-submit {
        align-self: stretch;
        width: 100%;
      }
    }
  `
})
export class LeadFormComponent {
  /**
   * Desde dónde dice el lead que se llenó el form. Viaja al CRM en
   * `source.form_location`. En el pie es 'footer'; la página de contacto usa
   * 'contact_page'.
   */
  readonly formLocation = input<FormLocation>('footer');

  /**
   * Prefijo de los ids del DOM (`<prefijo>-name`, `<prefijo>-email`, …). Existe
   * porque dos formularios en la misma página no pueden repetir ids: cada
   * instancia recibe el suyo y los `<label for>` apuntan al campo correcto.
   */
  readonly idPrefix = input<string>('cf');

  /** `light` = fondo claro (recuadro de /contacto). Por defecto, la paleta del pie oscuro. */
  readonly variant = input<'dark' | 'light'>('dark');

  /**
   * Contexto opcional del sistema cuando el form se renderiza en una página
   * /software/<slug> (y, en este sitio, en una ficha del hub de Costa Rica).
   * Viaja al CRM en `source.page_context`, su propio campo del payload, para que
   * el correo de aviso y la ficha sepan qué sistema estaba viendo.
   *
   * Hasta la v1.6.0 esto se anteponía al mensaje entre corchetes, porque el
   * esquema del CRM no tenía dónde ponerlo. El mensaje volvió a ser solo lo que
   * escribió la persona.
   */
  readonly systemContext = input<LeadPageContext | null>(null);

  /**
   * Igual que systemContext pero para una página de industria
   * (/industrias/<slug>). Solo uno de los dos está activo por página.
   */
  readonly industryContext = input<LeadPageContext | null>(null);

  /**
   * Escape para una página que ya sabe su contexto y no lo piensa como sistema
   * ni como industria. Por defecto va en null, así que el pie sigue resolviendo
   * exactamente igual que antes.
   */
  readonly pageContext = input<LeadPageContext | null>(null);

  /**
   * El contexto que viaja en el payload. Sistema e industria son excluyentes
   * por página, así que el primero que exista es el bueno.
   */
  private readonly resolvedPageContext = computed<LeadPageContext | null>(
    () => this.pageContext() ?? this.systemContext() ?? this.industryContext()
  );

  /** Ids de los campos, derivados del prefijo. Los labels apuntan a estos mismos. */
  protected readonly ids = computed(() => {
    const p = this.idPrefix();
    return {
      name: `${p}-name`,
      company: `${p}-company`,
      email: `${p}-email`,
      phone: `${p}-phone`,
      message: `${p}-message`
    };
  });

  private readonly i18n = inject(LanguageService);
  protected readonly lang = this.i18n.lang;
  protected readonly t = computed(() => LEAD_FORM_TEXT[this.lang()]);

  protected readonly NEEDS: NeedChip[] = [
    { key: 'software', es: 'Software a medida', en: 'Custom software' },
    { key: 'web', es: 'Página web', en: 'Website' },
    { key: 'ecommerce', es: 'E-commerce', en: 'E-commerce' },
    { key: 'other', es: 'Otro', en: 'Other' }
  ];
  protected readonly CONTACT_METHODS: ContactMethod[] = [
    { key: 'email', icon: 'mail', es: 'Correo', en: 'Email' },
    { key: 'whatsapp', icon: 'message', es: 'WhatsApp', en: 'WhatsApp' },
    { key: 'call', icon: 'phone', es: 'Llamada', en: 'Call' }
  ];

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    message: ['']
  });

  // Chips multi-selección: un Set por grupo; cada toggle crea un Set nuevo (OnPush refresca).
  protected readonly needs = signal<ReadonlySet<string>>(new Set());
  protected readonly contactPrefs = signal<ReadonlySet<string>>(new Set());

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);
  protected readonly submitError = signal<string | null>(null);

  // CRM: servicio + contexto anti-spam (tiempo en el form + nº de interacciones).
  private readonly leadForm = inject(LeadFormService);

  /** Enviado: lo comparten todos los formularios de la página (ver LeadFormService.hasSent). */
  protected readonly sent = this.leadForm.hasSent;
  private readonly timeline = inject(TimelineService);
  private readonly formLoadedAt = Date.now();
  private interactionCount = 0;
  // Momento del PRIMER foco/cambio real del usuario en el form (no el render).
  private formFirstInteractionAt: number | null = null;

  constructor() {
    // Cada cambio del form cuenta como interacción (anti-spam mínimo: ≥1).
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.registerInteraction();
    });
  }

  /** Cuenta una interacción y marca el primer foco (para medir el tiempo real de llenado). */
  private registerInteraction(): void {
    if (this.formFirstInteractionAt === null) {
      this.formFirstInteractionAt = Date.now();
      this.timeline.log('form', 'Empezó a llenar el formulario');
    }
    this.interactionCount += 1;
  }

  protected isNeed(label: string): boolean {
    return this.needs().has(label);
  }

  protected isContact(label: string): boolean {
    return this.contactPrefs().has(label);
  }

  protected toggleNeed(label: string): void {
    this.registerInteraction();
    this.needs.set(toggleInSet(this.needs(), label));
  }

  protected toggleContact(label: string): void {
    this.registerInteraction();
    this.contactPrefs.set(toggleInSet(this.contactPrefs(), label));
  }

  // Inválido y ya "tocado" (o tras intentar enviar): así no marcamos errores antes de tiempo.
  protected invalid(control: 'email' | 'name' | 'phone'): boolean {
    const ctrl = this.form.get(control);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted());
  }

  protected submit(): void {
    this.submitted.set(true);
    this.submitError.set(null);

    // El grupo de contacto es requerido (≥1); los campos los valida el FormGroup.
    if (this.form.invalid || this.contactPrefs().size === 0) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.submitting()) {
      return;
    }
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const raw: LeadFormRawValue = {
      name: v.name,
      company: v.company,
      email: v.email,
      phone: v.phone,
      message: v.message,
      need: [...this.needs()].map((k) => NEED_MAP[k]).filter((x): x is NeedOption => !!x),
      preferred_contact: [...this.contactPrefs()]
        .map((k) => CONTACT_MAP[k])
        .filter((x): x is PreferredContactOption => !!x),
      // Honeypots: el form visible no los expone, así que van vacíos (= humano).
      website: '',
      url: ''
    };
    const context: LeadSubmitContext = {
      formLocation: this.formLocation(),
      formLoadedAt: this.formLoadedAt,
      formFirstInteractionAt: this.formFirstInteractionAt,
      interactionCount: this.interactionCount,
      pageContext: this.resolvedPageContext()
    };

    this.leadForm.submit(raw, context).subscribe((result) => {
      this.submitting.set(false);
      // 'spam_detected' se trata como éxito visual (no se le informa al bot).
      if (result.status === 'success' || result.status === 'spam_detected') {
        this.leadForm.markSent();
      } else {
        this.submitError.set(result.message);
      }
    });
  }
}

function toggleInSet(current: ReadonlySet<string>, value: string): ReadonlySet<string> {
  const next = new Set(current);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

const LEAD_FORM_TEXT = {
  es: {
    name: 'Nombre',
    company: 'Empresa',
    email: 'Correo',
    phone: 'WhatsApp / Teléfono',
    message: 'Mensaje',
    namePh: 'Tu nombre',
    companyPh: 'Nombre de tu empresa (opcional)',
    emailPh: 'tu@correo.com',
    phonePh: '+506 8888 8888',
    messagePh: 'Cuéntanos un poco sobre tu proyecto (opcional)',
    nameErr: 'Ingresa tu nombre.',
    emailErr: 'Ingresa un correo válido.',
    phoneErr: 'Ingresa un teléfono o WhatsApp.',
    needsLegend: '¿Qué necesitas?',
    contactLegend: '¿Cómo te contactamos?',
    contactErr: 'Elige al menos una opción.',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    sentTitle: '¡Listo! Te escribimos pronto.',
    sentBody: 'Gracias por tu mensaje. Te respondemos a la brevedad.'
  },
  en: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'WhatsApp / Phone',
    message: 'Message',
    namePh: 'Your name',
    companyPh: 'Your company (optional)',
    emailPh: 'you@email.com',
    phonePh: '+506 8888 8888',
    messagePh: 'Tell us a bit about your project (optional)',
    nameErr: 'Enter your name.',
    emailErr: 'Enter a valid email.',
    phoneErr: 'Enter a phone number or WhatsApp.',
    needsLegend: 'What do you need?',
    contactLegend: 'How should we reach you?',
    contactErr: 'Choose at least one option.',
    submit: 'Send message',
    sending: 'Sending…',
    sentTitle: "Got it! We'll be in touch soon.",
    sentBody: "Thanks for your message. We'll get back to you shortly."
  }
} as const;
