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
- [x] **23 jul → 13 ago** — Aprendizaje. Presupuesto de Búsqueda en 10/día desde el 23 jul (ver "presupuestos del período" abajo); no tocar estrategia de puja. Vigilar el mix de valor.
- [x] **13 ago 2026** (recordatorio en Calendar) — Revisar con datos del 24 jul–12 ago: contactos/semana, mix de valor, ratio nuevo. Si el mix está ≥80% y los contactos se mantuvieron (~3/semana con 10/día): **activar tROAS inicial ~70%** (≈ ratio esperado con values nuevos ~0.9 × 0.8 de margen). El presupuesto vigente actúa como techo. **El análisis y el cambio se pueden hacer por API** (acceso Basic desde el 28 jul); Keyword Planner también quedó disponible para esta revisión. Desde el 7 ago se suma la **Search Console API** (`import gsc`) para la cara orgánica — ver la entrada del 7 ago, que incluye una lectura anticipada del criterio y dos advertencias sobre cómo leerlo.
      → **Hecha: los cuatro gates dieron NO y el tROAS no se activó.** Ver la entrada del 13 ago al final.
- [ ] **Cada 2 semanas post-tROAS** — Ajustar el target ±10–15% mirando la cantidad de contactos (no el ratio total). Si el volumen de contactos cae >30%, bajar el target. *(No aplica todavía: no hay tROAS activo.)*

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

- [x] Réplica del ×2 en el sitio Nolõ (Argentina): **desplegada el 24 jul 2026** (commit `e860ca1` en `nolo-simple`). Timing deliberado: las campañas AR ya tenían el aprendizaje reseteado por el cambio de estrategia del 19 jul (**de Maximizar conversiones a Maximizar valor de conversión** — la estrategia vieja optimizaba por cantidad y explicaba el mix AR de 92% scrolls), así que ambos cambios se absorben en una sola ventana. OJO para el 13 ago: el historial AR previo al 19 jul NO es comparable en comportamiento de puja (otro régimen de optimización); sirven solo las métricas de mercado (CPCs, volumen, search terms, QS). El análisis de "Búsqueda #2" quedó pospuesto por datos insuficientes (~4 días hábiles post-cambio) y se suma a la revisión del 13 ago — **hecho el 13 ago**: es la campaña más eficiente de la cuenta (24,85 USD por lead serio contra 254,97 de Costa Rica).
- Negativas sugeridas para "Búsqueda": `webstudios`, `bravebits`, `guatemala`; decidir política del tráfico en inglés global ("landing page", "best website design", …). **Medido el 13 ago**: los tres términos juntos costaron **8,85 USD en todo 2026** — higiene, no economía. Lo que sí pesa son las marcas de terceros en "Software" (32,78 USD en 20 días); ver la entrada del 13 ago. **Insumo nuevo (7 ago)**: Search Console confirma que el inglés genera impresiones sin retorno también en orgánico — "costa rica website design" 224 impresiones / 0 clics, "website design costa rica" 220/0, "web designer costa rica" 189/0, y EE.UU. aporta 516 impresiones y **0 clics** en 16 meses. No prueba qué hace ese tráfico al pagarlo, pero quita la hipótesis de que sea demanda desatendida que el orgánico ya estaría capturando.
- [x] ~~Revisar anomalía de jun 2026: Scroll reportó valor 93 con 64 conversiones (hubo scrolls con value > 1 durante el despliegue de la modulación).~~ **Cerrada el 13 ago**: un único evento el 11 jun (exceso +29, que explica toda la diferencia). No se repite desde julio.

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

## 13 ago 2026 — La revisión: los cuatro gates dan NO, y el criterio resultó ser un mal proxy

Datos del **24 jul – 12 ago** (20 días calendario, 14 hábiles). El rezago no distorsiona nada: el
99,5 % de las conversiones del período cae en `LESS_THAN_ONE_DAY` y la lectura por fecha de clic
coincide con la de fecha de conversión hasta el segundo decimal. Los números están cerrados.

