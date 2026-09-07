import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideCheck, LucideCircleCheck, LucideCircleOff } from '@lucide/angular';

import { ContactFooterComponent, ContactInfo, SystemContext } from '../components/contact-footer.component';
import { FaqAccordionComponent } from '../components/faq-accordion.component';
import { IndustriesSectionComponent } from '../components/industries-section.component';
import { ProjectStagesComponent } from '../components/project-stages.component';
import { DarkZoneDirective } from '../directives/dark-zone.directive';
import { TrackSectionDirective } from '../directives/track-section.directive';
import { INDUSTRY_CARDS } from './industries-content';
import { SOFTWARE_CR, SOFTWARE_CR_LABELS } from './software-cr-content';

/**
 * Landing «Desarrollo de software a la medida en Costa Rica» (/desarrollo-de-software-costa-rica).
 *
 * Primera versión en producción para revisión (2026-09-07): `noindex`, sin enlaces entrantes, fuera
 * del sitemap y del llms.txt, solo en español (ruta fuera de los árboles de idioma, como /ads).
 * Cuando se apruebe, se decide cómo conectarla al sitio (nav, sitemap, SEO, versión EN).
 *
 * Misma anatomía que las páginas de detalle: hero sobre el artefacto del shell, secciones con
 * número mono «01», zona oscura al centro (precios, proceso, qué incluye), FAQ y footer del sitio.
 * Contenido en software-cr-content.ts.
 */
