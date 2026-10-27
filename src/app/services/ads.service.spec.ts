import { CONTACTO_BASE_VALUE } from './ads.service';

/**
 * Values base de los clics de contacto (docs/bitacora-ads-values-troas.md, entrada del 2026-10-26).
 * «Agendar» bajó de 60 a 10: el clic abre el calendario y casi nunca termina en cita (en Costa Rica,
 * 1 de 8 entre el 7 sep y el 23 oct), mientras que 3 de los 12 WhatsApp de «Búsqueda» sí terminaron
 * en una. El correo copiado sigue en 50: ese value se calibró contra cierres el 2026-09-07.
 */
describe('CONTACTO_BASE_VALUE', () => {
  it('agendar vale lo mismo que WhatsApp', () => {
    expect(CONTACTO_BASE_VALUE.scheduleMeeting).toBe(CONTACTO_BASE_VALUE.whatsapp);
  });

  it('copiar el correo vale cinco veces un WhatsApp', () => {
    expect(CONTACTO_BASE_VALUE.emailCopy).toBe(5 * CONTACTO_BASE_VALUE.whatsapp);
  });
});
