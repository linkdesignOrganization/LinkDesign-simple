---
name: google-ads-api-access
description: "Cómo se accede a la API de Google Ads: nivel Basic, service account y scripts propios (sin MCP)"
metadata: 
  node_type: memory
  type: project
  originSessionId: b9c98778-b289-483c-8de9-48ff01c05a7b
  modified: 2026-08-08T03:02:57.545Z
---

Acceso a la API de Google Ads, reconstruido el 30 jul 2026. Complementa [[google-ads-conversion-setup]].
Reemplaza a la memoria vieja `google-ads-api-mcp-access`, que quedó equivocada en tres cosas: ya no
hay MCP, el token ya no es Explorer, y **sí se interrumpía la autenticación** (decía lo contrario).

- **Nivel Basic desde el 28 jul 2026** (caso `9-8605000042015` aprobado): **15.000 ops/día**, y
  desbloquea **escritura (mutates)** y **Keyword Planner**, que Explorer prohibía. El token es el
  mismo de antes; solo cambió de nivel. Cierre completo en `docs/bitacora-google-ads-api-basic.md`.
- **NO hay MCP.** Se retiró el 30 jul 2026 por decisión del usuario: las consultas son únicas y
  responden al análisis del momento, no son cientos de llamadas repetitivas, así que un servidor
  read-only de 3 tools daba menos que un script — que además escribe y usa Keyword Planner. **Todo
  va por scripts ad-hoc**, y el usuario prefiere que cada uno se escriba en el momento según el
  análisis, en vez de mantener una biblioteca de scripts pre-hechos.
- **Auth por service account**, no por usuario: `ads-api@linkdesign-ads-api.iam.gserviceaccount.com`,
  agregada como usuaria del MCC en Administración → Acceso y seguridad (nivel Estándar; hereda las
  cuentas hijas). **No usa delegación de dominio ni impersona a nadie** — la documentación vigente
  agrega la SA directamente en Google Ads, lo que además acota el permiso. No caduca por reauth ni
  exige passkey, así que un script corre solo.
- **Todo vive en `%USERPROFILE%\.google-ads\`** (fuera del repo): `config.json` (developer token, MCC
  `3332293537`, versión de API), `ads-api-key.json` (ACL restringida), `ads.py` (base común) y
  `verificar_acceso.py` (diagnóstico de 5 niveles: identidad, alcance, lectura, Keyword Planner,
  escritura). **El developer token vive solo en `config.json`** — cuidarlo al mover cosas.
- **Cómo escribir un script**: el venv es `C:\Users\Roberth Castillo\.mcp-servers\google-ads-venv`
  (tiene `google-ads` 31.1.0) y un `.pth` ya expone el módulo, así que basta `import ads`:
  `ads.search(customer_id, gaql)`, `ads.cuentas()`, `ads.campos('campaign')`, `ads.error(exc)`.
  Constantes: `ads.MCC`, `ads.LINKDESIGN`, `ads.ZACATE`, `ads.PSICOYNG`. Ojo con dos trampas ya
  resueltas dentro del módulo: hace falta `use_proto_plus=True` (sin eso los enums son int y no
  existe `._pb` para el field_mask) y `validate_only` va **dentro** del request, no como argumento
  del método.
- **Cuentas visibles**: `6364218319` Link Design · `3332293537` MCC · `9018431297` PsicoYng ·
  `6593270911` Zacate Tierra Fertil (ver [[zacate-tierra-fertil-ads]]). La cuenta `6460296196` **ya
  no se ve**: no cuelga del MCC, era accesible solo desde el usuario.
- **El scope no limita nada**: `https://www.googleapis.com/auth/adwords` es el único que existe en
  esta API (no hay variante read-only). El techo real lo ponen el nivel de acceso de la SA en Google
  Ads y el developer token. Para GA4 o Search Console se haría igual: agregar el email de la SA allá.
  **Search Console ya se hizo así el 7 ago 2026** — ver [[search-console-api-access]]: misma SA,
  módulo `gsc.py` al lado de `ads.py`, y Search Console además vinculado a la cuenta de Ads.
- **Lo que ya no aplica**: el ADC de usuario (`gcloud auth application-default login`) queda solo
  como camino de emergencia. Desde el **5 ago 2026** generar refresh tokens nuevos exige **passkey**,
  con hasta 7 días de demora hasta que sea operativa — razón de peso para no volver a depender de él.

**Why:** el montaje es largo de reconstruir (token, service account, permisos, venv) y la forma de
trabajo — scripts ad-hoc, no MCP ni biblioteca fija — es una decisión explícita del usuario.
**How to apply:** para cualquier análisis de campañas, escribir un script nuevo con `import ads`
usando el venv indicado; si algo falla, correr `verificar_acceso.py` antes de diagnosticar a ciegas.
