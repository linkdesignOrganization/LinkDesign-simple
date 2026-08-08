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
- [ ] **13 ago 2026** (recordatorio en Calendar) — Revisar con datos del 24 jul–12 ago: contactos/semana, mix de valor, ratio nuevo. Si el mix está ≥80% y los contactos se mantuvieron (~3/semana con 10/día): **activar tROAS inicial ~70%** (≈ ratio esperado con values nuevos ~0.9 × 0.8 de margen). El presupuesto vigente actúa como techo. **El análisis y el cambio se pueden hacer por API** (acceso Basic desde el 28 jul); Keyword Planner también quedó disponible para esta revisión. Desde el 7 ago se suma la **Search Console API** (`import gsc`) para la cara orgánica — ver la entrada del 7 ago, que incluye una lectura anticipada del criterio y dos advertencias sobre cómo leerlo.
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

## 30 jul 2026 — Atribución del embudo: qué se descartó y por qué

Al evaluar si convenía medir el desenlace comercial (lead → cliente ganado) para alimentar la puja,
apareció un límite que condiciona todo el plan de medición. Aplica igual a Nolõ, que comparte el
modelo de conversiones (ver `docs/bitacora-ads.md` en `nolo-simple`).

### El hallazgo: hoy no se puede medir el mix de canales

Existen **solo dos acciones de conversión** por sitio: `SCROLL` y `CONTACTO`. Esta última agrupa
WhatsApp, copiar correo, agendar reunión y formulario bajo un único identificador
(`ads.service.ts`). Ningún informe de Ads los separa.

Ene–29 jul 2026: Contacto (CR) 197 conversiones / valor 2620 · Contacto Argentina 34 / 522,5 ·
Scroll (CR+AR) 836 / 865. El promedio por contacto de CR es **13,3** — muy alto para ser casi todo
WhatsApp (value 10), muy bajo para estar dominado por formularios; consistente con un mix cercano a
mitad y mitad. Pero es **una inferencia frágil**: los values se duplicaron a mitad del período y
además se modulan 0,7–1,0. No es un número para decidir.

### Descartado: medir el desenlace solo con los leads del formulario

El CRM guarda `gclid` en los web-leads y el lead enlazado llega a `ganado`/`perdido`
(`WebLead.gclid → convertedToLeadId → Lead.status`), así que la cadena clic→cliente es
reconstruible… **solo para quien llenó el formulario**.

Se descartó como fuente principal, y no por tamaño de muestra sino por **sesgo**: quien escribe por
WhatsApp busca inmediatez y quien completa un formulario acepta un proceso formal; es probable que
respondan a keywords distintas. Concluir con esa muestra llevaría justo al error de descartar
keywords útiles o sobrevalorar otras.

**Lo que sí sigue siendo válido**: Ads ya atribuye a su keyword el clic de WhatsApp y el de copiar
correo. Las decisiones de keywords de esta bitácora **no** están sesgadas — el hueco es el desenlace.

### Descartado: código de referencia en el mensaje de WhatsApp

Ya se intentó en otra empresa y falló: una porción alta de la gente borra el código. Darle un
propósito (código de descuento) generó desconfianza. No se reintenta.

### Descartado: mini formulario pidiendo el celular antes de abrir WhatsApp

Mete fricción inmediata en el canal de más volumen y **no hay volumen para medir el daño**: con ~28
contactos/mes un A/B tardaría meses en ser concluyente. Encima cubriría solo WhatsApp y dejaría
fuera el correo, que es el canal de leads más serios.

### Abierto: subir conversiones con identificadores hasheados

`ClickConversion` acepta `user_identifiers` (`hashed_email`, `hashed_phone_number`) **en lugar de**
gclid: al marcar un lead como ganado se sube su correo o teléfono hasheado y Google lo matchea
contra cuentas de Google. Cero fricción y cubre WhatsApp y correo por igual. El CRM ya guarda el
teléfono en E.164, el formato exigido antes de hashear.

Dos límites:

- **Match parcial** — funciona mejor cuando el dato también se capturó en el sitio (formulario), que
  no es el caso de WhatsApp.
- **La Google Ads API ya no sirve para esto.** Desde el 15 jun 2026 `UploadClickConversions` falla
  si el developer token nunca subió conversiones offline; el nuestro estrenó Basic el 28 jul y cae
  del lado bloqueado. Va por la **Data Manager API**, otra habilitación aparte.

Y aun con match perfecto, 1–3 clientes ganados al mes no alcanzan para que Smart Bidding puje sobre
eso: el valor sería **medición para decisiones humanas**, no automatización.

### Descartado: crear GA4

El sitio ya captura por lead más detalle del que GA4 daría (tiempo activo, tiempo en foco por
sección, clics por CTA, timeline) y el CRM ya tiene `site-sessions`. GA4 sumaría una tercera cifra
de conversiones que nunca coincidiría con Ads ni con el CRM, y tampoco vería el desenlace de una
conversación de WhatsApp. El campo `ga_client_id` del payload queda viajando en `null`, a la espera.

### Decisión para el 13 ago 2026

