import { AuthService } from "../../src/services/AuthService";
import { MockHttpClient } from "../mocks/HttpClient.mock";

describe("AuthService", () => {
  let authService: AuthService;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    authService = new AuthService(mockHttpClient as any, {
      tokenEndpoint: "https://api.test.com/token",
      clientId: "test-client",
      grantType: "password",
    });
  });

  afterEach(() => {
    mockHttpClient.clearMocks();
  });

  describe("generateToken", () => {
    it("deve gerar token com sucesso", async () => {
      // Arrange
      const mockTokenResponse = {
        data: {
          access_token: "mock_token_123",
          expires_in: 300,
          refresh_expires_in: 1800,
          refresh_token: "refresh_token_123",
          token_type: "Bearer",
          "not-before-policy": 0,
          session_state: "session_123",
          scope: "openid profile email",
        },
      };

      mockHttpClient.mockPost("https://api.test.com/token", mockTokenResponse);

      // Act
      const result = await authService.generateToken({
        username: "test_user",
        password: "test_password",
      });

      // Assert
      expect(result.access_token).toBe("mock_token_123");
      expect(result.token_type).toBe("Bearer");
      expect(result.expires_in).toBe(300);
    });

    it("deve lançar erro quando a resposta não é ok", async () => {
      // Arrange
      mockHttpClient.mockPost("https://api.test.com/token", {
        ok: false,
        status: 401,
        data: { error: "Invalid credentials" },
      });

      // Act & Assert
      await expect(
        authService.generateToken({
          username: "wrong_user",
          password: "wrong_password",
        })
      ).rejects.toThrow("Erro ao gerar token");
    });
  });
});
