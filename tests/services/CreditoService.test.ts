import { CreditoService } from "../../src/services/CreditoService";
import { AuthService } from "../../src/services/AuthService";
import { MockHttpClient } from "../mocks/HttpClient.mock";

describe("CreditoService", () => {
  let creditoService: CreditoService;
  let mockHttpClient: MockHttpClient;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();

    // Mock do AuthService
    mockAuthService = {
      generateToken: jest.fn().mockResolvedValue({
        access_token: "mock_token_123",
        expires_in: 300,
        refresh_expires_in: 1800,
        refresh_token: "refresh_123",
        token_type: "Bearer",
        "not-before-policy": 0,
        session_state: "session_123",
        scope: "openid profile email",
      }),
    } as any;

    creditoService = new CreditoService(mockHttpClient as any, mockAuthService);
  });

  afterEach(() => {
    mockHttpClient.clearMocks();
    jest.clearAllMocks();
  });

  describe("listarModalidades", () => {
    it("deve listar modalidades com sucesso", async () => {
      // Arrange
      const mockModalidades = {
        data: [
          { id: 1, nome: "Crédito Pessoal" },
          { id: 2, nome: "Crédito Consignado" },
        ],
      };

      mockHttpClient.mockGet(
        "/rest/backoffice/listarmodalidade",
        mockModalidades
      );

      // Act
      const result = await creditoService.listarModalidades();

      // Assert
      expect(result).toEqual(mockModalidades.data);
      expect(mockAuthService.generateToken).toHaveBeenCalledTimes(1);
      expect(mockHttpClient.getAuthToken()).toBe("mock_token_123");
    });

    it("deve lançar erro quando a API retorna erro", async () => {
      // Arrange
      mockHttpClient.mockGet("/rest/backoffice/listarmodalidade", {
        ok: false,
        status: 500,
        data: { error: "Internal Server Error" },
      });

      // Act & Assert
      await expect(creditoService.listarModalidades()).rejects.toThrow(
        "Erro ao listar modalidades"
      );
    });
  });

  describe("listarOperacoes", () => {
    it("deve listar operações com sucesso", async () => {
      // Arrange
      const mockOperacoes = {
        data: [
          { id: 1, descricao: "Operação 1" },
          { id: 2, descricao: "Operação 2" },
        ],
      };

      mockHttpClient.mockGet("/rest/operacao/listaroperacao", mockOperacoes);

      // Act
      const result = await creditoService.listarOperacoes();

      // Assert
      expect(result).toEqual(mockOperacoes.data);
      expect(mockAuthService.generateToken).toHaveBeenCalledTimes(1);
    });
  });
});
