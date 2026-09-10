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
- [x] **4 sep 2026** (recordatorio en Calendar, **movido del 3 al 4** el 14 ago) — Revisión de las cuatro campañas, y sobre todo la **primera lectura de la nota de página de destino** tras el copy publicado el 14 de agosto: son tres semanas exactas. La línea base contra la que comparar y cómo leerla sin engañarse están en la última entrada del documento.
      → **Hecha el 7 sep 2026, sólo Costa Rica** (Argentina va en su propia sesión y su bitácora). La nota no se movió en ninguna de las cuatro; los criterios de las dos campañas dieron NO; el CRM aportó una coincidencia que vale un cliente. Ver la entrada del 7 sep al final.
- [ ] **5 oct 2026, lunes 9:00** (recordatorio en Calendar, con aviso por correo una hora antes) — Revisión de «Búsqueda» y «Software» (CR) con datos del 5 sep – 2 oct: **primera lectura de la nota de página de destino tras los cambios del 8 sep** (cédula, horario, videos móviles), criterios de presupuesto de las dos campañas, estadísticas de subasta (las saca Robert, idealmente segmentadas por semana) y tasa de cierre por canal en el CRM. En Ads no se toca nada hasta entonces, a propósito. El guion completo está en el cierre de la entrada del 7 sep (cont.).
- [ ] **Cada 2 semanas post-tROAS** — Ajustar el target ±10–15% mirando la cantidad de contactos (no el ratio total). Si el volumen de contactos cae >30%, bajar el target. *(No aplica todavía: no hay tROAS activo.)*

## 23 jul 2026 — Fase 1b (decisión): revertir "Software" a concordancia amplia con USD 15/día

### Contexto
La transición de junio fue doble — keyword a concordancia de frase (med-jun) + recorte de presupuesto 15 → 5 → 5.60 (30 jun / 2 jul) — y rompió la economía de la campaña: CPC 2.56 → 7.36, ratio 0.75 → 0.26, contactos ~10–18/mes → 2/mes, QS 3 pagando posición #1 absoluta el 82% de las veces (vs 38% en la era amplia).

> **Desambiguado el 13 ago 2026** (entrada al final del documento): la transición era doble y acá
> quedó sin atribuir, pero **la frase corrió en dos tramos con presupuestos distintos** y el CPC alto
> aparece igual en los dos — 6,13 con 15/día (15–29 jun) y 6,77 con 5,60/día (30 jun–22 jul). La
> causa era la **concordancia**, no el recorte. La decisión de volver a amplia era correcta; el
> razonamiento que la sostenía, incompleto. El presupuesto diario quedó por debajo de un clic promedio. Auction insights mar–may: mercado fragmentado (LinkDesign líder con 20.12%, nadie más >11.6%, sin plataformas DIY) → el headroom de la amplia era real y barato; budget lost ~37% incluso con 15/día.

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
- Búsqueda: contactos esperados **~3/semana** (no 4–5). Extra: si budget lost >35% con mix sano, considerar volver a 15/día. → **Evaluado dos veces el 13 ago y descartado ambas** (budget lost 22,6 %, y el histórico muestra que los 15/día casi nunca se gastaban enteros); ver la entrada de la segunda sesión al final.
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

- [x] Réplica del ×2 en el sitio Nolõ: **desplegada el 24 jul 2026** (commit `e860ca1` en `nolo-simple`). La escala de values es de la cuenta, así que tenía que moverse en los dos sitios a la vez o el histórico quedaba en dos unidades distintas. Lo que se hizo con las campañas de ese mercado, y cómo se leyó su ventana, está en su bitácora.
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

> ⚠️ **Corregida en la sesión posterior del mismo día.** Mayo y junio sobrestiman los leads serios:
> el reparto de las celdas con más de una conversión estaba mal resuelto. Las cifras buenas están en
> la entrada del 13 ago (segunda sesión), al final del documento. El deterioro es real pero menor:
> **×5,2**, no ×7,4.

| Ventana | Costo | Leads serios | **USD por lead serio** | Serios/mes |
|---|---:|---:|---:|---:|
| 01–31 may | 616,27 | ~~18,0~~ → 12–13 | ~~**34,24**~~ → **49,30** | ~~17,7~~ → 12,5 |
| 01–30 jun | 893,93 | ~~15,0~~ → 11 | ~~**59,60**~~ → **81,27** | ~~15,2~~ → 11,0 |
| 01–22 jul | 445,04 | 5,0 ✓ | **89,01** → 91,29 | 6,9 |
| 24 jul–12 ago | 509,94 | 2,0 ✓ | **254,97** ✓ | 3,0 |

El costo por lead serio en Costa Rica se multiplicó por **5,2** desde mayo (no 7,4), y el volumen
cayó de 12,5 a 3,0 por mes. Nada de esto era visible en el criterio del plan, porque la acción
`CONTACTO` suma WhatsApp y formulario bajo un mismo número.

### "Búsqueda" dejó de producir cualquier contacto que no sea WhatsApp

> ⚠️ **Dos correcciones de la sesión posterior del mismo día**, ambas detalladas al final del
> documento. **(1)** En mayo y junio las columnas están intercambiadas y sobrestiman los serios: los
> valores crudos son inequívocos (5,00 = WhatsApp en 224 casos; 25,00 = copiar correo en 47), y dicen
> 6 serios en cada mes, no 10 y 9. **(2)** El "0,3 %" usa como base la tasa de 2026, que fue
> anormalmente alta (34 % contra 16 % en 2025); con los dos años juntos la racha da **~4 %** —
> improbable, pero lejos de imposible, y ya hubo dos rachas iguales o más largas sin que se tocara
> nada.

| Ventana | Contactos | Serios | WhatsApp |
|---|---:|---:|---:|
| 01–31 may | 16,33 | ~~10,00 (61,2 %)~~ → **6 (37 %)** | ~~6,33~~ → 10,3 |
| 01–30 jun | 20,00 | ~~9,00 (45,0 %)~~ → **6 (30 %)** | ~~11,00~~ → 14,0 |
| 01–22 jul | 9,00 | 4,00 (44,4 %) ✓ | 5,00 ✓ |
| **24 jul–12 ago** | **10,00** | **0,00 (0 %)** ✓ | **10,00** ✓ |

Los diez contactos del período valen entre 8,00 y 9,00: todos clics de WhatsApp, ninguna excepción
en siete días distintos. Con la tasa base corregida de los dos años (22 %), sacar 0 de 10 tiene una
probabilidad del ~8 %; extendiendo la racha a los 13 contactos seguidos que lleva hasta el 12 de
agosto, ~4 %. Es señal, pero no es la anomalía extrema que decía la primera lectura.

**No es una falla de medición**, y tampoco es que la página convierta menos: la tasa de contacto por
clic se mantuvo (12,5 % → 14,6 % → 9,7 % → 13,9 %). Lo que se derrumbó es sólo la **tasa de leads
serios**: ~~7,6 % → 6,6 % → 4,3 % → **0,0 %**~~ → corregida, **4,6 % → 4,4 % → 4,3 % → 0,0 %**.

> ⚠️ La corrección cambia la forma de la caída, y **en contra** de la lectura tranquilizadora: no
> hubo un declive gradual desde mayo —eso era el artefacto de la partición mal hecha— sino una
> **meseta estable en ~4,4–4,6 % durante tres meses y un corte seco a cero**. El corte queda más
> alineado con el 23 de julio de lo que parecía. Los argumentos que igual apuntan a que el recorte no
> es la causa (el tráfico no bajó, "Software" subió el presupuesto y también cayó) están en la
> entrada de la segunda sesión, al final.

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

### El contraste que dimensiona el problema de acá

Costa Rica está en **254,97 USD por lead serio y 3,0 al mes** (tabla de arriba). El otro mercado,
gastando casi lo mismo en la misma ventana, va **3,4 veces más barato y a unas cuatro veces el
volumen**, y es el único de la cuenta con ratio valor/costo mayor que 1 — contra **0,59** de
"Búsqueda" y **0,42** de "Software".

Ese contraste es lo que convierte el número de acá en un problema y no en un dato suelto: no es que
el negocio no funcione, es que **no funciona en este mercado a este precio**. El análisis que produce
esas cifras, con sus tablas y la corrección de esa misma tarde, está en `docs/bitacora-ads.md` del
repo de Nolõ.

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
CRM), se ejecutó la separación decidida el 30 jul. **Cuatro acciones nuevas por API**, una por canal
(el otro mercado recibió las suyas el mismo día, con sus propios labels; están en su bitácora):

| Canal | Label |
|---|---|
| WhatsApp | `PFEECM2UquEc…` |
| Copiar correo | `U_F7CMiVquEc…` |
| Agendar reunión | `WVgrCMuVquEc…` |
| Formulario | `VGKrCL6XquEc…` |

Todas `WEBPAGE`, `ONE_PER_CLICK`, primarias, lookback 30 días, `default_value` 1.0 sin forzar (el
value sigue viajando en el evento). Los values no se tocaron.

**La categoría fue la decisión delicada, y no es cosmética.** Se consultaron primero los objetivos de
conversión: "Búsqueda" y "Software" tienen `campaign_conversion_goal = CONTACT/WEBSITE`, así que las
cuatro de acá se crearon **CONTACT** — con `SUBMIT_LEAD_FORM` o `BOOK_APPOINTMENT`, que era lo
semánticamente correcto, habrían quedado **fuera de la puja sin ningún aviso**. La regla fue
*replicar la categoría de la acción que reemplazan*, para no mover qué optimiza Smart Bidding
mientras se cambia lo que mide.

> **Ese mismo criterio se aplicó al otro mercado y ahí falló**, por un motivo que no se vio hasta el
> 18 de agosto: sus campañas no se rigen por la categoría. Está en la bitácora de Nolõ.

La vieja `Contacto` queda **ENABLED pero ya no se dispara**: conserva su histórico en los informes y
deja de acumular. Desactivarla no aportaba nada y arriesgaba el histórico.

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
   > **Hecho el 17 ago: las ocho están bien**, y el modo de fallo quedó descartado sin depender del
   > volumen (los labels de producción se compararon contra los del servidor). Entrada al final.
4. **La pregunta del valor relativo ya no está del todo abierta**: el CRM dice que los leads de
   WhatsApp se pierden 14 de 15 veces y que los de formulario/correo cierran mucho mejor. El mapa
   vigente le da al formulario 3–6× el WhatsApp; la evidencia sugiere **más**. Con los datos ya
   separados por canal se puede recalibrar la escala con números propios en vez de con un supuesto.
   Ése es el momento de decidir si vale la pena la Data Manager API.
   > **Fecha fijada el 13 ago: 3 sep 2026, no antes** — **movida al 4 sep el 14 ago**, para que
   > coincida con las tres semanas del copy nuevo. La tentación es recalibrar apenas haya dos semanas
   > de datos, pero hacerlo a mitad de la ventana la dejaría con **dos escalas de valor mezcladas** y
   > el aprendizaje reiniciado por la mitad — exactamente lo que volvió irresoluble el episodio del
   > 23 de julio. La ventana 13 ago – 4 sep queda con una sola escala; si ese día se decide
   > recalibrar, el cambio abre su propia ventana.
5. **La palanca estructural sigue sin tocarse**: `landing page = BELOW_AVERAGE` en las cuatro
   keywords, y 41 % de impresiones perdidas por ranking en "Búsqueda".

### Pendientes cerrados en esta revisión

- [x] **Anomalía de junio del Scroll** — resuelta y sin secuelas: fue **un solo evento el 11 jun
      2026** (1 conversión de Scroll con value 30 en vez de 1; exceso exactamente +29, que es la
      diferencia que había motivado la nota). De julio en adelante el valor de Scroll iguala la
      cantidad de conversiones todos los días. No hay nada que corregir.
- [x] **Análisis del mercado argentino**, pospuesto el 24 jul por datos insuficientes — hecho el 13
      ago en su propia bitácora. Lo que toca a este documento es el contraste, anotado arriba.

## 13 ago 2026 (segunda sesión) — ¿Búsqueda vuelve a 15/día? No; y sobre el recorte, hay empate

Dos preguntas del usuario, en este orden: si conviene devolver "Búsqueda" a 15/día mirando el
histórico del año pasado y un plan de palabras clave, y si es coincidencia que los leads serios se
hayan caído justo cuando el presupuesto bajó de 15 a 10.

Antes de la primera hay que registrar un razonamiento suyo, porque **es correcto y levanta el freno
que la entrada anterior había puesto**: las ocho acciones nuevas se crearon dentro del mismo objetivo
de conversión y con los mismos values, así que su efecto esperado sobre la puja es neutro — se hizo
para *ver* el mix, no para mejorarlo. No habrá nunca un "antes y después" que evaluar. Congelar la
cuenta esperando ese resultado no compra información. Lo que sí obliga a esperar es otra cosa, y es
más chica: la verificación de que los ocho labels registran (pendiente 3 de la entrada anterior).

### La estacionalidad no sostiene la subida: agosto es de los meses más altos

Keyword Planner —habilitado con el Basic del 28 jul y usado acá por primera vez— sobre Costa Rica,
español, 8 keywords del rubro, 24 meses (ago 2024 – jul 2026). Promedio por mes calendario,
índice 100 = promedio del período:

| mes | índice | | mes | índice |
|---|---:|---|---|---:|
| marzo | **130** | | octubre | 98 |
| **agosto** | **115** | | noviembre | 95 |
| septiembre | 111 | | junio | 93 |
| mayo | 110 | | enero | 89 |
| abril | 109 | | **julio** | **80** |
| febrero | 100 | | diciembre | 70 |

Agosto es el segundo mes más fuerte y julio el segundo más flojo; en 2025 la demanda pasó de 420 en
julio a 520 en agosto (**+24 %**). La premisa de la consulta —que el mes en curso fuera bajo— queda
**refutada, y en la dirección incómoda**: estamos en temporada favorable y la campaña igual no
produce leads serios.

Dos advertencias de lectura, para quien vuelva a esta tabla: el Planner redondea a decenas y por
buckets, así que sirve para la forma de la curva y no para niveles; y **la demanda de 2026 corre
~23 % por debajo de la de 2025** en todo el rubro (jul 2026: 280 contra 420 en jul 2025). Eso no es
estacional, es del año. Search Console, como fuente independiente, coincide en que agosto 2025 fue el
pico de impresiones orgánicas del año.

### El dato que cambia la pregunta: los 15/día casi nunca se usaban enteros

Con presupuesto de 15/día el tope mensual es 456 (30,4 × diario). La campaña nunca se acercó:

| período | presup. | gasto real/mes | clics/mes | CPC | leads serios/mes |
|---|---|---:|---:|---:|---:|
| feb–may 2026 | 15/día | **308** | 127 | 2,43 | 6,6 |
| jun–jul 2026 | 15/día | **424** | 135 | 3,13 | 5,0 |
| ago 2026 (proyectado) | 10/día | **303** | ~105 | 2,81 | 0 en 12 días |

Entre febrero y mayo gastaba 308 al mes con 456 disponibles: **no encontraba dónde poner el resto**.
Hoy, con 10/día, gasta 303 — cinco dólares menos que cuando tenía 15. Y la única vez que sí usó el
presupuesto grande (jun–jul), esos 116 dólares extra compraron **9 clics más y 1,6 leads serios
menos**: se fueron en encarecer el clic (2,43 → 3,13), no en traer volumen.

La correlación entre gasto mensual y leads serios en 2026 es **negativa** (r = −0,42, 7 meses). Con
esa muestra no es concluyente por sí sola, pero no hay ninguna evidencia de rendimiento creciente al
gasto, que es lo que haría falta para justificar la subida.

El cuello de botella tampoco cambió: en agosto se pierde **20,2 %** de las impresiones por
presupuesto y **43,4 %** por ranking. Dos de cada tres impresiones perdidas se pierden por calidad.
La palanca estructural sigue siendo `landing page = BELOW_AVERAGE` en las cuatro keywords.

**Decisión: no se sube. No se tocó nada.** Las cuatro campañas siguen en Maximizar valor de
conversión sin target, Búsqueda 10/día, las otras tres 15/día.

### ¿Fue el recorte del 23 jul? La evidencia está dividida

La pregunta se analizó creyendo que la respuesta sería un "no" limpio. **No lo es**, y el dato que lo
impide apareció al corregir el error de partición: la tasa de leads serios no venía cayendo, estaba
en meseta (4,6 % → 4,4 % → 4,3 %) y se cortó de golpe en la ventana del cambio.

**A favor de que el recorte tuvo que ver:**

1. **No hay declive previo que explique el cero por inercia.** Tres meses planos y un corte seco.
2. **11 de los 13 contactos de la racha son posteriores al recorte.**
3. **Hay un mecanismo concreto y consistente con todo lo observado**: el CPC cayó 22 % (3,29 → 2,55),
   y un clic más barato suele ser una búsqueda menos competida. El tráfico no bajaría de volumen pero
   sí de intención — que es exactamente el cuadro.

