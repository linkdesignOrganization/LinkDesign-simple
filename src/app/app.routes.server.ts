import { RenderMode, ServerRoute } from '@angular/ssr';

/** Todas las rutas se prerenderan a HTML estático (SSG) para SEO y LLMs. */
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender }
];