**Separar las acciones de conversión por canal** (WhatsApp, copiar correo, agendar, formulario),
todas primarias con sus values. No perjudica a Smart Bidding —optimiza sobre el conjunto— y entrega
el mix por keyword, hoy invisible. Es lo único sin fricción, sin dependencias externas y barato.
Aplicar recién el 13 ago para no perturbar el aprendizaje. Con dos o tres semanas de datos se decide
si vale montar la Data Manager API.

Ojo: "copiar correo" solo se registra si usan el botón; quien lee el correo y lo escribe a mano no
deja rastro ni siquiera como conversión.

### Pendientes relacionados

- [x] Réplica del ×2 en el sitio Nolõ (Argentina): **desplegada el 24 jul 2026** (commit `e860ca1` en `nolo-simple`). Timing deliberado: las campañas AR ya tenían el aprendizaje reseteado por el cambio de estrategia del 19 jul (**de Maximizar conversiones a Maximizar valor de conversión** — la estrategia vieja optimizaba por cantidad y explicaba el mix AR de 92% scrolls), así que ambos cambios se absorben en una sola ventana. OJO para el 13 ago: el historial AR previo al 19 jul NO es comparable en comportamiento de puja (otro régimen de optimización); sirven solo las métricas de mercado (CPCs, volumen, search terms, QS). El análisis de "Búsqueda #2" quedó pospuesto por datos insuficientes (~4 días hábiles post-cambio) y se suma a la revisión del 13 ago.
- Negativas sugeridas para "Búsqueda": `webstudios`, `bravebits`, `guatemala`; decidir política del tráfico en inglés global ("landing page", "best website design", …). **Insumo nuevo (7 ago)**: Search Console confirma que el inglés genera impresiones sin retorno también en orgánico — "costa rica website design" 224 impresiones / 0 clics, "website design costa rica" 220/0, "web designer costa rica" 189/0, y EE.UU. aporta 516 impresiones y **0 clics** en 16 meses. No prueba qué hace ese tráfico al pagarlo, pero quita la hipótesis de que sea demanda desatendida que el orgánico ya estaría capturando.
- Revisar anomalía de jun 2026: Scroll reportó valor 93 con 64 conversiones (hubo scrolls con value > 1 durante el despliegue de la modulación).

## 7 ago 2026 — Search Console disponible + lectura anticipada del criterio del 13

### Nueva fuente: la cara orgánica del mismo mercado

Quedó montada la **Search Console API** sobre la misma service account, y además se **vinculó Search
Console con Google Ads**. Montaje, trampas y alcance en
[bitacora-google-ads-api-basic.md](./bitacora-google-ads-api-basic.md); acá solo lo que cambia para
este plan:

- Se consulta con `import gsc` igual que `import ads`. Hay **16 meses** de histórico, filtrable por
  país, página y consulta.
- **No reemplaza a GA4 ni reabre esa decisión** (30 jul): mide la búsqueda, no el sitio. El hueco del
  mix de canales sigue dependiendo de separar las acciones de conversión.
- El informe pago/orgánico de Ads (`paid_organic_search_term_view`) **no tiene backfill**: arranca en
  cero el 7 ago, así que el 13 tendrá ~6 días. El cruce histórico se arma a mano con `gsc.py`.
- **Hallazgo que cierra una hipótesis**: no hay canibalización. Ningún término comercial rankea en
  primera página ("web design costa rica": 884 impresiones, 0 clics, posición 37,5), y el 88% del
  clic orgánico es de marca. Cada clic pagado es incremental.

### Lectura anticipada del criterio (23 jul – 6 ago, faltan 6 días)

Calculado **solo sobre el período post ×2**, que es el único rango comparable:

| | Contacto | Scroll | Mix de valor |
|---|---:|---:|---:|
| **Costa Rica** ("Búsqueda") | 11,5 conv · 168,5 | 42,5 conv · 42,5 | **79,9%** |
| **Argentina** ("Búsqueda #2") | 21,0 conv · 410,5 | 80,9 conv · 80,9 | **83,5%** |

Referencia pre-×2 (8–22 jul): CR 57,5% · AR 67,1%.

Los contactos **no se mantuvieron: casi se duplicaron** — CR 0,40 → 0,77/día (≈5,4/semana, muy por
encima del ~3/semana esperado con 10/día), AR 0,74 → 1,40/día.

**Dos advertencias antes de leer esto como luz verde:**

1. **Buena parte de la subida del mix es aritmética, no de comportamiento.** Tomando los volúmenes de
   julio y duplicando solo el value de Contacto, el mix de CR daría **73,0%** por pura construcción.
   O sea: de 57,5% a 73,0% es el cambio de escala, y sólo de 73,0% a 79,9% es señal real. El umbral
   del 80% se fijó **antes** de duplicar los values, así que hoy mide algo distinto de lo que medía
   cuando se definió. Vale revisar el umbral, no sólo compararse contra él.
2. **El valor promedio por contacto bajó.** En unidades comparables: CR de 10,6 a **7,3** (−31%), AR
   de 11,7 a **9,8** (−16%). Más contactos, de menor calidad promedio — el comportamiento esperable
   de Smart Bidding cuando se le amplía la señal. El valor total sube, que es lo que optimiza, pero
   el lead promedio es más flojo.

Con 11,5 contactos en CR en quince días, un solo lead hot o nurture mueve el mix más de un punto: la
muestra es chica para decidir. Recalcular el 13 con el rango completo antes de activar nada.
