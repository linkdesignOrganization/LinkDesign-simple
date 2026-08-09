---
name: project-linkdesign-azure-deploy
description: LinkDesign-simple desplegado en Azure Static Web App (Standard) con CI/CD por GitHub Actions; gotchas del build en CI
metadata: 
  node_type: memory
  type: project
  originSessionId: 9282e6a5-fcaf-4f74-8958-47505206c4ed
---

`LinkDesign-simple` está desplegado en **Azure Static Web Apps** (2026-06-07):
- Recurso **`linkdesign-simple`** (SKU **Standard**, ~$9/mes), RG **`LinkDesign-Simple`**, suscripción **CEFSA-prod**, región **East US 2**.
- URL provisional: `black-wave-02ff68a0f.7.azurestaticapps.net`.
- CI/CD: **GitHub Actions** conectado a `linkdesignOrganization/LinkDesign-simple`; deploy automático en cada push a `main`. Build SSG (`outputMode: static`), output `dist/website/browser`.

**Gotchas del build en CI (Oryx) — no romper:**
- El `npm install` limpio fallaba con `ERESOLVE`: deps de Angular 21 desalineadas (`platform-server@^21.2.16` vs el resto `^21.2.0`). Fix: **`.npmrc` con `legacy-peer-deps=true`** (raíz del proyecto) + alinear `platform-server`/`ssr` a `^21.2.0`. **No borrar el `.npmrc`** o el deploy se rompe.
- Los `.mp4` se servían como `application/octet-stream` (iOS Safari no reproduce/seek). Fix: **`public/staticwebapp.config.json`** con `mimeTypes` `.mp4` → `video/mp4`.

**EN PRODUCCIÓN (2026-06-07):** `linkdesign.cr` y `www.linkdesign.cr` apuntan al SWA y sirven con HTTPS. DNS en **DNSimple**: `ALIAS @` + `CNAME www` → `black-wave-02ff68a0f.7.azurestaticapps.net`, validados con `TXT @` (token); ambos custom domains quedaron "Ready" con SSL. `LinkDesign-simple` ya **reemplazó a LinkDesign2.0** en producción (ver [[project-link-design-website]]).

**Páginas de detalle de sistema LIVE (2026-06-14):** `/software/:slug` (7 sistemas) con SSG + SEO dinámico por slug (`systemSeo`/`metaDescription`/`seoForUrl` en `seo-content.ts`; JSON-LD `Service` para `/software/<slug>`; `getPrerenderParams` en `app.routes.server.ts` → 13 rutas prerenderizadas; sitemap + llms.txt). Contenido portado de Sowe a voz **"tú"** + regionalismos CR (planilla→hoja de cálculo, vidriera→vitrina, seña→anticipo). El **footer identifica el lead por sistema** en el CRM (antepone `[Consulta desde la página del sistema: …]` al `message`, igual que Sowe). Slug inválido → `/404` brandeado. `isSoftware` pasó a match EXACTO + `isSystemDetail` (header back-only + artefacto en el hero). Mismo patrón en [[project-nolo-azure-deploy]].
