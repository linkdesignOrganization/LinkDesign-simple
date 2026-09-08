---
name: crm-como-fuente-de-verificacion
description: La base del CRM en producción se consulta en lectura para verificar los análisis de Ads; es la única fuente que sabe qué lead terminó en cliente
metadata: 
  node_type: memory
  type: project
  originSessionId: 0ae6d052-546c-431c-9f03-a56447457bfe
  modified: 2026-09-08T02:19:19.886Z
---

Google Ads solo sabe que hubo un "contacto". **El CRM sabe quién era, por qué canal llegó y si
terminó en cliente** — y eso lo vuelve la verificación obligada de cualquier conclusión de Ads que
hable de calidad de leads, no de volumen.

**Cómo se consulta** (solo lectura, siempre): la connection string está en
`server/.env` del repo del CRM (`COSMOS_DB_CONNECTION_STRING`), base `linkdesign-crm`. Un script
Node ad-hoc con el `mongodb` de sus `node_modules` alcanza; el mismo criterio que los scripts de
Ads — se escribe en el momento y no se guarda.

Colecciones que importan para Ads:

- `webleads` — los envíos del formulario público, con `detectedCountry`, `source.pageUrl` (trae el
  `gad_campaignid`), `scoreCategory` y `attribution.gclid`.
- `leads` — el pipeline comercial, con `sourceChannel` (WhatsApp / Email / Formulario / Otro) y
  `status`. Es lo único que dice qué canal produce clientes.
- `sitesessions` — sesiones por sitio con `entryGclid`, para separar tráfico pago del resto.

**Dos trampas de Cosmos y una del dato**, encontradas el 13 ago 2026:

1. **Cosmos rechaza `sort()` sobre campos sin índice** (`The index path corresponding to the
   specified order-by item is excluded`). Traer y ordenar en memoria: los volúmenes son chicos.
2. **`convertedToLeadId` está poblado en 1 de 13 web-leads.** La cadena
   `WebLead.gclid → convertedToLeadId → Lead.status` es teórica: en la práctica los leads se crean a
   mano y hay que emparejar por nombre de empresa, a ojo y con tildes que no coinciden.
3. **`sourceChannel` no es confiable para formularios**: R. Loría y Pacific Star Food llegaron por
   formulario y figuran como "Otro". Y los clientes históricos cargados de golpe aparecen como
   "ganado" el día de la carga, inflando cualquier tasa de cierre que no los descuente.

**Lo que agregó la revisión del 7 sep 2026** (la cita del 4 sep):

4. **El canal «Otro» del pipeline son dos cosas, no un cajón de sastre**: citas tomadas en el
   calendario del sitio («Reserva Automática», «Sacó su propia cita en el sitio web») y referidos de
   clientes. No existe canal «Reunión»: un clic de «Agendar reunión» que termina en cita aparece
   como «Otro» y el detalle está en `sourceOtherText`.
5. **Los clientes históricos se cargaron de golpe dos veces**: 11 el 13 ago y 4 más el 17 ago (We
   Drive CR, AMAG, La Caja Maestra, Link Design-Nolõ-CRM). Se reconocen porque nacen `ganado` sin
   recorrido (historial vacío o un único `ganado@` con la fecha de creación). Descontarlos siempre.
6. **Tasa de cierre por canal descontados esos 15** (al 7 sep 2026, todos los países): WhatsApp 3
   ganados de 19 resueltos (16 %), Email 4 de 11 (36 %). Solo Costa Rica: WhatsApp 30 %, Email
   40 %. La brecha existe pero es menor que el «14 de 15 perdidos» del 13 ago, que era de todos los
   países y anterior a que Deluxe Surfaces (WhatsApp) cerrara como ganado. Y ojo con la selección:
   al pipeline entra sólo el WhatsApp que valió la pena responder — en la ventana 14 ago–7 sep, de
   11 clics de WhatsApp en Costa Rica entraron 3.
7. **Ads y CRM no se enlazan solos**: el único cruce posible es fecha + canal + servicio. Así se
   emparejó el clic de «copiar correo» del 17 ago (campaña Software, value 45) con Expat Legal
   Advisors (lead por Email creado ese mismo día, ganado el 26 ago). Es coincidencia fuerte, no prueba.

**Why:** el 13 ago 2026 la inferencia desde Ads decía que Costa Rica había dejado de generar
formularios. El CRM lo confirmó con fecha exacta (el último es del 7 jul) **y corrigió un error**:
dos contactos que yo había leído como formularios por su value eran clics de copiar correo. Sin esa
segunda fuente, la conclusión habría salido con un dato falso adentro.

**How to apply:** cualquier afirmación sobre *calidad* de leads que salga solo de Ads es una
inferencia hasta que el CRM la confirme. Volumen y costo sí se leen de Ads; desenlace comercial,
nunca. Ver [[google-ads-conversion-setup]] y [[crm-repo-y-scoring-compartido]].
