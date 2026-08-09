---
name: search-console-api-access
description: "Cómo se accede a la Search Console API: misma service account que Ads, permiso Completo y módulo gsc.py"
metadata: 
  node_type: memory
  type: project
  originSessionId: 83731e7b-9931-41fd-a7bd-c33a30880356
  modified: 2026-08-08T03:56:31.990Z
---

Acceso a la Search Console API, montado el **7 ago 2026** para complementar el análisis de Google Ads.
Hermano de [[google-ads-api-access]], que ya anticipaba este camino ("para GA4 o Search Console se
haría igual: agregar el email de la SA allá") — se hizo exactamente así.

- **Reutiliza la misma service account** `ads-api@linkdesign-ads-api.iam.gserviceaccount.com` y el
  mismo `config.json`. No hizo falta credencial ni proyecto nuevo.
- Hubo que **habilitar `searchconsole.googleapis.com`** en el proyecto `linkdesign-ads-api`
  (`217676920431`). Dos caminos fallaron y conviene no repetirlos: la SA **no puede auto-habilitarse
  servicios** (403 `AUTH_PERMISSION_DENIED` en Service Usage) y **`gcloud` tenía el reauth caducado**
  (`cannot prompt during non-interactive execution`). Se hizo por la consola web.
- **Permiso Completo, no Restringido**, por decisión del usuario y con razón técnica: la **URL
  Inspection API devuelve 403 con Restringido**. El freno de escritura real lo pone el scope
  `webmasters.readonly`, no el nivel de permiso — por eso Completo no abre riesgo de escritura, y
  Propietario (único que gestiona usuarios) sí sería de más.
- **Tres propiedades, todas con `siteFullUser`** (constantes en `gsc.py`): `sc-domain:linkdesign.cr`,
  `sc-domain:nolo.ar` (el dominio de Nolõ es **`.ar`, no `.cr`** — ver
  [[sitios-gemelos-linkdesign-nolo]]) y `https://zacatetierrafertil.com/` (ver
  [[zacate-tierra-fertil-ads]]).
- **La de Zacate es ajena y por eso trae histórico**: la administra `mario@zacatetierrafertil.com`,
  que agregó la service account el 7 ago 2026. **Se le pidió acceso en vez de verificar el dominio
  por cuenta propia**, aunque `zacatetierrafertil.com` está en el DNSimple de Link Design y se podía.
  Esa decisión es la lección reutilizable: entrar a una propiedad existente da su historia completa
  (478 días), verificar una nueva da cero. Es de **prefijo de URL**, no de dominio.
- **Search Console NO rellena histórico**: acumula desde que se crea la propiedad. Por eso `nolo.ar`
  devuelve **cero en cualquier ventana** —16 meses, 30 o 7 días, incluso con `dataState='all'`— y su
  serie arranca el 7 ago 2026. No es falla del sitio: URL Inspection da PASS · "Enviada e indexada".
  Antes de diagnosticar un cero, mirar cuándo se creó la propiedad. Mismo patrón que
  `paid_organic_search_term_view` tras vincular.
- **Módulo `gsc.py`** en `%USERPROFILE%\.google-ads\`, espejo de `ads.py` y expuesto por el mismo
  `.pth`, así que basta `import gsc`: `consulta()` (ya paginada y con las dimensiones desempaquetadas),
  `propiedades()`, `filtro()`, `inspeccionar()`. Diagnóstico de 4 escalones en `verificar_gsc.py`.
- **No necesita `google-api-python-client`** (no está en el venv): la API es REST plana y basta
  `AuthorizedSession` de `google-auth`.
- **Trampa que no da error**: el país va en **ISO 3166-1 alpha-3**, y Costa Rica es `cri` — `crc` es
  el colón. Con el código equivocado la API devuelve cero filas sin quejarse.
- **Search Console quedó vinculado a Google Ads el 7 ago 2026**, en la cuenta `6364218319`. La ruta
  vieja `/aw/settings/linkedaccounts` da **404**: ahora es **Herramientas → Administrador de datos →
  Productos conectados → Conectar producto → Search Console**, y pide la URL del sitio como
  `linkdesign.cr` (queda registrada como `http://linkdesign.cr` aunque la propiedad sea `sc-domain:`).
  Se vinculó sola por ser el mismo usuario propietario en ambos lados.
- **Ese informe no tiene backfill**: `paid_organic_search_term_view` seguía en 0 filas justo después
  de vincular. Los datos se acumulan **desde la vinculación en adelante**, así que el histórico
  pago/orgánico hay que cruzarlo a mano con `gsc.py` mientras el informe se llena.

- **Documentado en el repo** (7 ago 2026): el montaje completo y qué aporta, en
  `docs/bitacora-google-ads-api-basic.md`; la disponibilidad para el plan de tROAS y una lectura
  anticipada del criterio del 13 ago, en `docs/bitacora-ads-values-troas.md`. Ir ahí antes de
  reconstruir nada.
- **Hallazgo que ya cerró una hipótesis**: **no hay canibalización pago/orgánico**. Ningún término
  comercial rankea en primera página ("web design costa rica": 884 impresiones, 0 clics, posición
  37,5) y el 88% del clic orgánico es de marca, así que cada clic pagado es incremental. No proponer
  bajar pujas "porque ya salimos orgánico" — ese argumento está descartado con datos.
- **No reemplaza a GA4 ni reabre esa decisión** (descartado el 30 jul por buenas razones): Search
  Console mide la búsqueda, no el comportamiento en el sitio ni el desenlace de los leads.

**Why:** el montaje mezcla tres permisos distintos que se confunden entre sí (API del proyecto, nivel
en la propiedad, scope del token) y ya costó descartar dos vías muertas; además el nivel Completo fue
una decisión deliberada, no el default.
**How to apply:** para cualquier análisis orgánico, escribir un script ad-hoc con `import gsc` usando
el venv `C:\Users\Roberth Castillo\.mcp-servers\google-ads-venv`; si algo falla, correr
`verificar_gsc.py` antes de diagnosticar a ciegas.
