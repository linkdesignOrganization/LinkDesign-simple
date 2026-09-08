# Plan — mover la nota de página de destino (acordado el 7 sep 2026, se ejecuta el 8 sep)

## Por qué

Las cuatro keywords de la cuenta llevan desde junio con la página de destino en **BELOW_AVERAGE**
(`ad_group_criterion.quality_info.post_click_quality_score`). Es la única de las tres dimensiones
del Quality Score que está floja, y en "Búsqueda" (CR) explica el 39 % de impresiones perdidas por
ranking. El copy del 14 ago **no la movió en tres semanas** en ninguna de las cuatro (revisión del
7 sep en `bitacora-ads-values-troas.md`), aunque Google sí leyó el texto: `/web` pasó de 0 a 75–100
impresiones orgánicas por semana en Costa Rica.

Quedan dos palancas documentadas por Google para esa nota que todavía no se tocaron: **transparencia
de la empresa** (datos legales, horario) y **velocidad en móvil** (LCP ~6 s en 4G por los videos que
están sobre el fold). Este plan las cubre en tres acciones. Robert las aprobó el 7 sep.

**Descartado a propósito: escribir un teléfono.** Las llamadas no son un canal de contacto del
estudio; un número en pantalla invita a llamar. El número queda donde está hoy, sólo dentro del
enlace del botón de WhatsApp y en los datos estructurados invisibles.

Las tres acciones apuntan a la misma nota, así que si se mueve no se sabrá cuál lo hizo. No importa:
ninguna se revertiría. La nota es lenta y relativa; **la lectura es ~5 oct 2026**, no antes.

## Reglas que aplican

- **No se cambia el aspecto visual sin autorización** (regla del 14 ago). Las líneas nuevas del pie
  reusan la clase `.cf-location` que ya existe; si hiciera falta un estilo nuevo, se propone y se
  espera.
- `preload="metadata"` de los videos de `/software` **no se toca** (memoria `lcp-dominado-por-videos`).
- Las metas de SEO salen sólo de `app.ts` + `SEO_CONTENT`; este plan no las toca. La ruta `/ads` no
  se toca.
- **Nolõ** (`Desktop\Nolo\WEB`) es un fork con los mismos componentes. Las acciones 1 y 2 necesitan
  sus propios datos legales argentinos: van en la sesión de Argentina. La acción 3 es estructural y
  se replica después de aprobada acá.
- Deploy = push a `main` (workflow de Azure SWA). Commit y push sólo cuando Robert lo pida.
- Todo lo ejecutado se anota en `bitacora-ads-values-troas.md` con fecha, para que la lectura de
  octubre sepa qué cambió y cuándo.

## Datos que faltan, y los tiene Robert

1. **Razón social exacta** (nombre legal de la sociedad).
2. **Número de cédula jurídica** (formato `3-101-XXXXXX`).
3. Aprobación de la **comparación lado a lado** de los videos móviles (acción 3), mirada en un
   teléfono, no por cálculo.

---

## Acción 1 — Cédula jurídica y razón social, en el pie y en los datos estructurados

**Dónde se ve hoy la ubicación**: `src/app/components/contact-footer.component.ts`, línea ~128:
`<p class="cf-location">{{ info().location }}</p>`. El objeto `info` llega por la data de ruta:
`src/app/app.routes.ts` tiene cuatro veces `contact: { ...contactInfo, location: 'San José, Costa
Rica' }` (líneas ~343, 580, 814, 1039: ES/EN de las dos páginas).

Pasos:

1. Agregar `legalName` y `taxId` a `contactInfo` (compartido), para que las cuatro rutas lo hereden
   sin repetirlo. Extender el tipo de `info` en el componente (línea ~34, donde está `location`).
2. En el template, debajo de `cf-location`, dos líneas con la misma clase: razón social, y
   «Cédula jurídica 3-101-XXXXXX». La etiqueta va en `FOOTER_TEXT` (ES `Cédula jurídica`, EN
   `Legal ID`), junto a `rights` y `privacy`.
3. Datos estructurados: `src/index.html`, bloque `Organization` (líneas ~68–100). Agregar
   `"legalName": "<razón social>"` y `"taxID": "<cédula>"`. **No tocar** `telephone` ni `contactPoint`
   (invisibles) ni `openingHours`, que ya está.
4. Tests: `npm test` (49 en verde hoy). Si el footer tiene spec, ampliarla con las dos líneas.

Verificación en producción: `curl -sL https://linkdesign.cr/web | grep -c "3-101"` en `/web`,
`/software` y `/contacto`; el JSON-LD con `https://validator.schema.org/` pegando la URL.

## Acción 2 — Horario de atención en el pie

**Ya existe en dos lugares**: visible sólo en `/contacto` (`src/app/pages/contact-page.ts`,
`schedule: 'Lunes a viernes, 8 a 17'` línea ~408, EN `'Monday to Friday, 8am–5pm'` línea ~422) y en
los datos estructurados de `index.html` (`"openingHours": "Mo-Fr 08:00-17:00"`). **La parte de datos
estructurados está hecha; falta la visible en el pie.**

Pasos:

1. Mover la cadena a `contactInfo` (o a una constante compartida) para que `/contacto` y el pie
   digan lo mismo y en el mismo lugar del código.
2. Renderizarla en el pie con la clase `cf-location`, debajo de la ubicación y antes de los datos
   legales de la acción 1 (orden final: ubicación · horario · razón social · cédula).
3. Coincide con el horario de las campañas (L-V 8-17). Si el horario cambia, cambia en un solo
   lugar.

## Acción 3 — Videos diferenciados para móvil

Dos bloques sobre el fold, uno por página de destino:

| página | componente | archivos hoy | resolución | peso | bitrate |
|---|---|---|---|---:|---:|
| `/web` (hero) | `web-hero.component.ts` (`<video>` línea ~89; `preloadIndices()` línea ~500 decide cuáles precargan `auto`) | `public/media/hero/<slug>.mp4` — precargan los 3 primeros: `hesa`, `faciosycanas`, `aaec` | 1280×682 | 3,02 · 2,08 · 1,60 MB | 1.392 · 995 · 817 kbps |
| `/software` (pestañas) | `feature-tabs.component.ts` (`<video [src] [poster] preload="metadata">` línea ~34) | `public/media/software/{ordena,centraliza,automatiza}.mp4` + pósters `.jpg` de 61–71 KB | 1280×682 | 1,94 · 1,52 · 1,31 MB | 355 · 279 · 305 kbps |

Los del hero de `/web` vienen del CRM: el prebuild (`scripts/generate-portfolio.mjs`, línea ~184)
descarga `videoHeroUrl` a `/media/hero/<slug>.mp4` y arma `heroSrc`; el carrusel muestra los
primeros 10 con `heroSrc` (`landing-page.ts`, `heroSlides`). **No existe pieza «hero móvil» en el
pipeline del CRM** (genera web, mobile, hero y póster; el «mobile» es el clip de la tabla).

### 3a. Generar las variantes y armar la comparación (sin tocar el sitio)

Estándar ya aprobado: los clips del portafolio son **720×384** y se pintan estirados a 1074 px en un
Pixel 7 sin que se note. El hero a 720 se pinta al mismo tamaño en la misma pantalla.

```bash
# mismos bits por píxel que el original: el bitrate baja con el área (1280×682 → 720×384 ≈ ×0,32)
ffmpeg -i public/media/hero/hesa.mp4 -vf "scale=720:-2" -c:v libx264 -preset slow -crf 26 \
       -profile:v main -movflags +faststart -an public/media/hero/hesa-mobile.mp4
```

Estimado: hero 6,7 MB → ~2,2 MB en los tres; pestañas 4,8 MB → ~1,6 MB. Para las pestañas, además
un **póster móvil** (720 de ancho, ~25 KB) porque en móvil el póster es el candidato a LCP.
`ffprobe` sobre cada salida para anotar peso, resolución y bitrate.

Comparación para Robert: una página local (o una SWA temporal como el 14 ago) con original y
variante lado a lado, vista en un teléfono a 390 px, con los seis clips. **Sin su aprobación no se
cablea nada.**

### 3b. Cablear la elección del archivo (después de aprobado)

- Elección **declarativa** primero: `<source media="(max-width: 767px)" src="...-mobile.mp4">` y
  `<source src="...">` de respaldo. Verificar el soporte actual del atributo `media` en `<source>`
  dentro de `<video>` en Chrome, Safari y Firefox (Chrome lo quitó en 2014 y lo volvió a agregar
  hace poco). Si no alcanza, elegir con `matchMedia` **antes** de que el navegador arranque la
  precarga, y recordar la trampa anotada el 17 ago: lo que se decide por JS después del prerender
  llega tarde.
- Hero: `heroMobileSrc` en la fila (`generate-portfolio.mjs`), con **fallback a `heroSrc`** cuando la
  variante no exista, para no repetir el bug de referenciar un video inexistente (regla
  anti-desconexión del prebuild). Dónde se generan las variantes, a decidir el 8 sep:
  (a) el prebuild las deriva con ffmpeg cuando faltan o cambió el hero (el runner `ubuntu-latest`
  trae ffmpeg), o (b) se generan a mano y se versionan en `public/media/hero/`, como ya están los
  originales. (a) sobrevive a proyectos nuevos desde el CRM; (b) es más simple hoy.
- Pestañas: agregar `videoMobileSrc` y `posterMobile` a `FeatureTab`; `preload="metadata"` queda.

### 3c. Medir

Chrome real con CDP y red limitada a «4G lenta», móvil 390×844, tres corridas por página, antes y
después: **LCP** (hoy ~5,8–6,6 s), bytes descargados al cargar sin bajar (hoy 9,7 MB en `/web` por
proximidad; 6,4 MB son el hero), y **CLS** (hoy 0,010 en `/web`; no debe empeorar). Comparar los dos
builds servidos localmente, nunca local contra producción (trampa anotada en la memoria del LCP).

---

## Orden del día 8 sep

1. Pedir a Robert razón social y cédula jurídica. Con eso, acciones 1 y 2 en un solo cambio (sólo
   texto), tests, y verificación visual del pie ES/EN en móvil y escritorio contra producción (nada
   cambia salvo las tres líneas nuevas).
2. Generar las variantes de video y la comparación (3a). Robert decide.
3. Si aprueba: cablear (3b), medir (3c), y decidir con él si se replica a Nolõ ahora o en su sesión.
4. Anotar en `bitacora-ads-values-troas.md` qué salió, cuándo y con qué medición, y fijar la
   lectura de la nota para **~5 oct 2026** (Calendar), junto con la segunda lectura de Search
   Console de `/web`.

## Cómo se leerá el resultado

- `ad_group_criterion.quality_info.post_click_quality_score` por keyword, con
  `ad_group_criterion.negative = FALSE` y el estado del **grupo** ENABLED (trampa del `keyword_view`).
- Serie semanal `metrics.historical_landing_page_quality_score` con `segments.week`.
- Que una sola campaña pase a «promedio» no prueba nada; la señal es que varias se muevan igual o
  que una se sostenga varias semanas. Argentina sirve de control aunque no reciba las acciones 1 y 2
  todavía: si sólo Costa Rica se mueve, la señal es más limpia.
