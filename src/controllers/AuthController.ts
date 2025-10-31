import { Request, Response } from "express";
import { AuthService, GenerateTokenParams } from "../services/AuthService";
import { CONFIG } from "../config/constants";

/**
 * Controller para gerenciar requisições de autenticação
 */
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Endpoint para gerar token de autenticação
   * POST /auth/token
   */
  async generateToken(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, clientId, grantType } = req.body;

      // Validação dos campos obrigatórios
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: "Username e password são obrigatórios",
        });
        return;
      }

      const params: GenerateTokenParams = {
        username,
        password,
        ...(clientId && { clientId }),
        ...(grantType && { grantType }),
      };

      const tokenResponse = await this.authService.generateToken(params);

      res.status(200).json({
        success: true,
        data: tokenResponse,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro ao gerar token:", errorMessage);

      res.status(500).json({
        success: false,
        message: "Erro ao gerar token",
        error: errorMessage,
      });
    }
  }

  /**
   * Endpoint para obter token com credenciais pré-configuradas
   * GET /auth/get-token
   * Retorna apenas o token JWT como string
   */
  async getToken(_req: Request, res: Response): Promise<void> {
    try {
      const params: GenerateTokenParams = {
        username: CONFIG.AUTH.USERNAME,
        password: CONFIG.AUTH.PASSWORD,
        clientId: CONFIG.AUTH.CLIENT_ID,
        grantType: CONFIG.AUTH.GRANT_TYPE,
      };

      const tokenResponse = await this.authService.generateToken(params);

      // Retorna apenas o access_token como string pura
      res.status(200).send(tokenResponse.access_token);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro ao obter token:", errorMessage);

      res.status(500).json({
        error: "Erro ao gerar token",
        message: errorMessage,
      });
    }
  }
}
