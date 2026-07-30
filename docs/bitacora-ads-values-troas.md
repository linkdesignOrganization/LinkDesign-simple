# Bitácora — Plan Google Ads: values de conversión ×2 → tROAS (campaña "Búsqueda")

## 23 jul 2026 — Fase 1 aplicada: values de contacto ×2

### Contexto (análisis del 8–23 jul 2026, presupuesto USD 15/día)

- Gasto real USD 245.89 en 12 días hábiles (~20.50/día por sobregasto permitido); ratio valor/costo **0.46**.
- 52 conversiones: 45 Scroll (value 1) + 7 Contacto (valor 68) → el 87% de las conversiones era scroll.
- Histórico 13 meses: Contacto aporta 73–87% del valor; en julio cayó a ~67% porque los contactos bajaron a la mitad (10 vs ~20/mes), no por un cambio de configuración.
- Cuota de impresiones ~44%; pérdida por **ranking ~41%** vs ~14% por presupuesto → el presupuesto no es el cuello de botella.
- Experimento natural 3–7 jul (presupuesto 7.50): misma tasa de contactos, CPC ~8 (vs 2.89 con 15/día) → "Maximizar valor de conversión" sin tROAS gasta todo el presupuesto siempre; la palanca de eficiencia correcta es tROAS, no recortar presupuesto.

### Decisión

Duplicar la escala de values de contacto para ampliar el contraste contra Scroll (value 1) en Smart Bidding, manteniendo la jerarquía interna:

| Acción | Antes | Ahora |
|---|---|---|
| WhatsApp (click, modulado 0.7–1.0) | 5 | **10** |
| Copiar correo (click, modulado) | 25 | **50** |
| Agendar reunión (click, modulado) | 30 | **60** |
| Formulario nurture / cold / warm / hot | 15 / 18 / 24 / 30 | **30 / 36 / 48 / 60** |
| Formulario suspicious | no se reporta | sin cambio |
| Scroll 50% | 1 | sin cambio |

El algoritmo de scoring NO cambia (paridad con el CRM intacta); solo cambia el mapa score→value de Ads.

**Advertencia de lectura**: el ratio valor/costo reportado por Ads va a ~duplicarse por pura aritmética; eso NO es mejora real. Las métricas de éxito son la **cantidad de contactos** y el **mix de valor** (objetivo: Contacto ≥80% del valor).

### Cronograma

- [x] **23 jul 2026** — Deploy de values ×2 (este commit).
- [ ] **23 jul → 13 ago** — Aprendizaje. Presupuesto de Búsqueda en 10/día desde el 23 jul (ver "presupuestos del período" abajo); no tocar estrategia de puja. Vigilar el mix de valor.
- [ ] **13 ago 2026** (recordatorio en Calendar) — Revisar con datos del 24 jul–12 ago: contactos/semana, mix de valor, ratio nuevo. Si el mix está ≥80% y los contactos se mantuvieron (~3/semana con 10/día): **activar tROAS inicial ~70%** (≈ ratio esperado con values nuevos ~0.9 × 0.8 de margen). El presupuesto vigente actúa como techo. **El análisis y el cambio se pueden hacer por API** (acceso Basic desde el 28 jul); Keyword Planner también quedó disponible para esta revisión.
- [ ] **Cada 2 semanas post-tROAS** — Ajustar el target ±10–15% mirando la cantidad de contactos (no el ratio total). Si el volumen de contactos cae >30%, bajar el target.

## 23 jul 2026 — Fase 1b (decisión): revertir "Software" a concordancia amplia con USD 15/día

### Contexto
La transición de junio fue doble — keyword a concordancia de frase (med-jun) + recorte de presupuesto 15 → 5 → 5.60 (30 jun / 2 jul) — y rompió la economía de la campaña: CPC 2.56 → 7.36, ratio 0.75 → 0.26, contactos ~10–18/mes → 2/mes, QS 3 pagando posición #1 absoluta el 82% de las veces (vs 38% en la era amplia). El presupuesto diario quedó por debajo de un clic promedio. Auction insights mar–may: mercado fragmentado (LinkDesign líder con 20.12%, nadie más >11.6%, sin plataformas DIY) → el headroom de la amplia era real y barato; budget lost ~37% incluso con 15/día.

