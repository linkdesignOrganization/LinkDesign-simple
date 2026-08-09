---
name: google-ads-conversion-setup
description: "Cómo está configurado Google Ads en el sitio LinkDesign (estrategia de puja, recuento, acciones de conversión)"
metadata: 
  node_type: memory
  type: project
  originSessionId: b5c723d7-e49d-44c1-9132-9f8b5c39d457
  modified: 2026-07-24T01:49:14.838Z
---

El sitio LinkDesign (linkdesign.cr) reporta conversiones a Google Ads (cuenta AW-16767245191). Config confirmada por el usuario en junio 2026:

- **Estrategia de puja:** "Maximizar valor de conversión" → el `value` de cada conversión SÍ alimenta a Smart Bidding (no es solo reporting). Por eso vale la pena que los values reflejen calidad.
- **Recuento (Count):** "Una" (One) → Google cuenta una sola conversión por click de anuncio dentro de la ventana, deduplicando los múltiples eventos de una misma sesión. Resuelve el doble-conteo sin necesidad de dedupe del lado del sitio.
- **Acciones de conversión (solo 2 vienen del sitio):**
  - CONTACTO (`qSMFCN2ek…`): agrupa formulario, WhatsApp, copiar correo y agendar reunión. Value variable.
  - SCROLL (`qZoeCOfls…`): scroll al 50%, value fijo 1.
- El formulario reporta value por lead scoring completo (30–60 por categoría: nurture 30 / cold 36 / warm 48 / hot 60). Los clicks de contacto modulan su value base (WhatsApp 10, copiar correo 50, agendar 60) por calidad de sesión con factor 0.7–1.0. Ver [[crm-repo-y-scoring-compartido]].
- **Escala ×2 desde el 23 jul 2026** (antes: form 15–30, clicks 5/25/30) para ampliar el contraste vs SCROLL=1. Plan en curso: aprendizaje sin tocar nada hasta el **13 ago 2026** (recordatorio en Calendar) → si el mix de valor Contacto ≥80% y los contactos se mantienen, activar **tROAS ~70%** en la campaña "Búsqueda"; luego ajustar ±10–15% cada 2 semanas mirando cantidad de contactos. Bitácora: `docs/bitacora-ads-values-troas.md` en el repo. OJO: el ratio valor/costo post-cambio no es comparable con el histórico (unidades duplicadas).
- Históricamente los leads contactan por una sola vía, así que el doble-conteo casi no ocurre en la práctica.
- **Sitio gemelo Nolõ (Argentina, ex-Sowe):** misma cuenta de Ads, misma estrategia "Maximizar valor de conversión" y misma modulación de clicks, pero acciones de conversión separadas (`-7YECOqL7b8c…` Contacto / `P_8YCIf4878c…` Scroll Argentina). Ver [[sitios-gemelos-linkdesign-nolo]].

**Why:** la estrategia de puja decide si el value de conversión mueve el bidding o es decorativo; acá mueve el bidding.
**How to apply:** antes de tocar values de conversión, recordar que alimentan Smart Bidding; y que Count:One ya deduplica, así que no hace falta dedupe client-side.
