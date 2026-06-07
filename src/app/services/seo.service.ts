import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  /** Path canónico (ej. '/software'); se resuelve contra siteUrl. */
  canonicalPath?: string;
  image?: string;
  locale?: string;
  robots?: string;
}

/**
 * SeoService — title + meta tags (description, keywords, robots), Open Graph,
 * Twitter card y canonical, por ruta e idioma. Portado de LinkDesign2.0.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteOrigin = this.normalizeOrigin(environment.siteUrl) || 'https://linkdesign.cr';
  private readonly defaultImage = 'https://linkdesign.cr/assets/img/favicons/1200x630opengraph.png';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  apply(data: SeoData): void {
    const image = data.image || this.defaultImage;
    const locale = data.locale || 'es_CR';
    const robots =
      data.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const url = this.absoluteUrl(data.canonicalPath ?? this.currentPath());

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ name: 'robots', content: robots });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: locale });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private currentPath(): string {
    return this.doc.location ? this.doc.location.pathname : '/';
  }

  private absoluteUrl(path: string): string {
    const clean = (path || '/').split('#')[0].split('?')[0];
    const normalized = clean === '/' ? '/' : '/' + clean.replace(/^\/+|\/+$/g, '');
    return `${this.siteOrigin}${normalized}`;
  }

  private normalizeOrigin(url?: string): string | null {
    if (!url) return null;
    try {
      return new URL(url).origin;
    } catch {
      return url.replace(/\/+$/, '');
    }
  }
}
