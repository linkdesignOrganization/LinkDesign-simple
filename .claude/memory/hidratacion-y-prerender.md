---
name: hidratacion-y-prerender
description: El sitio es SSG sobre SWA (no SSR) y desde 2026-08-17 sí hidrata; por qué SSR no aplica acá
metadata: 
  node_type: memory
  type: project
  originSessionId: cbc9235a-f031-4bfa-9db1-d7b2c2bec9d7
  modified: 2026-08-17T17:59:48.896Z
---

**El sitio es SSG, no SSR en runtime**, y así corresponde: `angular.json` usa
`outputMode: "static"`, todas las rutas son `RenderMode.Prerender` y se despliegan como archivos
estáticos en Azure Static Web Apps. Azure **no soporta SSR de Angular** (sí Next.js y Nuxt); el
equipo de SWA lo confirmó y sigue sin resolverse.

No hace falta SSR: no hay una sola llamada de datos en runtime (cero `HttpClient`; los dos `fetch()`
del sitio son POST de telemetría al CRM tras interacción), el idioma se resuelve por ruta y las 40+
rutas son fijas. SSG produce **el mismo HTML** que produciría SSR — es el mismo
`@angular/platform-server`, ejecutado en build en vez de por request. Si alguien vuelve a proponer
migrar a App Service «para aprovechar el SSR», la respuesta es que no se gana nada y se pierde el
CDN. Ver [[project-linkdesign-azure-deploy]].

## Lo que faltaba (resuelto 2026-08-17, commit `c1232de`)

Faltaba `provideClientHydration()`. El navegador recibía el HTML prerenderizado, lo pintaba, y
Angular lo **descartaba y reconstruía entero** — el `<app-root>` se vaciaba a los 6,1 s en móvil.
Hasta el video ya descargado se volvía a pedir, y los clics de esa ventana se perdían.

Al hidratar apareció un bug que ese re-render venía tapando, y **conviene tenerlo presente porque el
patrón se repite**: en `app.ts`, el pipe de `currentUrl` tenía `startWith(null)` seguido de
`map(() => this.router.url)`. El `startWith` emitía al suscribirse y leía `router.url` **antes** de
que el Router resolviera la navegación inicial, o sea `'/'` → el header se pintaba como el del home
(sin `<nav>`) ~400 ms y se corregía después. Se arregló quitando el `startWith` y usando
`Location.path()` como `initialValue`, que vale igual en el prerender que en el browser.

Resultado medido en producción, antes → después:

| | escritorio | móvil 4G |
|---|---|---|
| CLS | 0,389 → **0,0006** | 0,072 → **0,010** |
| LCP | 3,2–8,6 s → **1,2–1,8 s** | 6,4 s → 5,8–6,6 s (sin cambio, ver [[lcp-dominado-por-videos]]) |
| Borrados del DOM | 1 por carga → **0** |  |

Para verificar que la hidratación sigue activa: el HTML servido debe traer atributos `ngh=`
(68 en `/software`). Cero `ngh` = no hidrata. Ojo: **una vez hidratada, Angular limpia esos
atributos del DOM**, así que hay que mirarlos con `curl`, no en el inspector.
