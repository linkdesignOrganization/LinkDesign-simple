---
name: og-image-recorte-whatsapp
description: WhatsApp recorta la imagen OG al cuadrado central (630px de los 1200), así que el logotipo no puede pasar de ~45% del ancho o se corta
metadata:
  node_type: memory
  type: project
---

**WhatsApp recorta `og-image.png` al CUADRADO CENTRAL** para el thumbnail del preview: de los
1200×630 se queda solo con los **630px del medio** (x 285→915). Todo lo que quede fuera de esa franja
no se ve.

Consecuencia práctica: **el logotipo no puede pasar de ~45% del ancho (~540px)**, centrado. Una
prueba al 70% (840px) se leía «ink Desig» en el preview. El monograma anterior sobrevivía cualquier
recorte solo porque era un círculo centrado y chico; un logotipo largo no perdona.

Estado desde el 2026-08-11 (commit `4ae1480`): la tarjeta muestra el **logotipo tipográfico
«Link Design»** en vez del monograma «LD», con el mismo tratamiento que `.brand` en `app.scss`
—Space Grotesk 500, `letter-spacing: -0.06em`, `#111111` sobre `#f6f6f6`— para que lea como hermana
de la de Nolõ, que ya mostraba su logotipo. Nolõ ocupa ~48% del ancho, o sea al borde del recorte.

Cómo se regeneró (por si hay que rehacerla): HTML de 1200×630 con la fuente cargada de Google Fonts
y un ajuste proporcional del `font-size` al ancho objetivo, capturado con
`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot
--window-size=1200,630 --force-device-scale-factor=1`. Los browsers de Playwright **no** están
instalados en estos repos.

Tres cosas que conviene no olvidar:
- **`SeoService.defaultImage` sobrescribe el `og:image` del `index.html` en el prerender** — si se
  cambia la URL de la imagen hay que tocar los dos lugares (`src/index.html` og:image + twitter:image
  y `src/app/services/seo.service.ts`).
- **WhatsApp cachea el preview en sus servidores.** Después de desplegar hay que forzar la relectura
  con el Sharing Debugger de Facebook (`developers.facebook.com/tools/debug`, «Scrape Again»);
  comparten crawler. La SWA no pone cache-control propio, así que del lado del servidor no hay nada
  que purgar.
- **`icon-512.png` sigue siendo el monograma LD** a propósito: ahí es lo correcto como ícono de app y
  como `logo` del JSON-LD. El cambio aplica solo a la tarjeta de compartir.

Relacionado: [[sitios-gemelos-linkdesign-nolo]]
