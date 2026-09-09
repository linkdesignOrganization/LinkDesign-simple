---
name: landing-software-cr
description: Hub /desarrollo-de-software-costa-rica y sus 6 fichas: ES en prod sin indexar (2026-09-07) y EN completo en local sin push (2026-09-08), conectados al toggle y enlazados desde /software y las páginas de sistema; qué sigue bloqueado hasta que Robert apruebe, qué es provisional, contrato por idioma y gotchas
metadata:
  type: project
---

Hub «Desarrollo de software a la medida en Costa Rica» en `/desarrollo-de-software-costa-rica` y seis
fichas de demo en `/desarrollo-de-software-costa-rica/:slug` (pulso, cumbre, estudio-dental-mendieta,
tornos-del-sur, punto-cero, vertice-seguridad-industrial). Estado al 2026-09-08:

- **En producción** desde el 2026-09-07 (commit `508cd25`): solo el hub, solo ES, sin enlaces de
  entrada, para que Robert lo revise con velocidad y scroll reales.
- **En local, sin push** (árbol sin commitear sobre `6b148c7`): las seis fichas, la versión EN de hub
  y fichas en `/en/desarrollo-de-software-costa-rica[/slug]` (mismo slug bajo `/en`, como todo el
  sitio) conectada al toggle de idioma, y los enlaces de entrada de abajo. Robert revisa en
  `http://localhost:4300` y decide el push; el deploy es el push a `main`.

**Sigue bloqueado hasta que Robert lo autorice:** `noindex, nofollow` en ES y EN (meta desde
`SEO_CONTENT` en `services/seo-content.ts` + `X-Robots-Tag` en `public/staticwebapp.config.json`,
cuatro rutas: hub y fichas, con y sin `/en`), fuera de `sitemap.xml` y de `llms.txt`. Los hreflang
es/en/x-default ya se declaran recíprocos: son inocuos con noindex; al indexar solo cambian `robots`,
la cabecera, el sitemap y el llms.txt. El hub NO va en el menú ni en el footer del sitio (decisión de
Robert).

**Enlaces de entrada (es y en):** en `/software` y `/en/software`, la intro de la sección de demos
enlaza al hub y cada tarjeta de video lleva el botón «Ver la ficha» / «See the case» («Ver ficha» /
«See case» en móvil) a su ficha (`components/viewcases.component.ts`: rótulos resueltos por idioma
dentro del componente, `href` localizados, la tarjeta ya no es un `<a>` para no anidar anclas). En
las siete páginas `/software/:slug` (`pages/system-detail-page.ts`): la sección 05 «Así se ve un
sistema como este» / «What a system like this looks like» (resumen + «Navegar el demo» + «Ver la
ficha», video 1280×682 a la derecha, corre la numeración con `num()`; mapa Vértice→crm-a-medida,
Tornos→erp-operacion-inventario, Dental→reservas-y-agenda, Pulso→dashboards-y-reporting,
Cumbre→automatizacion-ia; Punto Cero, e-commerce y ticketing sin par) y la sección «Cuánto cuesta en
Costa Rica» / «What it costs in Costa Rica» (zona oscura, antes de «Verlo funcionando») con la fila
de precios del hub (campo `system` en `pricing.rows`; dashboards no tiene fila y muestra el rango
general) y el enlace «Ver todos los rangos por tipo de sistema» / «See all ranges by system type» al
hub. El hub tiene nav propio (`SOFTWARE_CR_NAV` en `app.ts`: Inicio · Casos · Precios · Proceso /
Home · Work · Pricing · Process; «Inicio» lleva a `/software`) y la flecha de volver de una ficha
vuelve al hub del mismo idioma (`goBack()` en `app.ts`).

