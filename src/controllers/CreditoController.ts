import { Request, Response } from "express";
import { CreditoService } from "../services/CreditoService";

/**
 * Controller para gerenciar requisições relacionadas a crédito
 */
export class CreditoController {
  private creditoService: CreditoService;

  constructor(creditoService: CreditoService) {
    this.creditoService = creditoService;
  }

  /**
   * Endpoint para listar modalidades
   * GET /credito/modalidades
   */
  async listarModalidades(_req: Request, res: Response): Promise<void> {
    try {
      const modalidades = await this.creditoService.listarModalidades();

      res.status(200).json({
        success: true,
        data: modalidades,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro ao listar modalidades:", errorMessage);

      res.status(500).json({
        success: false,
        message: "Erro ao listar modalidades",
        error: errorMessage,
      });
    }
  }

  /**
   * Endpoint para listar operações
   * GET /credito/operacoes
   */
  async listarOperacoes(_req: Request, res: Response): Promise<void> {
    try {
      const operacoes = await this.creditoService.listarOperacoes();

      res.status(200).json({
        success: true,
        data: operacoes,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      console.error("Erro ao listar operações:", errorMessage);

      res.status(500).json({
        success: false,
        message: "Erro ao listar operações",
        error: errorMessage,
      });
    }
  }
}
