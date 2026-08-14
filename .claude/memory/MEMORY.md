# Memory Index

- [Accesos propios permanentes](accesos-propios-permanentes.md) — las credenciales de Ads, Search Console, DNSimple y Meta se conservan a propósito; no proponer revocarlas

- [Google Ads conversion setup](google-ads-conversion-setup.md) — estrategia de puja (Maximizar valor de conversión), Count:One y las acciones de conversión del sitio
- [Acceso a la API de Google Ads](google-ads-api-access.md) — nivel Basic, service account y scripts propios en `~\.google-ads\` (sin MCP)
- [Acceso a la Search Console API](search-console-api-access.md) — misma service account, permiso Completo, módulo `gsc.py`; ojo: país es `cri` no `crc`
- [Estructura de campañas Google Ads](google-ads-estructura-campanas.md) — dos mercados espejo: Búsqueda/Software (CR) y Búsqueda #2/Software #2 (Argentina, Nolõ); horario L-V 8-17; ~225 negativas en dos niveles
- [El CRM como fuente de verificación](crm-como-fuente-de-verificacion.md) — Ads dice volumen y costo; solo el CRM sabe qué canal produce clientes. Cualquier conclusión sobre calidad de leads se verifica ahí
- [CRM repo y scoring compartido](crm-repo-y-scoring-compartido.md) — el CRM es un repo hermano; el lead scoring está duplicado a mano **y desde 2026-08-11 candado por 22 vectores compartidos (idénticos en los 3 repos)**; regla: ESTE sitio es la fuente de verdad (alimenta el value de Ads), si hay divergencia se alinea el CRM
- [Imagen OG y el recorte de WhatsApp](og-image-recorte-whatsapp.md) — WhatsApp recorta al cuadrado central (630 de 1200), así que el logotipo no puede pasar de ~45% del ancho; desde 2026-08-11 la tarjeta muestra el logotipo «Link Design» y no el monograma; ojo: `SeoService.defaultImage` pisa el `og:image` del index.html
- [Sitios gemelos LinkDesign y Nolõ](sitios-gemelos-linkdesign-nolo.md) — dos sitios fork con la misma arquitectura (CR y Argentina); un cambio en uno suele aplicar al otro
- [Archivo del caso Azure SWA](azure-swa-case-tracking-file.md) — el tracking del caso de soporte por sobrefacturación vive en `LinkDesign\webOld\LinkDesign2.0`, no en este repo
- [Google Ads de Zacate Tierra Fertil](zacate-tierra-fertil-ads.md) — cuenta 6593270911: CPA ~1.1, presupuesto crónicamente corto (caso inverso a LinkDesign), keyword "cesped" QS 3 con 76% del gasto
- [Deploy de LinkDesign-simple en Azure](project-linkdesign-azure-deploy.md) — SWA Standard en CEFSA-prod, CI/CD GitHub Actions; gotchas: .npmrc legacy-peer-deps y mime video/mp4
