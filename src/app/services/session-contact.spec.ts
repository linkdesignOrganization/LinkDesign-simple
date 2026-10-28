import {
  MAX_CONTACT_ACTIONS,
  appendContact,
  campaignIdFrom,
  detectDevice,
  sanitizeCampaignId,
  sanitizeContactActions,
  sanitizeDevice,
  withCalendarRef
} from './session-contact';

/**
 * Beacon v3: lo que se empareja con Google Ads y con quien escribió o agendó
 * (docs/bitacora-ads-values-troas.md, entrada del 27 oct 2026). Dos riesgos: mandar al CRM algo
 * que rechace (y perder la sesión entera), y que el enlace de cal.com salga sin el número de la
 * visita o rompa el enlace.
 */
describe('withCalendarRef', () => {
  const base = 'https://cal.com/linkdesign.cr/reunion-con-link-design';

  it('agrega el sessionId de la visita en la pregunta oculta', () => {
    expect(withCalendarRef(base, 'sess_12345678')).toBe(`${base}?ref=sess_12345678`);
  });

  it('respeta los parámetros que ya trae y pisa un ref viejo', () => {
    expect(withCalendarRef(`${base}?month=2026-11&ref=viejo123`, 'sess_12345678')).toBe(
      `${base}?month=2026-11&ref=sess_12345678`
    );
  });

  it('no toca enlaces que no son de cal.com, ni uno roto, ni sin sessionId', () => {
    expect(withCalendarRef('https://wa.me/50672325943', 'sess_12345678')).toBe('https://wa.me/50672325943');
    expect(withCalendarRef('https://notcal.com.evil.io/x', 'sess_12345678')).toBe('https://notcal.com.evil.io/x');
    expect(withCalendarRef('no es url', 'sess_12345678')).toBe('no es url');
    expect(withCalendarRef(base, '')).toBe(base);
  });
});

describe('campaignIdFrom', () => {
  it('lee gad_campaignid de la URL de un clic de Ads', () => {
    const p = new URLSearchParams('gad_source=1&gad_campaignid=21910466866&gclid=abc');
    expect(campaignIdFrom(p)).toBe('21910466866');
  });

  it('sin el parámetro, o con basura, es null (el CRM rechazaría la basura)', () => {
    expect(campaignIdFrom(new URLSearchParams(''))).toBeNull();
    expect(campaignIdFrom(new URLSearchParams('gad_campaignid=219<script>'))).toBeNull();
  });
});

describe('detectDevice', () => {
  it('clasifica como Google Ads: celular, tablet y computadora', () => {
    const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148';
    const android = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36';
    const androidTablet = 'Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 Chrome/130 Safari/537.36';
    const ipadComoMac = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15';
    const windows = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36';
    expect(detectDevice(iphone, 5)).toBe('mobile');
    expect(detectDevice(android, 5)).toBe('mobile');
    expect(detectDevice(androidTablet, 5)).toBe('tablet');
    expect(detectDevice(ipadComoMac, 5)).toBe('tablet');
    expect(detectDevice(ipadComoMac, 0)).toBe('desktop'); // una Mac de verdad
    expect(detectDevice(windows, 0)).toBe('desktop');
  });
});

describe('appendContact', () => {
  it('suma el botón con su hora y su página', () => {
    expect(appendContact([], 'whatsapp', 1000, '/software')).toEqual([
      { type: 'whatsapp', atMs: 1000, path: '/software' }
    ]);
  });

  it('no pasa del tope que acepta el CRM', () => {
    let list = appendContact([], 'whatsapp', 1, '/');
    for (let i = 2; i <= MAX_CONTACT_ACTIONS + 5; i++) list = appendContact(list, 'whatsapp', i, '/');
    expect(list).toHaveLength(MAX_CONTACT_ACTIONS);
    expect(list[0].atMs).toBe(1);
  });
});

describe('lo re-leído de sessionStorage', () => {
  it('se queda solo con lo que el CRM aceptaría', () => {
    const guardado = [
      { type: 'whatsapp', atMs: 1000, path: '/software' },
      { type: 'llamada', atMs: 1000, path: '/' },
      { type: 'emailCopy', atMs: 1.5, path: '/' },
      { type: 'scheduleMeeting', atMs: 2000, path: 'sin-barra' },
      null
    ];
    expect(sanitizeContactActions(guardado)).toEqual([{ type: 'whatsapp', atMs: 1000, path: '/software' }]);
    expect(sanitizeContactActions('basura')).toEqual([]);
    expect(sanitizeCampaignId('23552967347')).toBe('23552967347');
    expect(sanitizeCampaignId(23552967347)).toBeNull();
    expect(sanitizeDevice('mobile')).toBe('mobile');
    expect(sanitizeDevice('heladera')).toBeNull();
  });
});
