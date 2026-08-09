# LinkDesign — sitio `linkdesign.cr`

Sitio de la agencia, en Angular 22 con TypeScript 6, SSR y bilingüe ES/EN. Deploy por push a `main`
vía Azure Static Web Apps (`.github/workflows/azure-static-web-apps-black-wave-02ff68a0f.yml`), que
además acepta `workflow_dispatch` para redesplegar sin commit y un `repository_dispatch`
(`portfolio-updated`) con el que el CRM republica el portafolio.

```
npm start          # ng serve
npm run build      # el prebuild corre scripts/generate-portfolio.mjs
npm test           # vitest
```

## Estructura

- `src/app/app.ts` — aplica el SEO por ruta mediante un effect. **Es la única fuente de verdad de las
  metas**: un componente que toque `Title`/`Meta` por su cuenta pierde contra este effect.
- `src/app/services/seo-content.ts` — tabla `SEO_CONTENT` por ruta. Una ruta ausente cae en
  `SEO_FALLBACK` y hereda el SEO del home, que ya causó un problema real (ver abajo).
- `src/app/services/ads.service.ts` — reporta las conversiones a Google Ads.
- `src/app/lead-form/` — formulario con lead scoring; el score se traduce a valor de conversión.
- `lang.guard.ts`, `localize-url.pipe.ts`, `language.service.ts` — el árbol `/en` y la localización.

El **home no tiene footer**: `landing-page.ts` sirve una pantalla de bifurcación (dos tarjetas
Software/Web) y el `app-contact-footer` sólo se renderiza en las páginas internas.

## Sitio gemelo

Nolõ (`Desktop\Nolo\WEB`, dominio `nolo.ar`, mercado argentino) es un fork con la **misma
arquitectura**. Un cambio acá suele aplicar allá cambiando IDs, branding y teléfonos — y viceversa.
Antes de dar por terminado un cambio estructural, preguntá si corresponde replicarlo.

El **lead scoring está duplicado a mano** en el CRM (repo hermano) y verificado idéntico: si tocás el
algoritmo, se rompe esa paridad.

## Google Ads y Search Console

Las campañas de **ambos mercados** viven en la misma cuenta `6364218319` — Búsqueda/Software (Costa
Rica) y Búsqueda #2/Software #2 (Argentina). Hay acceso por API a Ads y a Search Console: invocá la
skill **`google-ads`** antes de escribir cualquier script de análisis.

Dos bitácoras, y conviene leerlas antes de proponer cambios porque registran el **porqué** de cada
decisión y varias hipótesis atractivas ya fueron probadas y descartadas:

- `docs/bitacora-ads-values-troas.md` — el plan de values ×2 → tROAS, la cita de revisión del 13 ago
  2026, y el análisis de atribución del embudo (por qué se descartó GA4, entre otras).
- `docs/bitacora-google-ads-api-basic.md` — el acceso a la API, el caso de compliance y el montaje de
  Search Console.

## No tocar sin leer antes

**La ruta `/ads`** es la homepage declarada de la app OAuth en Google Auth Platform y la URL que se
entregó a compliance de la API de Google Ads. No renombrarla ni eliminarla sin actualizar allá.
Su `h1` debe seguir diciendo **"Link Design" con espacio**: la verificación de marca compara ese
texto contra el nombre del cliente OAuth, y "LinkDesign" sin espacio ya falló una vez. Está fuera del
sitemap y sin enlaces entrantes **a propósito**, con `robots: 'noindex, follow'` puesto desde
`SEO_CONTENT` — que es el único lugar donde surte efecto.

Esto sigue vigente aunque la autenticación de la API ya no pase por OAuth de usuario: la app y su
verificación de marca continúan existiendo en el proyecto Cloud.


## Memoria del proyecto

@.claude/memory/MEMORY.md

Ese índice viaja con el repo: está en cualquier máquina donde lo clones, sin configurar nada. Los
archivos que lista no se cargan solos — leerlos cuando el tema aparezca.

Cuando aprendas algo duradero de este proyecto, escribilo ahí: un archivo por tema y una línea en
`MEMORY.md`. El índice se carga entero en cada sesión, así que va corto.
