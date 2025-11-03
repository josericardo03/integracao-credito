import { HttpResponse } from "../../src/types";

/**
 * Mock do HttpClient para testes
 */
export class MockHttpClient {
  private mockResponses: Map<string, any> = new Map();
  private authToken: string | null = null;

  // Simula setAuthToken
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  // Simula setDefaultHeaders
  setDefaultHeaders(_headers: Record<string, string>): void {
    // Mock vazio - underscore indica parâmetro não usado intencionalmente
  }

  // Configura resposta mockada para uma rota
  mockGet<T>(route: string, response: Partial<HttpResponse<T>>): void {
    this.mockResponses.set(`GET:${route}`, {
      status: 200,
      statusText: "OK",
      ok: true,
      headers: {},
      ...response,
    });
  }

  mockPost<T>(route: string, response: Partial<HttpResponse<T>>): void {
    this.mockResponses.set(`POST:${route}`, {
      status: 200,
      statusText: "OK",
      ok: true,
      headers: {},
      ...response,
    });
  }

  // Simula requisição GET
  async get<T>(route: string): Promise<HttpResponse<T>> {
    const response = this.mockResponses.get(`GET:${route}`);
    if (!response) {
      return {
        status: 404,
        statusText: "Not Found",
        ok: false,
        headers: {},
        data: {} as T,
      };
    }
    return response;
  }

  // Simula requisição POST
  async post<T>(route: string, _body?: any): Promise<HttpResponse<T>> {
    const response = this.mockResponses.get(`POST:${route}`);
    if (!response) {
      return {
        status: 404,
        statusText: "Not Found",
        ok: false,
        headers: {},
        data: {} as T,
      };
    }
    return response;
  }

  // Verifica se o token foi configurado
  getAuthToken(): string | null {
    return this.authToken;
  }

  // Limpa mocks
  clearMocks(): void {
    this.mockResponses.clear();
    this.authToken = null;
  }
}
