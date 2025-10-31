/**
 * Configurações e constantes da aplicação
 */
export const CONFIG = {
  // Credenciais de autenticação
  AUTH: {
    USERNAME: "INTEGRACAO",
    PASSWORD: "dmt@2025",
    CLIENT_ID: "portal-admin-web",
    GRANT_TYPE: "password",
  },

  // URLs dos serviços
  URLS: {
    CREDITO_BASE: "https://amtf.app.dimensa.com.br/tfscreditoservice",
    TOKEN_ENDPOINT:
      "https://amtf.app.dimensa.com.br/keycloakcorebank/auth/realms/master/protocol/openid-connect/token",
  },

  // Rotas da API
  ROTAS: {
    LISTAR_MODALIDADES: "/rest/backoffice/listarmodalidade",
    LISTAR_OPERACOES: "/rest/operacao/listaroperacao",
  },
} as const;