**En contra:**

4. **El último lead serio fue el 14 de julio; el recorte fue el 23.** La racha arranca el 16, siete
   días antes. Débil por sí solo: entre el 14 y el 23 hubo apenas **2 contactos**.
5. **El recorte no redujo el tráfico.**

   | período | presupuesto | clics/día hábil | CPC | gasto/día hábil |
   |---|---|---:|---:|---:|
   | 1–22 jul | 15/día | **5,8** | 3,29 | 19,13 |
   | 23–31 jul | 10/día | **5,9** | 2,55 | 14,91 |
   | 1–12 ago | 10/día | **5,1** | 2,81 | 14,42 |

   Ojo con cómo se lee esto: **refuta la versión ingenua** de la hipótesis ("menos presupuesto =
   menos visitas = menos leads"), pero **no la versión del punto 3**, que no necesita que caiga el
   volumen sino que cambie la composición. Entraron los mismos visitantes por día; la pregunta
   abierta es si eran *los mismos* visitantes.

6. **"Software" movió el presupuesto en dirección contraria el mismo día y también cayó**: pasó de
   5,60 a 15/día y sus leads serios por 100 clics fueron de 5,0 a 2,6. Orienta, pero no prueba — tuvo
   2 y 3 contactos en cada ventana.
7. **Una racha así ya ocurrió dos veces sin que nadie tocara nada**: 16 contactos seguidos sin lead
   serio del 16 ene al 4 feb 2025, y 13 del 10 abr al 19 may 2025. La actual es de 13 (16 jul –
   10 ago). No es un récord.
8. **2026 venía anormalmente bien**: 34 % de los contactos eran serios contra 16 % en 2025, así que
   parte de lo que se ve es regresión al nivel normal histórico, no caída bajo el piso.

**Conclusión honesta: no se puede atribuir ni descartar.** El recorte, el ×2 de values y la
composición del tráfico cambiaron todos el mismo día, y las muestras son de una decena de contactos.
Lo que sí queda descartado es la explicación por volumen de visitas — y, tras el análisis de términos
de la sección siguiente, también la de la calidad del clic.

Esto **no cambia la decisión de no subir el presupuesto**: los 15/día casi nunca se gastaban enteros,
así que devolverlos compra poco en cualquiera de los escenarios.

### Descartado: el "hueco estacional" de mediados de julio a mediados de agosto

Vale la pena dejarlo escrito **para que nadie lo redescubra y se lo crea**, porque parecía sólido.

Recortando la ventana 14 jul – 12 ago, tanto 2025 como 2026 daban 6–7 % de leads serios contra 23 %
del resto del año, con p = 1,8 %. La explicación era atractiva: vacaciones de medio año, la gente
sigue consultando informal por WhatsApp pero nadie arranca un proceso formal.

**Es un artefacto de haber elegido la ventana mirando los datos de 2026.** Al mover los bordes se
desarma:

| ventana | dentro | fuera | p |
|---|---:|---:|---:|
| 14/7 – 12/8 | 7 % | 23 % | 1,8 % |
| 20/7 – 20/8 | 8 % | 23 % | 4,4 % |
| 10/7 – 10/8 | 14 % | 23 % | 17 % |
| 1/7 – 15/8 | 17 % | 22 % | 27 % |
| 1/8 – 31/8 | 15 % | 22 % | 32 % |

Y probado **sólo sobre 2025**, el año sin ningún cambio de presupuesto ni de values, no queda nada
(p entre 26 % y 66 %). De hecho **agosto 2025 fue el segundo mejor mes del año en calidad de leads**
(20 %, detrás de febrero con 33 %): sus tres leads serios llegaron el 13, 21 y 27 — justo después del
corte que la ventana había puesto. No hay temporada baja de leads serios.

### Descartado también: la calidad del clic no se degradó

Era la hipótesis que quedaba viva —CPC −22 % con el mismo tráfico diario podía significar búsquedas
menos comerciales— y **se midió el mismo día con `search_term_view`**. No se sostiene.

**El mix de términos no empeoró; si acaso mejoró.** Después del recorte aparecen búsquedas con
intención de compra explícita que antes no estaban: `mantenimiento de paginas web precios`,
`costos de pagina web`, `website price`, `desarrolladores web costa rica`, `creadores de paginas web`,
`paginas web para hoteles`. Lo que se fue era ruido: inglés genérico (`best web design 2026`,
`mini websites`, `booking page design`, `modern design websites`) y marcas de terceros (`cognits`,
`webstudios`, `beecommerce`, `pagepilo`). Once términos aparecen en ambas ventanas.

**La posición tampoco empeoró** — el clic no se abarató por caer en el ranking:

| ventana | impresiones en el tope | en el tope absoluto | cuota de impresiones |
|---|---:|---:|---:|
| A · 1 may–30 jun (15/día) | 78,6 % | 45,6 % | 34,7 % |
| B · 1–22 jul (15/día) | 81,4 % | 62,4 % | 38,9 % |
| C · 23 jul–12 ago (10/día) | **82,5 %** | 48,8 % | 35,9 % |

**Cobertura del análisis**: Google oculta términos de bajo volumen, así que `search_term_view` explica
142 de 268 clics en A, 51 de 93 en B y 43 de 82 en C — **~53 % en las tres**. Es parcial, pero la
cobertura es pareja entre ventanas, así que la comparación vale.

### Lo que queda abierto

Descartados el volumen de tráfico, la estacionalidad y ahora la calidad del clic, **el problema no
parece estar en Google Ads**: llega la misma cantidad de gente, buscando lo mismo, desde la misma
posición. Lo que queda:

- **El comportamiento en el sitio**, que ninguna de estas fuentes ve. Los leads serios de esta
  campaña eran sobre todo clics de *copiar correo* (value 25 pre-×2), y el último identificable es
  del **10 de julio**; el del 14 de julio ya es un 24,00 (agendar o formulario). Se verificó que el
  código no explica nada: `ads.service.ts` no se tocó entre el 28 de junio y el 23 de julio,
  `emailCopy()` sigue conectado en `contact-footer.component.ts` y `contact-page.ts`, y la modulación
  tiene piso 0,7 y techo en el base (un copiar correo post-×2 nunca baja de 35, muy por encima del
  umbral de 21 con que se clasifica). El único cambio funcional del sitio dentro de la ventana C es
  Angular 22 (6 ago), posterior a los primeros seis contactos sin lead serio: no explica el inicio.
- **El azar.** Con 11 contactos en la ventana no se distingue una muestra desafortunada de un cambio
  real. Ninguna conclusión de esta sección aguanta sola.
- **El 23 de julio cambiaron el presupuesto y los values a la vez.** Con estos datos son
  inseparables.

Queda anotado, sin más evidencia que la temporal, que **el sospechoso con mejor correlación sigue
siendo el botón de WhatsApp fijo del 1 de julio** (`d484f10`) — es el único cambio del período que
altera qué canal elige el visitante, y ahora es el último en pie tras descartar los demás. El
contraargumento de la entrada anterior sigue valiendo: Nolõ recibió el mismo cambio el mismo día y
siguió recibiendo formularios.

### El criterio para volver a mirar (≈ 3 sep 2026)

Con dos o tres semanas de acciones separadas ya no hará falta inferir el canal por el value unitario:

- **Leads serios ≥ 4 por cada 100 clics** (el nivel de feb–jun) → subir a 15 tiene sentido: costaría
  ~60 USD por lead serio adicional, dentro del rango histórico sano.
- **0–1 por cada 100 clics con visitas normales** → el problema no es el presupuesto ni la fuente del
  tráfico (ambos ya descartados) sino **el sitio**: ahí la palanca es la jerarquía de contacto de
  `/web` —WhatsApp y copiar correo aparecen antes del formulario, que pide cinco campos— y no el
  presupuesto. Subir a 15/día sería un experimento, no una corrección.
- **Pérdida por presupuesto > 35 %** (hoy 20 %) → recién ahí hay demanda represada de verdad.

Si los leads serios reaparecen con el presupuesto en 10, la hipótesis del recorte muere sola y gratis.

### Nota al margen: acá el dinero no compra leads serios

La consulta era sobre Costa Rica, y el contraste que apareció es lo que la responde: **la correlación
entre gasto semanal y leads serios en "Búsqueda" (CR) es −0,42**, mientras que en el otro mercado es
**+0,78**. Los dos responden al dinero al revés — allá subir el presupuesto se justificaba con
evidencia, y acá esa misma evidencia dice que no.

Es el argumento más fuerte contra la hipótesis del recorte al revés: el problema de "Búsqueda" no es
que le falte presupuesto. Lo que se ejecutó con las campañas del otro mercado está en
`docs/bitacora-ads.md` del repo `Nolo/WEB`.

### Las dos correcciones a la entrada anterior

Ambas anotadas también arriba, junto a las tablas afectadas.

**(1) La partición WhatsApp / leads serios estaba mal en mayo y junio.** Los valores crudos de la
acción `Contacto` no dejan lugar a duda —5,00 aparece 224 veces (WhatsApp), 25,00 aparece 47 (copiar
correo), 30,00 siete veces— y el error estaba en repartir las celdas *(día, hora)* con más de una
conversión: una celda de 2 conversiones y valor 30 es un WhatsApp más un correo, no dos leads serios.
Resuelto con cotas exactas: con `w` WhatsApps de valor `wa` y `s` serios en el rango `[lo, hi]`,
`s ≥ (v − wa·c) / (hi − wa)` y `s ≤ (v − wa·c) / (lo − wa)`.

| | serios según la entrada anterior | serios reales |
|---|---:|---:|
| mayo ("Búsqueda") | 10,00 | **6** |
| junio ("Búsqueda") | 9,00 | **6** |
| julio 1–22 ("Búsqueda") | 4,00 | 4 ✓ |
| 24 jul–12 ago ("Búsqueda") | 0,00 | 0 ✓ |

La conclusión de fondo **no cambia** —hay deterioro y la ventana final sigue en cero—, pero el nivel
de leads serios siempre fue más bajo de lo reportado: el costo por lead serio de Costa Rica se
multiplicó por **5,2**, no por 7,4.

Y hay una consecuencia que **empeora** el cuadro en vez de suavizarlo, así que conviene no pasarla
por alto: el declive gradual que la entrada anterior describía (7,6 % → 6,6 % → 4,3 % → 0 % de leads
serios por clic) **no existió**. La serie real es **4,6 % → 4,4 % → 4,3 % → 0 %**: tres meses de
meseta y un corte seco. El deterioro no venía anunciado desde mayo — empezó de golpe, y empezó cerca
del 23 de julio. Es el argumento más fuerte que tiene la hipótesis del recorte, y es justo el que
apareció al corregir el error.

**(2) El "0,3 %" exageraba.** Se calculó contra la tasa base de 2026 (34 %), que fue el mejor año de
la campaña. Con los dos años juntos (22 %) la racha de 13 contactos da **~4 %**, y con la tasa de
2025 (16 %) da 11 %. Sigue siendo improbable; deja de ser extraordinario. La lección es general y
aplica a cualquier cuenta: **antes de declarar que algo se rompió, comprobar contra qué tasa base se
está midiendo y si esa base es representativa o una racha buena.**

### Trampa metodológica, para no repetirla

Las dos correcciones y el hueco descartado comparten origen: conclusiones sacadas de una ventana
elegida después de ver los datos, o de una partición cuyo caso ambiguo nunca se miró de cerca. El
antídoto que funcionó acá fue barato — mover los bordes de la ventana y repetir la prueba en un año
de control — y debería correrse **siempre** que un patrón aparezca justo donde se lo estaba buscando.

## 13 ago 2026 (segunda sesión, cont.) — "Software": la amplia se queda, y el presupuesto también

Dos preguntas sobre la campaña "Software" (Costa Rica), a raíz de un costo que se siente a diario:
desde que la keyword volvió a concordancia amplia el 23 de julio, el informe de términos se llena de
nombres de empresas y de productos de software, que hay que ir negativizando todos los días.
¿Conviene volver a frase? ¿Y tocar los 15/día?

**Ninguna de las dos. Se dejó la campaña como estaba.**

### El experimento ya se hizo, y ahora se puede aislar

La frase corrió del 15 de junio al 22 de julio, y lo hizo en **dos tramos con presupuestos
distintos**. Eso permite separar lo que la entrada del 23 jul había dejado confundido:

| régimen de la keyword | presupuesto | clics | **CPC** | costo |
|---|---|---:|---:|---:|
| Amplia (1 feb – 14 jun) | 15/día | 516 | **2,65** | 1 365,69 |
| Frase (15 – 29 jun) | 15/día | 35 | **6,13** | 214,52 |
| Frase (30 jun – 22 jul) | 5,60/día | 27 | **6,77** | 182,90 |
| Amplia (23 jul – 12 ago) | 15/día | 73 | **4,13** | 301,59 |

**El CPC de la frase fue igual de alto con el presupuesto entero que con el recortado.** La causa era
la concordancia, no el recorte — lo que valida la Fase 1b del 23 jul, aunque por una razón distinta
de la que se anotó entonces. Volver a frase duplicaría el CPC otra vez.

El desenlace apunta igual, con la reserva de que las muestras son mínimas (2 leads serios en cada
régimen nuevo): **57 USD por lead serio** en la amplia vieja, **199** en la frase, **151** en la
amplia actual. Lo robusto acá es el CPC, que se mide sobre cientos de clics; el USD/serio, no.

### El ruido es real y está bien medido, pero cuesta menos que la cura

Gasto en términos que no contienen **ninguna** palabra del rubro (software, desarrollo, empresa,
sistema, aplicación, ERP, consultora…):

| régimen | términos así | % del gasto |
|---|---:|---:|
| Amplia vieja | 83 | **35,3 %** |
| Frase | 2 | **6,9 %** |
| Amplia actual | 9 | **18,3 %** |

Las negativas acumuladas ya cortaron el ruido a la mitad respecto de la era amplia anterior. Contando
sólo las marcas inequívocas de la ventana actual —`customertimes`, `scalable systems`, `kinamic`,
`navisite costa rica`, `4waystech`, `belltech`, `netweb`— son 23,70 USD en 21 días: **~60 USD/mes**
proyectados sobre el tope de 456.

El costo de eliminarlo, con esos mismos 456 USD/mes:

- **Amplia** (CPC 4,13): 110 clics, menos 13 % de ruido → **96 clics útiles**
- **Frase** (CPC 6,41): 71 clics, menos 7 % de ruido → **66 clics útiles**

Pasar a frase ahorra 60 USD/mes de ruido y cuesta 39 clics/mes, que al CPC de la amplia valen
~161 USD. **El remedio cuesta unas 2,7 veces la enfermedad.**

**Lo que ningún número de Ads muestra es el tiempo**, y es el costo que de verdad se siente: la
amplia genera **~12 términos nuevos por día** para revisar contra ~2 de la frase (245 términos con
impresión en 21 días de amplia; 82 en 38 días de frase). Si ese trabajo llegara a pesar más que los
~100 USD/mes de diferencia, cambiar sería legítimo — pero es una decisión sobre el tiempo propio, no
sobre el rendimiento de la campaña, y conviene tomarla sabiendo cuál de las dos cosas se está
comprando.

### El presupuesto: "Software" es el caso inverso a "Búsqueda"

Acá el cuello de botella **sí es la plata**: la campaña gasta todo lo que se le da (15,08/día
calendario en agosto contra un tope de 15) y pierde **47,6 %** de las impresiones por presupuesto
contra sólo **20,3 %** por ranking. Es exactamente al revés que en "Búsqueda" (20,2 % vs 43,4 %).

Aun así se deja en 15, por tres razones:

1. **La keyword se recreó el 23 de julio** — el cambio de concordancia es un borrar-y-crear interno,
   así que QS e historial arrancaron de cero. Sigue en **QS 3**, y el CPC de la amplia nueva (4,13)
   todavía no bajó al de la amplia vieja (2,65). Si va a bajar, subir ahora es pagar el aprendizaje
   al precio caro.
2. **Entrega 151 USD por lead serio contra 57 de su propio histórico**: poner más dinero en algo que
   rinde 2,6× peor amplifica la pérdida.
3. **El gate del 23 jul sigue sin cumplirse**: pedía pérdida por presupuesto >35 % **y** ratio ≥1,2.
   Lo primero se cumple (47,6 %), lo segundo no (0,42 — y ese 0,42 ya viene inflado por el ×2 de
   values, así que en la escala vieja es ~0,21).

Bajarlo tampoco: cortaría el re-aprendizaje en curso.

### El criterio para volver a mirar (≈ 3 sep 2026, junto con "Búsqueda")

Cuando la amplia tenga seis semanas de rodaje:

- **CPC ≤ 3** → el QS se está recuperando y subir a 20/día tiene sentido, porque la demanda represada
  es real (47 % de impresiones perdidas por presupuesto).
- **CPC 4+ con QS todavía en 3** → el problema es la calidad de la keyword y la palanca es la página
  de destino, no el presupuesto. Es el mismo `landing page = BELOW_AVERAGE` que arrastran las cuatro.

### Hallazgos laterales sobre las negativas

Se revisaron de paso; **no requieren acción** y la decisión de dejarlas como están es del usuario.
Quedan anotados para no volver a investigarlos:

- **18 946 negativas activas a nivel de grupo** en la cuenta (17 833 amplias, 729 de frase, 384
  exactas). Las de los últimos 30 días se aplican correctamente y en paralelo a los cuatro grupos
  activos (237 · 235 · 235 · 235), así que **el trabajo diario no se está desperdiciando**. El límite
  de Google es de 10 000 negativas por campaña; al ritmo actual (~235/mes por campaña) hay margen de
  años, pero conviene saber que existe.
- Las 1 551 negativas que cuelgan de `Software / Grupo de anuncios 1` **no filtran nada** — ese grupo
  está ELIMINADO. Son históricas, no trabajo reciente.
- En el grupo activo `Software / Software` hay negativas **amplias de una sola palabra**: `costo`,
  `consultoria`, `crear`, `hacer`, `como`, `programa`, `algo`. Una negativa amplia de una palabra
  bloquea toda búsqueda que la contenga, así que `costo` alcanza a "costo de desarrollo de software"
  y `consultoria` a "consultoría de software". Anotado sin recomendación.

## 14 ago 2026 — Las cuatro campañas anunciaban webs, y la página de destino no dice lo que se busca

El origen es argentino: revisando por qué el clic de "Software #2" (Nolõ) está caro aparecieron dos
cosas que **no son de Nolõ sino de esta cuenta entera**, y que afectan igual a Costa Rica. El detalle
del análisis argentino está en `docs/bitacora-ads.md` del repo `nolo-simple`; acá va sólo lo de acá.

### Las extensiones de las cuatro campañas eran de sitios web

Los cinco textos destacados y el fragmento estructurado no eran copias parecidas: eran **los mismos
assets**, compartidos por las cuatro campañas — IDs `183496529445`, `183496529448`, `183496529451`,
`183496529454`, `196282085212` y `183496613409`. O sea que **"Software" venía anunciando**
*«Expertos en servicios web»*, *«Sitios web inigualables»*, *«Últimas tecnologías web»*,
*«Presencia digital»* y *«Servicios: Desarrollo de sitios web, Actualización digital…»* a gente que
busca software empresarial.

Se descubrió al ir a copiar de "Software" (CR) unas extensiones propias de software para Nolõ: no
había nada que copiar, el error era el mismo en los dos mercados.

Ejecutado sobre **"Software" (CR)** el 14 ago, por API, con `validate_only` previo y verificación
posterior contra el servidor:

| | |
|---|---|
| **Se quitó** | los 5 textos destacados de web · el fragmento «Servicios: Desarrollo de sitios web…» |
| **Se agregó** | 5 textos destacados de software · fragmentos «Tipos» y «Servicios» propios |

Los assets son **sustantivos genéricos, sin país ni voseo**, así que se comparten a nivel de cuenta y
sirven en los dos mercados: se crearon una vez y se asociaron donde hacían falta. **"Búsqueda" no se
tocó** — ahí los textos de web son los correctos. Estado final de las dos de acá:

| campaña | textos destacados | fragmentos |
|---|---|---|
| Búsqueda | los 5 de web | **Servicios**: Desarrollo de sitios web, Actualización digital, Asesoría tecnológica, Desarrollo sin plantillas |
| **Software** | Software a medida · CRM, ERP e inventario · Integraciones y APIs · Sistemas internos · Código propio | **Servicios**: Desarrollo a medida, Aplicaciones internas, Automatización con IA, Integración de sistemas, Software de gestión, Desarrollo backend · **Tipos**: CRM, ERP, Inventario, E-commerce, Ticketing, Reservas |

Los **sitelinks no se tocaron**: ya eran propios de software y correctos («Sistemas a medida»,
«Proceso de trabajo», «Casos y demos», «Desarrollo Corporativo», «Hable con un Ingeniero»).

> **Por qué se le agregaron los de software y no se lo dejó pelado.** Quitar los de web dejaba a
> "Software" (CR) **sin ningún texto destacado**, que es peor que tenerlos equivocados. Fue criterio
> propio dentro de la orden de limpieza; se revierte quitando la asociación, que no borra el asset.

Cada valor del fragmento «Servicios» está respaldado por la página `/software`, que es idéntica en
los dos sitios — el criterio fue no listar servicios que no se prestan. Se descartó
«Dashboards y reporting» justamente por eso: **está comentado en `app.routes.ts`** desde el
15 jun 2026 y no se muestra.

### El criterio del 3 sep decía «la palanca es la página de destino». Acá está, medido

La entrada anterior anticipaba que si el CPC de "Software" seguía en 4+ con QS 3, el problema sería
la landing y no el presupuesto. Esto lo vuelve concreto. Se descargó `linkdesign.cr/software` y se
contaron apariciones en el texto real (1.511 palabras):

| frase | apariciones |
|---|---:|
| «empresa de desarrollo de software» — **la keyword de "Software"** | **0** |
| «desarrollo de software» | **0** |
| «empresa de software» | **0** |
| «software a medida» | 2 |

El `h1` dice *«Software construido alrededor de tu operación.»* y el `title`, *«Software a medida para
empresas | Link Design CR»*. **Alguien busca «empresa de desarrollo de software», hace clic, y
aterriza en una página que nunca usa esa expresión.**

Y el patrón es total: **`linkdesign.cr/web` no contiene «desarrollo de sitios web»** (0 apariciones),
que es la keyword de "Búsqueda".

Esto explica de forma directa el `landing page = BELOW_AVERAGE` que arrastran las cuatro campañas, y
que es **la única de las tres dimensiones que está floja**:

| campaña | keyword | concordancia | QS | CTR esperado | anuncio | página destino |
|---|---|---|---:|---|---|---|
| Búsqueda #2 (AR) | desarrollo de sitios web | frase | 7 | Por encima | Por encima | **Por debajo** |
| **Búsqueda (CR)** | desarrollo de sitios web | amplia | 5 | Promedio | Por encima | **Por debajo** |
| Software #2 (AR) | empresa de desarrollo de software | frase | 5 | Promedio | Por encima | **Por debajo** |
| **Software (CR)** | empresa de desarrollo de software | amplia | 3 | Por debajo | Por encima | **Por debajo** |

No es *keyword stuffing* lo que falta: es que el texto habla en el idioma del estudio
(«construido alrededor de tu operación») y no en el del cliente («empresa de desarrollo de
software»). **Pendiente de decisión**: reescribir la apertura de `/software` —`h1`, `title` y los
primeros párrafos— para que use el lenguaje de la búsqueda. Es lo único que toca la nota floja de las
cuatro campañas a la vez, y hay que decidir si se hace en los dos sitios o sólo en uno.

> **Sobre la velocidad — corrección del mismo día.** Primero se anotó que `/software` pesaba «361 KB
> y no parece ser el problema». **Estaba mal**: ese script sólo seguía `<script src>` y
> `<link rel=stylesheet>`, no los medios. Contando lo que el HTML referencia,
> `linkdesign.cr/software` arrastra **16,8 MB en 9 vídeos** y `linkdesign.cr/web`, **37,9 MB en 18**.
>
> **El diagnóstico del 13 ago ya lo tenía bien medido** (artefacto «Por qué Google baja la nota»,
> con carga real de navegador): **27,3 MB y 72 peticiones en `linkdesign.cr/web`**, de los cuales
> 18,5 MB son vídeos del portafolio que se precargan siempre —`preloadVideos()` en
> `portfolio-table.component.ts:652` inyecta un `<link rel="prefetch">` por proyecto— y 6,5 MB los
> del encabezado. Referenciado no es descargado, así que las cifras de acá son un techo y aquéllas
> el consumo real. **Vale la conclusión de aquel documento: el peso es un agravante real pero no la
> causa raíz** — la nota ya estaba baja cuando la página era liviana.

### Dos datos laterales de "Software" (CR), anotados sin acción

- **El móvil no está roto acá.** 1 jun – 13 ago: escritorio CTR 8,70 % con CPC 5,62; móvil CTR 8,30 %
  con CPC **3,42**. El móvil es más barato y convierte a clic casi igual. En "Software #2" pasa lo
  contrario y con fuerza (5,71 % contra 3,32 %), así que no es un problema de la plantilla compartida.
- **Ventana comparable 24 jul – 13 ago**, para tener las cuatro lado a lado: Búsqueda 214,30 USD ·
  CPC 2,68 · ratio 0,61 || Software 328,79 · CPC 4,22 · ratio 0,40 || Software #2 307,28 · CPC 4,27 ·
  ratio 0,70 || Búsqueda #2 288,87 · CPC 1,90 · ratio **1,35**.

### Trampa de consulta que produjo un falso positivo

Una consulta de `campaign_asset` reportó **dos nombres de negocio activos** en una campaña donde sólo
había uno. **Era falso**, y el motivo es de la cuenta entera: arrastra campañas **REMOVED** que
conservan sus assets, y la consulta filtraba por `campaign_asset.status` pero **no por
`campaign.status`**.

Regla para la próxima, y vale para cualquier consulta de `campaign_asset` acá: **filtrar por los dos
estados**, el de la asociación y el de la campaña. Verificado con el filtro puesto, las campañas
activas de Costa Rica firman correcto con `Link Design`.

### Una corrección de método que vale para las dos cuentas

Las decisiones geográficas y de segmentación **no se pueden tomar con el ratio valor/costo**: los
scrolls son la enorme mayoría de las conversiones y valen 1 punto cada uno, así que dominan el ratio
y aplastan la señal de los contactos. En Nolõ esto invirtió la lectura de un bloque entero (detalle
en la bitácora de `nolo-simple`). **Para ese tipo de decisión hay que contar contactos por clic**, y
mirar aparte cuántos de esos contactos son leads serios.

### Qué cubre de verdad cada keyword — y por qué NO se tocan

Vino de una propuesta equivocada que conviene dejar escrita para no repetirla. Mirando el Keyword
Planner se armó una tabla que decía que las campañas pujaban «por la palabra menos buscada de su
familia»: `desarrollo de sitios web` tiene **10 búsquedas/mes en Costa Rica** contra **880** de
`paginas web` y **590** de `sitios web`. La conclusión aparente era cambiar las keywords.

**Robert la objetó y tenía razón.** Sus dos argumentos —que las genéricas traerían basura, y que la
amplia ya debería estar cubriéndolas— se confirmaron los dos.

> **La regla, para no volver a caer**: el volumen del Keyword Planner mide búsquedas **exactas** de
> esa cadena. En amplia el texto de la keyword es apenas una semilla, no un límite. **Comparar
> volúmenes nominales de keywords que no corren en concordancia exacta no significa nada sobre el
> alcance real.**

**1 · La amplia ya abarca esas búsquedas, y de forma dominante.** Repartiendo todos los términos de
2026 por familia (1 ene – 13 ago):

| Búsqueda (CR) · amplia `desarrollo de sitios web` | % impresiones | % gasto |
|---|---:|---:|
| **páginas web** | 23,3 % | **44,7 %** |
| diseño web | 21,9 % | 22,9 % |
| desarrollo web | 14,1 % | 20,3 % |
| landing page | 7,5 % | 1,5 % |
| sitios web | 4,2 % | 4,8 % |
| e-commerce / tienda | 3,5 % | 2,7 % |
| *la keyword literal* | *0,1 %* | *0,9 %* |
| fuera de toda familia | 34,7 % | 20,0 % |

| Software (CR) · amplia `empresa de desarrollo de software` | % impresiones | % gasto |
|---|---:|---:|
| empresa(s) de software | 7,4 % | **25,0 %** |
| desarrollo de software | 6,1 % | 21,1 % |
| **empresa tecnológica / informática / TI** | 13,9 % | **18,1 %** |
| ERP / CRM / sistemas | 14,1 % | 7,2 % |
| apps / aplicaciones | 2,9 % | 3,5 % |
| *la keyword literal* | *0,2 %* | *0,5 %* |
| fuera de toda familia | 59,2 % | **39,6 %** |

**La keyword literal genera el 0,1 % de las impresiones de "Búsqueda".** Agregar `paginas web` sería
agregar algo que ya llega —y que ya se lleva el 44,7 % del gasto—, compitiendo contra sí misma.

**2 · Y las genéricas sí traerían basura.** El gasto fuera de cualquier familia relevante, en las
cuatro campañas de la cuenta:

| campaña | concordancia | gasto fuera de familia |
|---|---|---:|
| Búsqueda #2 (AR) | frase | 4,6 % |
| **Búsqueda (CR)** | **amplia** | **20,0 %** |
| Software #2 (AR) | frase | 20,9 % |
| **Software (CR)** | **amplia** | **39,6 %** |

En "Software" **cuatro de cada diez dólares** se van a términos fuera de familia — `scalable systems`,
`ti recursos`, `navisite costa rica`, `drago's house`. Coincide en orden de magnitud con el 35,3 % que
midió la entrada del 13 ago con otro criterio, y **abrir más la concordancia lo agravaría**.

> **Acá esto no cambia nada, y conviene dejar escrito por qué.** El 13 ago ya se midió que volver a
> concordancia de frase en "Software" cuesta 2,7 veces más de lo que ahorra. La medición de ruido por
> tipo de concordancia llega, por una vía independiente, a la misma conclusión de aquel día.

**Lo que sí cambia: el insumo para reescribir el copy.** La lista de frases no debe salir del Keyword
Planner sino de **lo que la gente escribió y por lo que ya se pagó**. Así el argumento del apartado
anterior se vuelve mucho más filoso:

> `linkdesign.cr/web` está escrita en el vocabulario de **«sitios web», que es el 4,8 % del gasto**.
> El **44,7 %** se va en gente que escribió «páginas web» — palabra que la página no dice nunca.

Orden real por gasto, para cuando se escriba el copy:

- **`/web`**: páginas web (44,7 %) › diseño web (22,9 %) › desarrollo web (20,3 %) › sitios web (4,8 %)
- **`/software`**: empresas de software (25,0 %) › desarrollo de software (21,1 %) ›
  **empresa tecnológica / de informática / de TI (18,1 %)** › ERP-CRM-sistemas (7,2 %)

Esa tercera familia de `/software` **es propia de Costa Rica**: en Argentina casi no aparece. Los dos
mercados piden copy distinto, y allá además «diseño web» le gana a «páginas web», al revés que acá.

**Cuota de impresiones** (1 jun – 13 ago, ponderada por impresiones), que ubica el cuello de botella
de cada una:

| campaña | cuota | perdida por presupuesto | perdida por ranking |
|---|---:|---:|---:|
| Búsqueda (CR) | 36,6 % | 27,1 % | **36,3 %** |
| Software (CR) | 32,2 % | 36,7 % | 31,1 % |
| Búsqueda #2 (AR) | 45,3 % | 37,4 % | 17,3 % |
| Software #2 (AR) | 58,5 % | 32,3 % | 9,2 % |

**"Búsqueda" es la que más impresiones pierde por ranking de las cuatro (36,3 %)**, y eso no se
arregla con keywords nuevas: es calidad. Otra vez la página de destino.

## 14 ago 2026 (cierre del día) — Qué palabra va en qué lugar de `/web`

El apartado anterior dejó el orden por gasto anotado «para cuando se escriba el copy». Esto lo
cierra: se midió **el otro lado** —cuántas veces dice la página cada una de esas palabras— y se
comparó con Nolõ para decidir si hacían falta dos documentos. **No hacen falta.**

Salió de una pregunta de Robert sobre el artefacto del 13 ago: si la lista de frases que citaba
alcanzaba para empezar y si estaba priorizada. **No y no** — eran cuatro frases sueltas que suman el
**14,6 % del gasto**, en un orden que no era el de importancia (la #1 estaba segunda, y las dos
últimas eran la #11 y la #12). La cola es larguísima: 504 frases distintas con gasto y hacen falta 23
para cubrir la mitad. **Una lista de frases literales nunca iba a ser el insumo correcto**; lo son
las familias.

### El reparto del gasto contra lo que la página dice

Campaña "Búsqueda", todos los términos del 1 ene 2025 al 13 ago 2026 —3.659 USD y 1.283 clics—
repartidos en familias **excluyentes**, contra el texto visible que devuelve hoy `linkdesign.cr/web`
(1.661 palabras):

| cómo llama la gente a lo que busca | % gasto | % clics | veces en la página |
|---|---:|---:|---:|
| **páginas web** | **48,2 %** | **41,9 %** | **0** |
| desarrollo web | 15,2 % | 12,8 % | **0** |
| diseño web | 13,4 % | 13,7 % | **0** |
| sitios web — *lo único que la página dice* | 3,3 % | 4,1 % | 4 |

**El 77 % del gasto no tiene una sola aparición literal en el cuerpo.** Los verbos sí están
—«desarrollamos» y «diseñamos», una vez cada uno— pero no la frase, que es lo que Google compara. Y
el `title` sí dice «Desarrollo web a medida | Link Design Costa Rica»: está bien, pero Google lo lee
para el anuncio, no para juzgar la página.

Los acompañantes, mismo método:

| | % gasto | veces en la página |
|---|---:|---:|
| «Costa Rica» | 42,7 % | 1, en la dirección del pie |
| creación / creadores / crear | 10,7 % | 0 |
| empresa(s) | 7,4 % | **20** ✔ |
| agencia | 2,6 % | 0 — y está bien así |

> **No todo lo que falta hay que agregarlo.** «Agencia» no aparece nunca y casi nadie la busca acá;
> «e-commerce» y «landing page» están 7 y 2 veces valiendo 1,3 % y 1,6 %, pero son servicios reales y
> ordenan la página. Se dejan.

### Nota de método: por qué estos números no son los del apartado anterior

**Las dos tablas son correctas y miden cosas distintas.** La de arriba, en este mismo día, es
**solapada**: un término como «diseño de páginas web» cuenta en «páginas web» *y* en «diseño web», y
por eso aquellos porcentajes suman 118 %. La de acá es **excluyente**: cada término cae en una sola
familia y suma 100 %.

Verificado corriendo las dos sobre la misma ventana (1 ene – 13 ago 2026, "Búsqueda"):

| | páginas web | diseño web | desarrollo web | sitios web |
|---|---:|---:|---:|---:|
| solapada — *reproduce exactamente el apartado anterior* | 44,7 % | 22,9 % | 20,3 % | 4,8 % |
| excluyente | 44,7 % | 12,1 % | 15,9 % | 3,5 % |

Cuál usar depende de la pregunta. **Para decidir qué palabras tiene que contener la página, la
solapada** — dice qué proporción del dinero viene de alguien que escribió esa palabra. **Para
priorizar el titular, la excluyente** — dice cómo se reparte el dinero entre intenciones distintas.
Ninguna conclusión de esta entrada cambia según cuál se elija; se verificaron con las dos.

### Los seis lugares donde entra, sin reescribir la página

| dónde | qué dice hoy | qué familia entra |
|---|---|---|
| `h1` | «Sitios web hechos en serio.» | **páginas web** + **Costa Rica** |
| bajada del `h1` | «Sin plantillas, sin atajos, sin constructores genéricos.» | diseño y desarrollo |
| los cinco `h2` | «Lo que hay detrás de cada sitio.» · «Así trabajamos un proyecto.» · … | que **dos de los cinco** los nombren |
| preguntas frecuentes | «¿Cuánto tiempo tarda un sitio web?» | página web — una palabra |
| formulario | opciones «software a medida / sitio web / e-commerce» | página web — una palabra |
| `/en/web` | «Real websites. Real code.» | **web design** |
| `title` | «Desarrollo web a medida \| Link Design Costa Rica» | ✔ ya está bien, no tocar |

**Dosificación**: una vez en un encabezado y una en el cuerpo por familia. La página tiene 1.661
palabras y no necesita más; repetir de más es el error contrario y se castiga igual.

**Por qué el inglés está en la lista.** Search Console, Costa Rica, 16 meses: de las 20 consultas más
vistas sin marca, **7 son en inglés** —«web design costa rica», «website design costa rica»— y suman
~1.000 impresiones con **cero clics**, en posiciones 20 a 55. `/en/web` no dice «web design» ni una
vez. Es demanda que ya nos ve.

### Un solo documento para los dos sitios

`nolo.ar/web` se midió igual y el mismo día. Es **el mismo texto** —mismo `h1`, los mismos cinco
`h2`, los mismos conteos exactos— y da **el mismo diagnóstico**. Lo que cambia es el peso de tres
palabras, y eso se resuelve con excepciones dentro de un documento, no con otro análisis.

**Decisión: un solo documento para los dos sitios**, alineado con el criterio de que se distingan
**sólo cuando haga falta**. El artefacto «Por qué Google baja la nota» quedó con un bloque propio
para las excepciones. Las cifras argentinas que sostienen esa comparación —y la advertencia de que
su ventana es más chica— están en la bitácora de Nolõ.

### Estado

- **Artefacto actualizado** (mismo enlace). Quedó reducido a diagnóstico puro, por decisión de
  Robert para ordenar las ideas: el histórico de 20 meses y las tres causas, con **todo el material
  de copy dentro de la primera causa** —la tabla de familias, los seis lugares y el bloque de Nolõ—.
  Se quitaron «Un error en los anuncios de Argentina» (ya corregido), «Qué pasó en marzo de 2025»,
  «Lo que está bien», «Por dónde empezaría» y **toda la comparación con el sitio viejo**
  (`LinkDesign2.0` / `/corporate`).
  > Lo que ya no vive en el documento y conviene no perder de vista: que arreglar el peso **por sí
  > solo probablemente no mueva la nota**, que Google **tarda dos o tres semanas** en recalcularla y
  > conviene no encimarla con el cambio de conversiones en curso, y que `/web` no tiene teléfono
  > escrito ni cédula jurídica. La prueba histórica que daba el sitio viejo —mismo patrón de copy,
  > misma nota, cuatro años antes— la cubre ahora, por otra vía, el sitio gemelo.
- ~~**Pendiente, sin cambios de código todavía**: escribir el copy.~~ **Hecho y publicado el mismo
  día**; ver la entrada siguiente.

## 14 ago 2026 (noche) — El copy nuevo y los videos, EN PRODUCCIÓN

Se publicó en `main` de los dos sitios (merge `9639876` acá, `af7eb8a` en `nolo-simple`) y el
workflow de Azure terminó en verde. Verificado en producción sobre las cuatro páginas.

### Qué se cambió, y con qué criterio

**La regla fue: cada texto conserva su idea; cambia el sustantivo por el que la gente escribe.** El
`h1` de `/web` pasó de *«Sitios web hechos en serio»* a *«Páginas web hechas en serio»* — mismo
mensaje, la palabra que se lleva el 48,2 % del gasto. Nada se reescribió de cero.

`/web` (español), medido sobre el HTML de producción:

| familia | antes | ahora | densidad |
|---|---:|---:|---:|
| páginas web | 4 | **13** | 0,75 % |
| sitios web | 1 | **14** | 0,81 % |
| diseño web | 1 | 6 | 0,35 % |
| desarrollo web | 2 | 6 | 0,35 % |
| «Costa Rica» | 2 | 5 | 0,29 % |
| **peso temático** | **0,48 %** | **2,26 %** | |

`/software` no se infló, se **rebalanceó**: ya estaba en 2,56 % —dentro del rango del mercado, porque
decía «sistema» 31 veces— pero hablaba de lo que poco se busca. Quedó en 2,99 %, con «desarrollo de
software» de 3 a 9 y el país de 3 a 8.

### El método, que es lo reutilizable

Tres insumos, y ninguno alcanza solo:

1. **El gasto por familia** (`search_term_view`) — qué escribe la gente por la que ya pagamos.
2. **La competencia que rankea** — cuánta densidad tolera y premia el nicho. Se bajaron seis landings
   de `/web` y seis de `/software` en Costa Rica, y siete y cuatro en Argentina, midiendo lo mismo.
   **Se excluyeron los blogs tipo «top 10 empresas»**: son listados, no páginas de venta, e inflan la
   referencia.
3. **El conteo sobre la página propia** — dónde estamos parados.

> **Referencia del mercado, para no volver a medirla.** `/web` Costa Rica: mediana 3,93 %, rango
> 1,75–4,91 %. `/web` Argentina: mediana 4,26 %, rango 1,94–9,40 %. `/software` Costa Rica: mediana
> 3,27 %. `/software` Argentina: mediana 2,54 %. **El objetivo fue el piso del rango, no la mediana**:
> nos saca del extremo donde estábamos sin comprometernos con una receta que puede ser correlación y
> no causa. La zona de penalización vive muy por encima — web.cr repite «diseño web» 58 veces y está
> primero.

**No se agregó contenido.** La página decía «sitio» a secas 30 veces y en la mayoría se completó la
palabra que ya estaba implícita. Ésa es la diferencia entre subir la densidad y hacer *keyword
stuffing*.

### Tres cosas que se aprendieron midiendo

- **«Software a medida» vale 0,0 % del gasto en Costa Rica y 14,8 % en Argentina.** La misma frase,
  valor opuesto según el mercado. La competencia costarricense sí la usa (0,67 % de mediana): es un
  caso donde el mercado y la búsqueda no coinciden, y **para la nota de Ads manda la búsqueda**.
- **El geo cambia por página, no sólo por país.** En `/web` argentino pesa 9,3 % y en `/software`
  argentino, 46,2 %. Por eso el titular de `nolo.ar/web` no nombra el país y el de `/software` sí.
- **«Empresa de tecnología / informática» es 19,1 % del gasto en Costa Rica y 0,0 % en Argentina.**
  Está sólo en `linkdesign.cr/software`.

### Los videos: el prefetch no hacía lo que prometía

Se reemplazó el `<link rel="prefetch">` de los 25 clips por **precarga por proximidad**: cada clip se
descarga cuando su fila está a ~1,5 pantallas, con un `IntersectionObserver` propio (`rootMargin:
150%`). El observer que reproduce no se tocó. Se observa **la fila y no el `<video>`**, porque en
desktop el video de la fila está oculto y un elemento sin caja nunca dispara el observer.

Medido con Chrome real y la red limitada por CDP, producción vieja contra el preview:

| | 4G móvil | desktop |
|---|---|---|
| sin bajar al portafolio, antes | 25,35 MB · 27 clips | 26,86 MB · 28 clips |
| sin bajar al portafolio, ahora | **9,71 MB · 3 clips** | **8,34 MB · 3 clips** |

Los tres que quedan son los del encabezado, verificado por URL. El portafolio está a **ocho
pantallas** del punto de entrada, así que la precarga no lo alcanza hasta que el visitante se acerca.

> **Lo contraintuitivo, y el motivo por el que el cambio también mejora la experiencia:** con el
> prefetch viejo los clips llegaban al centro de la pantalla **con `readyState` 0 — sin un byte
> cargado — en 5 de 5 casos**. Con la precarga por proximidad llegan en `readyState` 4, completos, en
> 5 de 5. El prefetch fallaba por tres razones juntas: `fetchpriority="low"`, esperaba a que cargaran
> **todos** los logos, y ponía 25 descargas a competir por las ~6 conexiones del navegador.
>
> **En 3G (1,6 Mbps) ninguna de las dos llega a tiempo** — 0 de 7 contra 0 de 5, con el poster
> cubriendo en ambas. Para que alcanzara habría que precargar con diez pantallas de anticipación, lo
> que anularía el ahorro. El camino ahí es recodificar los clips, que hoy pesan entre 1 y 2,9 MB.

### Cómo se revisó

Se desplegaron dos Static Web Apps Standard temporales con cada texto cambiado **resaltado en
amarillo** y el original al pasar el mouse, más un botón para apagar el resaltado y ver el sitio como
quedaría. La lista de cambios **se generaba del diff contra `main`**, no a mano. Robert aprobó el copy
entero; el script y las dos SWA ya se borraron.

### Cuándo se puede leer el resultado

Google recalcula la nota de página de destino con datos acumulados: **dos o tres semanas, o sea
alrededor del 4 de septiembre**, al lado de la revisión ya agendada del 3.

**La nota de página de destino se va a poder leer limpia**, porque es lo único que este cambio toca.
Lo que queda mezclado es el efecto en leads: ahí se superponen las conversiones separadas del 13 de
agosto, las extensiones del 14 y este copy.

## 14 ago 2026 (cierre) — Los videos están al límite, y los botones se arreglaron sin tocar el diseño

Dos cabos del diagnóstico del 13 ago, cerrados con medición.

### Recodificar los clips del portafolio: DESCARTADO, no hay margen

Robert lo analizó y los números lo confirman. Medido con `ffprobe` sobre los archivos en producción:

| clip | peso | resolución | bitrate |
|---|---:|---|---:|
| hesa-mobile / -web | 772 KB | 720×384 | **362 kbps** |
| imperio-mobile / -web | 957 KB | 720×386 | **309 kbps** |
| cefsa-mobile / -web | 701 KB | 720×384 | **356 kbps** |

A 310–360 kbps ya está muy comprimido: bajar más se ve. **El pendiente se cierra.**

> **Corrección de un dato que yo había dado mal.** Al decir que en 3G harían falta «diez pantallas de
> anticipación» usé un promedio de todos los `.mp4`, inflado por los del encabezado. **Los del
> portafolio pesan 700–960 KB**, o sea 3,5–4,8 s en 3G. Alcanzaría con subir el `rootMargin` de la
> precarga de 1,5 a **~3,5 pantallas** — un cambio de una línea, no un trabajo de medios. Sin hacer:
> el portafolio sigue a ocho pantallas del inicio, así que no afectaría a quien no baja.

### Dónde quedó el peso: el encabezado, no el portafolio

Son los únicos clips que se descargan siempre (6,4 MB), y **no tienen variante móvil**:

| | peso | resolución | bitrate |
|---|---:|---|---:|
| hero/hesa | 2.950 KB | 1280×682 | **1.392 kbps** |
| hero/faciosycanas | 2.031 KB | 1280×682 | 995 kbps |
| hero/aaec | 1.567 KB | 1280×682 | 817 kbps |

**No están mal comprimidos**: por bits/píxel tienen la misma calidad que los del portafolio. Su peso
viene de tener 2,8 veces más píxeles. Por eso bajarles el bitrate se vería, y bajarles la resolución
en móvil no debería:

- en un Pixel 7 (DPR 3) el video se pinta a **1068×666 físicos** y el archivo trae 1280 → sobra 20 %
- en un monitor de 1440 (DPR 1) se pinta a **689×430** → sobra 86 %
- **ya se recorta por CSS**: `object-fit: cover` con caja 1,6:1 sobre un video 1,88:1

> **El estándar que ya está aprobado**, y que hace pensar que una variante móvil se vería bien: los
> clips del portafolio son **720×384 y se pintan a 1074×572** en ese mismo teléfono —estirados un
> 49 %— y están aprobados. Un hero a 720–1024 se pinta al mismo tamaño en la misma pantalla.
> **Decisión pendiente de Robert**: pasaría de 6,4 MB a ~2,3 MB. Se propuso resolverlo mirando una
> comparación lado a lado, no por cálculo.

**Hallazgo lateral:** los archivos `-mobile` y `-web` del portafolio son **idénticos** —mismo tamaño
byte a byte, misma resolución, mismo bitrate— en los tres pares verificados. No cuesta rendimiento
(sólo se descarga uno), pero la variante móvil no está haciendo nada.

### Botones de menos de 44 px: 8 corregidos sin cambiar un píxel

De 27 elementos tocables por debajo de 44 px se corrigieron **sólo los que no se ven crecer**: los
que no tienen fondo ni borde propio y tienen hueco libre alrededor. La técnica es `padding` +
`margin` negativo del mismo valor, bajo `@media (pointer: coarse)`: el área táctil crece, el elemento
ocupa el mismo lugar y no hay fondo que delate el padding.

`.brand` (26→44) · `.ind-card__title-link` ×5 (25→45) · `.cf-copy` (26→44×44) · `.cf-legal__link`
(18→44). En producción los tocables chicos bajaron de 27 a **21** acá y a **20** en Nolõ.

> **Verificado píxel a píxel** contra producción, móvil 390×844, con videos y animaciones congelados:
> industrias **0** diferencias, pie **0**, encabezado **97 de 1.316.640 (0,007 %)** y esos 97 caen
> dentro del video del portafolio, que es contenido en movimiento.

**Queda fuera a propósito** todo lo que se vería: los 7 chips del formulario (27 px con fondo; llegar
a 44 los engorda un 63 %), el selector ES/EN, los 4 campos, el botón «Enviar mensaje» —le faltan 3 px
pero tiene fondo—, las pestañas de tipos de proyecto (comparten clase con la activa, que sí tiene
fondo) y hasta la **separación** entre chips, que bastaría con el `gap`.

> **La regla, y vale para lo que venga:** no hay autorización para cambiar el aspecto visual. Un
> arreglo de accesibilidad o de SEO que altere el diseño se propone y se espera; no se aplica.

### La revisión se mueve del 3 al 4 de septiembre, y qué mirar ese día

**Cambiada la fecha** —el evento del calendario ya está movido al 4 de septiembre, 9:00— para que
sean **tres semanas exactas** desde que el copy salió a producción, que es lo que la nota de página
de destino necesita para recalcularse.

**LÍNEA BASE del 14 ago 2026**, tomada el día del cambio y antes de que acumulara datos. Es contra
esto que hay que comparar:

| campaña | keyword | QS | página de destino |
|---|---|---|---|
| Búsqueda (CR) | desarrollo de sitios web | **5** | BELOW_AVERAGE |
| Software (CR) | empresa de desarrollo de software | **3** | BELOW_AVERAGE |
| Búsqueda #2 (AR) | desarrollo de sitios web | **7** | BELOW_AVERAGE |
| Software #2 (AR) | empresa de desarrollo de software | **5** | BELOW_AVERAGE |

**Cómo se consulta.** El valor vigente sale de `ad_group_criterion.quality_info.post_click_quality_score`
y se puede pedir **cualquier día**: no hay que esperar al cierre de mes. El histórico
(`metrics.historical_landing_page_quality_score`) admite `segments.week`, así que se puede seguir la
serie semana a semana.

> **Trampa de consulta, hermana de la que ya está anotada.** `keyword_view` devuelve también las ~225
> negativas y keywords `ENABLED` que viven en **grupos de anuncios REMOVED** — con QS 0 y
> `UNSPECIFIED`. Hay que filtrar por `ad_group_criterion.negative = FALSE` y mirar el estado del
> **grupo**, no sólo el de la campaña y el criterio. Verificado: cada campaña corre con **una sola**
> keyword activa.

**Cómo leerlo sin engañarse.** Esa nota es relativa y volátil —se calcula contra los otros
anunciantes— y con una keyword por campaña es una muestra de tamaño uno; el histórico saltó
7 → 8 → 5 → 2 → 5 con el sitio quieto.

- **Que una sola campaña pase a «promedio» no prueba nada.** La señal es que varias de las cuatro se
  muevan igual, o que una se sostenga varias semanas.
- **«Software» (CR) es la más lenta**: ~936 impresiones/mes contra 2.934 de «Búsqueda #2». Si el 4 de
  septiembre no se movió, todavía no significa nada — hay que volver a mirarla a mediados de mes.
- Ritmo actual, para calibrar la espera: Búsqueda 1.200 impresiones/mes · Software 936 ·
  Búsqueda #2 2.934 · Software #2 1.602.

**Y la advertencia de atribución, otra vez:** la nota de página se lee limpia porque el copy es lo
único que la toca. El efecto en **leads** no: ahí se superponen las conversiones separadas del 13, las
extensiones del 14 y el copy del 14.

## 17 ago 2026 — Las cuatro acciones nuevas miden bien, y además pujan

Cierra el **pendiente 3 del 13 de agosto**: verificar que las acciones separadas por canal registran,
porque un label mal copiado falla **en silencio** —la acción queda en cero para siempre y el informe
se ve normal—. Se verificó por tres vías, y la primera no depende de que haya volumen.

### La ventana real es de dos días hábiles, no de cuatro

El deploy fue el **13 ago a las 19:34** (`c6eb0ee`) y las campañas corren **L-V 8-17**. Todo el
tráfico pagado del 13 ocurrió con el código viejo, y el fin de semana están apagadas. Quedan
**viernes 14 y lunes 17**.

Eso explica el único dato que a primera vista parecía una falla: la acción vieja `Contacto` registró
**una conversión el 13 con valor 8,00** —un WhatsApp— cuando el sitio supuestamente ya no la
disparaba. Es anterior al deploy por seis horas. No hay nada que corregir.

> **Trampa de consulta, anotada para no repetirla.** `metrics.all_conversions` con `segments.date`
> se reporta por **fecha del clic**, no de la conversión. Para fechar un cambio hay que pedir
> `metrics.all_conversions_by_conversion_date`. Acá las dos lecturas coincidieron —el rezago sigue
> siendo de menos de un día, como el 13 ago—, pero la conclusión sobre *qué día empezó a registrar
> cada acción* no se puede sacar de la primera.

### Vía 1 — los labels de producción contra los del servidor: coinciden los cinco

Es la verificación que cierra el asunto, porque es determinista. Se bajó el bundle de producción
`linkdesign.cr/main-FPAXDKO5.js` y se comparó contra el `conversion_action.tag_snippets` que devuelve
la API para cada acción:

- **Los 5 labels nuevos coinciden byte a byte.**
- **El viejo ya no aparece en producción**: `qSMFCN2ek…` (Contacto) da cero coincidencias en el
  bundle. Dejó de acumular como se planeó, y sigue ENABLED conservando su histórico.

**El método es reutilizable y vale para cualquier cambio de etiquetas**: no hay que esperar a que
alguien convierta para saber si el label está bien. Bajar el bundle y cruzarlo con `tag_snippets`
responde la pregunta el mismo día.

### Vía 2 — una ya registró, y con el value correcto

| acción | primera conversión | campaña | value | comprobación |
|---|---|---|---:|---|
| Contacto Correo | 17 ago | Software | 45,00 | 50 × 0,90 ✔ |

Que llegue **modulado** prueba de paso algo que el pendiente no pedía: no sólo viaja el label,
también el `value` del evento. Si el value no llegara, se vería el `default_value` de 1,0 con que se
crearon. La misma comprobación se hizo el mismo día en el otro mercado, con dos acciones más, y está
en su bitácora.

### Las cinco en cero: no hubo oportunidad, y está medido

Con la tasa base de contactos por clic del período anterior (24 jul – 12 ago) aplicada a los clics
reales del 14 y el 17:

| campaña | clics 14+17 | contactos esperados | observados |
|---|---:|---:|---:|
| Búsqueda | 6 | 0,83 | 0 |
| Software | 7 | 0,28 | 1 |
| **total** | **13** | **1,11** | **1** |

Uno contra 1,1 esperados no es señal de nada: con trece clics no hay potencia para detectar nada, y
por eso la Vía 1 es la que cierra el asunto. (El otro mercado, que tuvo casi tres veces más tráfico
en la misma ventana, sí dejó un punto con algo de tensión; está anotado en su bitácora para el 4 de
septiembre.)

**Reunión y Formulario siguen sin una sola conversión**, que son justamente las de mayor value. No es
sorpresa —en Costa Rica no hay un formulario desde el **7 de julio**— pero
significaba que su corrección no estaba probada empíricamente, así que se probó en vivo (vía 4). Lo
que además se verificó en el código es que los métodos están cableados: `scheduleMeeting()` cuelga de
cuatro lugares (`contact-page`, `contact-footer`, `landing-page`, `web-hero`) y el formulario dispara
por un camino propio (`GA_CONVERSION.SEND_TO` en `lead-form.service.ts`), cuyo label también está en
el bundle.

> **Ojo con esa columna «Estado» de la interfaz.** Muestra **actividad reciente**, no configuración:
> una acción recién creada dice «Inactiva» hasta que le entra el primer evento, y cambia sola. El
> único `status` que existe es ENABLED/PAUSED/REMOVED —y las cuatro están ENABLED—; la API **no expone
> ningún estado de etiqueta** (se verificaron los 31 campos de `conversion_action`). Para Reunión y
> Formulario esa columna nunca va a servir de evidencia: pueden pasar meses en «Inactiva» sin que
> signifique nada, porque dependen de que alguien los use.

### Vía 3 — que registren no es que pujen, y eso nunca se había verificado

Es la mitad de la pregunta que faltaba, y era el otro modo de fallo silencioso: una acción puede
medir perfecto y quedar **fuera de Smart Bidding** si su categoría no coincide con el objetivo de la
campaña. Verificado contra el servidor, las **seis** acciones de acá caen dentro del objetivo
*biddable* de sus campañas:

| campañas | objetivo biddable | acciones | resultado |
|---|---|---|---|
| "Búsqueda" y "Software" | **CONTACT/WEBSITE**, y es el único | las 4 nuevas + Scroll + Contacto | **pujan** ✔ |

La decisión de categoría del 13 de agosto —CONTACT, replicando la de la acción que reemplazaba—
queda confirmada contra el servidor. Con `SUBMIT_LEAD_FORM` o `BOOK_APPOINTMENT`, que era lo
semánticamente correcto, las cuatro habrían quedado fuera de la puja.

> **⚠️ La misma verificación se hizo para el otro mercado y dio un falso OK**, descubierto el 18 ago
> 2026: ahí no manda la categoría sino un objetivo personalizado, y sus cuatro acciones nuevas no
> estaban dentro. **Lo de Costa Rica, que es lo que queda en esta tabla, sí era correcto.** El caso
> está en la bitácora de Nolõ; la trampa de método, en la entrada del 18 de agosto de acá.

### Vía 4 — probado en vivo sobre producción: WhatsApp y Reunión disparan

Las dos acciones de Costa Rica que seguían sin datos y sí dependen de un clic se probaron
directamente en `linkdesign.cr/web`, con un interceptor que impedía la navegación a WhatsApp y al
calendario y registraba lo que recibía `gtag`, sin tocar el código del sitio:

| clic | `send_to` que recibió gtag | value | comprobación |
|---|---|---:|---|
| botón de WhatsApp (topbar) | `AW-16767245191/PFEECM2UquEc…` | 8 | 10 × 0,8 ✔ |
| «Agendar reunión» (hero) | `AW-16767245191/WVgrCMuVquEc…` | 48 | 60 × 0,8 ✔ |

**Antes de disparar nada se comprobó que el navegador no tenía cookie `_gcl_aw` ni `_gcl_dc`** —sólo
`_gcl_au`, que no es un clic de anuncio—, así que las dos pruebas no se atribuyen a ninguna campaña.

> **Anotado para el 4 de septiembre, para no confundirlo con un lead:** si en la cuenta aparece un
> `Contacto WhatsApp` de value 8,00 y un `Contacto Reunión` de value 48,00 fechados el **17 ago** y
> sin campaña asociada, son estas pruebas. Lo esperable es que no aparezcan —sin `gclid` no hay clic
> al que atribuirlas— pero conviene tenerlo escrito.

**El formulario no se probó en vivo a propósito**: enviarlo crearía un web-lead real en el CRM y su
correo de aviso. Su label está verificado contra el servidor y su camino de código es el mismo
`gtag('event','conversion', …)` que acaba de funcionar con dos labels distintos en la misma página.

#### El 503 que aparece en la pestaña de red, y por qué no es un problema

Cada conversión dispara **cinco peticiones en paralelo**, y conviene saber cuál es la que cuenta:

| endpoint | qué es | resultado |
|---|---|---|
| `googleadservices.com/pagead/conversion/` | **el registro de la conversión** | **200** ✔ |
| `googleadservices.com/ccm/conversion/` | medición con consent mode | **200** ✔ |
| `googleads.g.doubleclick.net/…/viewthroughconversion/` | ping de conversión por visualización | **503** |
| `google.com` y `google.co.cr` `/1p-conversion/` | medición first-party | en curso |

El 503 es del camino de *view-through* (display), que además viaja con `ct_cookie_present=false`: no
hay cookie de clic que lo justifique. **No toca el registro.** Si ese 503 impidiera contar, no habría
ninguna conversión en la cuenta — y las hay todos los días.

### Hallazgo lateral: el formulario manda datos que la cuenta no está usando

`customer.conversion_tracking_setting.enhanced_conversions_for_leads_enabled` está en **False**,
mientras el sitio ya envía en cada envío de formulario `gtag('set', 'user_data', …)` con correo,
teléfono en E.164 y nombre (`lead-form.service.ts`). Ese dato viaja desde antes de este cambio.

**Con la precisión que corresponde**: ese flag es el de *Enhanced Conversions for Leads*, que es
justamente el camino que la entrada del 30 de julio dejó abierto para subir el desenlace comercial
con identificadores hasheados. El "mejorar conversiones" de la variante **web** se configura por
acción de conversión y **no es consultable por la API** —se comprobó: `conversion_action` no expone
ningún campo de enhanced conversions—, así que hay que mirarlo en la UI antes de concluir que el
`user_data` no sirve para nada hoy.

### Estado

**No se tocó nada** de la configuración. El pendiente 3 queda cerrado: de las cuatro acciones,
**tres están probadas de punta a punta** —Correo por una conversión real; WhatsApp y Reunión por la
prueba en vivo— y Formulario, por la coincidencia de labels contra el servidor. Los otros cuatro
pendientes del 13 de agosto siguen abiertos y su cita es el **4 de septiembre**.

Lo que falta ahora no es una verificación sino volumen: con dos días hábiles y un contacto no se
puede leer todavía el mix por canal, que es lo que este cambio se hizo para poder ver.

## 18 ago 2026 — Las «Configuración incorrecta» no son un problema

La pregunta era si esas acciones estaban rotas. No lo están: el estado es de **actividad, no de
configuración**, y el tooltip de la propia interfaz lo dice sin ambigüedad: *«No se registraron
conversiones en los últimos 7 días»* → **`Conversion has never received data`**.

Son siete acá, en dos familias:

- **Seis son basura heredada** de cuando la cuenta tuvo Campañas Inteligentes y perfil de empresa:
  `Calls from Smart Campaign Ads`, `Clicks to call`, `Smart campaign ad clicks to call`, `Smart
  campaign map clicks to call`, `Local actions - Directions`, `Smart campaign map directions`. **No
  han recibido un solo dato desde noviembre de 2024** y no lo van a recibir: no hay campañas
  inteligentes, ni extensión de llamada, ni perfil vinculado. Se pueden archivar cuando se quiera
  limpiar el panel — no urge, porque ni miden ni pujan nada.
- **`Contacto Formulario` todavía no tuvo oportunidad.** Su label está verificado byte a byte contra
  el bundle de producción (Vía 1 de ayer), y en Costa Rica no hay un formulario desde el **7 de
  julio**. El estado se corrige solo con el primer envío.

Refuerza lo anotado ayer: **esa columna nunca va a servir de evidencia** para las acciones que
dependen de que alguien las use.

**Costa Rica está bien y no se tocó nada de su configuración.** Sus cuatro acciones nuevas están
dentro del objetivo «Contacto», que es el que puja en "Búsqueda" y "Software", y las tres que ya
registraron lo hicieron con el value correcto.

### Lo que apareció verificando esto, y no es de este sitio

Salió un problema real en las **campañas argentinas**, que comparten esta cuenta: no pujaban por sus
acciones nuevas. Se corrigió el mismo día. **El caso completo está en `docs/bitacora-ads.md` del repo
de Nolõ**, que es donde corresponde.

Lo único que toca a este documento es que **invalida la fila de Argentina de la tabla de la Vía 3 de
ayer**, ya marcada arriba. La de Costa Rica sigue siendo correcta.

> **La trampa de método, que vale para cualquier cuenta y por eso queda acá.** Para saber qué puja
> una campaña hay que consultar `conversion_goal_campaign_config` **primero**: si trae un
> `custom_conversion_goal`, la puja la decide esa lista de acciones y `campaign_conversion_goal` /
> `customer_conversion_goal` pasan a ser irrelevantes. Y «ninguna categoría biddable» en la segunda
> **no** significa «hereda las de la cuenta»: es la firma de que hay un objetivo personalizado. Ayer
> se leyó al revés.
>
> La prueba empírica, que no depende de interpretar nada: comparar `metrics.all_conversions` —todo lo
> que entra— contra `metrics.conversions` —lo que alimenta Smart Bidding—. Si una acción tiene la
> primera en positivo y la segunda en cero, está fuera de la puja de esa campaña.

## 7 sep 2026 — La revisión del 4 de septiembre: la nota no se movió, Google sí leyó el copy, y un correo que coincide con un cliente

Datos del **14 ago – 4 sep** (16 días hábiles: tres semanas exactas desde que el copy salió a
producción). El lunes 7 sep entra parcial sólo donde se indica. **Sólo Costa Rica**: por decisión de
Robert, Argentina se revisa en una sesión aparte y queda en su bitácora; de allá se tomó únicamente
la fila de la nota de página de destino, como control, porque el mismo copy salió en los dos sitios
el mismo día.

Tres verificaciones previas, todas limpias:

- **Nada más cambió en las dos campañas desde el 13 ago** (`change_event`, 25 días): sólo las
  extensiones de Software del 14 ago y las negativas diarias — ~211 por campaña en la ventana, las
  mismas en las dos. Búsqueda sigue en 10/día y Software en 15/día, Maximizar valor sin target.
- **Las cuatro acciones nuevas miden y pujan**: `conversions` = `all_conversions` en cada una. Y el
  rezago sigue en cero: la lectura por fecha de conversión coincide acción por acción con la de
  fecha de clic.
- **Las pruebas en vivo del 17 ago no ensuciaron nada**: nivel cuenta y suma de campañas coinciden
  para las seis acciones de CR (la única `Contacto` vieja del período es la del 13 ago, anterior al
  deploy, ya explicada).

### 1. La nota de página de destino: sin cambio en las cuatro, y no es falta de masa

| campaña | keyword | QS 14 ago | QS 7 sep | anuncio | CTR esp. | **página** |
|---|---|---:|---:|---|---|---|
| Búsqueda (CR) | desarrollo de sitios web | 5 | **5** | Por encima | Promedio | **Por debajo** |
| Software (CR) | empresa de desarrollo de software | 3 | **3** | Por encima | Por debajo | **Por debajo** |
| Búsqueda #2 (AR) · control | desarrollo de sitios web | 7 | 6 | Promedio (era Por encima) | Por encima | **Por debajo** |
| Software #2 (AR) · control | empresa de desarrollo de software | 5 | 4 | Promedio (era Por encima) | Promedio | **Por debajo** |

`metrics.historical_landing_page_quality_score` por semana: **BELOW_AVERAGE todas las semanas desde
junio, en las cuatro**, sin una sola semana distinta. Las dos argentinas perdieron un punto de QS
pero por `creative_quality_score` (cambiaron sus anuncios el 14 ago), no por la página. Búsqueda #2
juntó ~2.600 impresiones en la ventana y tampoco se movió: **el copy solo no movió la nota en tres
semanas**, y la muestra ya no es chica. Queda en pie lo que decía la nota del 14 ago: «arreglar el
peso por sí solo probablemente no mueva la nota».

**Pero Google sí leyó el texto nuevo, y Search Console lo muestra.** `linkdesign.cr/web` tenía
**0 impresiones orgánicas en Costa Rica en las seis semanas previas** y desde la semana del 10 ago
aparece para «diseño web costa rica», «paginas web costa rica», «diseño de sitios web en costa
rica», «paginas web en costa rica»:

| semana | impresiones | posición media |
|---|---:|---:|
| 29 jun – 9 ago (seis semanas) | 0 | — |
| 10 ago | 30 | 65 |
| 17 ago | 66 | 60 |
| 24 ago | 100 | 51 |
| 31 ago | 75 | 49 |

Un clic en total: es página 5 o 6, no tráfico. Pero prueba que la reclasificación de la página por
contenido ya ocurrió, y que la nota de Ads mide otra cosa o tarda más. `/software` no cambió (2–16
impresiones/semana antes y después; ya aparecía para «sistemas a medida» y «software a medida»).

### 2. Los criterios del 13 ago, uno por uno

**"Búsqueda"** (ventanas por fecha de clic; serios = correo + reunión + formulario; para mayo–12 ago
la partición sale de la acción vieja con las cotas exactas de la segunda sesión del 13 ago):

| ventana | háb. | clics | costo | CPC | CTR | IS | perd. presup. | perd. rank | WhatsApp | serios | serios/100 clics | USD/serio |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| may | 21 | 131 | 302,45 | 2,31 | 10,0 % | 34,5 % | 25,3 % | 40,2 % | 10 | 6 | 4,6 | 50 |
| jun | 22 | 137 | 437,55 | 3,19 | 10,3 % | 36,6 % | 24,1 % | 39,3 % | 14 | 6 | 4,4 | 73 |
| 1–22 jul | 16 | 93 | 306,03 | 3,29 | 11,7 % | 40,0 % | 22,8 % | 37,2 % | 5 | 4 | 4,3 | 77 |
| 24 jul – 12 ago | 14 | 72 | 196,96 | 2,74 | 10,0 % | 36,9 % | 21,1 % | 42,0 % | 10 | 0 | 0,0 | — |
| **14 ago – 4 sep** | 16 | 79 | 202,34 | 2,56 | 7,5 % | 41,3 % | **19,6 %** | 39,1 % | **4** | **1** | **1,3** | 202 |

| criterio | umbral | medido | veredicto |
|---|---|---|---|
| subir a 15/día | ≥ 4 serios por 100 clics | **1,3** (1 en 79) | **NO** |
| demanda represada | pérdida por presupuesto > 35 % | **19,6 %** (ranking 39,1 %) | **NO** |
| «el problema es el sitio» | 0–1 serios/100 clics con visitas normales | 1,3 con 4,9 clics/día hábil (5,1 y 5,8 en las ventanas previas) | **SÍ: es esta rama** |

El único lead serio de la campaña en siete semanas es un clic de «Agendar reunión» el 19 ago
(value 48, término «creacion de pagina web») que **no dejó cita en el CRM**. Formulario y copiar
correo siguen en cero: el último formulario de CR es del 7 jul (62 días). Dos cosas más, anotadas
sin conclusión: **los WhatsApp bajaron de 10 a 4 con los mismos clics** (p ≈ 0,15 — no distingue
azar de efecto, pero es lo primero que cambió en la dirección del copy) y el CTR bajó de 10 % a
7,5 % mientras las impresiones diarias subían ~25 %, sin cambio de anuncio: la amplia está
entrando a más subastas de menor afinidad, y se lee en `search_term_view` (ver §4).

**"Software"**:

| ventana | háb. | clics | costo | CPC | CTR | IS | perd. presup. | perd. rank | WhatsApp | serios | serios/100 | USD/serio |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| may (amplia vieja) | 21 | 110 | 313,82 | 2,85 | 6,1 % | 24,6 % | 30,1 % | 45,3 % | 11 | 6–7 | 5,9 | 48 |
| jun (frase desde el 15) | 22 | 93 | 456,38 | 4,91 | 7,8 % | 29,7 % | 26,3 % | 43,9 % | 6 | 5 | 5,4 | 91 |
| 24 jul – 12 ago (amplia nueva) | 14 | 76 | 312,98 | 4,12 | 8,4 % | 34,8 % | 44,1 % | 21,1 % | 1 | 2 | 2,6 | 156 |
| **14 ago – 4 sep** | 16 | 84 | 330,87 | **3,94** | 10,1 % | 25,4 % | **41,9 %** | 32,7 % | 6 | **2** | 2,4 | 165 |

| criterio | umbral | medido | veredicto |
|---|---|---|---|
| subir a 20/día porque el QS se recupera | CPC ≤ 3 | **3,94** (semanas: 3,57 · 3,65 · 4,06) con **QS 3** | **NO** |
| «la palanca es la página, no el presupuesto» | CPC 4+ con QS todavía en 3 | 3,94 y QS 3, seis semanas de rodaje | **SÍ: es esta rama** |
| gate del 23 jul (20/día) | pérdida por presupuesto > 35 % **y** ratio ≥ 1,2 | 41,9 % ✓ · **0,54** ✗ | **NO** |

La amplia recreada lleva seis semanas y su CPC no bajó al 2,65 de la amplia vieja. El móvil sigue
más barato (CPC 2,46 contra 4,92 en escritorio). Las extensiones nuevas del 14 ago sí se notan donde
tenían que notarse: el CTR subió de 8,4 % a 10,1 %. Los dos leads serios llegaron los dos primeros
días hábiles —copiar correo el 17 ago (value 45, término oculto) y agendar el 18 ago (54, «desarrollo
de software costa rica»)— y después sólo WhatsApp.

**tROAS en cualquiera de las dos: NO.** Tres leads serios en tres semanas y media no son señal para
Smart Bidding; un target hoy seguiría siendo un tCPA de WhatsApp y scroll disfrazado (§ del 13 ago).
De hecho en Búsqueda, de las 44 conversiones con que aprende la puja, **39 son scrolls**.

### 3. El CRM: la coincidencia que importa, y la escala de values queda como está

**Formularios**: `webleads` sigue en 13; ninguno nuevo en ningún sitio desde el 12 ago (AR) y
ninguno de CR desde el 7 jul. `Contacto Formulario` = 0 en Ads es correcto, no un label roto.

**Los leads del pipeline creados en la ventana, Costa Rica, con recorrido real** (descontados los 4
clientes históricos cargados de golpe el 17 ago — We Drive CR, AMAG, La Caja Maestra, Link
Design-Nolõ-CRM —, que se suman a los 11 del 13 ago):

| fecha | empresa | canal | servicio | estado |
|---|---|---|---|---|
| 14 ago | Ecommerce marca paraguas | referido | e-commerce | en espera |
| **17 ago** | **Expat Legal Advisors** | **Email** | sitio web corporativo | **ganado el 26 ago** |
| 25 ago | Despacho contable | WhatsApp | sitio web corporativo | propuesta enviada |
| 25 ago | Clínica dental | WhatsApp | sitio web corporativo | perdido (4 sep) |
| 1 sep | Hojalatería Fuentes | WhatsApp | otro | propuesta enviada |
| 3 sep | Quality Flooring | «Otro»: referido de Deluxe Surfaces | sitio web corporativo | propuesta enviada |
| 4 sep | UTURN | «Otro»: sacó su propia cita en el sitio | sitio web corporativo | propuesta enviada |
| 4 sep | Luis Adrián Vega | «Otro»: referido de Uga Comediante | sitio web creativo | propuesta enviada |

**El único clic de «copiar correo» de Costa Rica en la ventana (17 ago, campaña Software, value 45)
coincide en fecha y canal con Expat Legal Advisors**, que entró ese mismo día por Email y es cliente
desde el 26 ago. Ads y CRM no se enlazan (sigue sin haber `convertedToLeadId` para nada que no sea
formulario), así que es coincidencia fuerte, no prueba. Un detalle en contra: pidió sitio web y el
clic fue en `/software`. Un detalle a favor: no hay otro correo entrante registrado ese día. Si es
él, la inversión de CR de la ventana (533 USD) la pagó un solo contacto.

**Los dos clics de «Agendar reunión» (18 y 19 ago) no dejaron cita.** La de UTURN es del 4 sep y no
tiene clic de Ads que la explique: entró por orgánico o directo. Hallazgo de estructura del CRM,
anotado en la memoria: el canal «Otro» son **citas del calendario del sitio y referidos**, no un
cajón de sastre — el «Reunión» de Ads vive ahí, con el detalle en `sourceOtherText`.

**Tasa de cierre por canal, descontados los 15 históricos** (al 7 sep):

| | resueltos | ganados | cierre | | resueltos | ganados | cierre |
|---|---:|---:|---:|---|---:|---:|---:|
| WhatsApp · todos los países | 19 | 3 | **16 %** | WhatsApp · sólo CR | 10 | 3 | 30 % |
| Email · todos los países | 11 | 4 | **36 %** | Email · sólo CR | 10 | 4 | 40 % |

La brecha existe y va en la dirección conocida, pero es **menor que el «14 de 15» del 13 ago**: aquel
número mezclaba países y era anterior a que Deluxe Surfaces (WhatsApp) cerrara. Lo que sí agranda la
brecha es la selección de entrada: **de 11 clics de WhatsApp en CR entre el 14 ago y el 7 sep,
entraron 3 al pipeline**; el correo entró 1 de 1. Clic a cliente queda en ~8 % WhatsApp contra ~40 % correo —
**del orden de 1:5, que es exactamente la escala vigente (10 contra 50)**.

**Decisión sobre el pendiente 4 (recalibrar values): no se recalibra.** Con tres leads serios de
muestra no hay número propio que calcular, y la evidencia de cierre es consistente con la escala
actual, no con una brecha mayor. La Data Manager API sigue sin justificarse: seguiría siendo
medición para humanos, no señal para la puja. La ventana queda con una sola escala.

### 4. Hallazgos laterales, sin acción

- **Términos de búsqueda**: `search_term_view` explica el 58 % del gasto de Búsqueda y sólo el
  **26 %** del de Software (Google oculta el resto). Lo visible está limpio en las dos: ruido fuera
  del rubro 12,76 USD en Búsqueda (9,9 % de lo visible: `dabasystem`, `clonify`, «comercio
  electrónico»…) y 6,09 en Software (`serkes1`, `cybernova`). Inglés en Búsqueda: 3,97 USD, 2 clics.
  Las negativas diarias están haciendo su trabajo.
- **Sesiones pagas en el CRM** (`sitesessions`, con `entryGclid`): 42 · 45 · 43 · 38 por semana en
  CR, mitad `/web` y mitad `/software`, 0,8–1,0 min activos por sesión. Coincide con los clics de
  Ads y no muestra un cambio de comportamiento tras el copy.
- **Dispositivo, ventana POST**: Búsqueda escritorio CPC 2,92 / móvil 1,87; Software 4,92 / 2,46.
- **Pacific Star Food Service** figura hoy como WhatsApp en el pipeline; llegó por formulario el
  3 jun (es el único web-lead con `convertedToLeadId`). `sourceChannel` sigue sin ser confiable para
  formularios.

### 5. Decisiones — pendientes de Robert (7 sep 2026)

Lo que los datos recomiendan, a falta de su decisión:

1. **Presupuestos y pujas: sin cambios.** Los criterios de las dos campañas cayeron en la rama «no es
   el presupuesto»; el tROAS sigue sin señal que lo alimente.
2. **Values: sin cambios.** Ver §3.
3. **Nota de página de destino**: el copy ya está leído por Google y no la movió. Lo que queda es
   (a) darle tres o cuatro semanas más sin encimar cambios, porque la nota es lenta y relativa, y
   (b) la única palanca documentada que sigue pendiente y es medible: **la velocidad en móvil** —
   LCP ~6 s por los tres videos del encabezado, sin variante móvil (6,4 MB → ~2,3 MB), decisión
   ya propuesta el 14 ago con comparación lado a lado. Una palanca menor y barata: `/web` no tiene
   teléfono escrito ni cédula jurídica; es texto, no diseño, pero se propone y se espera.
   > **Decidido el mismo 7 sep.** Robert aprobó tres acciones: cédula jurídica y razón social en el
   > pie y en el JSON-LD; horario en el pie (en el JSON-LD ya estaba); y videos diferenciados para
   > móvil en el hero de `/web` y las pestañas de `/software`, sujetos a una comparación lado a lado.
   > **El teléfono quedó descartado**: las llamadas no son un canal del estudio. Verificado en
   > producción que ni `/web` ni `/software` ni `/contacto` muestran teléfono ni cédula (comparten
   > el pie). El plan con rutas, comandos y orden del día está en
   > [plan-nota-pagina-destino.md](./plan-nota-pagina-destino.md); se ejecuta el 8 sep.
4. **A vigilar, no a actuar**: los WhatsApp de Búsqueda bajaron a la mitad con los mismos clics.
5. **Próxima revisión sugerida: ~5 oct 2026** — siete semanas de copy y siete de acciones separadas,
   suficiente para leer la nota otra vez y para tener ~25 contactos por canal.

## 7 sep 2026 (cont.) — Las estadísticas de subasta de «Búsqueda», leídas contra las conclusiones de la mañana

Robert notó que la revisión del 4 sep se hizo sin las estadísticas de subasta y pasó las dos tablas de
«Búsqueda» (CR) por captura: **24 jul – 12 ago** y **19 ago – 4 sep**. Esta entrada registra qué
dicen y si mueven algo de lo concluido arriba. **No mueven ninguna decisión: refuerzan tres
conclusiones y cambian la lectura de una.** Las de Software las pasa aparte.

### Por qué no estaban: la API las tiene, pero no para nosotros

Las métricas `metrics.auction_insight_*` existen en v24 (seleccionables en `campaign`, `ad_group` y
`keyword_view`, segmentadas por `segments.auction_insight_domain`), pero la consulta devuelve
`authorization_error 26: The developer doesn't have access to metrics`. Son de lista blanca y la
lista está cerrada; el único camino es la UI (Estadísticas de subasta) o su descarga. Anotado en la
memoria del proyecto.

Lo que sí sale por API es la fila «Usted», y cuadra al decimal si se usan las métricas correctas:

| ventana | fuente | cuota de impresiones | parte superior | superior absoluta |
|---|---|---:|---:|---:|
| 24 jul – 12 ago | UI | 36,92 % | 82,65 % | 47,41 % |
| | API | 36,35 % | 82,59 % | 47,40 % |
| 19 ago – 4 sep | UI | 42,73 % | 82,91 % | 50,00 % |
| | API | 42,30 % | 82,91 % | 50,00 % |

Trampa: «parte superior» es `top_impression_percentage` (sobre impresiones propias), **no**
`search_top_impression_share` (sobre impresiones elegibles), que da 30 % y 35 % para las mismas
ventanas. El medio punto de diferencia en la cuota es normal: la UI de subasta la calcula sobre su
propio conjunto de subastas.

### Lo que dicen las tablas

Competidores con más del 10 % de cuota en nuestras subastas: **atomsoluciones.com 14,7 %,
shopify.com 11,3 % y squarespace.com 10,5 %** en la primera ventana; **sólo shopify.com 12,9 %** en la
segunda. El resto (masdigital, bitcode-enterprise, pixelcr, sitiowebcr, wix, base44, y en la primera
ventana también zewsweb, bitsaturno, ticma.cr, fiverr y enseriocr) queda bajo el 10 %. Nosotros:
36,9 % y 42,7 %.

1. **Somos el participante más grande de la subasta, por más del doble.** Nadie nos saca: el solape
   más alto es el de atom, presente en el 28 % de nuestras impresiones; el resto coincide con
   nosotros en el 7–19 %. Sumando las cuotas de todos los listados, en una subasta típica aparece
   además de nosotros **un** competidor de la lista; en la segunda ventana, menos de uno. Es un
   mercado ralo.
2. **La columna «ranking superior» no es información nueva.** Es ≈ cuota propia × (1 − solape ×
   posición superior): atom 36,92 × (1 − 0,2826 × 0,3734) = 33,0 %; shopify 35,4 %; squarespace
   34,4 %, exactamente lo que muestra la tabla. Por eso da casi lo mismo contra todos (33–36 % y
   40–42 %): es la cuota de impresiones vista desde el otro lado, no una medida de debilidad frente
   a cada uno.
3. **Quién nos gana la posición cuando coincidimos**: las plataformas (squarespace 54 % / 48 %,
   shopify 36 % / 57 %, base44 43 % / 32 %, wix 36 % / 33 %) y **pixelcr.com (50 % / 46 %)**, el
   único competidor local que nos disputa el primer lugar. Las agencias locales restantes están
   debajo nuestro el 80–96 % de las veces. Con 47–50 % de superior absoluta propia, que alguien esté
   arriba la mitad de las veces que coincide es lo esperable.

Entre las dos ventanas **atomsoluciones.com desapareció de nuestras subastas** (era el primero) y con
él cinco menores: la tabla pasó de 14 o más filas a 8. La segunda ventana se juega contra menos
competidores.

### Contra las conclusiones del §2

| conclusión | qué agrega la subasta |
|---|---|
| «No es el presupuesto» | **Refuerza.** El mayor participante somos nosotros; la pérdida por presupuesto (19–23 %) no se la lleva nadie en particular. |
| «Perdemos ~40 % por ranking» | **Cambia la lectura, no el número.** Con competidores de ≤ 15 % de cuota, ese 40 % no se pierde contra un rival más fuerte: es nuestro Ad Rank sin llegar al mínimo que Google exige para mostrar (QS 5, página Por debajo del promedio), o la puja automática decidiendo no pujar en subastas que predice sin valor. La palanca sigue siendo la página, no la puja. |
| «La amplia entra a subastas de menor afinidad» (CTR 10 % → 7,5 %) | **Consistente, y aparece una segunda causa posible**: con atom afuera la subasta se aflojó (cuota 36 → 42 %, CPC 2,74 → 2,45, superior absoluta 47 → 50 %) y las impresiones nuevas son las marginales. Por semana el CTR cae de golpe en la del 17 ago (10,8 / 11,9 / 8,6 / 11,4 → 8,0 / 7,1 / 7,3) y las subastas elegibles suben de ~640–760 a 730–1.000 semanales. Esa semana coincide con el copy y las acciones nuevas del 14 ago, así que las dos causas **no se separan con estos datos**; la segmentación semanal de la UI de subasta (Segmentar → Semana, 20 jul – 6 sep) las separaría. |
| «El problema es el sitio» | **Refuerza con un argumento que no teníamos**: en la segunda ventana la subasta se puso más fácil y más barata sin que hiciéramos nada, y la campaña siguió en 1 lead serio en 65 clics. |

**La presencia de Shopify, Wix, Squarespace y Base44 no significa tráfico «hágalo usted mismo».** Se
revisó `search_term_view` en las dos ventanas: los términos con señal de plataforma o DIY (crear,
gratis, plantilla, tienda, ecommerce, app, nombres de plataformas) son el **5 % y el 7 % de las
impresiones visibles**, 0 y 2 clics, 0 y 4,99 USD. Ninguna de las 163 negativas de la campaña es de
ese tipo, así que no es que se filtren: no entran. Las plataformas pujan por los mismos genéricos
que nosotros («diseño web», «paginas web», «landing page», «sitio web»). **No se agregan negativas
DIY por esto.** Cobertura de lo visible: 59 % y 57 % del costo.

Serie semanal, para quien vuelva (la del 20 jul lleva tres días a 15/día):

| semana | impr | clics | CTR | CPC | costo | cuota | superior | sup. abs. | perd. presup. | perd. rank |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 20 jul | 372 | 40 | 10,8 % | 2,20 | 87,84 | 45,7 % | 81,2 % | 60,8 % | 13,9 % | 40,4 % |
| 27 jul | 219 | 26 | 11,9 % | 2,83 | 73,47 | 34,4 % | 81,3 % | 50,9 % | 32,0 % | 33,6 % |
| 3 ago | 244 | 21 | 8,6 % | 2,71 | 56,92 | 31,9 % | 82,7 % | 37,2 % | 24,9 % | 43,1 % |
| 10 ago | 255 | 29 | 11,4 % | 3,08 | 89,26 | 39,6 % | 76,2 % | 51,0 % | 30,8 % | 29,6 % |
| 17 ago | 351 | 28 | 8,0 % | 2,61 | 73,10 | 35,1 % | 84,7 % | 54,0 % | 28,2 % | 36,7 % |
| 24 ago | 309 | 22 | 7,1 % | 2,24 | 49,19 | 42,5 % | 83,7 % | 46,4 % | 29,0 % | 28,5 % |
| 31 ago | 384 | 28 | 7,3 % | 2,38 | 66,55 | 48,3 % | 80,0 % | 49,0 % | 3,0 % | 48,7 % |

Hallazgo lateral, **sin acción**: «landing page» es el término con más impresiones en las dos
ventanas (33 y 55) y tiene 1 clic entre las dos; con «web designers near me» (19 y 12, 0 clics) y
«diseño de paginas web» (17, 0 clics) explica buena parte del CTR bajo sin costar dinero. **No toca
el QS**: la nota de calidad se calcula sobre búsquedas exactas de la keyword, no sobre las
expansiones de la amplia, así que estas impresiones sin clic sólo bajan el CTR que se ve en el
informe. Corregido el mismo 7 sep: una primera versión de este párrafo decía que erosionaban el CTR
esperado, y no es así. Negarlo no compraría nada medible.

### «Software»: la subasta se puso más dura, y eso explica la caída de cuota que el §2 dejó sin causa

Fila «Usted» contra la API, con las mismas métricas:

| ventana | fuente | cuota de impresiones | parte superior | superior absoluta |
|---|---|---:|---:|---:|
| 24 jul – 12 ago | UI | 33,70 % | 80,67 % | 50,39 % |
| | API | 33,80 % | 80,67 % | 50,39 % |
| 19 ago – 4 sep | UI | 25,39 % | 79,67 % | 49,91 % |
| | API | 25,47 % | 79,59 % | 49,72 % |

**Quién compite.** Cuatro por encima del 10 % en cada ventana, contra tres y luego uno en «Búsqueda»:

| dominio | cuota P1 → P2 | solape P1 → P2 | arriba nuestro P1 → P2 | sup. abs. P1 → P2 |
|---|---|---|---|---|
| softland.com (ERP) | 14,6 → 14,3 % | 12 → 6 % | 55 → **62 %** | 36 → 23 % |
| atomsoluciones.com | 13,8 → < 10 % | 22 → 6 % | 21 → 29 % | 15 → 29 % |
| softdialcr.com | 13,2 → 11,4 % | 13 → 5 % | 44 → **59 %** | 27 → **61 %** |
| novussoftware.la | 10,6 → < 10 % | 16 → 11 % | 19 → 32 % | 9 → 13 % |
| bitcode-enterprise.com | < 10 → 12,8 % | 14 → **29 %** | 25 → 18 % | 20 → 12 % |
| accesscorp.com | < 10 → 11,1 % | 12 → 14 % | 61 → **69 %** | 43 → 49 % |
| alegra.com (contable) | < 10 → < 10 % | 5 → 4 % | 38 → 57 % | 13 → 13 % |
| aplicomcr.com | < 10 → < 10 % | 15 → 13 % | 26 → 36 % | 18 → 26 % |
| qupos.com (POS) · daytonasoft.com | sólo P1 | 5 % · 4 % | 29 % · 41 % | 4 % · 21 % |
| sea.co.cr | sólo P2 | 13 % | 14 % | 2 % |

Tres diferencias con «Búsqueda»:

1. **Los rivales son más fuertes y se pusieron más agresivos.** En «Búsqueda» las agencias locales
   quedaban debajo nuestro el 80–96 % de las veces; acá **tres o cuatro nos ganan la posición más de
   la mitad de las veces que coincidimos** (Softland, Access Corp, Softdial, y Alegra en la segunda
   ventana), y todas subieron entre ventanas. Softdial pasó de 27 % a 61 % de superior absoluta. Atom
   se desinfló igual que en «Búsqueda», pero acá lo reemplazaron Bitcode (ahora coincide con nosotros
   en el 29 % de las impresiones, aunque casi siempre debajo), Access Corp y un participante nuevo,
   sea.co.cr.
2. **Seguimos siendo el mayor participante, pero por menos margen**: 2,3× el segundo en la primera
   ventana y 1,8× en la segunda. La densidad es parecida a la de «Búsqueda» (sumando cuotas, ~1
   competidor por subasta además de nosotros); lo que cambia es quién y cuánto puja.
3. **El contraste entre las dos campañas es el del QS.** Con QS 5 y CTR esperado «Promedio»
   («Búsqueda») nadie local nos pasa; con QS 3, CTR esperado y página «Por debajo» («Software») nos
   pasan varios y pagamos 3,7–4,1 por clic contra 2,5–2,7. La subasta muestra desde afuera lo que el
   QS dice desde adentro. Es consistente con «la palanca es la página», no una prueba: Softland y
   Access Corp también pueden simplemente pujar más.

**La caída de cuota (33,8 → 25,5 %) tiene causa, y no es nuestra.** El §2 la registró sin explicarla.
Se juntan tres cosas:

- **Más demanda con el mismo dinero.** Subastas elegibles por día hábil: ~191 → ~213 (+12 %). El
  presupuesto siguió en 15/día y se gastó entero (22,4 → 20,1 USD por día hábil).
- **Rivales pujando más alto en las subastas disputadas** (tabla de arriba).
- **La puja automática cedió esas subastas en vez de pelearlas**: pérdida por ranking 18 → 31 %, CPC
  4,12 → 3,74, y la posición donde sí salimos no se movió (80 % superior, 50 % absoluta). Con
  presupuesto topado, el reparto entre «perdido por presupuesto» y «perdido por ranking» lo decide
  la puja, no el mercado: la semana del 10 ago fue 71 % / 2 % con CPC 5,85 y la del 31 ago
  38 % / 38 % con CPC 4,06, con el mismo tope. Es la circularidad ya anotada en la skill: en
  «Software» la pérdida por presupuesto **no** mide demanda represada.

Serie semanal (la del 20 jul mezcla tres días de la frase a 5,60):

| semana | impr | clics | CTR | CPC | costo | cuota | superior | sup. abs. | perd. presup. | perd. rank | eleg. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 20 jul | 83 | 8 | 9,6 % | 4,55 | 36,38 | 50,8 % | 82,1 % | 67,2 % | 11,4 % | 37,9 % | ~160 |
| 27 jul | 295 | 28 | 9,5 % | 4,31 | 120,68 | 35,4 % | 81,4 % | 52,7 % | 54,6 % | 9,9 % | ~830 |
| 3 ago | 410 | 29 | 7,1 % | 3,61 | 104,70 | 33,7 % | 80,7 % | 47,6 % | 37,0 % | 29,3 % | ~1.220 |
| 10 ago | 187 | 20 | 10,7 % | 5,85 | 116,92 | 26,7 % | 79,9 % | 50,3 % | 71,3 % | 1,9 % | ~700 |
| 17 ago | 358 | 30 | 8,4 % | 3,57 | 107,18 | 28,8 % | 80,6 % | 52,4 % | 39,8 % | 31,4 % | ~1.240 |
| 24 ago | 237 | 30 | 12,7 % | 3,65 | 109,51 | 23,9 % | 83,0 % | 51,5 % | 51,6 % | 24,6 % | ~990 |
| 31 ago | 225 | 22 | 9,8 % | 4,06 | 89,28 | 23,7 % | 75,8 % | 44,0 % | 38,4 % | 37,8 % | ~950 |

**Softland, Alegra y Qupos están porque la amplia trae búsquedas de software empaquetado**, la familia
«ERP / CRM / sistemas» que el 14 ago midió en 14,1 % de las impresiones y 7,2 % del gasto. En estas
ventanas: **16 % de las impresiones visibles y 10 % del costo visible en la primera** («erp» 25
impresiones, «erp costa rica» 2 clics, «optimus erp» 1 clic), **7 % y 0 clics en la segunda**. Las
negativas ya cubren las marcas (softland, alegra, sap, odoo, quickbooks, monica) y no las genéricas
«erp» y «crm»; el 13 ago se decidió que ese ruido cuesta menos que la cura, y con 0 clics en la
segunda ventana no hay motivo para reabrirlo. Cobertura de lo visible: 56 % y 25 % del costo (Google
oculta más en esta campaña que en «Búsqueda»).

**Contra las conclusiones del §2:**

| conclusión | qué agrega la subasta |
|---|---|
| «subir a 20/día porque el QS se recupera: NO» | **Refuerza.** QS sigue en 3 y ahora se ve que las subastas que compraría el presupuesto extra son justamente las disputadas por Softland, Access Corp y Softdial, donde nos ganan la posición el 60–70 % de las veces: el clic marginal sería más caro que el promedio, no más barato. |
| «la palanca es la página, no el presupuesto» | **Refuerza**, por el contraste con «Búsqueda» (punto 3). |
| gate del 23 jul (20/día): presupuesto > 35 % ✓ y ratio ≥ 1,2 ✗ | **Sin cambio en el veredicto, con una advertencia**: el 43 % de pérdida por presupuesto no es demanda represada medible, porque la puja lo intercambia con la pérdida por ranking semana a semana. Ese criterio pesa menos de lo que parece; el que manda es el ratio. |
| la cuota bajó a 25 % | **Ya no queda sin causa**: más demanda, rivales más agresivos y la puja cediendo. No es efecto del copy ni de las acciones nuevas. |

Sin acción. Lo único que estas tablas sugieren vigilar es **Access Corp y Softdial**: si en la
próxima revisión siguen subiendo la superior absoluta, la subasta de «Software» se está encareciendo
por el lado de los rivales, y eso baja aún más el rendimiento de cualquier presupuesto extra.

### Cierre del 7 sep: qué se toca y qué no

Robert preguntó si, con las dos subastas leídas, la única modificación recomendada era la de la
página. **Sí, y lo confirmó: en Google Ads no se toca nada en ninguna de las dos campañas.** La única
acción es el plan de página de destino ([plan-nota-pagina-destino.md](./plan-nota-pagina-destino.md)),
que se ejecuta el 8 sep. Para que la próxima sesión no lo redescubra, lo que se consideró y por qué
cada cosa es un no:

| palanca | por qué no |
|---|---|
| Presupuesto de «Búsqueda» (10/día) | No está limitada por plata y somos el mayor participante de la subasta; subir compra más clics de la calidad que hoy da 1 lead serio en 79. |
| Presupuesto de «Software» (15/día) | El gate (ratio ≥ 1,2) sigue en 0,54, y los clics que compraría el dinero extra son los disputados por Softland, Access Corp y Softdial: los más caros. La pérdida por presupuesto no mide demanda represada (ver arriba). |
| tROAS en cualquiera | Tres leads serios en tres semanas y media no son señal; sería un tCPA de WhatsApp disfrazado. |
| Values | La escala 10 / 50 coincide con la tasa de cierre real por canal del CRM (§3). |
| Concordancia y keywords | Frase cuesta 2,7× lo que ahorra (13 ago); la keyword literal genera el 0,1 % de las impresiones (14 ago). |
| Negativas nuevas | Plataformas/DIY en «Búsqueda»: 5–7 % de lo visible, 2 clics. ERP/CRM en «Software»: 0 clics en la segunda ventana. «landing page»: no cuesta dinero ni toca el QS. |
| Scroll como conversión de puja | Es la mayoría de las conversiones pero vale 1: pesa ~⅓ del valor con que aprende la puja. Quitarlo dejaría a la puja con ~5 conversiones en tres semanas, que es peor. El ×2 de julio fue el remedio elegido para esto. |
| Ajustes por dispositivo | El móvil es más barato en las dos, pero Maximizar valor de conversión ignora los ajustes de puja por dispositivo (salvo −100 %). |

Y una razón que vale para todas aunque alguna pareciera inofensiva: **en octubre hay que poder leer el
efecto de los cambios de página** sobre la nota de destino y sobre los leads serios. Cualquier cambio
en Ads en el medio contamina esa lectura.

**Próxima revisión: lunes 5 oct 2026** (recordatorio en Calendar con aviso por correo). Siete semanas
de copy, siete de acciones separadas, cuatro de los cambios de página del 8 sep. Qué leer ese día:

1. **La nota de página de destino** en las cuatro keywords (`historical_landing_page_quality_score`
   por semana): es la primera lectura después de cédula, horario y videos móviles. Si sigue
   BELOW_AVERAGE en todas, la palanca de la nota se agotó por este camino y hay que decirlo.
2. **«Búsqueda»**: serios por 100 clics (≥ 4 → volver a 15/día; 0–1 → sigue siendo el sitio);
   pérdida por presupuesto (> 35 % recién sería demanda represada); WhatsApp por 100 clics (bajaron
   de 10 a 4 con el copy, sin conclusión).
3. **«Software»**: CPC y QS (CPC ≤ 3 con el QS recuperándose → 20/día); ratio del gate; y si Access
   Corp y Softdial siguen subiendo su superior absoluta.
4. **Las estadísticas de subasta de las dos campañas**, que sólo Robert puede sacar: las dos tablas
   de la ventana nueva y, si se puede, segmentadas por semana desde el 20 jul, que es lo que
   separaría «atom se fue» de «cambió el copy».
5. **El CRM**: leads del pipeline creados desde el 4 sep, con canal y desenlace; ~25 contactos por
   canal ya permiten recalcular la tasa de cierre WhatsApp / correo.
6. **Search Console**: impresiones y posición de `/web` en Costa Rica, semana a semana, como control
   de que Google sigue leyendo la página.
7. **Pasar «Contacto» (6925111133) y «Contacto Argentina» (7650100714) de primarias a secundarias.**
   Decidido por Robert el 9 sep: **no se toca antes**, queda para este día. Las dos están muertas desde
   el 13 ago (cero conversiones por fecha de conversión desde el 14) y siguen pujando con un histórico
   de tres meses con la escala vieja, el scoring roto y sin distinguir canal. La operación es un
   `ConversionActionOperation.update` con `primary_for_goal = false` por acción, validada por el
   servidor el 9 sep con `validate_only`; se rehace en un minuto con `ads.client()` y
   `ConversionActionService.mutate_conversion_actions`. **No eliminarlas**: el histórico se queda en
   los informes. Hacerlo ese día y no antes evita que un eventual reinicio del aprendizaje de la puja
   contamine la lectura de la página de destino.

---

## 9 sep 2026 — El value del formulario cambió porque el scoring estaba roto, y eso cae dentro de la ventana de lectura de octubre

**No se tocó nada en Google Ads.** Lo que cambió es lo que el sitio reporta, y por eso entra acá.

### Qué pasó

Entre el 8 y el 9 de septiembre se auditó y se corrigió la calificación de leads
([`PLAN-CALIFICACION-LEADS.md`](../../PLAN-CALIFICACION-LEADS.md) y
[`AUDITORIA-CALIFICACION-LEADS.md`](../../AUDITORIA-CALIFICACION-LEADS.md) en la raíz del workspace).
La fórmula estaba bien; lo que estaba mal eran los datos que entraban. Seis de veintitrés factores
medían algo distinto de lo que decían y tres eran imposibles de cumplir. Venía portada del sitio
anterior en junio y nadie la revisó en los siete cambios de estructura posteriores.

**Por qué esto es asunto de Ads:** el value de «Contacto Formulario» sale de la categoría del lead
(`LEAD_SCORE_ADS_VALUE`: nurture 30, cold 36, warm 48, hot 60), y la categoría sale de ese puntaje.
Además, los values de «Contacto WhatsApp», «Contacto Correo» y «Contacto Reunión» se modulan por la
calidad de la sesión, que usaba la misma medición de tiempo equivocada. O sea: la corrección toca las
cuatro conversiones de contacto, no solo la del formulario.

**La dirección del error era casi siempre hacia arriba.** El texto que el propio sitio anteponía al
mensaje regalaba los 12 puntos de «mensaje detallado»; el contador de páginas sumaba una de más, así
que los bonos de 3 y 5 páginas se cobraban con una menos; el tiempo se medía con la pestaña abierta y
no con la atención real, lo que regalaba el bono de 2 minutos y evitaba la penalización de 30 segundos;
y había 8 puntos por ser de Costa Rica, que salieron por decisión de Robert. Solo la clasificación de
página restaba, y a menos páginas.

**Medido con un envío real** capturado del navegador: 73 puntos y categoría warm con la fórmula vieja,
38 y cold con la corregida. En value reportado, eso es **48 → 36**. Como el value va por escalones, un
lead solo cambia de value si cruza uno de los cortes (20, 50, 80): muchos cambian de puntaje sin
cambiar de value.

### Línea base antes de que entren los values nuevos

Últimos 30 días al 9 sep 2026, cuenta 6364218319, los dos mercados:

| acción | conv. | valor | valor/conv. |
|---|---|---|---|
| Contacto Reunión Argentina | 5,0 | 258,0 | 51,60 |
| Contacto WhatsApp Argentina | 25,0 | 203,0 | 8,12 |
| Scroll Argentina (2) | 183,0 | 183,0 | 1,00 |
| Contacto Correo Argentina | 3,0 | 120,0 | 40,00 |
| Contacto Reunión | 2,0 | 102,0 | 51,00 |
| Scroll | 98,0 | 98,0 | 1,00 |
| Contacto WhatsApp | 11,0 | 93,0 | 8,45 |
| Contacto Correo | 2,0 | 85,0 | 42,50 |
| Contacto Argentina | 4,0 | 73,0 | 18,25 |
| Contacto | 3,0 | 24,0 | 8,00 |

Por semana: 10 ago 72,1 conv. / 169,1; 17 ago 75,1 / 387,4; 24 ago 69,0 / 220,0; 31 ago 86,9 / 369,6;
7 sep 33,0 / 93,0 (semana en curso).

**«Contacto Formulario» y «Contacto Formulario Argentina» no registran ni una conversión en 30 días**,
lo que es coherente con 13 leads en cuatro meses. Las que sí registran son las viejas «Contacto» y
«Contacto Argentina», que siguen habilitadas y **pujando**. Conviene entender esa convivencia antes de
tocar cualquier value.

### Lo que esto le hace a la ventana de lectura del 5 oct

El cierre del 7 sep dejó escrito que **no se toca nada en Ads hasta la revisión del 5 de octubre**,
porque cualquier cambio contamina la lectura del efecto de la página de destino. Esta corrección **no
es un cambio en Ads**, pero sí cambia la señal que recibe Smart Bidding desde el 9 de septiembre.
Al leer octubre hay que tenerlo presente:

- El value medio de las conversiones de contacto puede bajar sin que el negocio haya empeorado: antes
  estaba inflado.
- La comparación de value contra las semanas de agosto **no es homogénea**. La frontera es el 9 sep.
- Lo que sí sigue siendo comparable: clics, impresiones, CPC, cuota de impresiones, nota de página de
  destino y leads serios del CRM, que no dependen del value.

### Qué NO se hizo, a propósito

No se tocó ninguna campaña, ni puja, ni presupuesto, ni acción de conversión, ni la tabla
`LEAD_SCORE_ADS_VALUE`, ni la escala 10/50 que el cierre del 7 sep confirmó alineada con la tasa de
cierre real por canal. La única decisión de negocio que movió el eje fue quitar los puntos por país, y
la tomó Robert.

### Verificado hoy

`verificar_acceso.py` en verde en sus cinco escalones: lectura de las cuatro campañas activas con sus
pujas, Keyword Planner, y escritura aceptada en `validate_only`. Nivel Basic operativo.

### 9 sep 2026 (cont.) — La señal de los dos sitios está limpia; las acciones viejas siguen pujando sin recibir nada

Robert pidió dejar limpia la señal a Ads en los dos sitios y decidir qué hacer con la convivencia
de «Contacto» (vieja) y «Contacto Formulario» (nueva). Verificado hoy, por ejecución y no por lectura:

**La señal que sale de los sitios está limpia, en los dos.**
- Bundles publicados (`linkdesign.cr/main-GPI6R2T6.js`, `nolo.ar/main-EKTTANII.js`): cada uno lleva
  **solo sus cinco labels nuevos**, una vez cada uno, y **ninguno de los dos labels viejos**
  (`qSMFCN2ek…` CR, `-7YECOqL7b…` AR) aparece en ninguno. Mismo método de la Vía 1 del 17 ago.
- `ads.service.ts` idéntico entre sitios salvo labels y comentarios; `LEAD_SCORE_ADS_VALUE` idéntica
  (30/36/48/60) y `sessionQualityFactor` idéntica. El scoring corregido está desplegado en ambos.

**Las viejas están muertas desde el deploy del 13 ago, medido por fecha de conversión** (no por fecha
de clic, que es la trampa anotada el 17 ago): «Contacto» y «Contacto Argentina» tienen **cero**
conversiones con `all_conversions_by_conversion_date` entre el 14 ago y el 9 sep. Las 3 y 4 que la
lectura por fecha de clic mostraba en los últimos 30 días son clics anteriores al deploy.

Lo que sí arrastran, por mes de conversión: «Contacto» jun 31/374, jul 18/235, ago 8/106;
«Contacto Argentina» jun 10/106, jul 28/495, ago 13/218. Todo con la escala vieja y el scoring roto, y
sin distinguir canal. **Las dos siguen ENABLED y primarias (pujan).** «Contacto Formulario» y su par AR:
cero conversiones desde que existen, coherente con 13 leads en cuatro meses.

**Veredicto.** No tiene sentido que pujen las dos: la vieja no aporta señal nueva y su histórico
mezcla cuatro canales con values inflados. Tampoco tiene sentido que reciban la misma señal (doble
conteo). Lo correcto es dejar pujando solo la nueva y pasar la vieja a **secundaria**: deja de contar
para Smart Bidding y conserva el histórico en los informes. **No eliminarla.**

**El riesgo, y por eso no se aplicó:** cambiar qué acciones son primarias puede reiniciar el período de
aprendizaje de la puja, y el cierre del 7 sep pide no tocar Ads hasta el 5 oct. Como las viejas llevan
cuatro semanas sin conversiones, su peso en la ventana de aprendizaje ya es casi nulo y el cambio
quita poca señal real; pero que Google reinicie o no el aprendizaje no se puede garantizar. Decide
Robert: ahora, o en la revisión del 5 oct.

**La operación está preparada y validada por el servidor** (`validate_only`, nada aplicado): dos
`ConversionActionOperation.update` con `primary_for_goal = false` sobre `6925111133` («Contacto») y
`7650100714` («Contacto Argentina»). Un campo por acción, reversible con la operación inversa. Script
en el scratchpad de la sesión, `ads-secundarias.py`; con `--apply` escribe.

**Decisión de Robert (9 sep, cierre):** no se toca. Queda como pendiente número 7 de la revisión del
5 oct, arriba. La señal de los dos sitios ya está limpia y verificada; lo único que sigue sucio es que
las dos acciones viejas pujan sin recibir nada, y eso se resuelve ese día.

### 9 sep 2026 · el hub y las fichas de demo ya reportan agendar y WhatsApp

Los tres botones de contacto de las páginas nuevas estaban muertos para Ads: «Agendar reunión» y
«WhatsApp» del hero de `/desarrollo-de-software-costa-rica`, y «Agendar reunión de 30 minutos» de la
sección de precio de las seis fichas. Abrían cal.com o wa.me sin llamar al `AdsService`, mientras el
mismo botón en el hero de `/software`, en el footer y en `/contacto` sí reporta. Desde el deploy de
hoy reportan las mismas conversiones que el resto del sitio (`scheduleMeeting` y `whatsapp`, con el
mismo value modulado por sesión). No se tocó nada en Ads: son las acciones y etiquetas de siempre.

**Para la lectura del 5 oct:** las conversiones de agendar y WhatsApp incluyen desde el 9 sep los
clics hechos en el hub y en las fichas, que antes no contaban. Si sube el conteo de esas dos acciones
sin que suba el de formularios, primero mirar cuánto viene de esas páginas antes de leerlo como
cambio de comportamiento.

Verificación: cuatro pruebas unitarias (una por botón y una por idioma en cada página; las de botón
vieron rojo antes del cambio y las de idioma se forzaron a fallar con una mutación), suite completa
en verde y HTML prerenderizado con el calendario correcto por idioma en hub y fichas.

### 10 sep 2026 · acciones 1 y 2 del plan de la nota de página de destino, en producción

Robert entregó la cédula jurídica (3-101-912048; la razón social es «3-101-912048 Sociedad Anónima»,
el mismo número) y aprobó el cambio. Desde hoy el pie de todas las páginas muestra, debajo de la
ubicación y con la misma letra: «L-V, 8 a 17» y «Cédula jurídica 3-101-912048» (en inglés «Mon-Fri,
8am-5pm» y «Legal ID 3-101-912048»). La razón social no se muestra porque repetiría el número; va,
junto con la cédula, en la ficha de marca que lee Google (`legalName` y `taxID` en `Organization`).
El horario vive ahora en un solo lugar (`src/app/company-info.ts`): el pie usa la forma corta y
`/contacto` la larga. Dos pruebas nuevas en el spec del pie. Lo mismo se hizo en Nolõ con sus datos
(NOLO CAAR, CUIT 30-71951427-4, L-V 9 a 18), así que **Argentina deja de ser control** para estas dos
acciones; el control queda solo para la acción 3.

La acción 3 (videos más livianos para celular) queda pendiente por decisión de Robert («lo vemos
después»). Lectura de la nota: 5 oct 2026, sin cambios.

### 10 sep 2026 · acción 3 del plan de la nota de página de destino, en producción

Videos livianos para celular en los dos bloques que están sobre el fold, en Link Design y en Nolõ.
El navegador elige el archivo por tamaño de pantalla con `<source media="(max-width: 760px)">`, así
que decide **antes** de descargar y no depende de la hidratación. En escritorio no cambia nada.

**De dónde salen los clips.** En `/web` no hubo que generar nada: el CRM ya produce una pieza de
720 px por proyecto (la que usa la tabla del portafolio) con el mismo contenido que el render de
hero de 1280, y el carrusel la ignoraba. En `/software` **no existía** versión chica: se generaron
los nueve clips con la misma receta del CRM (`scale=720:-2`, 30 fps, CRF 28, faststart, sin audio),
misma proporción 1,875 y mismo encuadre; viven en `public/media/software/<nombre>-mobile.mp4` y se
versionan en el repo (no vienen del CRM).

Peso descargado en celular, por bloque:

| bloque | antes | después |
|---|---:|---:|
| carrusel de `/web` (3 primeros) | 6,4 MB | 1,6 MB |
| pestañas de `/software` | 4,5 MB | 1,5 MB |
| viewcases de `/software` (6) | 12,3 MB | 3,9 MB |

Medido con Chrome real a 390 px y red 4G lenta (1,6 Mbps, 150 ms), caché desactivada, comparando
los dos builds servidos localmente: a los 10 s de abrir, el build viejo no había completado ningún
video y el nuevo ya tenía el primero (en `/software`, dos). Verificado además que a 390 px pide el
clip de 720 y a 1280 el original, en los dos sitios, en carrusel, pestañas y viewcases.

Tres pruebas nuevas por sitio fijan la regla (mutación: al quitar el `<source>` móvil se ponen
rojas). Con esto **el plan `docs/plan-nota-pagina-destino.md` queda ejecutado**: sus tres acciones
están en producción. La lectura de la nota sigue siendo el 5 oct 2026, y Argentina ya no es control
de nada porque recibió las tres.

Pendiente menor, fuera del plan: el viewcase de Vértice apunta al mismo archivo que la pestaña
«automatiza» (`vertice.mp4` y `automatiza.mp4` son idénticos); falta la grabación real de Vértice.

**Ampliación del mismo día:** las seis fichas de demo (`/desarrollo-de-software-<país>/:slug`) y las
secciones de demo de las siete páginas de sistema usan los mismos nueve videos, así que también
sirven el clip de 720 px en celular. El clip vive como campo `videoMobile` en el contenido de cada
ficha, con una prueba que exige que sea el nombre del video con sufijo `-mobile` para que nadie
apunte a un archivo inexistente al agregar una ficha (mutación comprobada). Con esto, **todos** los
videos de los dos sitios eligen archivo por tamaño de pantalla: carrusel de `/web`, pestañas y
viewcases de `/software`, fichas y páginas de sistema. La tabla del portafolio ya lo hacía.
