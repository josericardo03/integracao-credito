import { HttpClient } from "../http/HttpClient";
import { AuthService } from "./AuthService";
import { CONFIG } from "../config/constants";

/**
 * Interface para a resposta da modalidade
 */
export interface ModalidadeResponse {
  // Ajuste conforme a resposta real da API
  [key: string]: any;
}

/**
 * Interface para a resposta de operações
 */
export interface OperacaoResponse {
  // Ajuste conforme a resposta real da API
  [key: string]: any;
}

/**
 * Service para consultar serviços de crédito
 */
export class CreditoService {
  private httpClient: HttpClient;
  private authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  /**
   * Obtém o token de autenticação automaticamente
   */
  private async getAuthToken(): Promise<string> {
    const tokenResponse = await this.authService.generateToken({
      username: CONFIG.AUTH.USERNAME,
      password: CONFIG.AUTH.PASSWORD,
      clientId: CONFIG.AUTH.CLIENT_ID,
      grantType: CONFIG.AUTH.GRANT_TYPE,
    });
    return tokenResponse.access_token;
  }

  /**
   * Lista as modalidades de crédito
   */
  async listarModalidades(): Promise<ModalidadeResponse> {
    const token = await this.getAuthToken();
    this.httpClient.setAuthToken(token);

    const response = await this.httpClient.get<ModalidadeResponse>(
      CONFIG.ROTAS.LISTAR_MODALIDADES
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao listar modalidades: ${response.status} - ${JSON.stringify(
          response.data
        )}`
      );
    }

    return response.data;
  }

  /**
   * Lista as operações de crédito
   */
  async listarOperacoes(): Promise<OperacaoResponse> {
    const token = await this.getAuthToken();
    this.httpClient.setAuthToken(token);

    const response = await this.httpClient.get<OperacaoResponse>(
      CONFIG.ROTAS.LISTAR_OPERACOES
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao listar operações: ${response.status} - ${JSON.stringify(
          response.data
        )}`
      );
    }

    return response.data;
  }
}
