# Bitácora — Solicitud de Basic access de la API de Google Ads (caso 9-8605000042015)

Complementa [bitacora-ads-values-troas.md](./bitacora-ads-values-troas.md): el plan de puja de ahí
es justamente el caso de uso que se le presentó a Google, cuando cada cambio había que aplicarlo a
mano en la UI porque el token era de nivel Explorer y el acceso vía MCP era read-only.

> **Caso cerrado el 28 jul 2026: Basic aprobado.** Ese cuello de botella ya no existe — la API
> escribe. Lo verificado y el montaje resultante están al final del documento.

## Línea de tiempo

| Fecha | Hecho |
|---|---|
| 23 jul 2026 | Solicitud de Basic access enviada (uso interno; Campaign Management + Reporting + Keyword Planning; <1000 ops/día). |
| 24 jul 2026 | Acuse de recibo de Google (`noreply@google.com`). Se crea `/ads` y se completa la verificación de marca de OAuth con esa URL como homepage de la app. |
| 25 jul 2026 | `ads-api-compliance@google.com` devuelve la solicitud **por incompleta**, con un único motivo: *"Your company website https://linkdesign.cr does not have content related to your application"*. Ofrecen como alternativa mock-ups o una descripción detallada del modelo de negocio y del caso de uso. Advierten: **no reenviar el formulario con las mismas respuestas**. |
| 25 jul 2026 | Diagnóstico + cambios de este commit. |
| 25 jul 2026, 13:01 UTC | **Respuesta enviada** dentro del hilo del caso, a `ads-api-compliance@google.com`: descripción detallada del modelo de negocio y del caso de uso, sin publicar nada de la herramienta en el sitio. A esperar. |
| 28 jul 2026, 17:28 y 18:05 UTC | **APROBADO.** Dos correos: el token de la MCC `333-229-3537` queda activado en Basic, con **15.000 operaciones/día** (se habían pedido <1000). La respuesta por correo bastó: nunca hizo falta reenviar el formulario ni publicar nada en el sitio. |
| 30 jul 2026 | Verificación empírica del nivel y **migración de la autenticación a service account**. Se retira el MCP. |

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

- [x] **Responder al hilo del caso** — enviado el 25 jul 2026 a las 13:01 UTC, dentro del hilo y sin
      tocar el asunto (el número de caso es lo que enruta al ticket). El correo del API Center es el
      canal principal de compliance: no responder a sus avisos puede degradar el token.
- [x] **Esperar respuesta** — resuelto el 28 jul con la aprobación. No hizo falta reenviar el
      formulario ni entregar evidencia visual. **La lección**: ante un expediente devuelto por
      incompleto, responder al hilo del caso con la descripción detallada es suficiente; publicar
      una herramienta interna en el sitio no era el precio de entrada.
- [x] ~~Si piden evidencia visual: capturas reales de los informes.~~ Nunca se pidió.

### Nota operativa: redactar el reply por API

Al crear el borrador con el conector de Gmail: **pasar `htmlBody`** (HTML ya armado, sin etiquetas
`<a>`). Con `body` de texto plano, Gmail linkifica las URLs y las guarda envueltas en su redirector
(`google.com/url?q=…&source=gmail&ust=…`) dentro del cuerpo — pasa igual escribiéndolas sin
`https://`. Y **no usar `update_draft` sobre un borrador que es respuesta**: no acepta el campo de
reply y le borra los encabezados `In-Reply-To`/`References`, así que el borrador se sale del hilo
(útil solo si querés expulsar un borrador viejo de la conversación, que es cómo se limpió este caso).
El conector no puede enviar correos ni borrar borradores: eso queda siempre a mano.

## Qué habilitó Basic, verificado contra el servidor (30 jul 2026)

No se dio por buena la palabra del correo: se probó cada capacidad. Diagnóstico reutilizable en
`%USERPROFILE%\.google-ads\verificar_acceso.py` — correrlo cuando algo falle, porque separa un
problema de identidad de uno de permisos en Google Ads o de nivel del token.

| Capacidad | Estado |
|---|---|
| Lectura (GAQL) | ya funcionaba en Explorer |
| **Keyword Planner** | **desbloqueado** — 239 ideas con volúmenes; era lo que Explorer prohibía |
| **Escritura (mutates)** | **habilitada** — validada con `validate_only` |
| Cuota | 15.000 ops/día (antes ~2880) |

Con esto cae el "se aplica manualmente en la UI — el acceso API es read-only" de
[bitacora-ads-values-troas.md](./bitacora-ads-values-troas.md): el tROAS del 13 ago ya se puede
aplicar por API.

