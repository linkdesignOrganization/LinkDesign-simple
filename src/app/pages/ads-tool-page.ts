import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Página descriptiva de la aplicación interna "LinkDesign" (gestión de Google Ads).
 * Existe porque la verificación de marca de Google Auth Platform exige que la
 * "página principal de la app" OAuth explique su propósito con claridad.
 * noindex: es una página utilitaria, no contenido de marketing del sitio.
 */
@Component({
  selector: 'app-ads-tool-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="adsapp">
      <header class="ap-head">
        <h1 class="ap-title">LinkDesign</h1>
        <p class="ap-meta">Aplicación interna de gestión y análisis de Google Ads</p>
      </header>

      <p class="ap-intro">
        LinkDesign es la aplicación interna con la que el equipo de LinkDesign — la agencia de
        diseño web y desarrollo de software de Costa Rica detrás de
        <a class="ap-link" href="https://linkdesign.cr">linkdesign.cr</a> — analiza y gestiona sus
        propias campañas publicitarias de Google Ads mediante la API de Google Ads.
      </p>

      <section class="ap-section">
        <h2 class="ap-section__title">¿Qué hace esta aplicación?</h2>
        <ul class="ap-list">
          <li>Informes de rendimiento de campañas: métricas, términos de búsqueda, cuota de impresiones y calidad.</li>
          <li>Gestión de presupuestos, palabras clave y palabras clave negativas de las campañas propias.</li>
          <li>Experimentos A/B y ajustes de estrategia de puja.</li>
          <li>Investigación de palabras clave para los mercados donde LinkDesign anuncia.</li>
        </ul>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">Acceso y datos</h2>
        <p class="ap-text">
          La aplicación se autentica con Google OAuth y accede únicamente a las cuentas de Google
          Ads propiedad de LinkDesign. No es una herramienta pública: la usa exclusivamente el
          equipo interno, no accede a datos de terceros y no comparte información con nadie fuera
          de LinkDesign. El tratamiento de datos se describe en nuestra
          <a class="ap-link" href="/politicas-de-privacidad">política de privacidad</a>.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">About this app (English)</h2>
        <p class="ap-text">
          LinkDesign is the internal application used by the LinkDesign team (linkdesign.cr) to
          analyze and manage our own Google Ads campaigns through the Google Ads API. It
          authenticates with Google OAuth, accesses only LinkDesign's own advertising accounts,
          and does not share data with third parties.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">Contacto</h2>
        <p class="ap-text">
          Si tenés preguntas sobre esta aplicación, escribinos a
          <a class="ap-link" [href]="'mailto:' + email">{{ email }}</a>.
        </p>
      </section>
    </article>

    <div class="ap-legal">© {{ year }} Link Design. Todos los derechos reservados.</div>
  `,
  styles: `
    :host {
      display: block;
    }

    .adsapp {
      max-width: 64ch;
      padding: clamp(2rem, 5vw, 4rem) 0 clamp(2.5rem, 5vw, 4rem);
    }

    .ap-head {
      margin-bottom: clamp(1.6rem, 3.5vw, 2.6rem);
    }

    .ap-title {
      margin: 0;
      color: var(--ink);
      font-size: clamp(2.4rem, 5vw, 4rem);
      font-weight: 600;
      letter-spacing: -0.04em;
      line-height: 1;
      text-wrap: balance;
    }

    .ap-meta {
      margin: 0.9rem 0 0;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.01em;
    }

    .ap-intro {
      margin: 0 0 clamp(1.6rem, 3vw, 2.4rem);
      color: var(--ink);
      font-size: 1.1rem;
      line-height: 1.65;
      text-wrap: pretty;
    }

    .ap-section {
      margin-bottom: clamp(1.4rem, 2.5vw, 2rem);
    }

    .ap-section__title {
      margin: 0 0 0.6rem;
      color: var(--ink);
      font-size: 1.15rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .ap-text,
    .ap-list {
      margin: 0;
      color: var(--ink);
      font-size: 1rem;
      line-height: 1.65;
      text-wrap: pretty;
    }

    .ap-list {
      padding-left: 1.2rem;
    }

    .ap-list li {
      margin-bottom: 0.4rem;
    }

    .ap-link {
      color: var(--ink);
      text-decoration: underline;
      text-underline-offset: 3px;
    }

    .ap-legal {
      padding-bottom: clamp(2rem, 4vw, 3rem);
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.8rem;
    }
  `
})
export class AdsToolPageComponent {
  readonly email = 'hola@linkdesign.cr';
  readonly year = new Date().getFullYear();

  constructor() {
    inject(Title).setTitle('LinkDesign — Aplicación de gestión de Google Ads');
    const meta = inject(Meta);
    meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    meta.updateTag({
      name: 'description',
      content:
        'LinkDesign es la aplicación interna con la que el equipo de linkdesign.cr analiza y gestiona sus propias campañas de Google Ads mediante la API de Google Ads.'
    });
  }
}