**Contrato de contenido por idioma:** los componentes solo hablan con getters, con `lang`
obligatorio. `pages/software-cr-content.ts`: `SOFTWARE_CR` (ES, sin `as const`) y
`SOFTWARE_CR_EN: SoftwareCrContent` (misma forma, mismas claves, mismos largos),
`SOFTWARE_CR_LABELS[_EN]`, `getSoftwareCrContent(lang)`, `getSoftwareCrLabels(lang)`,
`getSoftwareCrPriceForSystem(system, lang)`. `pages/software-cr-cases-content.ts`:
`SOFTWARE_CR_CASES` (ES) y el overlay `SOFTWARE_CR_CASES_EN: Record<slug, SoftwareCrCaseText>` (solo
texto: `slug`, `system`, `poster`, `video` y `link` salen siempre del ES), `getSoftwareCrCases(lang)`,
`getSoftwareCrCase(slug, lang)`, `getSoftwareCrCaseForSystem(system, lang)`,
`getSoftwareCrCaseLabels(lang)`. Las páginas (`software-cr-page.ts`, `software-cr-case-page.ts`)
resuelven contenido, rótulos, fichas e industrias con `computed` sobre `lang()`; el calendario usa
`calendarLinkEn` en inglés, como el footer. Al togglear, `langGuard` fija el idioma antes de que el
router reemplace la página: el componente saliente se re-renderiza un instante en el otro idioma y
un `@for` que trackea por el propio string traducido (`track col`) disparaba el warning NG0956 en
dev (Angular solo lo emite con track por identidad); por eso las columnas de la tabla trackean por
`$index`. Los cuatro NG0956 que quedan al togglear salen de los chips de `industries-section`
(`track c`), componente compartido de todo el sitio. `context.name` del lead al CRM queda en español en ambos idiomas
(etiqueta interna; el footer antepone su prefijo por idioma). El EN agrega una sola frase que el ES
no dice: «The demos are in Spanish, with sample data.» (confidencialidad de las fichas); los rótulos
«…» de los demos se citan en español dentro del EN. Specs de paridad: `software-cr-content.spec.ts`,
`software-cr-cases-content.spec.ts`, `services/seo-content.spec.ts` y el nav del hub en
`app.spec.ts`. El escaneo de fugas de español sobre el `dist` EN, con su prueba obligatoria del
detector, está en §7.1 del plan.

**Provisional (pendiente de confirmación de Robert, en los dos idiomas, marcado `// PROVISIONAL`):**
desde 2020, 26 proyectos, propuesta en 5 días hábiles, garantía de un año (Robert lo fijó el 2026-09-07; excluye cambios de alcance), infraestructura USD 20-80,
integraciones, zonas, casos reales. Los rangos salen de las 58 propuestas con monto del CRM. Al
confirmar un valor se tocan ES y EN.

**Gotchas:** (1) el dev server de este proyecto es el 4300 (`ng serve --port 4300`; el 4200 es otro
proyecto, no tocarlo): tras varias ediciones seguidas sirvió la clase nueva con la plantilla y los
estilos viejos (sin errores en consola, aunque el HTML SSR sí era el nuevo); se arregla reiniciándolo,
y conviene reiniciarlo antes de cada verificación. (2) El `<video autoplay>` de la ficha y de la
página de sistema necesita `muted` como atributo (lo serializa el prerender; sin él el navegador
bloquea el autoplay en carga directa) Y `[muted]="true"` como propiedad (Chrome ignora
`setAttribute('muted')` al navegar en cliente): van los dos. (3) `npm run build` reescribe
`src/app/generated/portfolio.data.json` desde el CRM; en local se compila con `npx ng build`. (4) Una
ficha con slug inexistente cae en `/404` sin prefijo (página solo ES), como las otras páginas de
detalle del sitio. (5) El reveal del hub va por scroll/rAF, no por IntersectionObserver (un observer
armado una vez quedaba mudo tras la recarga en caliente).

**Why:** Robert quiere ver velocidad, scroll y toggle reales antes de decidir qué se indexa y qué se
enlaza; el sitio tiene una estructura de UI muy específica que hay que mantener limpia, y el sitio es
bilingüe: toda página nueva tiene su par EN conectado al toggle, traducido con sentido, no literal.

**How to apply:** los cambios se hacen en local, Robert los revisa y decide el push; **no** indexar,
agregar al sitemap/llms.txt ni meter el hub en el menú o el footer hasta que él lo diga. Todo cambio
de contenido va en ES y EN a la vez, respetando el contrato (mismas claves y largos) para que los
specs de paridad sigan en verde. Bitácora de la versión EN (contrato, brief de traducción, olas,
registro de ondas y checklist de verificación): `~/dev/WebSite/PLAN-EN-SOFTWARE-CR.md`; plan de
contenido: `~/dev/WebSite/PLAN-CONTENIDO-SEO.md`. Si la sesión se corta, retomar leyendo la
«Bitácora de ejecución» y el «Registro de ondas» al final del plan EN.