## Cambio de arquitectura: del MCP a scripts con service account (30 jul 2026)

**Se retiró el MCP.** Las consultas de este trabajo son únicas y responden al análisis del momento,
no son cientos de llamadas repetitivas: un servidor read-only de 3 tools daba menos de lo que da un
script, que además puede escribir y usar Keyword Planner (nada de eso lo exponía el MCP).

**La autenticación dejó de ser de usuario.** El 30 jul el acceso apareció caído con
`503 Reauthentication is needed`; el fondo del error era `invalid_grant / invalid_rapt`, o sea el
reauth periódico de Google, no un token revocado. Dos cosas lo volvían insostenible:

1. Es recurrente por diseño — ese mismo día también pedía reauth el CLI de `gcloud`.
2. Un correo del 28 jul avisa que **desde el 5 ago 2026** ese flujo exige **passkey**, y que una
   passkey nueva tarda **hasta 7 días** en volverse operativa. Un script no puede resolver eso solo.

Google recomienda en ese mismo correo el service account workflow, que está exento de ambas cosas.

**Montaje resultante** (todo fuera del repo, en `%USERPROFILE%\.google-ads\`):

- `ads-api@linkdesign-ads-api.iam.gserviceaccount.com`, agregada como usuaria del MCC en
  **Administración → Acceso y seguridad** con nivel Estándar. Hereda las cuentas hijas.
- `ads-api-key.json` — la key, con ACL restringida al usuario de Windows.
- `config.json` — developer token, MCC y versión de la API. **Ojo**: el token vivía únicamente
  dentro de la config del MCP; retirar el MCP sin migrarlo primero lo habría destruido.
- `ads.py` — base común (`search`, `cuentas`, `campos`, `error`), registrada en el venv vía `.pth`
  para que cualquier script haga `import ads` sin preámbulo.

**No hizo falta delegación de dominio.** Se llegó a crear pensando en ese camino, pero la
documentación vigente agrega la service account como usuaria dentro de Google Ads, sin impersonar a
nadie. Es mejor: el permiso queda acotado a lo que se le dé en Google Ads, en vez de autorizar a la
service account a actuar como cualquier usuario del dominio. `ads.py` conserva la impersonación
apagada y opcional por si algún día se necesitara el otro camino.

**Sobre el scope**: `https://www.googleapis.com/auth/adwords` es el **único** que existe en esta API
— no hay variante de solo lectura ni una ampliada. No limita ningún análisis. El techo real lo ponen
el nivel de acceso de la service account en Google Ads y el developer token, nunca el scope. Otras
APIs (GA4, Search Console) se resolverían igual: agregando el email de la service account allá.
Search Console se resolvió exactamente así el 7 ago 2026 — ver la sección siguiente.

**Alcance actual**: `6364218319` Link Design · `3332293537` MCC · `9018431297` PsicoYng ·
`6593270911` Zacate Tierra Fertil. La cuenta `6460296196` **ya no es visible**: era accesible desde
el usuario pero no cuelga del MCC. Si hace falta, se agrega la service account ahí también.

## Ampliación: la Search Console API (7 ago 2026)

Se cumplió lo anticipado arriba — la misma service account, agregada del otro lado. **No hizo falta
credencial, proyecto ni librería nueva**: la API es REST plana y basta `AuthorizedSession` de
`google-auth`, así que `google-api-python-client` (que no está en el venv) sigue sin instalarse.

**Montaje**, en el mismo `%USERPROFILE%\.google-ads\`:

- `searchconsole.googleapis.com` habilitada en el proyecto `linkdesign-ads-api` (`217676920431`).
- La service account agregada en **Search Console → Configuración → Usuarios y permisos**, nivel
  **Completo**.
- `gsc.py` — base común espejo de `ads.py` (`consulta` ya paginada y con las dimensiones
  desempaquetadas, `propiedades`, `filtro`, `inspeccionar`), registrada por el mismo `.pth`: `import
  gsc` funciona sin preámbulo.
- `verificar_gsc.py` — diagnóstico de 4 escalones, porque acá se confunden **tres permisos
  distintos**: la API habilitada en el proyecto Cloud, el nivel dentro de la propiedad, y el scope
  del token. El 403 por API deshabilitada y el 403 por falta de permiso se parecen; solo el mensaje
  los separa.

**Dos caminos muertos, para no repetirlos**: la service account **no puede habilitarse servicios a
sí misma** (403 `AUTH_PERMISSION_DENIED` en Service Usage), y `gcloud` tenía el reauth caducado
(`cannot prompt during non-interactive execution`) — el mismo problema que motivó la migración a
service account, reapareciendo por el otro flanco. Se hizo por la consola web.

**Por qué Completo y no Restringido**: la **URL Inspection API devuelve 403 con Restringido**. El
freno de escritura real lo pone el scope `webmasters.readonly`, no el nivel de permiso, así que
Completo no abre riesgo; Propietario —único que gestiona usuarios— sí sería de más. Verificado:
`urlInspection` responde `PASS` / "Enviada e indexada" sobre `https://linkdesign.cr/`.

**Trampa que no da error**: el país va en **ISO 3166-1 alpha-3** y Costa Rica es `cri` — `crc` es el
colón. Con el código equivocado la API devuelve **cero filas sin quejarse**, que es peor que fallar.

**Alcance**: una sola propiedad, `sc-domain:linkdesign.cr` (de dominio). **Nolõ no tiene propiedad en
Search Console**, así que Argentina no tiene contraparte orgánica medible; ahí Ads es el único canal.

### También se vinculó Search Console con Google Ads

Es un camino aparte del anterior y da otra cosa: el recurso `paid_organic_search_term_view` de la
**API de Google Ads**, que cruza pago y orgánico por término en una sola tabla, segmentado por
`search_engine_results_page_type` (solo anuncio / solo orgánico / ambos).

La ruta vieja `/aw/settings/linkedaccounts` da **404**. Ahora es **Herramientas → Administrador de
datos → Productos conectados → Conectar producto → Search Console**, y pide la URL del sitio como
`linkdesign.cr` (queda registrada como `http://linkdesign.cr` aunque la propiedad sea `sc-domain:`).
Se vinculó sola por ser el mismo usuario propietario de ambos lados.

**Ese informe no tiene backfill**: `paid_organic_search_term_view` seguía devolviendo 0 filas justo
después de vincular, con 445 clics en los 30 días previos. Los datos se acumulan **desde la
vinculación en adelante**, así que para el 13 ago habrá ~6 días. El cruce histórico hay que armarlo a
mano con `gsc.py` contra los datos de Ads.

### Qué aporta esto y qué no

**No es GA4 ni lo reemplaza.** La decisión de descartar GA4
([bitacora-ads-values-troas.md](./bitacora-ads-values-troas.md), 30 jul) sigue en pie y no se
contradice: Search Console no mide comportamiento en el sitio ni desenlace de leads, mide la
búsqueda. Tampoco resuelve el hueco del **mix de canales** (WhatsApp vs formulario), que sigue
dependiendo de separar las acciones de conversión.

Lo que sí agrega, medido el 7 ago sobre 16 meses (160 consultas, 25 páginas, 83 clics, 9.221
impresiones):

- **No hay canibalización pago/orgánico.** Ningún término comercial rankea en primera página: "web
  design costa rica" 884 impresiones y **0 clics** en posición 37,5; "desarrollo web en costa rica"
  328/0 en pos. 78; "diseño de sitios web en costa rica" 315/0 en pos. 74,3. Cada clic pagado es
  incremental — queda descartada la hipótesis de bajar pujas donde ya se sale orgánico.
- **El orgánico es casi todo de marca**: 73 de los 83 clics vienen de "link design" (51) y
  "linkdesign" (22). El 88%.
- **Insumo para el pendiente del tráfico en inglés**: las consultas en inglés acumulan impresiones
  altas con cero clics ("costa rica website design" 224, "website design costa rica" 220, "web
  designer costa rica" 189), y EE.UU. aporta 516 impresiones y **0 clics** en 16 meses.
- **Demanda por mercado**: Costa Rica 139 consultas / 7.345 impresiones · Argentina 12 / 46. La
  asimetría orgánica es mucho mayor que la de Ads.

Cuidado al leer volúmenes: Search Console **omite las consultas de bajo volumen por privacidad**, así
que la suma por query nunca cuadra con el total del sitio.

## Nota para el futuro

No renombrar ni eliminar la ruta `/ads` sin actualizar la Google Auth Platform: es la homepage
declarada de la app OAuth y la URL entregada a compliance. El `h1` debe seguir diciendo
**"Link Design"** con espacio — la verificación de marca compara ese texto contra el nombre del
cliente OAuth, y "LinkDesign" sin espacio ya falló una vez.

Esto sigue vigente **aunque la autenticación ya no pase por OAuth de usuario**: la app y su
verificación de marca continúan existiendo en el proyecto Cloud, y borrarlas por creerlas sin uso
obligaría a rehacer la verificación. La ruta `/ads` no cuesta nada mantener.
