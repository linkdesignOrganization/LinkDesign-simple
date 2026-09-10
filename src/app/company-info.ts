/**
 * Datos legales y horario del estudio: una sola fuente para el pie de página, /contacto y los
 * datos estructurados (Organization). Acordado con Robert el 10 sep 2026 (plan de la nota de
 * página de destino, docs/plan-nota-pagina-destino.md).
 */
export const COMPANY_LEGAL = {
  /** Razón social: el nombre legal es la misma cédula, así que en el pie solo se muestra la cédula. */
  legalName: '3-101-912048 Sociedad Anónima',
  taxId: '3-101-912048',
  showLegalName: false,
  label: { es: 'Cédula jurídica', en: 'Legal ID' }
} as const;

/** Horario de atención: largo para /contacto, corto para el pie. Coincide con el horario de las campañas (L-V 8-17). */
export const COMPANY_SCHEDULE = {
  es: { long: 'Lunes a viernes, 8 a 17', short: 'L-V, 8 a 17' },
  en: { long: 'Monday to Friday, 8am to 5pm', short: 'Mon-Fri, 8am-5pm' }
} as const;