### Los gates, uno por uno

| Gate | Umbral | Medido | Veredicto |
|---|---|---|---|
| tROAS en "Búsqueda" | mix ≥ 80 % **y** contactos ~3/semana | mix **71,6 %** (campaña) · **74,8 %** (mercado CR) · **3,50** contactos/semana | **NO** — el mix no llega |
| "Software" → 20/día | pérdida por presupuesto > 35 % **y** ratio ≥ 1,2 | pérdida **48,0 %** ✓ · ratio **0,42** ✗ | **NO** — la regla exige ambos |
| "Software" → tROAS | ≥ 10 contactos/mes | **4,6**/mes | **NO** |
| "Búsqueda" → volver a 15/día | pérdida por presupuesto > 35 % con mix sano | **22,6 %** (ranking: 41,0 %) | **NO** — el cuello sigue siendo el ranking |

**No se tocó ninguna puja ni presupuesto.** La configuración queda como estaba: las cuatro campañas
en Maximizar valor de conversión sin target, Búsqueda 10/día, las otras tres 15/día.

Un detalle que invalida el target previsto aunque el mix hubiera dado: el 70 % se calculó como
"ratio esperado ~0,9 × 0,8 de margen". El ratio real de Búsqueda es **0,59**, así que pedir 70 %
habría sido exigirle un 19 % más de lo que entrega — un recorte de gasto, no un margen. La misma
fórmula sobre el dato real daría 47 %, que está *por debajo* del desempeño actual y por lo tanto no
haría nada: con el presupuesto ya saturado, un target inferior al ratio vigente no aprieta.

### El criterio subió por aritmética mientras el negocio se deterioraba

El mix de valor de CR pasó de 57,0 % a 74,8 %. Duplicando sólo el value de Contacto sobre los
volúmenes de julio —sin ningún cambio de comportamiento— habría dado **72,6 %**. Es decir: de los
17,8 puntos de mejora, **15,6 son el cambio de escala** y sólo 2,2 son señal real. A nivel de la
campaña "Búsqueda" sola el contrafactual da 74,4 % contra un 71,6 % real: la señal de comportamiento
es **negativa**.

Y debajo del mix había otra cosa. Separando los contactos por canal —se puede inferir del value
unitario, porque WhatsApp cae siempre en 7–10 y cualquier formulario arranca en 30 (30 × 0,7 = 21,
así que no hay solape posible)— aparece la métrica que importa:

**Costa Rica (Búsqueda + Software), leads serios = formulario, copiar correo o agendar:**

| Ventana | Costo | Leads serios | **USD por lead serio** | Serios/mes |
|---|---:|---:|---:|---:|
| 01–31 may | 616,27 | 18,0 | **34,24** | 17,7 |
| 01–30 jun | 893,93 | 15,0 | **59,60** | 15,2 |
| 01–22 jul | 445,04 | 5,0 | **89,01** | 6,9 |
| 24 jul–12 ago | 509,94 | 2,0 | **254,97** | 3,0 |

El costo por lead serio en Costa Rica se multiplicó por **7,4** desde mayo, y el volumen cayó de
17,7 a 3,0 por mes. Nada de esto era visible en el criterio del plan, porque la acción `CONTACTO`
suma WhatsApp y formulario bajo un mismo número.

### "Búsqueda" dejó de producir cualquier contacto que no sea WhatsApp

| Ventana | Contactos | Serios | WhatsApp |
|---|---:|---:|---:|
| 01–31 may | 16,33 | 10,00 (61,2 %) | 6,33 |
| 01–30 jun | 20,00 | 9,00 (45,0 %) | 11,00 |
| 01–22 jul | 9,00 | 4,00 (44,4 %) | 5,00 |
| **24 jul–12 ago** | **10,00** | **0,00 (0 %)** | **10,00** |

