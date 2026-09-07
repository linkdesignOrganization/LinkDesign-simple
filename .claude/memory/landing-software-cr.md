---
name: landing-software-cr
description: Landing /desarrollo-de-software-costa-rica en producción sin indexar (2026-09-07); cómo se revisa, qué es provisional y qué NO hacer hasta que Robert la apruebe
metadata:
  type: project
---

Landing «Desarrollo de software a la medida en Costa Rica» en `/desarrollo-de-software-costa-rica`,
en producción desde el 2026-09-07 (commit `508cd25`) **solo para revisión**: `noindex, nofollow`
(meta desde `SEO_CONTENT` + `X-Robots-Tag` en `public/staticwebapp.config.json`), sin enlaces
entrantes, fuera del sitemap y del llms.txt, solo ES (ruta top-level fuera de los árboles de idioma,
como `/ads`). Contenido en `src/app/pages/software-cr-content.ts`; página en `software-cr-page.ts`;
`app.ts`/`app.html` le dan tema software, grilla del shell y nav propio (`SOFTWARE_CR_NAV`).

**Why:** Robert quiere ver velocidad y scroll reales antes de decidir; el sitio tiene una estructura
de UI muy específica que hay que mantener limpia. Bitácora del plan en
`~/dev/WebSite/PLAN-CONTENIDO-SEO.md` (ronda 2 + copy v1).

**How to apply:** los cambios se hacen en local, se revisan y se suben; **no** indexar, enlazar ni
agregar al sitemap/llms.txt hasta que él lo diga. Los valores marcados `PROVISIONAL` en el contenido
(desde 2020, 26 proyectos, propuesta en 5 días hábiles, garantía 60 días, infraestructura USD 20-80,
integraciones, casos reales) están pendientes de confirmación. Los rangos salen de las 58 propuestas
con monto del CRM.
