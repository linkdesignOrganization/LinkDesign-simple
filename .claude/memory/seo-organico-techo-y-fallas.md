---
name: seo-organico-techo-y-fallas
description: Por qué el orgánico de linkdesign.cr no sube — comparado contra Zacate Tierra Fértil con datos de Search Console (14 ago 2026)
metadata: 
  node_type: memory
  type: project
  originSessionId: ba0017c9-3deb-4aec-a65e-6e44ef7d8b23
  modified: 2026-08-14T17:32:54.850Z
---

Comparación de 16 meses (2 abr 2025 – 12 ago 2026) entre `linkdesign.cr` y `zacatetierrafertil.com`,
dos sitios propios en el mismo país: **143 visitas orgánicas contra 4.998**. El análisis separó lo
estructural de lo arreglable, y la conclusión desmiente las explicaciones habituales.

## Lo estructural (no se arregla escribiendo más)

- **El mercado es 5× más chico.** Todas las búsquedas comerciales de LinkDesign en Costa Rica suman
  **660/mes** (Keyword Planner); el nicho del zacate, 3.230. Solo la palabra "zacate" tiene 1.300.
- **La competencia es del propio oficio.** Zacate compite contra viveros con página de Facebook;
  LinkDesign contra agencias que viven de rankear: arweb.com (dominio de 1995), misChunches (2002),
  web.cr (25 años), más directorios como Sortlist. El clic pagado lo confirma: **$2,72 vs $0,59**.
- **Techo del canal: 50–180 visitas/mes** aun ganando el primer lugar en todo. Hoy da 8,7/mes. Por eso
  el embudo real pasa por Ads, y por eso cada clic pagado es incremental (nada rankea en página 1).

## Lo arreglable (nadie lo ha tocado)

1. **`/corporate` y `/weblab` devuelven 404 sin redirección.** Eran las páginas comerciales del sitio
   anterior; juntaron 930 apariciones en 6 meses que terminan en error. Este trimestre cayeron a cero
   y `/web` **no heredó nada** — no figura entre las páginas con tráfico.
2. **Google no rastrea 15 de las 40 URLs del sitemap**: 11 "descubiertas, nunca rastreadas" (entre
   ellas `/industrias` entera) y 4 que no reconoce. Zacate tiene sus 8 de 8. Es síntoma de crédito
   bajo, no de un error de configuración.
3. **La marca colisiona con la palabra "link".** El **51 %** de todas las apariciones del sitio
   (4.843 de 9.487) son gente escribiendo "link" a secas o mal tecleado — 37 variantes (`linkj`,
   `linlk`, `ñink`, `link}`). Produjeron **1 clic en 16 meses**, y ese CTR ~0 sostenido le enseña a
   Google a dejar de mostrar el sitio.

## Lo que NO es el problema — no perseguirlo

- **No es falta de contenido.** La página de Zacate que sale #2 en "zacate san agustín" tiene **174
  palabras**; `/software` y `/web` tienen 1.511 y 1.670.
- **No son pocas páginas.** LinkDesign 40, Zacate 8.
- **No es la antigüedad del dominio.** `zacatetierrafertil.com` se registró en **nov 2023** y les gana
  a rivales de 20–30 años.
- **No es lo técnico.** SSR, datos estructurados, canónicas y sitemap están bien en ambos; LinkDesign
  está mejor armado.

Verificado con la API de Search Console, la de inspección de URLs y el Keyword Planner — ver
[[google-ads-api-access]] y [[search-console-api-access]]. Los desgloses por consulta usan la base
visible de GSC, que omite las de bajo volumen; los totales de visitas sí son completos.
