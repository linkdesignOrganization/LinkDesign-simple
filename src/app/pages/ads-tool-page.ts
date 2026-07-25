import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Página principal de la app OAuth interna "Link Design" (gestión de Google Ads). Existe por la
 * verificación de marca de Google Auth Platform, que exige una homepage accesible que explique el
 * propósito de la app; es la URL declarada en la Console. Sirve además como respaldo si el equipo
 * de compliance de la API entra a verla — pero el detalle de la solicitud de Basic access se le
 * entrega a Google por correo, no publicándolo en el sitio: la herramienta es de uso interno.
 *
 * Deliberadamente NO es contenido del sitio: `noindex` y sin enlaces entrantes (ni footer ni
 * sitemap). Ver SEO_CONTENT['/ads'].
 *
 * El h1 debe decir "Link Design" con espacio: la verificación de marca compara el nombre del
 * cliente OAuth contra la marca textual de la página.
 *
 * Title/description/canonical/robots viven en SEO_CONTENT['/ads'] (seo-content.ts), no acá:
 * App aplica seoForUrl() en un effect por ruta y sobrescribe cualquier meta local.
 */
@Component({
  selector: 'app-ads-tool-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="adsapp">
      <header class="ap-head">
        <h1 class="ap-title">Link Design</h1>
        <p class="ap-meta">Aplicación interna de gestión y análisis de Google Ads</p>
      </header>

      <p class="ap-intro">
        Link Design es la aplicación interna con la que el equipo de Link Design — la agencia de
        diseño web y desarrollo de software de Costa Rica detrás de
        <a class="ap-link" href="https://linkdesign.cr">linkdesign.cr</a> — analiza y gestiona
        campañas publicitarias de Google Ads mediante la API de Google Ads.
      </p>

      <section class="ap-section">
        <h2 class="ap-section__title">Nuestro negocio</h2>
        <p class="ap-text">
          Link Design es una agencia de diseño web y desarrollo de software a medida. Nuestros
          ingresos vienen exclusivamente de proyectos para clientes: sitios web, aplicaciones web y
          móviles, y sistemas internos de gestión. No vendemos, revendemos ni distribuimos ningún
          producto publicitario, y esta aplicación no forma parte de nada que le vendamos a un
          cliente: es la herramienta con la que gestionamos la publicidad que ya administramos.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">¿Qué hace esta aplicación?</h2>
        <ul class="ap-list">
          <li>Informes de rendimiento de campañas: métricas, términos de búsqueda, cuota de impresiones y nivel de calidad.</li>
          <li>Gestión de presupuestos diarios y de estrategias de puja.</li>
          <li>Gestión de palabras clave y de palabras clave negativas, en campaña y en grupo de anuncios.</li>
          <li>Experimentos A/B sobre las campañas.</li>
          <li>Investigación de palabras clave para los mercados donde anunciamos (Costa Rica y Argentina).</li>
        </ul>
        <p class="ap-text">
          El volumen es bajo: menos de 1000 operaciones diarias contra la API. La aplicación no
          tiene interfaz web pública — son procesos internos que opera nuestro equipo.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">A qué cuentas accede</h2>
        <p class="ap-text">
          Únicamente a las cuentas de Google Ads que cuelgan de nuestra propia cuenta de
          administrador: las cuentas publicitarias propias de Link Design (Costa Rica y Argentina) y
          las de un grupo reducido de clientes de la agencia cuyas campañas administramos por
          encargo. Esos clientes no tienen acceso a la aplicación ni a la API: reciben los informes
          que preparamos para ellos.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">Acceso y datos</h2>
        <p class="ap-text">
          La aplicación se autentica con Google OAuth y la usa exclusivamente el equipo interno de
          Link Design. No es una herramienta pública: no tiene registro de usuarios, no se
          distribuye fuera de la empresa y los datos de Google Ads no se comparten con terceros ni
          se integran en ningún producto. El tratamiento de datos se describe en nuestra
          <a class="ap-link" href="/politicas-de-privacidad">política de privacidad</a>.
        </p>
      </section>

      <section class="ap-section">
        <h2 class="ap-section__title">About this app (English)</h2>
        <p class="ap-text">
          Link Design is the internal application used by the Link Design team (linkdesign.cr), a
          web design and custom software development agency in Costa Rica, to analyze and manage
          Google Ads campaigns through the Google Ads API. It handles performance reporting, daily
          budgets, bidding strategies, keywords and negative keywords, A/B experiments and keyword
          research for the markets where we advertise.
        </p>
        <p class="ap-text">
          It is an internal tool: it authenticates with Google OAuth, it is used only by our own
          staff, it has no public sign-up or web interface, and it works exclusively on the accounts
          under our own manager account — Link Design's own advertising accounts plus those of a
          small number of agency clients whose campaigns we manage on their behalf. Those clients
          have no access to the tool or to the API. We run fewer than 1,000 API operations per day,
          and Google Ads data is never shared with third parties, resold or built into any product
          we sell.
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
}