Los diez contactos del período valen entre 8,00 y 9,00: todos clics de WhatsApp, ninguna excepción
en siete días distintos. Con una tasa base del 44–50 % sostenida durante tres meses, sacar 0 de 10
tiene una probabilidad menor al 0,3 %. No es ruido.

**No es una falla de medición**, y tampoco es que la página convierta menos: la tasa de contacto por
clic se mantuvo (12,5 % → 14,6 % → 9,7 % → 13,9 %). Lo que se derrumbó es sólo la **tasa de leads
serios**: 7,6 % → 6,6 % → 4,3 % → **0,0 %**.

> **Corrección (misma sesión, tras cruzar con el CRM).** En una primera lectura se tomaron los
> contactos de 45,00 (30 jul) y 48,00 (5 ago) de la campaña "Software" como formularios, porque
> 48 es exactamente el value de *warm*. **No lo eran**: la colección `webleads` del CRM no tiene
> ningún envío en esas fechas. Eran clics de *copiar correo* (50 × 0,9 y 50 × 0,96) o de *agendar
> reunión*. La conclusión de fondo no cambia, pero el detalle sí — y el episodio es en sí mismo el
> mejor argumento para separar las acciones: con la acción agrupada, ni siquiera un análisis
> dedicado pudo distinguir un formulario de un clic de correo sin salir a buscar otra base de datos.

### Por qué activar tROAS hoy habría empeorado el problema

Si el único contacto que produce la campaña es WhatsApp, su value es prácticamente **constante**
(10 modulado 0,7–1,0). Un tROAS sobre esa señal no es un objetivo de retorno: es un **tCPA de clics
de WhatsApp disfrazado** —el mismo fenómeno que en Zacate, anotado en la skill `google-ads`— y la
forma más barata que tiene Smart Bidding de cumplirlo es traer todavía más clics de WhatsApp
baratos. Se habría apretado el tornillo justo en la dirección del sesgo recién detectado.

Esto además reordena la prioridad de las palancas: mientras el "valor" siga siendo un número que
elegimos nosotros (10 para WhatsApp, 30–60 para el formulario) y no una medición, cualquier ajuste
fino de puja optimiza sobre un supuesto sin evidencia.

### Argentina: el análisis pospuesto del 30 jul, ahora con datos

El régimen de puja de AR sólo es comparable desde el 19 jul, así que el período de aprendizaje es su
primera ventana legible. Va en dirección **contraria** a Costa Rica:

| Campaña | USD/lead serio (1–22 jul) | USD/lead serio (24 jul–12 ago) | Serios en el período |
|---|---:|---:|---:|
| Búsqueda #2 | 91,09 | **24,85** | 11,00 de 16 contactos (68,8 %) |
| Software #2 | 68,31 | **57,34** | 4,97 de 8,97 (55,4 %) |

AR consolidado: **34,98 USD** por lead serio contra **254,97** en CR — 7,3× más eficiente — y ~24
leads serios al mes contra 3,0. Con ratio 1,42, "Búsqueda #2" es la única campaña de la cuenta que
devuelve más valor del que cuesta. El mix de AR (81,2 %) sí cruza el umbral del 80 %, pero su
contrafactual aritmético es 80,3 %: también ahí el umbral mide sobre todo la escala nueva.

### Verificación cruzada con el CRM — y la pregunta abierta, respondida en parte

Todo lo anterior sale de Google Ads, donde el canal es una **inferencia**. El CRM (Cosmos DB de
producción, consultado en sólo lectura) lo confirma desde una base independiente y agrega lo que Ads
no puede ver.

**Los formularios, uno por uno.** La colección `webleads` tiene **13 envíos en toda su historia**:

| Mes | Costa Rica | Argentina |
|---|---:|---:|
| may | 3 | 0 |
| jun | 4 | 1 |
| jul | **1** | 3 |
| ago | **0** | 1 |