### Decisión (se aplicó manualmente en la UI: entonces el acceso API era read-only)

> **Desactualizado desde el 28 jul 2026**: el token pasó a nivel Basic y la API ya permite escribir.
> Los cambios de este tipo ya no obligan a pasar por la UI. Ver
> [bitacora-google-ads-api-basic.md](./bitacora-google-ads-api-basic.md).
1. Grupo "Software": crear `empresa de desarrollo de software` en **AMPLIA**; remover la PHRASE actual (la amplia la subsume). La broad vieja está REMOVED → se crea de nuevo; esperar 1–2 semanas de re-aprendizaje.
2. Presupuesto: 5.60 → **15.00/día** (el par histórico probado: amplia + 15 = ratio 0.75, CPC 2.56 sostenido mar–may).
3. Nada más cambia: estrategia, schedule y negativas quedan igual.

Nota (corrección 23 jul): se descartó un supuesto paso de higiene sobre una keyword `desarrollo de sitios web` detectada vía API dentro de esta campaña — vive en el grupo "Grupo de anuncios 1", que está **ELIMINADO** (la UI no lo muestra; la API lista sus criterios con status propio ENABLED). Un grupo eliminado nunca participa en subastas: no hay riesgo ni acción pendiente.

### Gates de la revisión del 13 ago 2026 (misma cita del plan tROAS)
- Subir a **20/día** SOLO si: pérdida por presupuesto >35% Y ratio ≥1.2 (escala nueva de values). Techo sin nueva evidencia: 20.
- Sumar Software al plan tROAS SOLO si recupera ≥10 contactos/mes; con menos señal, sin target.

## 23 jul 2026 — Aplicado: presupuestos del período de aprendizaje (opción intermedia)

Verificado por API el mismo día: Búsqueda a 10/día, Software a 15/día, y la keyword de Software ya en AMPLIA (la versión en frase quedó REMOVED — la edición de la UI hace remove+create interno, como se anticipó; QS e historial arrancan de nuevo, 1–2 semanas de aprendizaje).

Por presupuesto limitado se eligió la opción intermedia de la escalera (25/día nominal; ~32/día reales esperables con sobregasto):
- **Búsqueda: 15 → 10/día** — piso sano (~3.5 clics/día al CPC ~2.89); el Planner conserva ~84% del valor con 2/3 del gasto.
- **Software: 5.60 → 15/día** — el dólar marginal fue acá por mejor economía histórica y mayor necesidad de datos.

Umbrales del 13 ago ajustados a estos montos:
- Búsqueda: contactos esperados **~3/semana** (no 4–5). Extra: si budget lost >35% con mix sano, considerar volver a 15/día.
- Software: gates sin cambio (20/día solo con budget lost >35% y ratio ≥1.2; tROAS solo con ≥10 contactos/mes).

### Pendientes relacionados

- [x] Réplica del ×2 en el sitio Nolõ (Argentina): **desplegada el 24 jul 2026** (commit `e860ca1` en `nolo-simple`). Timing deliberado: las campañas AR ya tenían el aprendizaje reseteado por el cambio de estrategia del 19 jul (**de Maximizar conversiones a Maximizar valor de conversión** — la estrategia vieja optimizaba por cantidad y explicaba el mix AR de 92% scrolls), así que ambos cambios se absorben en una sola ventana. OJO para el 13 ago: el historial AR previo al 19 jul NO es comparable en comportamiento de puja (otro régimen de optimización); sirven solo las métricas de mercado (CPCs, volumen, search terms, QS). El análisis de "Búsqueda #2" quedó pospuesto por datos insuficientes (~4 días hábiles post-cambio) y se suma a la revisión del 13 ago.
- Negativas sugeridas para "Búsqueda": `webstudios`, `bravebits`, `guatemala`; decidir política del tráfico en inglés global ("landing page", "best website design", …).
- Revisar anomalía de jun 2026: Scroll reportó valor 93 con 64 conversiones (hubo scrolls con value > 1 durante el despliegue de la modulación).
