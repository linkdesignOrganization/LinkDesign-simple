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

**Candado de vectores desde 2026-08-11:** los tres repos corren los MISMOS 22 vectores
(`lead-score-vectors.shared.ts`, idéntico byte a byte junto a `lead-score.ts`); tocar la fórmula en
un solo lado pone su suite en rojo. **Regla de oro de Robert: la prioridad #1 es Google Ads** — LA
COPIA DE ESTE SITIO es la fuente de verdad (su score decide el value de Smart Bidding); si hay
divergencia se alinea el CRM, nunca este repo; si un cambio altera lo que ve Ads, no se hace. La
tabla `LEAD_SCORE_ADS_VALUE` (null/30/36/48/60) quedó candada por test explícito.

**2026-09-08 · la calificación se limpió entera** (bitácora: `~/dev/WebSite/PLAN-CALIFICACION-LEADS.md`,
auditoría: `AUDITORIA-CALIFICACION-LEADS.md`). Venía portada del sitio viejo en junio y medía seis cosas
distintas de las que decía: clasificaba el origen con secciones que ya no existen, mandaba **todo** el
tráfico en inglés a un cajón heredado, contaba dos veces la primera página, medía el tiempo con la
pestaña abierta, comparaba dominios de correo contra catorce cadenas exactas y puntuaba el prefijo que
el propio sitio anteponía al mensaje. Un lead real pasó de 73 puntos y categoría tibia a 38 y fría.
**Lo que hay que saber hoy:** el archivo de vectores compartido es `b50741998910ec24…` con 27 vectores,
idéntico en los tres repos, y **cubre los siete valores del vocabulario de origen**; el país ya no da
puntos a nadie, pero el dato se conserva y ahora se distingue de la marca (la marca rutea el correo, el
país es informativo); y **abrir una página con formulario obliga a clasificar su origen**, con una prueba
que lo caza sola porque saca el inventario del árbol de rutas real. El contrato del envío va por `1.6.0`.
