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
- [ ] **23 jul → 13 ago** — Aprendizaje. No tocar presupuesto (15/día) ni estrategia de puja. Vigilar el mix de valor.
- [ ] **13 ago 2026** (recordatorio en Calendar) — Revisar con datos del 24 jul–12 ago: contactos/semana, mix de valor, ratio nuevo. Si el mix está ≥80% y los contactos se mantuvieron (~4–5/semana): **activar tROAS inicial ~70%** (≈ ratio esperado con values nuevos ~0.9 × 0.8 de margen). El presupuesto queda en 15 como techo.
- [ ] **Cada 2 semanas post-tROAS** — Ajustar el target ±10–15% mirando la cantidad de contactos (no el ratio total). Si el volumen de contactos cae >30%, bajar el target.

## 23 jul 2026 — Fase 1b (decisión): revertir "Software" a concordancia amplia con USD 15/día

### Contexto
La transición de junio fue doble — keyword a concordancia de frase (med-jun) + recorte de presupuesto 15 → 5 → 5.60 (30 jun / 2 jul) — y rompió la economía de la campaña: CPC 2.56 → 7.36, ratio 0.75 → 0.26, contactos ~10–18/mes → 2/mes, QS 3 pagando posición #1 absoluta el 82% de las veces (vs 38% en la era amplia). El presupuesto diario quedó por debajo de un clic promedio. Auction insights mar–may: mercado fragmentado (LinkDesign líder con 20.12%, nadie más >11.6%, sin plataformas DIY) → el headroom de la amplia era real y barato; budget lost ~37% incluso con 15/día.

### Decisión (se aplica manualmente en la UI — el acceso API es read-only)
1. Grupo "Software": crear `empresa de desarrollo de software` en **AMPLIA**; remover la PHRASE actual (la amplia la subsume). La broad vieja está REMOVED → se crea de nuevo; esperar 1–2 semanas de re-aprendizaje.
2. Higiene: remover `desarrollo de sitios web` AMPLIA del "Grupo de anuncios 1" de la campaña Software (residuo de duplicación de Búsqueda; hoy 0 tráfico porque Búsqueda gana la selección interna, pero es riesgo latente).
3. Presupuesto: 5.60 → **15.00/día** (el par histórico probado: amplia + 15 = ratio 0.75, CPC 2.56 sostenido mar–may).
4. Nada más cambia: estrategia, schedule y negativas quedan igual.

### Gates de la revisión del 13 ago 2026 (misma cita del plan tROAS)
- Subir a **20/día** SOLO si: pérdida por presupuesto >35% Y ratio ≥1.2 (escala nueva de values). Techo sin nueva evidencia: 20.
- Sumar Software al plan tROAS SOLO si recupera ≥10 contactos/mes; con menos señal, sin target.

### Pendientes relacionados

- Réplica del ×2 en el sitio Nolõ (Argentina) si se quiere el mismo esquema para sus campañas ("Búsqueda #2" / "Software #2" de la misma cuenta de Ads).
- Negativas sugeridas para "Búsqueda": `webstudios`, `bravebits`, `guatemala`; decidir política del tráfico en inglés global ("landing page", "best website design", …).
- Revisar anomalía de jun 2026: Scroll reportó valor 93 con 64 conversiones (hubo scrolls con value > 1 durante el despliegue de la modulación).
