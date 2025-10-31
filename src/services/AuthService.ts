import { HttpClient } from "../http/HttpClient";

/**
 * Interface para a resposta do token de autenticação
 */
export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}

/**
 * Interface para os parâmetros de geração de token
 */
export interface GenerateTokenParams {
  username: string;
  password: string;
  clientId?: string;
  grantType?: string;
}

/**
 * Configuração do serviço de autenticação
 */
export interface AuthServiceConfig {
  tokenEndpoint: string;
  clientId?: string;
  grantType?: string;
}

/**
 * Serviço para gerenciar autenticação e tokens
 */
export class AuthService {
  private httpClient: HttpClient;
  private config: Required<AuthServiceConfig>;

  constructor(httpClient: HttpClient, config: AuthServiceConfig) {
    this.httpClient = httpClient;
    this.config = {
      tokenEndpoint: config.tokenEndpoint,
      clientId: config.clientId || "portal-admin-web",
      grantType: config.grantType || "password",
    };
  }

  /**
   * Gera um token de autenticação usando username e password
   */
  async generateToken(params: GenerateTokenParams): Promise<TokenResponse> {
    const { username, password } = params;
    const clientId = params.clientId || this.config.clientId;
    const grantType = params.grantType || this.config.grantType;

    // Cria o body no formato form-urlencoded
    const formData = new URLSearchParams();
    formData.append("client_id", clientId);
    formData.append("grant_type", grantType);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await this.httpClient.post<TokenResponse>(
        this.config.tokenEndpoint,
        formData
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao gerar token: ${response.status} - ${JSON.stringify(
            response.data
          )}`
        );
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Falha ao gerar token: ${errorMessage}`);
    }
  }
}
