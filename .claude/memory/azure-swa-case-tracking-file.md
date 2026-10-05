---
name: azure-swa-case-tracking-file
description: Dónde vive el caso de soporte de Azure por sobrefacturación de Static Web Apps, y cómo saber su estado en segundos (vigilante diario)
metadata:
  node_type: memory
  type: reference
  originSessionId: e4c1e166-d944-4ce6-8ffd-2b5646e349f0
  modified: 2026-09-25T03:53:49.292Z
---

El tracking del caso de soporte de Microsoft por sobrefacturación de Azure Static Web Apps está en el sitio **viejo** de LinkDesign, no en `LinkDesign-simple`:

- `C:\Users\Roberth Castillo\Desktop\LinkDesign\webOld\LinkDesign2.0\AZURE-SWA-OVERCHARGE-CASE.md` — bitácora completa del caso (suscripción `CEFSA-prod`, reclamo de $254.15). Tickets: `2605150040000686`, el original, cerrado desde el 12 ago 2026; y `2609180040000290`, abierto el 17 sep 2026 para exigir que se aplique el crédito ya aprobado. **El §1 abre con el estado vigente**; los comandos de verificación están en §8.
- `AZURE-SWA-TICKET-REPLY-<fecha>.md` y `AZURE-SWA-NEW-TICKET-<fecha>.md`, en la misma carpeta — un archivo por mensaje enviado o por enviar a Microsoft; el de fecha más reciente es el último.

**Para saber el estado en segundos**, antes de consultar nada: una tarea programada de Windows corre un vigilante todos los días a las 11:17. Si algo cambió (respuesta, estado o ingeniero asignado de un ticket, factura o crédito), deja `AZURE-SWA-ALERTA.md` en esa carpeta. Desde el 2026-09-24 los avisos **se acumulan** hasta que alguien borra el archivo; antes cada uno pisaba al anterior, y así una respuesta de Microsoft pasó seis días sin verse, tapada por el aviso de una factura ajena al caso. Aun así, el `watch.log` es el registro completo: leerlo, no solo la alerta. Su log y su último estado están en `%LOCALAPPDATA%\linkdesign-azure-watch\`. Es solo de esta máquina, no de la Mac.

Los archivos del caso **no están commiteados**, incluido el script del vigilante: viven solo en este disco.

Cuesta encontrarlo porque la carpeta `LinkDesign\web` fue renombrada a `LinkDesign\webOld` al migrar al sitio nuevo; el caso quedó ahí. Relacionado: [[sitios-gemelos-linkdesign-kravonia]].
