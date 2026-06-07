// Reemplazado en build de producción por environment.prod.ts (ver angular.json → fileReplacements).
export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  /**
   * En dev se deja VACÍO para que LeadFormService SIMULE el envío
   * (console.log del payload + delay), sin mandar leads reales al CRM.
   * El endpoint real tiene Origin allowlist que bloquea localhost.
   */
  crmEndpoint: '',
  crmApiKey: ''
};