El último formulario de Costa Rica es del **7 jul 2026** (Boston Scientific). Al 13 de agosto van
**37 días sin un solo formulario en CR**, mientras Argentina recibió uno el 12 de agosto. La
inferencia por value queda confirmada por la vía dura.

Dos datos que sólo el CRM podía dar:

- **Los 13 formularios, sin excepción, traen `gclid` y `traffic.channel = "paid"`.** El 100 % del
  formulario del sitio lo produce Google Ads; el orgánico no aporta ninguno. Refuerza el hallazgo de
  Search Console: no hay canal alternativo que esté capturando esa demanda.
- **El último formulario atribuible a la campaña "Búsqueda" es del 18 jun** (Coopeagropal, con
  `gad_campaignid=21910466866` en la URL). El del 7 jul entró por `/contacto`, sin campaña en la URL.

**Y la pregunta que la entrada del 30 jul dejó abierta —cuánto vale un WhatsApp frente a un
formulario— ya tiene una primera respuesta empírica.** El pipeline comercial (52 leads) registra el
canal de origen:

| Canal de origen | Leads | Ganados | Perdidos | Tasa de cierre |
|---|---:|---:|---:|---:|
| WhatsApp | 23 | 4 | **14** | 22 % |
| Email | 20 | 7 | 7 | 50 % |
| Otro | 7 | 4 | 1 | 80 % |
| Formulario | 1 | 0 | 0 | n/d |

**Leer con dos cuidados**, porque ambos importan:

1. **Once de esos "ganados" se cargaron el 13 ago**: son clientes históricos que entraron al CRM ese
   día, no leads que recorrieron el embudo. Descontándolos, de los leads de WhatsApp ya cerrados se
   perdieron **14 de 15** — una tasa de cierre del 6,7 %.
2. **Los formularios están mal etiquetados en el pipeline.** R. Loría (formulario del 12 may) y
   Pacific Star Food (formulario del 3 jun) figuran con canal "Otro", y ambos son **clientes
   ganados**. Sólo Boston Scientific quedó etiquetado como "Formulario". Es decir: parte del 80 % de
   cierre que hoy se le atribuye a "Otro" es, en realidad, del formulario web.

Con las muestras que hay no se puede fijar un value exacto, pero la dirección es inequívoca y
contradice el supuesto vigente: **el mapa de values le asigna al WhatsApp 10 y al formulario 30–60
(1:3 a 1:6), mientras que la evidencia de cierre apunta a una brecha mayor, no menor.** Optimizar
hacia el canal de peor cierre es exactamente lo que la cuenta viene haciendo.

**Hallazgo operativo colateral**: `convertedToLeadId` está poblado en **1 de 13** web-leads. La
cadena `WebLead.gclid → convertedToLeadId → Lead.status` que la entrada del 30 jul daba por
reconstruible **en la práctica está vacía** — los leads se crean a mano en el pipeline, sin enlazar
con el formulario que los originó (el endpoint `convert-to-lead` del CRM sigue siendo un stub 501).
Hoy el enlace sólo se puede rehacer emparejando nombres a ojo. Cualquier plan que dependa de medir
el desenlace comercial tiene que resolver esto primero.

### Un sospechoso con fecha, y por qué no alcanza para culparlo

El 1 jul 2026 se fijó el botón de WhatsApp en el topbar, visible de forma permanente en todas las
páginas internas (`d484f10` en LinkDesign, `44c1c9d` en Nolõ — el mismo día en ambos). El formulario,
en cambio, sigue viviendo al pie de la página y pide cinco campos.

La correlación en Costa Rica es fuerte: **0,115 formularios/día antes del 1 jul contra 0,023
después — una caída del 80 %**, mientras los clics de WhatsApp subían. Y el mecanismo es plausible:
es el único cambio del período que altera directamente qué canal elige el visitante.

