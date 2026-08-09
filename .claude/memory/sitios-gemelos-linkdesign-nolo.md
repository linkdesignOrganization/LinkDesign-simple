---
name: sitios-gemelos-linkdesign-nolo
description: LinkDesign-simple y Nolõ (ex-Sowe) son sitios gemelos con la misma arquitectura; un cambio en uno suele aplicar al otro
metadata: 
  node_type: memory
  type: project
  originSessionId: b5c723d7-e49d-44c1-9132-9f8b5c39d457
  modified: 2026-07-30T18:44:35.443Z
---

Hay DOS sitios web gemelos, forks con la misma arquitectura Angular (mismo lead-form, lead-score, lead-tracking, AdsService, contact-footer, etc.):

- **LinkDesign** (Costa Rica): `C:\Users\Roberth Castillo\Desktop\LinkDesign\WEB\LinkDesign-simple`, repo `linkdesignOrganization/LinkDesign-simple`, dominio linkdesign.cr.
- **Nolõ** (Argentina, ex-"Sowe"): `C:\Users\Roberth Castillo\Desktop\Nolo\WEB`, repo `linkdesignOrganization/nolo-simple` (renombrado desde `sowe-simple` ~junio 2026; el remote local ya apunta al nuevo nombre). Workflow de deploy `azure-swa-nolo.yml`. **Bitácora de Ads: `docs/bitacora-ads.md`** en ese repo. La carpeta local se llamó `Desktop\Sowe` hasta el 30 jul 2026 — si aparece esa ruta en notas viejas, es esto; la carpeta de memoria del proyecto se movió a la par (`...Desktop-Nolo-WEB`).

Ambos:
- Deployan por push directo a `main` vía Azure Static Web Apps (~2 min). El deploy hace `ng build`, NO corre los unit tests (un test rojo no bloquea el deploy).
- Comparten cuenta de Google Ads y config de puja (ver [[google-ads-conversion-setup]]), con acciones de conversión separadas por país.
- Comparten el lead scoring portado del CRM (ver [[crm-repo-y-scoring-compartido]]).

Diferencias a tener presentes al replicar: IDs de conversión de Ads, branding/copy, teléfonos (+506 vs +54) y que los specs pueden divergir (p.ej. el spec de contact-footer de Nolõ no mockeaba LeadFormService y el de LinkDesign sí).

**How to apply:** cuando se pida "hacer lo mismo en el otro sitio", la implementación suele ser mecánica (mismos archivos/rutas), pero verificar IDs, branding y specs antes de pushear; cada uno deploya a su propio main.
