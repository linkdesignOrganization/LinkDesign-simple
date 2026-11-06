import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LanguageService } from '../services/language.service';

type PrivacySection = { title: string; body: string[] };

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="privacy">
      <header class="pp-head">
        <h1 class="pp-title">{{ t().title }}</h1>
        <p class="pp-meta">{{ t().updated }}</p>
      </header>

      <p class="pp-intro">{{ t().intro }}</p>

      @for (section of t().sections; track section.title) {
        <section class="pp-section">
          <h2 class="pp-section__title">{{ section.title }}</h2>
          @for (paragraph of section.body; track $index) {
            <p class="pp-text">{{ paragraph }}</p>
          }
        </section>
      }

      <section class="pp-section">
        <h2 class="pp-section__title">{{ t().contactTitle }}</h2>
        <p class="pp-text">
          {{ t().contactText }}
          <a class="pp-link" [href]="'mailto:' + email">{{ email }}</a>.
        </p>
      </section>
    </article>

    <div class="pp-legal">© {{ year }} Link Design. {{ t().rights }}</div>
  `,
  styles: `
    :host {
      display: block;
    }

    /* Prosa legible: ancho de lectura cómodo, alineada a la izquierda dentro del padding del sitio. */
    .privacy {
      max-width: 64ch;
      padding: clamp(2rem, 5vw, 4rem) 0 clamp(2.5rem, 5vw, 4rem);
    }

    .pp-head {
      margin-bottom: clamp(2rem, 4vw, 3rem);
    }

    .pp-title {
      margin: 0;
      color: var(--ink);
      font-size: clamp(2.4rem, 5vw, 4rem);
      font-weight: 600;
      letter-spacing: -0.04em;
      line-height: 1;
      text-wrap: balance;
    }

    .pp-meta {
      margin: 0.9rem 0 0;
      color: var(--muted);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      letter-spacing: 0.01em;
    }

    .pp-intro {
      margin: 0 0 clamp(1.6rem, 3vw, 2.4rem);
      color: var(--ink);
      font-size: 1.1rem;
      line-height: 1.65;
      text-wrap: pretty;
    }

    .pp-section {
      margin-top: clamp(1.8rem, 3.2vw, 2.6rem);
    }

    .pp-section__title {
      margin: 0 0 0.85rem;
      color: var(--ink);
      font-size: 1.32rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .pp-text {
      margin: 0 0 0.85rem;
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.7;
      text-wrap: pretty;
    }

    .pp-text:last-child {
      margin-bottom: 0;
    }

    .pp-link {
      color: var(--ink);
      text-decoration: underline;
      text-underline-offset: 0.2em;
      transition: color 180ms ease;
    }

    .pp-link:hover,
    .pp-link:focus-visible {
      color: var(--accent);
    }

    /* Barra de cierre simple, full-bleed: copyright centrado, sin formulario. */
    .pp-legal {
      position: relative;
      left: calc(50% - 50vw);
      width: 100vw;
      margin-top: clamp(2.5rem, 5vw, 4rem);
      padding: clamp(1.6rem, 3vw, 2.2rem) 0;
      border-top: 1px solid var(--line);
      color: var(--muted);
      font-size: 0.92rem;
      text-align: center;
    }
  `
})
export class PrivacyPageComponent {
  private readonly i18n = inject(LanguageService);
  protected readonly lang = this.i18n.lang;
  protected readonly t = computed(() => PRIVACY_TEXT[this.lang()]);

  protected readonly year = new Date().getFullYear();
  protected readonly email = 'hola@linkdesign.cr';
}

type PrivacyText = {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
  contactTitle: string;
  contactText: string;
  rights: string;
};

const PRIVACY_TEXT: Record<'es' | 'en', PrivacyText> = {
  es: {
    title: 'Política de privacidad',
    updated: 'Última actualización: Noviembre de 2026',
    intro:
      'En Link Design construimos software y sitios web a medida. Esta política explica qué datos ' +
      'recopilamos cuando visitas nuestro sitio o nos contactas, cómo los usamos y qué derechos ' +
      'tienes sobre ellos. Al usar el sitio, aceptas las prácticas que describimos aquí. Link Design ' +
      'es el nombre comercial de 3-101-912048 Sociedad Anónima, cédula jurídica 3-101-912048, con ' +
      'domicilio en San José, Costa Rica.',
    contactTitle: 'Contacto',
    contactText:
      'Si tienes dudas sobre esta política o sobre el tratamiento de tus datos, escríbenos a',
    rights: 'Todos los derechos reservados.',
    sections: [
      {
        title: 'Información que recopilamos',
        body: [
          'Datos que nos compartes: cuando completas un formulario o nos escribes, podemos recibir tu ' +
            'nombre y apellido, correo electrónico, empresa u organización y teléfono, junto con ' +
            'cualquier dato que decidas incluir en tu mensaje.',
          'Datos técnicos: al navegar el sitio recopilamos de forma automática información como tu ' +
            'dirección IP, el tipo de dispositivo y navegador, y las páginas que visitas. Nos sirve ' +
            'para entender el uso del sitio y mejorarlo.'
        ]
      },
      {
        title: 'Cómo usamos tu información',
        body: [
          'Usamos tus datos para responder consultas y dar seguimiento a solicitudes de información o ' +
            'cotización, coordinar reuniones, prestar los servicios que nos pidas y mejorar la ' +
            'experiencia del sitio a partir de métricas agregadas.',
          'No usamos tu información para fines distintos a los que te informamos al momento de ' +
            'recopilarla.'
        ]
      },
      {
        title: 'Conversaciones por WhatsApp',
        body: [
          'Cuando nos escribes por WhatsApp recibimos tu número de teléfono o tu nombre de usuario, el ' +
            'nombre de tu perfil y los mensajes y archivos que nos envías. Los recibimos y respondemos ' +
            'mediante la plataforma WhatsApp Business de Meta, y los guardamos en nuestro sistema de ' +
            'atención a clientes para darle seguimiento a tu consulta.',
          'Usamos esas conversaciones solo para responderte, darle seguimiento a tu solicitud y medir, ' +
            'de forma agregada, por qué canal nos llegan las consultas. No las usamos para enviarte ' +
            'publicidad sin tu consentimiento. Si prefieres que no te escribamos más por WhatsApp, ' +
            'avísanos en el mismo chat y dejaremos de hacerlo.'
        ]
      },
      {
        title: 'Empresas que conectan su WhatsApp a nuestro sistema',
        body: [
          'Cuando una empresa cliente conecta su número de WhatsApp Business a nuestro sistema, tratamos ' +
            'por cuenta de esa empresa los mensajes de sus clientes, sus contactos y, si lo autoriza, el ' +
            'historial de sus conversaciones. Lo hacemos con el único fin de prestarle el servicio de ' +
            'atención y seguimiento; la empresa es la responsable de esos datos.',
          'Los datos que recibimos a través de las plataformas de Meta no se venden ni se usan para ' +
            'publicidad. Guardamos cifrados los permisos de acceso que Meta nos entrega, y la empresa ' +
            'puede desconectar su número en cualquier momento desde la aplicación WhatsApp Business.'
        ]
      },
      {
        title: 'Cómo protegemos tu información',
        body: [
          'Aplicamos medidas de seguridad razonables para proteger tus datos frente a accesos no ' +
            'autorizados, pérdida o alteración. Aun así, ningún sistema es completamente infalible, ' +
            'por lo que no podemos garantizar una seguridad absoluta.'
        ]
      },
      {
        title: 'Con quién la compartimos',
        body: [
          'No vendemos ni alquilamos tus datos personales. Solo los compartimos con los proveedores ' +
            'tecnológicos necesarios para operar el sitio y prestar nuestros servicios, siempre bajo ' +
            'acuerdos de confidencialidad, o cuando una obligación legal así lo requiera. Entre ellos ' +
            'están Microsoft Azure, donde se alojan el sitio y nuestro sistema de atención, Google, para ' +
            'la medición del sitio y la publicidad, y Meta, para las conversaciones por WhatsApp.'
        ]
      },
      {
        title: 'Cookies',
        body: [
          'El sitio usa cookies necesarias para su funcionamiento, analíticas para entender cómo se ' +
            'usa y de preferencias para recordar tus elecciones. Puedes gestionarlas o eliminarlas ' +
            'desde la configuración de tu navegador.'
        ]
      },
      {
        title: 'Tus derechos',
        body: [
          'Puedes solicitar el acceso a tus datos, la corrección de información inexacta, su ' +
            'eliminación, la limitación de su uso o el retiro de tu consentimiento en cualquier ' +
            'momento. Para ejercerlos, escríbenos a hola@linkdesign.cr.'
        ]
      },
      {
        title: 'Cómo pedir que borremos tus datos',
        body: [
          'Para que eliminemos tus datos, incluidas tus conversaciones de WhatsApp, escríbenos a ' +
            'hola@linkdesign.cr o al mismo chat de WhatsApp desde el número que usaste, y dinos qué ' +
            'quieres que borremos. Lo hacemos en cuanto recibimos tu solicitud y te avisamos cuando esté ' +
            'hecho.'
        ]
      },
      {
        title: 'Cambios a esta política',
        body: [
          'Podemos actualizar esta política en cualquier momento. Cuando lo hagamos, publicaremos la ' +
            'versión vigente en esta misma página, con su fecha de actualización.'
        ]
      }
    ]
  },
  en: {
    title: 'Privacy policy',
    updated: 'Last updated: November 2026',
    intro:
      'At Link Design we build custom software and websites. This policy explains what data we collect ' +
      'when you visit our site or contact us, how we use it and what rights you have over it. By ' +
      'using the site, you accept the practices described here. Link Design is the trade name of ' +
      '3-101-912048 Sociedad Anónima, legal ID 3-101-912048, based in San José, Costa Rica.',
    contactTitle: 'Contact',
    contactText:
      'If you have questions about this policy or how we handle your data, write to us at',
    rights: 'All rights reserved.',
    sections: [
      {
        title: 'Information we collect',
        body: [
          'Data you share: when you fill out a form or write to us, we may receive your first and ' +
            'last name, email address, company or organization and phone, along with any data you ' +
            'choose to include in your message.',
          'Technical data: as you browse the site we automatically collect information such as your ' +
            'IP address, device and browser type, and the pages you visit. It helps us understand ' +
            'how the site is used and improve it.'
        ]
      },
      {
        title: 'How we use your information',
        body: [
          'We use your data to respond to inquiries and follow up on requests for information or ' +
            'quotes, coordinate meetings, deliver the services you ask for and improve the site ' +
            'experience based on aggregated metrics.',
          "We don't use your information for purposes other than those we informed you of when we " +
            'collected it.'
        ]
      },
      {
        title: 'WhatsApp conversations',
        body: [
          'When you message us on WhatsApp we receive your phone number or username, your profile name ' +
            "and the messages and files you send us. We receive and answer them through Meta's " +
            'WhatsApp Business platform, and we store them in our customer service system to follow ' +
            'up on your inquiry.',
          'We use those conversations only to answer you, follow up on your request and measure, in ' +
            "aggregate, which channel inquiries come from. We don't use them to send you advertising " +
            "without your consent. If you'd rather we stop messaging you on WhatsApp, tell us in the " +
            'same chat and we will.'
        ]
      },
      {
        title: 'Businesses that connect their WhatsApp to our system',
        body: [
          'When a client business connects its WhatsApp Business number to our system, we process, on ' +
            "that business's behalf, its customers' messages, its contacts and, if it authorizes it, " +
            'its conversation history. We do so only to provide it with the customer service and ' +
            'follow-up service; the business is responsible for that data.',
          "Data we receive through Meta's platforms is not sold or used for advertising. We store the " +
            'access permissions Meta gives us encrypted, and the business can disconnect its number ' +
            'at any time from the WhatsApp Business app.'
        ]
      },
      {
        title: 'How we protect your information',
        body: [
          'We apply reasonable security measures to protect your data against unauthorized access, ' +
            "loss or alteration. Even so, no system is completely foolproof, so we can't guarantee " +
            'absolute security.'
        ]
      },
      {
        title: 'Who we share it with',
        body: [
          "We don't sell or rent your personal data. We only share it with the technology providers " +
            'needed to run the site and deliver our services, always under confidentiality ' +
            'agreements, or when a legal obligation requires it. They include Microsoft Azure, which ' +
            'hosts the site and our customer service system, Google, for site measurement and ' +
            'advertising, and Meta, for WhatsApp conversations.'
        ]
      },
      {
        title: 'Cookies',
        body: [
          "The site uses cookies that are necessary for it to work, analytics cookies to understand " +
            'how it is used and preference cookies to remember your choices. You can manage or ' +
            'delete them from your browser settings.'
        ]
      },
      {
        title: 'Your rights',
        body: [
          'You can request access to your data, the correction of inaccurate information, its ' +
            'deletion, the restriction of its use or the withdrawal of your consent at any time. To ' +
            'exercise them, write to us at hola@linkdesign.cr.'
        ]
      },
      {
        title: 'How to ask us to delete your data',
        body: [
          'To have your data deleted, including your WhatsApp conversations, write to ' +
            'hola@linkdesign.cr or to the same WhatsApp chat from the number you used, and tell us ' +
            "what you want deleted. We do it as soon as we receive your request and let you know when " +
            "it's done."
        ]
      },
      {
        title: 'Changes to this policy',
        body: [
          "We may update this policy at any time. When we do, we'll publish the current version on " +
            'this same page, with its update date.'
        ]
      }
    ]
  }
};
