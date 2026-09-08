---
name: auction-insights-solo-ui
description: Las estadísticas de subasta (auction insights) no salen por API con nuestro token; la fila «Usted» sí, con las métricas correctas; cómo leer las tablas cuando Robert las pasa por captura
metadata:
  type: project
---

Las métricas `metrics.auction_insight_*` existen en la API (v24, en `campaign`, `ad_group` y
`keyword_view`, segmentadas por `segments.auction_insight_domain`) pero nuestro developer token
responde `authorization_error 26: The developer doesn't have access to metrics`. Son de **lista
blanca y la lista está cerrada** (verificado el 7 sep 2026); no hay formulario que pedir. Los
competidores sólo se ven en la UI, y Robert los pasa por captura.

**Why:** un análisis de la subasta hecho sólo con la API concluye sin saber contra quién se compite;
el 7 sep 2026 eso pasó y Robert lo notó. Y la fila «Usted» se puede reconstruir mal si se elige la
métrica equivocada.

**How to apply:**
- La fila «Usted» por API es `search_impression_share` + `top_impression_percentage` +
  `absolute_top_impression_percentage` (sobre impresiones propias). **No** `search_top_impression_share`,
  que va sobre impresiones elegibles y da 30 % donde la UI dice 82 %. La cuota difiere ~0,5 pt de la
  UI: normal.
- «Porcentaje de ranking superior» es derivado: ≈ cuota propia × (1 − solape × posición superior).
  Da casi igual contra todos los competidores; no leerlo como debilidad frente a cada uno.
- La cuota de cada competidor es sobre **nuestras** subastas elegibles. Sumarlas dice cuán poblada
  está la subasta: en «Búsqueda» (CR) sale ~1 competidor por subasta (mercado ralo), así que la
  pérdida por ranking es Ad Rank propio bajo el mínimo, no un rival más fuerte.
- Foto de sep 2026, «Búsqueda» (CR): somos el mayor participante (37–43 %); atomsoluciones.com era
  el segundo (14,7 %) y desapareció en agosto; pixelcr.com es el único local que nos disputa la
  posición; Shopify, Squarespace, Wix y Base44 (10–13 %) pujan por los mismos genéricos, **no** son
  señal de tráfico DIY (los términos con esa señal son el 5–7 % de lo visible). Detalle en la
  bitácora, entrada del 7 sep 2026 (cont.). Ver [[google-ads-api-access]] y
  [[google-ads-estructura-campanas]].
- Foto de sep 2026, «Software» (CR): mayor participante por menos margen (34 → 25 % contra 14 % de
  softland.com); cuatro rivales sobre el 10 % y tres o cuatro que nos ganan la posición más de la
  mitad de las veces (Softland, Access Corp, Softdial, Alegra), consistente con QS 3 contra QS 5 de
  «Búsqueda». Softland, Alegra y Qupos aparecen por la familia ERP/CRM de la amplia, ya medida y
  aceptada el 13–14 ago. Con presupuesto topado, la pérdida por presupuesto y la de ranking se
  intercambian semana a semana según la puja: no leer la primera como demanda represada.