Pero **no alcanza como causa**, y conviene dejarlo escrito para no darlo por probado más adelante:
Nolõ recibió el mismo cambio el mismo día y **siguió recibiendo formularios** (1 jul, 7 jul, 22 jul,
12 ago). Argentina no tiene un "antes" comparable —sus campañas arrancaron en junio— así que el
efecto allá no se puede medir. En el mismo período también entraron el portafolio desde el CRM
(3–4 jul), las sesiones por idioma (8 jul), el ×2 (23 jul) y Angular 22 (6 ago).

Lo que sí se verificó hoy: el formulario de `linkdesign.cr/web` **está y está completo** (nombre,
empresa, correo, teléfono, necesidad, canal preferido, mensaje y botón de envío), la página carga sin
un solo error ni advertencia en consola, y la sección de contacto ofrece el WhatsApp y el "copiar
correo" *antes* del formulario. No hay nada roto: hay una jerarquía de fricción que favorece al canal
que peor cierra.

### Hallazgos laterales del barrido

- **Las cuatro keywords tienen `landing page = BELOW_AVERAGE`.** Es la única dimensión de calidad
  floja en todas (el anuncio es ABOVE_AVERAGE en las cuatro). "Búsqueda" pierde el **41 % de las
  impresiones por ranking** y sólo el 22,6 % por presupuesto: el cuello de botella es el Quality
  Score, y dentro del QS, la experiencia de la página de destino. Es una palanca estructural que
  baja el CPC sin gastar un peso más, y nunca se había mirado.
