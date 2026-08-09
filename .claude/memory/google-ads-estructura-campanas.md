---
name: google-ads-estructura-campanas
description: "Estructura de campañas de la cuenta Link Design (6364218319): dos mercados (CR y AR/Nolõ) con campañas espejo, horario L-V 8-17, ~225 negativas"
metadata: 
  node_type: memory
  type: project
  originSessionId: 4f1f3b6a-39e8-45cc-8872-02154811e739
  modified: 2026-07-30T17:48:03.482Z
---

Estructura observada en julio 2026 (cuenta `6364218319`, ver [[google-ads-api-access]] y [[sitios-gemelos-linkdesign-nolo]]):

- **4 campañas ENABLED, espejo por mercado (misma keyword, GEO DISTINTO — no compiten entre sí):**
  - Costa Rica (geo 2188, sitio linkdesign.cr): "Búsqueda" (`21910466866`, USD 10/día desde el 23 jul 2026, `desarrollo de sitios web` BROAD) y "Software" (`23552967347`, USD 15/día y keyword de vuelta en BROAD desde el 23 jul 2026 — la era PHRASE a 5.60 terminó ahí).
  - Argentina (geo 2032, sitio Nolõ): "Búsqueda #2" (`23949699115`, USD 15/día, misma keyword en PHRASE) y "Software #2" (`23939960385`, USD 15/día).
- OJO: comparar una campaña con su "#2" es comparar mercados distintos (CPCs y competencia diferentes), NO un A/B test.
- **Campañas AR (Nolõ), estado 24 jul 2026:** la "Búsqueda #2" activa es `23949699115`; existe una homónima vieja REMOVED (`22111386447`, budget 20) que aparece como fantasma con USD 0 en el Performance Planner — ignorarla. Ambas AR estuvieron pausadas del 8 al 13 jul y el **19 jul cambiaron de estrategia: de Maximizar CONVERSIONES a Maximizar VALOR de conversión** (confirmado por el dueño; la API no capturó el detalle — `changed_fields` vacío y old/new esqueléticos). La estrategia vieja optimizaba por cantidad → explica el mix AR 92% scrolls. El historial AR pre-19 jul NO es comparable en puja (otro régimen); sirven solo métricas de mercado. Por eso el Planner las marca "no compatible". Mix AR de julio: **92% scrolls** (contacto solo 48% del valor). El **×2 de values se replicó en Nolõ el 24 jul 2026** (repo `C:\Users\Roberth Castillo\Desktop\Sowe\WEB` = `nolo-simple` en GitHub, commit `e860ca1`) — mismo esquema que CR en los 4 sitios/campañas desde esa fecha. Diagnóstico: ~4 días hábiles de datos post-cambio de estrategia = insuficiente; análisis AR sumado a la revisión del 13 ago.
- Acciones de conversión separadas por mercado: "Contacto"/"Scroll" (CR) y "Contacto Argentina"/"Scroll Argentina (2)" (AR, activas desde jun 2026).
- Todas con Maximizar valor de conversión **sin tROAS**; presupuestos no compartidos.
- **Ad schedule de "Búsqueda":** L–V 8:00–17:00 (no hay datos de fin de semana).
- **Negativas de "Búsqueda" (~225):** ~60 a nivel grupo (`ad_group_criterion.negative: true`) + ~165 a nivel campaña (`campaign_criterion`, type KEYWORD, negative TRUE): marcas/plataformas, geos, genéricos, y "desarrollo de software" EXACT para no solapar con la campaña Software. No usan listas compartidas. Al auditar keywords hay que consultar AMBOS niveles.
- Historial presupuesto "Búsqueda": 15 → 7.50 (2 jul 2026) → 15 (7 jul 2026). El tramo 3–7 jul sirve de experimento natural de presupuesto bajo: misma tasa de contactos (~0.5/día), CPCs mucho más altos (6.5–9.7), budget lost 68–78%.
- Histórico Contacto vs Scroll (campaña Búsqueda): ~20 contactos/mes y 39–64 scrolls/mes; Contacto aporta 73–87% del valor. En ene 2026 subieron los values de contacto (valor/contacto pasó de ~7 a ~13). Jul 2026 flojo en contactos (10 en el mes parcial).
- **Campaña "Software" (CR):** activa desde feb 2026. Era BROAD feb–med jun 2026 (presupuesto 15/día): CPC ~2.70, ratio 0.67–0.88, 10–17 contactos/mes. A mediados de jun pasó a PHRASE y el 30 jun recortaron presupuesto 15→5 (2 jul: →5.60). Resultado phrase (jul): CPC ~7.40 (> presupuesto diario — un clic sobregira el día), ratio 0.26, 2 contactos/mes, **QS 3/10** (landing y CTR esperado below average) pagando abs top 82%. El dueño añade negativas casi a diario (régimen de contención activo).
- **Plan Software APLICADO el 23 jul 2026** (por el dueño en la UI, verificado por API): keyword de vuelta en AMPLIA (recreada — QS/historial desde cero) + presupuesto 15/día; a la vez, Búsqueda bajó a 10/día (opción intermedia por presupuesto limitado; su gate del 13 ago: contactos ~3/sem, y considerar volver a 15 si budget lost >35% con mix sano). (El "Grupo de anuncios 1" dentro de Software con `desarrollo de sitios web` está ELIMINADO a nivel de grupo — sin riesgo, sin acción; fue falsa alarma.) Gates del 13 ago: subir a 20/día solo con budget lost >35% y ratio ≥1.2 (escala nueva); tROAS solo con ≥10 contactos/mes. Evidencia clave: auction insights mar–may = mercado fragmentado, LinkDesign líder con 20.12%, softland solo 8% de overlap, sin plataformas DIY.
- **Trampas de la API:** (1) las métricas de impression share censuran valores <10% como `0.0999` (p. ej. `search_absolute_top_impression_share`) — no confundir con un 10% real ni comparar contra las tasas del reporte de Auction Insights de la UI (definiciones distintas: cuota del inventario vs % de impresiones propias). (2) Los criterios de ad groups ELIMINADOS se devuelven con su status propio (`ENABLED`) — al auditar keywords, consultar SIEMPRE también `ad_group.status` del padre. (3) `keyword_view` lista también las negativas de grupo (con 0 métricas).

**Why:** sin saber que los pares "#2" son otro mercado, un análisis puede concluir canibalización falsa; y las negativas repartidas en dos niveles hacen que una consulta a un solo nivel subestime la contención del broad.
**How to apply:** analizar cada mercado por separado; para negativas consultar campaign_criterion Y ad_group_criterion; usar el tramo 3–7 jul 2026 como referencia de "qué pasa con presupuesto a la mitad".
