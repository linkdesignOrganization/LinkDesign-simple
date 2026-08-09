---
name: crm-repo-y-scoring-compartido
description: El CRM de LinkDesign es un repo hermano que comparte la lógica de lead scoring con el sitio (duplicada a mano)
metadata: 
  node_type: memory
  type: reference
  originSessionId: b5c723d7-e49d-44c1-9132-9f8b5c39d457
---

El CRM de LinkDesign vive en `C:\Users\Roberth Castillo\Desktop\LinkDesign CRM` (repo separado del sitio LinkDesign-simple).

- El **lead scoring** existe DUPLICADO en ambos repos, verificado idéntico (junio 2026):
  - Sitio: `src/app/lead-form/utils/lead-score.ts` → `computeLeadScore()`.
  - CRM: `server/src/modules/web-leads/web-lead.scoring.ts` → `calculateScore()`.
  - Misma fórmula (pesos, umbrales, regex) y mismo input (el CRM puntúa el payload crudo sin mutarlo; su detección de país por Origin va a `detectedCountry`, separada del score). No hay test ni import compartido que los ate: la paridad se mantiene a mano (riesgo de drift documentado en el header de lead-score.ts).
- El **endpoint público del CRM** (`POST /api/v1/leads`, en Azure App Service) NO devuelve el score en su respuesta (solo `lead_id`/`status`/`received_at`); por eso el sitio recalcula su copia para poblar el value de Ads. El CRM sí lo tiene calculado al responder (~2 líneas exponerlo, si algún día se quiere una sola fuente de verdad).
- Solo el formulario llega al CRM; los clicks de contacto (WhatsApp/correo/agendar) no generan WebLead, por eso su modulación de value es puramente client-side. Ver [[google-ads-conversion-setup]].

**How to apply:** si se tocan pesos/umbrales del scoring en un repo, replicar en el otro o el value que el sitio manda a Ads se desincroniza de la categoría que el CRM almacena.