@Component({
  selector: 'app-software-cr-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ContactFooterComponent,
    FaqAccordionComponent,
    IndustriesSectionComponent,
    ProjectStagesComponent,
    DarkZoneDirective,
    TrackSectionDirective,
    LucideCheck,
    LucideCircleCheck,
    LucideCircleOff
  ],
  template: `
    <article class="sc">
      <!-- HERO: sobre el artefacto de grilla del shell -->
      <header class="sc-hero" appTrackSection="hero">
        <p class="sc-hero__eyebrow">{{ c.hero.eyebrow }}</p>
        <h1 class="sc-hero__title">
          {{ c.hero.title }}<img class="sc-hero__flag" src="/flag.svg" alt="Costa Rica" />
        </h1>
        <div class="sc-hero__grid">
          <div class="sc-hero__copy">
            <p class="sc-hero__lead">{{ c.hero.lead }}</p>
            <div class="sc-hero__actions">
              <a
                class="button"
                [href]="info.calendarLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ c.hero.ctaPrimary }}</span>
                <span class="button-arrow" aria-hidden="true">→</span>
              </a>
              <a
                class="button"
                [href]="info.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ c.hero.ctaSecondary }}</span>
                <span class="button-arrow" aria-hidden="true">→</span>
              </a>
            </div>
            <p class="sc-hero__promise">{{ c.hero.promise }}</p>
          </div>
          <dl class="sc-hero__stats">
            @for (s of c.hero.stats; track s.label) {
              <div class="sc-stat">
                <dt class="sc-stat__label">{{ s.label }}</dt>
                <dd class="sc-stat__value">{{ s.value }}</dd>
              </div>
            }
            <p class="sc-hero__updated">{{ c.hero.updated }}</p>
          </dl>
        </div>
      </header>

      <!-- 01 — Esta página es para ti si -->
      <section class="sc-section sc-fit sc-reveal" appTrackSection="para-quien">
        <header class="sc-section__head">
          <span class="sc-num">01</span>
          <div>
            <h2 class="sc-label">{{ l.forWhom }}</h2>
            <p class="sc-section__intro">{{ c.forWhom.intro }}</p>
          </div>
        </header>
        <div class="sc-fit__grid">
          @for (f of c.forWhom.fits; track $index) {
            <article class="sc-card">
              <span class="sc-card__icon sc-icon--accent" aria-hidden="true">
                <svg lucideCircleCheck [size]="28" [strokeWidth]="1"></svg>
              </span>
              <span class="sc-card__tag">{{ l.fitsTag }}</span>
              <p>{{ f }}</p>
            </article>
          }
          <article class="sc-card sc-card--muted">
            <span class="sc-card__icon sc-icon--muted" aria-hidden="true">
              <svg lucideCircleOff [size]="28" [strokeWidth]="1"></svg>
            </span>
            <span class="sc-card__tag">{{ l.notForTag }}</span>
            <p>{{ c.forWhom.notFor }}</p>
          </article>
        </div>
      </section>

      <!-- 02 — Cómo trabajamos -->
      <section class="sc-section sc-how" appTrackSection="como-trabajamos">
        <header class="sc-section__head">
          <span class="sc-num">02</span>
          <h2 class="sc-label">{{ l.how }}</h2>
        </header>
        <div class="sc-how__body">
          @for (p of c.how.statement; track $index) {
            <p class="sc-statement">{{ p }}</p>
          }
        </div>
        <h3 class="sc-sublabel">{{ c.how.examplesTitle }}</h3>
        <ol class="sc-examples">
          @for (e of c.how.examples; track $index) {
            <li class="sc-example sc-reveal">
              <span class="sc-example__n">{{ pad($index + 1) }}</span>
              <p class="sc-example__text">
                <span class="sc-example__if">{{ e.if }}</span>
                <span class="sc-example__then">{{ e.then }}</span>
              </p>
            </li>
          }
        </ol>
        <div class="sc-how__closing">
          @for (p of c.how.closing; track $index) {
            <p>{{ p }}</p>
          }
        </div>
      </section>

      <!-- 03 — Qué construimos + integraciones -->
      <section class="sc-section sc-systems" appTrackSection="que-construimos">
        <header class="sc-section__head">
          <span class="sc-num">03</span>
          <div>
            <h2 class="sc-label">{{ l.systems }}</h2>
            <p class="sc-section__intro">{{ c.systems.intro }}</p>
          </div>
        </header>
        <div class="sc-systems__grid">
          @for (s of c.systems.items; track s.slug) {
            <a class="sc-system sc-reveal" [routerLink]="'/software/' + s.slug">
              <h3 class="sc-system__title">{{ s.title }}</h3>
              <p class="sc-system__body">{{ s.body }}</p>
              <p class="sc-system__for">{{ s.forWhom }}</p>
              <span class="sc-system__link">{{ l.systemLink }} →</span>
            </a>
          }
        </div>
        <div class="sc-integrations">
          <h3 class="sc-sublabel">{{ c.systems.integrationsTitle }}</h3>
          <p class="sc-integrations__intro">{{ c.systems.integrationsIntro }}</p>
          <ul class="sc-checklist">
            @for (i of c.systems.integrations; track $index) {
              <li class="sc-checklist__item">
                <span class="sc-checklist__icon sc-icon--accent" aria-hidden="true">
                  <svg lucideCheck [size]="18" [strokeWidth]="1.5"></svg>
                </span>
                <span>{{ i }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <!-- 04 — Casos: demos + clientes reales -->
      <section class="sc-section sc-cases" id="casos" appTrackSection="casos">
        <header class="sc-section__head">
          <span class="sc-num">04</span>
          <div>
            <h2 class="sc-label">{{ l.cases }}</h2>
            <p class="sc-section__intro">{{ c.cases.intro }}</p>
          </div>
        </header>
        <div class="sc-demos">
          @for (d of c.cases.demos; track d.name) {
            <article class="sc-demo sc-reveal">
              <a class="sc-demo__media" [href]="d.link" target="_blank" rel="noopener noreferrer">
                <img [src]="d.poster" [alt]="d.name + ' · ' + d.category" loading="lazy" />
              </a>
              <div class="sc-demo__body">
                <p class="sc-demo__category">{{ d.category }}</p>
                <h3 class="sc-demo__name">{{ d.name }}</h3>
                <dl class="sc-demo__facts">
                  <dt>{{ l.demoBefore }}</dt>
                  <dd>{{ d.before }}</dd>
                  <dt>{{ l.demoAfter }}</dt>
                  <dd>{{ d.after }}</dd>
                  <dt>{{ l.demoCopied }}</dt>
                  <dd>{{ d.copied }}</dd>
                </dl>
                <p class="sc-demo__range">
                  <span class="sc-demo__range-label">{{ l.demoRange }}</span>
                  <span class="sc-demo__range-value">{{ d.range }}</span>
                </p>
                <a class="button sc-demo__cta" [href]="d.link" target="_blank" rel="noopener noreferrer">
                  <span>{{ l.demoTry }}</span>
                  <span class="button-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          }
        </div>
        <div class="sc-real">
          <h3 class="sc-sublabel">{{ c.cases.realTitle }}</h3>
          <ul class="sc-real__list">
            @for (r of c.cases.real; track r.name) {
              <li class="sc-real__item">
                <div class="sc-real__head">
                  <span class="sc-real__name">{{ r.name }}</span>
                  <span class="sc-real__what">{{ r.what }}</span>
                </div>
                <p class="sc-real__desc">{{ r.description }}</p>
                <span class="sc-real__range">{{ r.range }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <!-- 05 + 06 + 07 — Zona oscura: precios, proceso, qué incluye -->
      <div class="sc-dark" appDarkZone>
        <section class="sc-section sc-pricing" id="precios" appTrackSection="precios">
          <header class="sc-section__head">
            <span class="sc-num">05</span>
            <h2 class="sc-label">{{ l.pricing }}</h2>
          </header>
          <p class="sc-pricing__lead">{{ c.pricing.lead }}</p>
          <div class="sc-table-wrap">
            <table class="sc-table">
              <thead>
                <tr>
                  @for (col of c.pricing.columns; track col) {
                    <th scope="col">{{ col }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (r of c.pricing.rows; track r.type) {
                  <tr>
                    <td>{{ r.type }}</td>
                    <td class="sc-table__num">{{ r.range }}</td>
                    <td class="sc-table__num">{{ r.timeline }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div class="sc-pricing__grid">
            <div class="sc-pricing__col sc-pricing__col--wide">
              <h3 class="sc-sublabel">{{ c.pricing.factorsTitle }}</h3>
              <ul class="sc-checklist">
                @for (f of c.pricing.factors; track $index) {
                  <li class="sc-checklist__item">
                    <span class="sc-checklist__icon" aria-hidden="true">
                      <svg lucideCheck [size]="18" [strokeWidth]="1.5"></svg>
                    </span>
                    <span>{{ f }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="sc-pricing__col">
              <h3 class="sc-sublabel">{{ c.pricing.paymentTitle }}</h3>
              <p>{{ c.pricing.payment }}</p>
              <h3 class="sc-sublabel">{{ c.pricing.afterTitle }}</h3>
              <p>{{ c.pricing.after }}</p>
            </div>
          </div>
        </section>

        <!-- Proceso: el componente del sitio trae su propio título (sin número, como en /software). -->
        <section class="sc-process" id="proceso">
          <app-project-stages
            appTrackSection="proceso"
            [title]="c.process.title"
            [intro]="c.process.intro"
            [stages]="c.process.stages"
          />
          <p class="sc-process__closing">{{ c.process.closing }}</p>
        </section>

        <section class="sc-section sc-included sc-reveal" appTrackSection="incluye">
          <header class="sc-section__head">
            <span class="sc-num">06</span>
            <h2 class="sc-label">{{ l.included }}</h2>
          </header>
          <div class="sc-included__grid">
            @for (i of c.included.items; track i.title) {
              <article class="sc-panel">
                <h3 class="sc-panel__title">{{ i.title }}</h3>
                <p>{{ i.body }}</p>
              </article>
            }
          </div>
        </section>
      </div>

      <!-- 08 — Cómo elegir -->
      <section class="sc-section sc-choose" appTrackSection="como-elegir">
        <header class="sc-section__head">
          <span class="sc-num">07</span>
          <div>
            <h2 class="sc-label">{{ l.choose }}</h2>
            <p class="sc-section__intro">{{ c.choose.intro }}</p>
          </div>
        </header>
        <ol class="sc-choose__list">
          @for (i of c.choose.items; track i.title) {
            <li class="sc-choose__item sc-reveal">
              <span class="sc-choose__n">{{ pad($index + 1) }}</span>
              <div class="sc-choose__text">
                <span class="sc-choose__title">{{ i.title }}</span>
                <span class="sc-choose__body">{{ i.body }}</span>
              </div>
            </li>
          }
        </ol>
        <article class="sc-card sc-card--muted sc-choose__honest">
          <span class="sc-card__icon sc-icon--muted" aria-hidden="true">
            <svg lucideCircleOff [size]="28" [strokeWidth]="1"></svg>
          </span>
          <span class="sc-card__tag">{{ c.choose.honestTitle }}</span>
          <p>{{ c.choose.honest }}</p>
        </article>
      </section>

      <!-- Industrias: componente del sitio (mismo mazo que /software), con su propio título. -->
      <app-industries
        id="industrias"
        appTrackSection="industrias"
        [heading]="c.industries.heading"
        [intro]="c.industries.intro"
        [items]="industryCards"
      />

      <!-- 08 — Quiénes somos + dónde trabajamos -->
      <section class="sc-section sc-about" appTrackSection="quienes-somos">
        <header class="sc-section__head">
          <span class="sc-num">08</span>
          <h2 class="sc-label">{{ l.about }}</h2>
        </header>
        <div class="sc-about__body">
          @for (p of c.about.paragraphs; track $index) {
            <p class="sc-about__text">{{ p }}</p>
          }
          <h3 class="sc-sublabel sc-about__sublabel">{{ c.industries.zonesTitle }}</h3>
          <p class="sc-about__text">{{ c.industries.zones }}</p>
          <p class="sc-about__contact">{{ c.about.contact }}</p>
        </div>
      </section>

      <!-- 11 — Preguntas frecuentes -->
      <app-faq-accordion id="faq" appTrackSection="faq" [heading]="l.faq" [items]="c.faq" />
    </article>

    <app-contact-footer
      appDarkZone
      id="hablemos"
      appTrackSection="hablemos"
      [info]="info"
      [systemContext]="context"
    />
  `,
  styles: `
    :host {
      display: block;
    }

    .sc {
      display: block;
    }

    /* Cada sección tapa el artefacto del shell con un fondo full-bleed opaco (igual que el
       detalle de sistema). El hero no lo lleva: deja ver la grilla. */
    .sc-section {
      position: relative;
      z-index: 1;
      padding-block: var(--section-py);
    }

    .sc-section::before {
      content: '';
      position: absolute;
      inset: 0;
      left: calc(50% - 50vw);
      width: 100vw;
      z-index: -1;
      background: var(--surface);
      transition: background-color 450ms ease;
    }

    /* ── HERO ─────────────────────────────────────────────────────────────── */
    .sc-hero {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: clamp(1.6rem, 3vw, 2.6rem);
      min-height: clamp(22rem, 48vh, 34rem);
      padding-block: clamp(2.5rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem);
    }

    .sc-hero::after {
      content: '';
      position: absolute;
      left: calc(50% - 50vw);
      bottom: 0;
      width: 100vw;
      height: clamp(4rem, 9vw, 8rem);
      z-index: -1;
      pointer-events: none;
      background: linear-gradient(180deg, transparent, var(--surface));
    }

    .sc-hero__eyebrow {
      margin: 0;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .sc-hero__title {
      margin: 0;
      max-width: 16ch;
      color: var(--ink);
      font-size: var(--hero-title-size);
      font-weight: var(--hero-title-weight);
      letter-spacing: var(--hero-title-tracking);
      line-height: var(--hero-title-leading);
      text-wrap: balance;
    }

    .sc-hero__flag {
      display: inline-block;
      width: 0.55em;
      height: auto;
      margin-left: 0.22em;
      vertical-align: baseline;
      transform: translateY(0.02em);
    }

    .sc-hero__grid {
      display: grid;
      grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
      gap: clamp(2rem, 5vw, 5rem);
      align-items: end;
    }

    .sc-hero__copy {
      display: flex;
      flex-direction: column;
      gap: 1.4rem;
      max-width: 62ch;
    }

    .sc-hero__lead {
      margin: 0;
      color: var(--ink);
      font-size: var(--hero-lead-size);
      line-height: var(--hero-lead-leading);
      text-wrap: pretty;
    }

    .sc-hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .sc-hero__promise {
      margin: 0;
      color: var(--muted);
      font-size: 0.98rem;
      line-height: 1.5;
    }

    .sc-hero__stats {
      display: flex;
      flex-direction: column;
      margin: 0;
    }

    .sc-stat {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: 1rem 0;
      border-top: 1px solid var(--line);
    }

    .sc-stat__label {
      order: 2;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.4;
    }

    .sc-stat__value {
      order: 1;
      margin: 0;
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .sc-hero__updated {
      margin: 0;
      padding-top: 1rem;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* ── Rótulos / números de sección ─────────────────────────────────────── */
    .sc-num {
      display: block;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.04em;
      line-height: 1;
    }

    .sc-label {
      margin: 0;
      max-width: 22ch;
      color: var(--ink);
      font-size: clamp(1.5rem, 3vw, 2.1rem);
      font-weight: 400;
      letter-spacing: -0.04em;
      line-height: 1.05;
      text-wrap: balance;
    }

    .sc-sublabel {
      margin: 0 0 1rem;
      color: var(--ink);
      font-size: 1.15rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    .sc-section__head {
      display: grid;
      grid-template-columns: 2.6rem minmax(0, 1fr);
      align-items: baseline;
      gap: 1rem;
      margin-bottom: clamp(1.8rem, 3.5vw, 3rem);
    }

    .sc-section__intro {
      margin: 1rem 0 0;
      max-width: 60ch;
      color: var(--muted);
      font-size: 1.08rem;
      line-height: 1.6;
      text-wrap: pretty;
    }

    .sc-icon--accent { color: var(--accent); }
    .sc-icon--muted { color: var(--muted); }

    /* ── Cards (01 para ti si / 08 honesta) ───────────────────────────────── */
    .sc-fit__grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    .sc-card {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      padding: clamp(1.4rem, 2.2vw, 2rem);
      border: 1px solid var(--line);
      border-radius: 0.9rem;
      background: #fafafa;
    }

    .sc-card--muted {
      background: transparent;
      border-style: dashed;
    }

    .sc-card__icon {
      display: inline-flex;
    }

    .sc-card__tag {
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .sc-card p {
      margin: 0;
      color: var(--ink);
      font-size: 1.05rem;
      line-height: 1.5;
      text-wrap: pretty;
    }

    .sc-card--muted p {
      color: var(--muted);
    }

    /* ── 02 Cómo trabajamos ───────────────────────────────────────────────── */
    .sc-how__body {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      max-width: 48rem;
      margin-bottom: clamp(2rem, 4vw, 3.5rem);
    }

    .sc-statement {
      margin: 0;
      color: var(--ink);
      font-size: clamp(1.3rem, 2.3vw, 1.9rem);
      font-weight: 400;
      letter-spacing: -0.03em;
      line-height: 1.3;
      text-wrap: pretty;
    }

    .sc-examples {
      display: flex;
      flex-direction: column;
      margin: 0 0 clamp(2rem, 4vw, 3rem);
      padding: 0;
      list-style: none;
    }

    .sc-example {
      display: grid;
      grid-template-columns: 2.6rem minmax(0, 1fr);
      gap: 1rem;
      padding: clamp(1.2rem, 2vw, 1.6rem) 0;
      border-top: 1px solid var(--line);
    }

    .sc-example:last-child {
      border-bottom: 1px solid var(--line);
    }

    .sc-example__n {
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      line-height: 1.6;
    }

    .sc-example__text {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      margin: 0;
      max-width: 60ch;
    }

    .sc-example__if {
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.5;
    }

    .sc-example__then {
      color: var(--ink);
      font-size: 1.12rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.4;
    }

    .sc-how__closing {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 60ch;
    }

    .sc-how__closing p {
      margin: 0;
      color: var(--muted);
      font-size: 1.08rem;
      line-height: 1.6;
      text-wrap: pretty;
    }

    /* ── 03 Qué construimos ───────────────────────────────────────────────── */
    .sc-systems__grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }

    .sc-system {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding: clamp(1.4rem, 2.2vw, 2rem);
      border: 1px solid var(--line);
      border-radius: 0.9rem;
      background: #fafafa;
      color: inherit;
      text-decoration: none;
      transition: border-color 180ms ease, transform 220ms ease;
    }

    .sc-system:hover,
    .sc-system:focus-visible {
      border-color: var(--line-strong);
      transform: translateY(-2px);
      outline: none;
    }

    .sc-system__title {
      margin: 0;
      color: var(--ink);
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.25;
    }

    .sc-system__body {
      margin: 0;
      color: var(--ink);
      font-size: 1rem;
      line-height: 1.5;
    }

    .sc-system__for {
      margin: 0;
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .sc-system__link {
      margin-top: auto;
      padding-top: 0.6rem;
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.78rem;
      letter-spacing: 0.04em;
    }

    .sc-integrations__intro {
      margin: 0 0 1.2rem;
      max-width: 60ch;
      color: var(--muted);
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .sc-checklist {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .sc-checklist__item {
      display: grid;
      grid-template-columns: 1.6rem minmax(0, 1fr);
      gap: 0.8rem;
      padding: 0.9rem 0;
      border-top: 1px solid var(--line);
      color: var(--ink);
      font-size: 1.02rem;
      line-height: 1.55;
      max-width: 70ch;
    }

    .sc-checklist__item:last-child {
      border-bottom: 1px solid var(--line);
    }

    .sc-checklist__icon {
      display: inline-flex;
      padding-top: 0.2rem;
    }

    /* ── 04 Casos ─────────────────────────────────────────────────────────── */
    .sc-demos {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: clamp(1.2rem, 2.5vw, 2rem);
      margin-bottom: clamp(2.5rem, 5vw, 4rem);
    }

    .sc-demo {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 0.9rem;
      background: #fafafa;
    }

    .sc-demo__media {
      display: block;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: #e9e9e9;
    }

    .sc-demo__media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .sc-demo__media:hover img {
      transform: scale(1.02);
    }

    .sc-demo__body {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      padding: clamp(1.3rem, 2.2vw, 1.8rem);
    }

    .sc-demo__category {
      margin: 0;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .sc-demo__name {
      margin: 0;
      color: var(--ink);
      font-size: 1.35rem;
      font-weight: 500;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }

    .sc-demo__facts {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0;
    }

    .sc-demo__facts dt {
      margin-top: 0.5rem;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .sc-demo__facts dd {
      margin: 0;
      color: var(--ink);
      font-size: 0.98rem;
      line-height: 1.5;
    }

    .sc-demo__range {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin: 0.4rem 0 0;
      padding-top: 0.9rem;
      border-top: 1px solid var(--line);
    }

    .sc-demo__range-label {
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.68rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .sc-demo__range-value {
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.95rem;
    }

    .sc-demo__cta {
      align-self: flex-start;
      margin-top: 0.4rem;
    }

    .sc-real__list {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .sc-real__item {
      display: grid;
      grid-template-columns: minmax(0, 3fr) minmax(0, 6fr) minmax(0, 2fr);
      gap: 1.5rem;
      padding: 1.1rem 0;
      border-top: 1px solid var(--line);
      align-items: start;
    }

    .sc-real__item:last-child {
      border-bottom: 1px solid var(--line);
    }

    .sc-real__head {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .sc-real__name {
      color: var(--ink);
      font-size: 1.08rem;
      font-weight: 500;
      letter-spacing: -0.01em;
    }

    .sc-real__what {
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.4;
    }

    .sc-real__desc {
      margin: 0;
      color: var(--ink);
      font-size: 0.98rem;
      line-height: 1.5;
    }

    .sc-real__range {
      color: var(--ink);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      text-align: right;
      white-space: nowrap;
    }

    /* ── Zona oscura: 05 precios, proceso, 06 incluye ─────────────────────── */
    .sc-dark .sc-label,
    .sc-dark .sc-sublabel,
    .sc-dark .sc-panel__title {
      color: #f4f4f4;
    }

    .sc-dark .sc-num,
    .sc-dark .sc-checklist__icon {
      color: rgba(255, 255, 255, 0.55);
    }

    .sc-dark p,
    .sc-dark .sc-checklist__item {
      color: #f4f4f4;
    }

    .sc-dark .sc-checklist__item {
      border-color: rgba(255, 255, 255, 0.16);
    }

    .sc-pricing__lead {
      margin: 0 0 clamp(1.8rem, 3vw, 2.5rem);
      max-width: 62ch;
      font-size: clamp(1.15rem, 1.8vw, 1.4rem);
      line-height: 1.5;
      text-wrap: pretty;
    }

    .sc-table-wrap {
      overflow-x: auto;
      margin-bottom: clamp(2rem, 4vw, 3rem);
    }

    .sc-table {
      width: 100%;
      min-width: 40rem;
      border-collapse: collapse;
      color: #f4f4f4;
      font-size: 0.98rem;
    }

    .sc-table th,
    .sc-table td {
      padding: 0.9rem 1rem 0.9rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.16);
      text-align: left;
      vertical-align: top;
      line-height: 1.45;
    }

    .sc-table tbody tr:last-child td {
      border-bottom: 1px solid rgba(255, 255, 255, 0.16);
    }

    .sc-table th {
      color: rgba(255, 255, 255, 0.55);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .sc-table__num {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .sc-pricing__grid {
      display: grid;
      grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
      gap: clamp(2rem, 4vw, 4rem);
      align-items: start;
    }

    .sc-pricing__col p {
      margin: 0 0 1.6rem;
      font-size: 1.02rem;
      line-height: 1.6;
      text-wrap: pretty;
    }

    .sc-process {
      position: relative;
      z-index: 1;
      padding-top: calc(var(--section-py) * 0.5);
    }

    .sc-process__closing {
      margin: 0;
      padding-bottom: var(--section-py);
      max-width: 60ch;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .sc-included__grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }

    .sc-panel {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding: clamp(1.4rem, 2.2vw, 2rem);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 0.9rem;
      background: #161616;
    }

    .sc-panel__title {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      line-height: 1.3;
    }

    .sc-panel p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.55;
      text-wrap: pretty;
    }

    /* ── 07 Cómo elegir ───────────────────────────────────────────────────── */
    .sc-choose__list {
      display: flex;
      flex-direction: column;
      margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
      padding: 0;
      list-style: none;
    }

    .sc-choose__item {
      display: grid;
      grid-template-columns: 2.6rem minmax(0, 1fr);
      gap: 1rem;
      padding: clamp(1.1rem, 2vw, 1.5rem) 0;
      border-top: 1px solid var(--line);
    }

    .sc-choose__item:last-child {
      border-bottom: 1px solid var(--line);
    }

    .sc-choose__n {
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      line-height: 1.6;
    }

    .sc-choose__text {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      max-width: 60ch;
    }

    .sc-choose__title {
      color: var(--ink);
      font-size: 1.12rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.35;
    }

    .sc-choose__body {
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.5;
    }

    .sc-choose__honest {
      max-width: 48rem;
    }

    /* ── 08 Quiénes somos ─────────────────────────────────────────────────── */
    .sc-about__body {
      display: grid;
      grid-template-columns: 2.6rem minmax(0, 1fr);
      gap: 1rem;
    }

    .sc-about__body > * {
      grid-column: 2;
    }

    .sc-about__text {
      margin: 0 0 1.2rem;
      max-width: 62ch;
      color: var(--ink);
      font-size: 1.12rem;
      line-height: 1.6;
      text-wrap: pretty;
    }

    .sc-about__sublabel {
      margin: 0.6rem 0 0.8rem;
    }

    .sc-about__contact {
      margin: 0;
      max-width: 62ch;
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.6;
    }

    /* ── Reveal on scroll (guardado en TS con isPlatformBrowser para el SSG) ── */
    .sc-reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 600ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .sc-reveal.is-in {
      opacity: 1;
      transform: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .sc-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }

    /* ── Responsive ───────────────────────────────────────────────────────── */
    @media (max-width: 1024px) {
      .sc-hero__grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .sc-fit__grid,
      .sc-systems__grid,
      .sc-included__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      .sc-fit__grid,
      .sc-systems__grid,
      .sc-included__grid,
      .sc-demos,
      .sc-pricing__grid {
        grid-template-columns: 1fr;
      }

      .sc-section__head,
      .sc-about__body {
        grid-template-columns: 2rem minmax(0, 1fr);
        gap: 0.75rem;
      }

      .sc-example,
      .sc-choose__item {
        grid-template-columns: 1.6rem minmax(0, 1fr);
        gap: 0.8rem;
      }

      .sc-real__item {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }

      .sc-real__range {
        text-align: left;
      }

      .sc-hero__title {
        max-width: none;
      }

      .sc-dark p,
      .sc-dark .sc-checklist__item,
      .sc-dark .sc-panel p {
        color: #f4f4f4;
      }
    }
  `
})
export class SoftwareCrPageComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly c = SOFTWARE_CR;
  protected readonly l = SOFTWARE_CR_LABELS;
  protected readonly industryCards = INDUSTRY_CARDS('es');

  // Footer del sitio (mismos datos que las páginas de detalle de Link Design).
  protected readonly info: ContactInfo = {
    email: 'hola@linkdesign.cr',
    whatsappLink: 'https://wa.me/50672325943',
    calendarLink: 'https://cal.com/linkdesign.cr/reunion-con-link-design',
    calendarLinkEn: 'https://cal.com/linkdesign.cr/meeting-with-link-design',
    location: 'San José, Costa Rica'
  };

  // Etiqueta el lead en el CRM con la página de origen (misma vía que el detalle de sistema).
  protected readonly context: SystemContext = {
    name: 'Landing desarrollo de software Costa Rica',
    slug: 'desarrollo-de-software-costa-rica'
  };

  private observer: IntersectionObserver | null = null;

  // Índice con cero a la izquierda (01, 02, …).
  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    this.host.nativeElement
      .querySelectorAll('.sc-reveal')
      .forEach((el: Element) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
