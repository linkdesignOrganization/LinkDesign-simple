import { RenderMode, ServerRoute } from '@angular/ssr';

import { SYSTEM_SLUGS } from './pages/systems-content';
import { INDUSTRY_SLUGS } from './pages/industries-content';
import { SOFTWARE_CR_CASE_SLUGS } from './pages/software-cr-cases-content';

/**
 * Todas las rutas se prerenderan a HTML estático (SSG) para SEO y LLMs.
 * Las 7 páginas de detalle de sistema (/software/:slug) se enumeran con getPrerenderParams
 * para que cada una genere su propio index.html con su contenido y SEO.
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'software/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SYSTEM_SLUGS.map((slug) => ({ slug }))
  },
  {
    path: 'en/software/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SYSTEM_SLUGS.map((slug) => ({ slug }))
  },
  {
    path: 'industrias/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => INDUSTRY_SLUGS.map((slug) => ({ slug }))
  },
  {
    path: 'en/industrias/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => INDUSTRY_SLUGS.map((slug) => ({ slug }))
  },
  // Fichas de los demos del hub de software CR, en ES y EN. El hub (sin parámetros) lo descubre
  // el '**' solo, como /industrias.
  {
    path: 'desarrollo-de-software-costa-rica/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOFTWARE_CR_CASE_SLUGS.map((slug) => ({ slug }))
  },
  {
    path: 'en/desarrollo-de-software-costa-rica/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => SOFTWARE_CR_CASE_SLUGS.map((slug) => ({ slug }))
  },
  { path: '**', renderMode: RenderMode.Prerender }
];
