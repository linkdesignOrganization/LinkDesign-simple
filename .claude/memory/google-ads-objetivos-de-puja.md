---
name: google-ads-objetivos-de-puja
description: "Qué acciones de conversión pujan de verdad en cada campaña: la trampa de las tres tablas de objetivos, y el objetivo personalizado de Argentina"
metadata: 
  node_type: memory
  type: project
  modified: 2026-08-19T03:34:14.573Z
  originSessionId: fca0de06-c8f2-412b-ba58-134dc54d9a5d
---

Una acción de conversión puede **medir perfecto y no pujar**. Son dos preguntas distintas y se
verifican contra tablas distintas de la API. Confundirlas ya produjo un falso OK que costó tres días
hábiles de puja a ciegas en Argentina (18 ago 2026).

## La trampa: hay que mirar tres tablas, y en este orden

1. **`conversion_goal_campaign_config`** — primero, siempre. Si trae un `custom_conversion_goal`, la
   campaña usa un **objetivo personalizado** y la puja la decide **esa lista de acciones**. Las otras
   dos tablas quedan irrelevantes.
2. `campaign_conversion_goal` — categorías biddable propias de la campaña. **«Ninguna categoría
   biddable» NO significa «hereda las de la cuenta»**: es justamente la *firma* de que hay un
   objetivo personalizado. Ese fue el error de lectura del 17 ago 2026.
3. `customer_conversion_goal` — las de la cuenta, que sólo aplican si la campaña no tiene lo suyo.

La prueba empírica que no depende de interpretar nada: comparar `metrics.all_conversions` (todo lo
que entra) contra `metrics.conversions` (lo que alimenta Smart Bidding). Si una acción tiene
`all_conversions > 0` y `conversions = 0`, **está fuera de la puja de esa campaña**.

## Cómo está hoy la cuenta 6364218319

- **Costa Rica** — «Búsqueda» (21910466866) y «Software» (23552967347): sin objetivo personalizado,
  pujan `CONTACT/WEBSITE`. Por eso las acciones de CR **deben ser CONTACT**; con `SUBMIT_LEAD_FORM` o
  `BOOK_APPOINTMENT` quedarían fuera sin ningún aviso.
- **Argentina** — «Búsqueda #2» (23949699115) y «Software #2» (23939960385): usan el **objetivo
  personalizado «Contacto Argentina», id `6458009700`**. Su categoría (`DEFAULT`) no decide nada:
  decide la lista. Desde el 18 ago 2026 tiene las seis acciones AR (Scroll, la vieja Contacto, y
  WhatsApp/Correo/Reunión/Formulario).

**Regla operativa:** toda acción nueva para Argentina hay que **agregarla al objetivo `6458009700` a
mano**. Crear la acción y verificar su label no alcanza — eso prueba que mide, no que puja.

## Cómo se modifica

`CustomConversionGoalService`, operación `update` con `update_mask` sobre `conversion_actions`. El
campo es **repetido**: el update **reemplaza la lista completa**, así que hay que enviar todas las
acciones que deben quedar, no sólo las que se agregan. Validar con `validate_only` dentro del request
antes de escribir, y **releer del servidor** después (no confiar en el eco de la respuesta).

`change_event` **no cubre** objetivos de conversión, así que un cambio acá no se puede fechar por
API — sólo por el historial de cambios de la interfaz.

Esta memoria describe **la cuenta**, que es una sola para los dos mercados — por eso menciona las
campañas argentinas. **El caso argentino del 18 ago 2026 se documenta en la bitácora de Nolõ**
(`docs/bitacora-ads.md` de ese repo), no acá: una bitácora por sitio.

Ver [[google-ads-conversion-setup]] y [[google-ads-estructura-campanas]].
