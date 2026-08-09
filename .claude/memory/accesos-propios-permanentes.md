---
name: accesos-propios-permanentes
description: El usuario quiere que las capacidades de API propias se recuerden en toda sesión; las credenciales son permanentes y no hay que proponer revocarlas
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 83731e7b-9931-41fd-a7bd-c33a30880356
  modified: 2026-08-08T04:26:28.624Z
---

Decisión explícita del **7 ago 2026**: las credenciales de las APIs propias **se conservan
indefinidamente** y el usuario espera que su existencia se recuerde en cualquier sesión, de cualquier
proyecto.

Aplica a: Google Ads y Search Console (`%USERPROFILE%\.google-ads\`, ver
[[google-ads-api-access]] y [[search-console-api-access]]), **DNSimple**
(`%USERPROFILE%\.dnsimple\config.json`) y Meta / WhatsApp Business del CRM de Tierra Fértil.

- **No proponer revocar ni borrar estos tokens.** Ofrecí revocar el de DNSimple tras usarlo, ya
  advirtiendo que da control del DNS de los quince dominios, y el usuario respondió que lo dejara
  precisamente porque quiere que siga disponible. Volver a proponerlo es desandar una decisión ya
  tomada.
- No son restos de un montaje puntual ni deuda técnica pendiente de limpiar.
- El montaje que sostiene esto se hizo el mismo día: índice en `~\.claude\CLAUDE.md` (se carga en
  toda sesión) + skills `google-ads` y `dns` con el manual + un `CLAUDE.md` por repo.

**Why:** estas capacidades no se anuncian solas —son scripts propios, no herramientas MCP—, así que
sin un recordatorio deliberado se pierden entre sesiones; y al usuario ya le pasó tener que
reconstruir el acceso a la API de Ads desde cero.
**How to apply:** darlas por disponibles y usarlas cuando la tarea lo pida, sin pedir permiso para
leer. Para escribir —mutates en Ads, cambios de DNS— siguen valiendo las cautelas de cada skill.
