---
name: lcp-dominado-por-videos
description: "El LCP de ambos sitios lo fija el carrusel de videos, no el HTML; ~6 s en 4G móvil y sigue pendiente"
metadata: 
  node_type: memory
  type: project
  originSessionId: cbc9235a-f031-4bfa-9db1-d7b2c2bec9d7
  modified: 2026-08-17T17:59:28.954Z
---

Tras activar la hidratación (2026-08-17, commit `c1232de` acá y `e576921` en Nolõ), el CLS quedó
resuelto pero **el LCP en móvil no se movió: ~5,8–6,6 s en 4G lenta**, muy por encima del umbral
bueno de 2,5 s. En escritorio sí quedó bien (1,2–1,8 s).

**La causa no es el renderizado.** Medido en producción, el elemento LCP es el `<video
class="feature-video">` del carrusel de `/software` — concretamente su `poster` (`ordena.jpg`) o el
propio `centraliza.mp4`. El HTML prerenderizado pinta a los ~700 ms (FCP); lo que llega tarde es el
media.

Contexto de peso: `public/media` son **163 MB, 156 de ellos en 108 archivos .mp4**. En escritorio sin
throttling una visita a `/software` transfería 4,6 MB, de los cuales 4,6 son video — el 92 %.

Ideas no probadas, si se retoma:

- Los tres videos de `feature-tabs` cargan con `preload="metadata"` porque están sobre el fold y se
  ven de entrada — eso es correcto y **no hay que cambiarlo** (se verificó midiendo su posición:
  y=658 px en móvil con viewport 844). Lo que se puede atacar es su **peso**, no su prioridad.
- Versiones más livianas o en AV1/WebM para el primer tab, o un poster más comprimido que gane el
  LCP antes.
- `fetchpriority` alto sólo para el media del tab activo.

Ojo con la trampa de medición: comparar local contra producción **no sirve** para CLS ni LCP (el
origen local no tiene latencia). Hay que servir los dos builds localmente y comparar entre sí.
Ver [[hidratacion-y-prerender]].