**2026-09-08, ronda SEO (Ola 4, local):** auditoría completa y correcciones: descriptions de las 14 páginas
entre 120 y 160 (fijado por spec), títulos de ficha con sufijo «| Link Design», `Service` JSON-LD con
`areaServed` país y `AggregateOffer` USD 1.500-15.000 en el hub, `VideoObject` con duración en cada ficha,
og:image propia por ficha (póster 1280×682) con alt por idioma, og:locale:alternate, breadcrumb de 3 niveles
con «Home» en EN, `dateModified`, y los enlaces cruzados que faltaban: la tabla de precios del hub enlaza a
las 6 páginas de sistema y cada ficha a la suya («Este demo es un ejemplo de …»; Punto Cero no tiene par).
También: `/software` ya no duplica su JSON-LD de videos al hidratar, y el demo de Punto Cero apunta a
`/acceso`. **El checklist de encendido (quitar noindex, sitemap, sitemap-videos, llms.txt, Search Console)
está en §9 de `~/dev/WebSite/PLAN-EN-SOFTWARE-CR.md` y espera la autorización de Robert.** Pendiente suyo
también: confirmar los valores PROVISIONAL antes de indexar (la garantía es de un año, no 60 días).

**2026-09-08 · EN PRODUCCIÓN** (commit `9b324b0`): el hub y las seis fichas viven en `/` y en `/en`, con
`noindex, nofollow` en meta y cabecera, fuera del sitemap y del llms.txt. Verificado por curl en prod.
Pendientes acordados con Robert, de a uno y cuando él lo pida: encendido SEO (§9 del plan), aviso al CRM del
formulario enviado desde estas páginas, revisar el impacto en Google Ads antes de tocar nada, y que los
botones de calendario y WhatsApp reporten conversión como en `/software` sin alterar la configuración actual.

**2026-09-08 · INDEXABLE.** Robert autorizó el encendido: fuera el `noindex` (meta y cabecera) del hub y
las seis fichas en los dos idiomas, 14 URLs nuevas en `sitemap.xml` (54 en total), 14 en
`sitemap-videos.xml` con la duración de cada clip, sección propia en `llms.txt`, y los dos sitemaps
reenviados a Search Console con 0 errores y 0 avisos (el de videos **nunca había estado registrado**,
aunque el `robots.txt` lo declaraba desde siempre). Siguen `noindex` `/ads` y las dos páginas 404.
En la misma ronda se dejó consistente el SEO del resto del sitio: el `@graph` de marca salía en español
en las páginas EN y ahora lo emite `SeoService` por idioma (`data-seo="brand"`, salió del `index.html`);
`serviceType` por idioma; breadcrumbs del hub y las fichas colgando de `/software`; catorce títulos de
páginas de sistema perdieron el guion largo; todas las páginas indexables quedaron con título ≤ 70 y
description entre 120 y 160 (`metaDescription()` tiene ahora un piso, y el `<title>` de una industria se
desacopla de su h1 cuando no cabe). **Gotcha nuevo:** `faq-accordion` y `services-stack` creaban su
JSON-LD en el cliente sin reutilizar el nodo del prerender, así que en el navegador se duplicaban
`FAQPage` e `ItemList`; el patrón correcto (buscar `script[data-seo="…"]` antes de crear) ya está en los
tres componentes y en las dos páginas nuevas. **Para enviar sitemaps por API hace falta el scope
`https://www.googleapis.com/auth/webmasters`**: el módulo `gsc` pide solo el de lectura y devuelve 403.
Único paso manual pendiente, opcional: «Solicitar indexación» del hub en la interfaz de Search Console.

**2026-09-08 · el correo de aviso dice la página del lead.** Bitácora en
`~/dev/WebSite/PLAN-AVISO-CRM-ORIGEN.md`. Se resolvió entero en el CRM (`web-lead.email.ts`), sin tocar
los sitios ni el esquema del payload: `source.pageUrl` ya viajaba desde la versión 1.0.0 y es
obligatorio, así que vale también para el histórico y para Nolõ. La fila «Vino por» muestra el nombre
de la página cuando la página lo aporta y **siempre** la ruta debajo. **Gotcha del deploy del CRM,
arreglado el mismo día:** el paso «Prepare deployment package» instala sin lock (el del monorepo vive
en la raíz) y npm 10, el del runner, recorre las `devDependencies` para resolver peers aunque no las
instale; con vitest 4.1.11 eso revienta con `edgesOut` y dejó el deploy en rojo dos veces. El paquete
se arma ahora con un `package.json` sin `devDependencies`.

**2026-09-09 · conversiones de Ads en las páginas nuevas.** Los tres botones de contacto del hub
(«Agendar reunión» y «WhatsApp» del hero) y de las fichas («Agendar reunión de 30 minutos», sección
de precio) reportan desde hoy las mismas conversiones que el hero, el footer y `/contacto`
(`AdsService.scheduleMeeting` / `.whatsapp`). Regla para páginas nuevas: todo enlace a cal.com o
wa.me lleva su `(click)` al `AdsService`; los specs `software-cr-page.spec.ts` y
`software-cr-case-page.spec.ts` lo cubren, junto con el calendario por idioma. Nolõ no tiene estas
páginas; si las recibe, misma regla.