- **Cada campaña corre con una sola keyword y un solo anuncio.** Búsqueda `desarrollo de sitios web`
  (BROAD, QS 5) · Búsqueda #2 la misma en PHRASE (QS 7) · Software `empresa de desarrollo de
  software` (BROAD, QS 3) · Software #2 la misma en PHRASE (QS 5).
- **Marcas de terceros en "Software"**: `customertimes`, `kinamic`, `4waystech`, `software velocity`,
  `belltech`, `navisite costa rica`, `netweb`, `scalable systems`, `optimus erp` y `luxoft argentina`
  se llevaron **32,78 USD en 20 días** (~11 % del gasto de Software). Son búsquedas navegacionales
  hacia otra empresa. Pesan mucho más que las tres negativas pendientes de la lista de abajo, que en
  todo 2026 sumaron 8,85 USD.
- **El tráfico en inglés cuesta poco y no rinde nada**: 160 impresiones, 5 clics, **7,38 USD** y cero
  contactos en el período. Sumado a lo que ya decía Search Console (EE.UU.: 516 impresiones y 0
  clics en 16 meses), la política razonable es bloquearlo, aunque el ahorro sea de ~11 USD/mes.
- **`paid_organic_search_term_view` ya devuelve datos** (37 términos desde la vinculación) y **todos
  salen `ADS_ONLY`**: cero impresiones orgánicas en los términos que pagamos. Confirma por la vía
  directa lo que el 7 ago se había inferido con `gsc.py` — no hay canibalización, cada clic pagado es
  incremental.
- **Anuncios huérfanos, sin efecto**: hay cuatro `ad_group_ad` en estado ENABLED colgando de grupos o
  campañas REMOVED (uno apunta a `linkdesignar.com/corporate`, del rebrand a Nolõ; otro a
  `linkdesign.cr/corporate`). No participan en subastas — es el mismo patrón ya documentado el 23 jul
  con la keyword del grupo eliminado. No requieren acción; anotados para no volver a investigarlos.

### Aplicado hoy: un canal, una acción

Con el criterio del usuario ("los WhatsApp suelen ser consultas flojas" — confirma la lectura del
CRM), se ejecutó la separación decidida el 30 jul. **Ocho acciones nuevas por API**, cuatro por
mercado:

| Canal | Costa Rica | Argentina |
|---|---|---|
| WhatsApp | `PFEECM2UquEc…` | `zxm7CMGXquEc…` |
| Copiar correo | `U_F7CMiVquEc…` | `tU5ZCMSXquEc…` |
| Agendar reunión | `WVgrCMuVquEc…` | `GPuTCMeXquEc…` |
| Formulario | `VGKrCL6XquEc…` | `ZAj_CMqXquEc…` |

Todas `WEBPAGE`, `ONE_PER_CLICK`, primarias, lookback 30 días, `default_value` 1.0 sin forzar (el
value sigue viajando en el evento). Los values no se tocaron.

**La categoría fue la decisión delicada, y no es cosmética.** Se consultaron primero los objetivos de
conversión: "Búsqueda" y "Software" tienen `campaign_conversion_goal = CONTACT/WEBSITE`, así que las
cuatro de CR se crearon **CONTACT** — con `SUBMIT_LEAD_FORM` o `BOOK_APPOINTMENT`, que era lo
semánticamente correcto, habrían quedado **fuera de la puja sin ningún aviso**. Las de AR se crearon
**DEFAULT**, igual que "Contacto Argentina": sus campañas usan los objetivos de la cuenta, donde
`DEFAULT/WEBSITE` sí puja. En ambos casos la regla fue *replicar la categoría de la acción que
reemplazan*, para no mover qué optimiza Smart Bidding mientras se cambia lo que mide.

Las viejas (`Contacto` y `Contacto Argentina`) quedan **ENABLED pero ya no se disparan**: conservan
su histórico en los informes y dejan de acumular. Desactivarlas no aportaba nada y arriesgaba el
histórico.

En el código, el cambio es simétrico en los dos sitios: `ADS_CONVERSIONS` pasa de dos entradas a
cinco y cada método apunta a la suya, más `GA_CONVERSION.SEND_TO` del formulario en
`lead-form/models/lead-form-options.ts`. De paso queda cumplido el TODO que ese archivo arrastraba
desde antes ("crear una conversion action DEDICADA para Form Submit"). Tests: 49 pasan en LinkDesign,
46 en Nolõ.

### Qué queda pendiente

1. **Sin cambios de puja ni de presupuesto.** Los cuatro gates fallaron; la palanca correcta no era
   el target sino la señal que lo alimenta, y esa señal es lo que se acaba de arreglar.
2. **No mezclar cambios**: separar las acciones reinicia el aprendizaje de Smart Bidding. Si más
   adelante se activa un tROAS, tiene que ser en una ventana distinta o no habrá forma de atribuir
   el efecto. **Dejar correr al menos dos semanas antes de tocar cualquier puja.**
3. **Verificar en 24–48 h** que las cuatro acciones nuevas empiezan a registrar conversiones. Si
   alguna queda en cero cuando las otras se mueven, el label está mal copiado — es el modo de fallo
   más probable de este cambio, y silencioso.
4. **La pregunta del valor relativo ya no está del todo abierta**: el CRM dice que los leads de
   WhatsApp se pierden 14 de 15 veces y que los de formulario/correo cierran mucho mejor. El mapa
   vigente le da al formulario 3–6× el WhatsApp; la evidencia sugiere **más**. Con dos o tres
   semanas de datos ya separados por canal se puede recalibrar la escala con números propios en vez
   de con un supuesto. Ése es el momento de decidir si vale la pena la Data Manager API.
5. **La palanca estructural sigue sin tocarse**: `landing page = BELOW_AVERAGE` en las cuatro
   keywords, y 41 % de impresiones perdidas por ranking en "Búsqueda".

### Pendientes cerrados en esta revisión

- [x] **Anomalía de junio del Scroll** — resuelta y sin secuelas: fue **un solo evento el 11 jun
      2026** (1 conversión de Scroll con value 30 en vez de 1; exceso exactamente +29, que es la
      diferencia que había motivado la nota). De julio en adelante el valor de Scroll iguala la
      cantidad de conversiones todos los días. No hay nada que corregir.
- [x] **Análisis de "Búsqueda #2"**, pospuesto el 24 jul por datos insuficientes — hecho arriba.
