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
- **Acciones de conversión — un canal, una acción desde el 13 ago 2026** (5 vienen del sitio):
  - `Contacto WhatsApp` (`PFEECM2UquEc…`), `Contacto Correo` (`U_F7CMiVquEc…`), `Contacto Reunión` (`WVgrCMuVquEc…`), `Contacto Formulario` (`VGKrCL6XquEc…`) — las cuatro **CONTACT/WEBSITE**, y esa categoría es obligatoria: "Búsqueda" y "Software" tienen `campaign_conversion_goal = CONTACT/WEBSITE`, así que cualquier otra las dejaría fuera de la puja **sin ningún aviso**.
  - SCROLL (`qZoeCOfls…`): scroll al 50%, value fijo 1.
  - La vieja CONTACTO (`qSMFCN2ek…`) agrupaba los cuatro canales; queda ENABLED para conservar su histórico pero **el sitio ya no la dispara**. Esa mezcla escondió durante semanas que la campaña "Búsqueda" había dejado de traer formularios.
- El formulario reporta value por lead scoring completo (30–60 por categoría: nurture 30 / cold 36 / warm 48 / hot 60). Los clicks de contacto modulan su value base (WhatsApp 10, copiar correo 50, agendar 60) por calidad de sesión con factor 0.7–1.0. Ver [[crm-repo-y-scoring-compartido]].
- **Escala ×2 desde el 23 jul 2026** (antes: form 15–30, clicks 5/25/30) para ampliar el contraste vs SCROLL=1. OJO: el ratio valor/costo post-cambio no es comparable con el histórico (unidades duplicadas).
- **Revisión del 13 ago 2026 — el tROAS NO se activó** y sigue sin haberlo: los cuatro gates dieron NO (mix 71,6 % contra el 80 % pedido; ratio real 0,59 contra el 0,9 que suponía la fórmula del target). Lo que apareció al revisar es más importante que el gate: la campaña "Búsqueda" pasó de 44–61 % de leads serios a **0 de 10** — sólo WhatsApp — y el costo por lead serio en Costa Rica trepó de 34 a **255 USD** mientras Argentina lo bajaba a 25. El CRM lo confirma aparte: **el último formulario de CR es del 7 jul**. Y el pipeline muestra por qué importa: de los leads de WhatsApp ya cerrados se perdieron **14 de 15**. Bitácora completa: `docs/bitacora-ads-values-troas.md`.
- Históricamente los leads contactan por una sola vía, así que el doble-conteo casi no ocurre en la práctica.
- **Sitio gemelo Nolõ (Argentina, ex-Sowe):** misma cuenta de Ads, misma estrategia "Maximizar valor de conversión" y misma modulación de clicks, pero acciones de conversión separadas. También separadas por canal desde el 13 ago 2026: `zxm7CMGXquEc…` WhatsApp, `tU5ZCMSXquEc…` Correo, `GPuTCMeXquEc…` Reunión, `ZAj_CMqXquEc…` Formulario, `P_8YCIf4878c…` Scroll. Las suyas son **DEFAULT/WEBSITE** (no CONTACT): sus campañas usan los objetivos de la cuenta, donde DEFAULT/WEBSITE puja. Ver [[sitios-gemelos-linkdesign-nolo]].

**Why:** la estrategia de puja decide si el value de conversión mueve el bidding o es decorativo; acá mueve el bidding.
**How to apply:** antes de tocar values de conversión, recordar que alimentan Smart Bidding; y que Count:One ya deduplica, así que no hace falta dedupe client-side.
