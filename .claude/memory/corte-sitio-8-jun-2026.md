---
name: corte-sitio-8-jun-2026
description: El sitio actual entró el lunes 8 jun 2026; antes era LinkDesign2.0 con otra medición y otro anuncio en «Software». No comparar tasas de contacto de antes y después sin estas diferencias
metadata: 
  node_type: memory
  type: project
  originSessionId: a770481a-f47d-4bdd-853c-9c7534a21aff
  modified: 2026-09-18T03:04:11.876Z
---

El historial de este repo empieza el 7 jun 2026. **El sitio actual reemplazó a LinkDesign2.0 el lunes
8 jun**: ese día el scroll de las dos campañas de CR cae a 1 en toda la semana y vuelve el 15, tras
alinear las conversiones el 13. El código viejo sigue en `Desktop\LinkDesign\webOld\LinkDesign2.0`.

Tres diferencias que invalidan una comparación ingenua de antes y después:

- **Medición del correo.** El sitio viejo contaba «copiar correo» (value 25) con el botón **y con
  cualquier copia manual del texto** (`(copy)="handleEmailCopy()"`); el nuevo, sólo con el botón.
  Además tenía llamada (value 15) y reunión por Google Calendar (value 30).
- **Dónde estaba el correo.** En `/software` viejo, en la barra superior del hero; hoy, sólo al pie.
  WhatsApp fijo en la barra desde el 1 jul.
- **Lo que anunciaba «Software».** Sitelinks «Sitios web corporativos» y «Sitios web Creativos» hasta el
  8 jun, y textos destacados de web hasta el 10 ago. Los 17 leads de CR de marzo a mayo fueron todos
  de web; los únicos 3 de software interno llegaron después.

**Why:** el 17 sep 2026 Robert preguntó por qué «Software» se había estancado. Los «buenos meses»
(febrero a mayo) corrieron sobre otra página, otra medición y otro anuncio. Los serios por visita se
partieron a la mitad, pero parte es de medición.

**How to apply:** al comparar cualquier tasa de contacto con meses anteriores al 8 jun 2026, decir que
es otro sitio y otra medición. El detalle y los números están en la entrada del 17 sep de
`docs/bitacora-ads-values-troas.md`. Ver [[google-ads-conversion-setup]] y
[[google-ads-estructura-campanas]].
