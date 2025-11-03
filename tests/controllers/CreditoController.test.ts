import { Request, Response } from "express";
import { CreditoController } from "../../src/controllers/CreditoController";
import { CreditoService } from "../../src/services/CreditoService";

describe("CreditoController", () => {
  let creditoController: CreditoController;
  let mockCreditoService: jest.Mocked<CreditoService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Mock do CreditoService
    mockCreditoService = {
      listarModalidades: jest.fn(),
      listarOperacoes: jest.fn(),
    } as any;

    creditoController = new CreditoController(mockCreditoService);

    // Mock de Request e Response
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listarModalidades", () => {
    it("deve retornar modalidades com sucesso", async () => {
      // Arrange
      const mockModalidades = [
        { id: 1, nome: "Crédito Pessoal" },
        { id: 2, nome: "Crédito Consignado" },
      ];

      mockCreditoService.listarModalidades.mockResolvedValue(
        mockModalidades as any
      );

      // Act
      await creditoController.listarModalidades(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockModalidades,
      });
      expect(mockCreditoService.listarModalidades).toHaveBeenCalledTimes(1);
    });

    it("deve retornar erro 500 quando o service falha", async () => {
      // Arrange
      const error = new Error("Erro ao buscar modalidades");
      mockCreditoService.listarModalidades.mockRejectedValue(error);

      // Mock console.error para não poluir os logs de teste
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      // Act
      await creditoController.listarModalidades(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Erro ao listar modalidades",
        error: "Erro ao buscar modalidades",
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("listarOperacoes", () => {
    it("deve retornar operações com sucesso", async () => {
      // Arrange
      const mockOperacoes = [
        { id: 1, descricao: "Operação 1" },
        { id: 2, descricao: "Operação 2" },
      ];

      mockCreditoService.listarOperacoes.mockResolvedValue(
        mockOperacoes as any
      );

      // Act
      await creditoController.listarOperacoes(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockOperacoes,
      });
    });
  });
});
