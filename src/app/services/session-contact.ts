/**
 * Piezas puras del beacon v3 (oct 2026): con qué se empareja una conversión de Google Ads con
 * la visita que la produjo, y la visita con la persona que escribió o agendó.
 * Ver docs/bitacora-ads-values-troas.md, entrada del 27 oct 2026.
 */

/** Botones de contacto. Los nombres son los métodos de AdsService (y los del CRM). */
export type ContactActionType = 'whatsapp' | 'emailCopy' | 'scheduleMeeting';

export interface ContactAction {
  type: ContactActionType;
  /** Momento del toque (reloj del browser; el CRM lo corrige contra el suyo). */
  atMs: number;
  /** Página donde se tocó. */
  path: string;
}

/** Dispositivo con las mismas tres categorías que usa Google Ads en `segments.device`. */
export type SessionDevice = 'mobile' | 'tablet' | 'desktop';

/** Un visitante real toca 1-3 botones; el CRM rechaza más de 20. */
export const MAX_CONTACT_ACTIONS = 20;

/** Pregunta oculta del formulario de cal.com que recibe el sessionId de la visita. */
export const CALENDAR_REF_PARAM = 'ref';

const CONTACT_TYPES: readonly ContactActionType[] = ['whatsapp', 'emailCopy', 'scheduleMeeting'];
const CAMPAIGN_ID_PATTERN = /^\d{1,20}$/;
const MAX_PATH_LEN = 512;

/**
 * `gad_campaignid` de la URL de entrada: el id de la campaña de Ads que trajo la visita. Google
 * lo agrega solo a cada clic. Solo dígitos; cualquier otra cosa es null.
 */
export function campaignIdFrom(params: URLSearchParams): string | null {
  const value = (params.get('gad_campaignid') || '').trim();
  return CAMPAIGN_ID_PATTERN.test(value) ? value : null;
}

/**
 * Dispositivo a partir del user agent. El iPad moderno se presenta como Mac: lo delata que
 * tenga pantalla táctil.
 */
export function detectDevice(userAgent: string, maxTouchPoints: number): SessionDevice {
  const ua = userAgent || '';
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return 'tablet';
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return 'mobile';
  return 'desktop';
}

/**
 * Enlace de cal.com con el sessionId de la visita en la pregunta oculta `ref`. Si el enlace ya
 * trae un `ref`, se pisa: el que vale es el de esta visita.
 */
export function withCalendarRef(href: string, sessionId: string): string {
  if (!sessionId) return href;
  try {
    const url = new URL(href);
    if (!/(^|\.)cal\.com$/i.test(url.hostname)) return href;
    url.searchParams.set(CALENDAR_REF_PARAM, sessionId);
    return url.toString();
  } catch {
    return href;
  }
}

/** Nuevo botón tocado, sumado a la lista (con el tope del CRM: se conservan los primeros). */
export function appendContact(
  list: readonly ContactAction[],
  type: ContactActionType,
  atMs: number,
  path: string
): ContactAction[] {
  if (list.length >= MAX_CONTACT_ACTIONS) return [...list];
  return [...list, { type, atMs, path: (path || '/').slice(0, MAX_PATH_LEN) }];
}

/** Lista re-leída de sessionStorage: solo lo que el CRM aceptaría. */
export function sanitizeContactActions(value: unknown): ContactAction[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (a): a is ContactAction =>
        !!a &&
        typeof a === 'object' &&
        CONTACT_TYPES.includes((a as ContactAction).type) &&
        Number.isInteger((a as ContactAction).atMs) &&
        (a as ContactAction).atMs > 0 &&
        typeof (a as ContactAction).path === 'string' &&
        (a as ContactAction).path.startsWith('/')
    )
    .slice(0, MAX_CONTACT_ACTIONS)
    .map((a) => ({ type: a.type, atMs: a.atMs, path: a.path.slice(0, MAX_PATH_LEN) }));
}

/** Id de campaña re-leído de sessionStorage. */
export function sanitizeCampaignId(value: unknown): string | null {
  return typeof value === 'string' && CAMPAIGN_ID_PATTERN.test(value) ? value : null;
}

/** Dispositivo re-leído de sessionStorage. */
export function sanitizeDevice(value: unknown): SessionDevice | null {
  return value === 'mobile' || value === 'tablet' || value === 'desktop' ? value : null;
}
