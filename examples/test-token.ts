import { HttpClient, AuthService } from "../src";

/**
 * Exemplo de como usar o AuthService diretamente
 */
async function testTokenGeneration() {
  console.log("🔐 Testando geração de token...\n");

  const httpClient = new HttpClient();
  const tokenEndpoint =
    "https://amtf.app.dimensa.com.br/keycloakcorebank/auth/realms/master/protocol/openid-connect/token";

  const authService = new AuthService(httpClient, {
    tokenEndpoint,
    clientId: "portal-admin-web",
    grantType: "password",
  });

  try {
    const tokenResponse = await authService.generateToken({
      username: "INTEGRACAO",
      password: "dmt@2025", // Substitua pela senha correta
    });

    console.log("✅ Token gerado com sucesso!");
    console.log("\n📋 Resposta completa:");
    console.log(JSON.stringify(tokenResponse, null, 2));

    console.log("\n🔑 Access Token:");
    console.log(tokenResponse.access_token);

    console.log("\n⏰ Expira em:", tokenResponse.expires_in, "segundos");
    console.log(
      "🔄 Refresh Token:",
      tokenResponse.refresh_token.substring(0, 50) + "..."
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Erro ao gerar token:", errorMessage);
  }
}

// Executar o teste
testTokenGeneration();
