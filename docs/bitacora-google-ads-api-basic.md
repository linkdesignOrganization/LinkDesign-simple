# Bitácora — Solicitud de Basic access de la API de Google Ads (caso 9-8605000042015)

Complementa [bitacora-ads-values-troas.md](./bitacora-ads-values-troas.md): el plan de puja de ahí
es justamente el caso de uso que se le presenta a Google (hoy cada cambio se aplica a mano en la UI
porque el token es de nivel Explorer y el acceso vía MCP es read-only).

## Línea de tiempo

| Fecha | Hecho |
|---|---|
| 23 jul 2026 | Solicitud de Basic access enviada (uso interno; Campaign Management + Reporting + Keyword Planning; <1000 ops/día). |
| 24 jul 2026 | Acuse de recibo de Google (`noreply@google.com`). Se crea `/ads` y se completa la verificación de marca de OAuth con esa URL como homepage de la app. |
| 25 jul 2026 | `ads-api-compliance@google.com` devuelve la solicitud **por incompleta**, con un único motivo: *"Your company website https://linkdesign.cr does not have content related to your application"*. Ofrecen como alternativa mock-ups o una descripción detallada del modelo de negocio y del caso de uso. Advierten: **no reenviar el formulario con las mismas respuestas**. |
| 25 jul 2026 | Diagnóstico + cambios de este commit + borrador de respuesta al hilo del caso. |

**No es una negación**: es un expediente incompleto y subsanable. La verificación de marca de OAuth
(aprobada el 24 jul) es un proceso **distinto** y no cuenta como evidencia para compliance.

## Diagnóstico: por qué el revisor no encontró nada

En el formulario se declaró como sitio de la empresa el dominio raíz. Tres cosas hacían que `/ads`
fuera invisible desde ahí:

1. **El home no tiene footer.** `landing-page.ts` (`@if (page().isHome)`) sirve una pantalla de
   bifurcación: dos tarjetas Software/Web y un `h1` para lectores de pantalla. El
   `app-contact-footer` — con los enlaces legales — solo se renderiza en el `@else`, o sea en las
   páginas internas. Quien abre `https://linkdesign.cr` ve dos tarjetas y nada más.
2. **`/ads` no estaba enlazada** desde ninguna página ni incluida en `sitemap.xml`.
3. **El SEO de `/ads` era el del home.** La ruta no estaba en `SEO_CONTENT`, así que el effect de
   `App` (`app.ts:91`) le aplicaba `SEO_FALLBACK`: en producción `/ads` servía el `<title>` del home,
   `canonical` a `https://linkdesign.cr/` y el JSON-LD del home. El `noindex, nofollow` que el
   componente ponía en su constructor nunca llegó al HTML (el effect corre después y lo sobreescribía).

## Decisión: la respuesta va por correo, no publicando la herramienta

Se descartó hacer descubrible `/ads` desde el sitio (ni pie en el home, ni enlace en el footer, ni
sitemap): documentar públicamente una herramienta de uso interno no corresponde. El correo de
compliance ofrece la alternativa expresamente — *"you may provide mock-ups of your site or a
detailed description of your business model and use case of the API"* — y el Required Minimum
Functionality de la política de acceso aplica a herramientas ofrecidas a terceros, no a uso interno.
La descripción detallada va en el reply al caso.

`/ads` **se conserva igual**: no nació para compliance sino para OAuth. La verificación de marca de
Google Auth Platform exige una homepage accesible que explique el propósito de la app, y esa es la
URL declarada en la Console; la verificación está aprobada (24 jul) y la app OAuth en producción es
lo que sostiene el refresh token permanente. Borrarla obligaría a declarar otra homepage y a una
probable re-verificación, y el verificador automático ya falló una vez con una página que no
explicaba su propósito (el home splitter no pasaría).

## Cambios aplicados (25 jul 2026)

- **`/ads` con SEO propio**: entrada `SEO_CONTENT['/ads']` (ES/EN) con title, description, keywords,
  `canonicalPath: '/ads'` y **`robots: 'noindex, follow'`** — el noindex sólo surte efecto desde acá
  (ver el punto 3 del diagnóstico). Sin enlaces entrantes y fuera del sitemap, a propósito.
- **`SeoData.singleUrl`**: flag nuevo para rutas fuera de los árboles de idioma (una sola URL sirve
  ES+EN). Mantiene el canonical sin prefijo `/en` y apunta los tres hreflang a la propia URL, en vez
  de declarar un `/en/ads` que daría 404. Los `<link rel=alternate>` se reescriben en cada
  navegación porque viven en el `<head>` y sobreviven al cambio de ruta.
- **Metas fuera del componente**: `ads-tool-page.ts` ya no toca `Title`/`Meta` (era una segunda
  fuente de verdad que además perdía contra el effect de `App`).
- **Contenido de `/ads` ampliado** con lo que compliance evalúa: modelo de negocio, alcance de
  cuentas, servicios de la API que se usan, volumen (<1000 ops/día) y el hecho de que no hay
  interfaz web pública.
- **Alcance de cuentas corregido**: antes decía "únicamente las cuentas propiedad de Link Design" y
  "no accede a datos de terceros", lo que contradice el uso real (la herramienta también analiza
  cuentas de clientes que colgamos del MCC). Ahora declara: cuentas propias (CR y AR) **más** las de
  un grupo reducido de clientes de la agencia, que no tienen acceso a la herramienta ni a la API.
  Sigue calificando como *internal tool*.

## Pendientes

- [ ] **Responder al hilo del caso** (borrador ya en Gmail, sin enviar): reply a
      `ads-api-compliance@google.com` **sin tocar el asunto**, para no perder el número de caso. El
      correo del API Center es el canal principal de compliance y no responder a sus avisos puede
      degradar el token. El deploy del sitio no es prerequisito: el correo no promete cambios en la
      web, solo entrega la URL de la homepage de la app OAuth como referencia.
- [ ] **Si en ~5 días hábiles no hay respuesta**: recién entonces reenviar el formulario, con
      respuestas nuevas (nunca las mismas) y la descripción del caso de uso incluida.
- [ ] Si piden evidencia visual: capturas reales de los informes que produce la herramienta (el
      correo ya las ofrece). No hay UI web que mostrar; es honesto decirlo y así está declarado.

## Nota para el futuro

No renombrar ni eliminar la ruta `/ads` sin actualizar la Google Auth Platform: es la homepage
declarada de la app OAuth y la URL entregada a compliance. El `h1` debe seguir diciendo
**"Link Design"** con espacio — la verificación de marca compara ese texto contra el nombre del
cliente OAuth, y "LinkDesign" sin espacio ya falló una vez.
