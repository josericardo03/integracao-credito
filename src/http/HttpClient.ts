import {
  HttpMethod,
  HttpClientOptions,
  HttpResponse,
  RequestBody,
} from "../types";

/**
 * Classe para realizar requisições HTTP
 * Suporta métodos GET, POST, PUT, DELETE
 */
export class HttpClient {
  private baseURL: string;
  private authToken: string | null;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL = "", options: HttpClientOptions = {}) {
    this.baseURL = baseURL;
    this.authToken = options.authToken || null;
    this.defaultHeaders = options.defaultHeaders || {};
  }

  /**
   * Define o token de autenticação
   */
  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  /**
   * Define cabeçalhos padrão
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = headers;
  }

  /**
   * Constrói os cabeçalhos da requisição
   */
  private buildHeaders(
    passedHeaders: Record<string, string> = {},
    removeContentType = false
  ): Record<string, string> {
    const authHeader: Record<string, string> = this.authToken
      ? { Authorization: `Bearer ${this.authToken}` }
      : {};

    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...authHeader,
      ...passedHeaders,
    };

    // Só adiciona Content-Type padrão se não foi removido e não foi definido
    if (!removeContentType && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  /**
   * Método genérico para realizar requisições HTTP
   */
  async request<T = any>(
    method: HttpMethod,
    route: string,
    body: RequestBody = null,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    try {
      const url = this.baseURL ? `${this.baseURL}${route}` : route;

      let requestBody: string | undefined;
      let finalHeaders = { ...headers };

      // Processa o body baseado no tipo
      if (body !== null && body !== undefined) {
        if (body instanceof URLSearchParams) {
          requestBody = body.toString();
          finalHeaders["Content-Type"] = "application/x-www-form-urlencoded";
        } else if (body instanceof FormData) {
          // FormData define seu próprio Content-Type com boundary
          // Não definir Content-Type, o navegador/Node fará isso
          requestBody = body as any; // FormData será tratado pelo fetch
          delete finalHeaders["Content-Type"];
        } else if (typeof body === "string") {
          requestBody = body;
          // Assume que Content-Type já foi definido ou será text/plain por padrão
        } else if (typeof body === "object") {
          requestBody = JSON.stringify(body);
          finalHeaders["Content-Type"] = "application/json";
        }
      }

      const config: RequestInit = {
        method: method.toUpperCase(),
        headers: this.buildHeaders(finalHeaders, body instanceof FormData),
      };

      // Adiciona body apenas para métodos que suportam
      if (
        requestBody !== undefined &&
        ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
      ) {
        config.body = requestBody;
      } else if (
        body instanceof FormData &&
        ["POST", "PUT", "PATCH"].includes(method.toUpperCase())
      ) {
        config.body = body as any;
      }

      const response = await fetch(url, config);

      // Tenta fazer parse do JSON, se não conseguir retorna texto
      let data: any;
      const contentType = response.headers.get("content-type");

      // Tenta parsear JSON mesmo se a resposta não for OK para retornar o erro detalhado
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          data = await response.text();
        }
      } else {
        data = await response.text();
      }

      return {
        status: response.status,
        statusText: response.statusText,
        data: data as T,
        headers: Object.fromEntries(response.headers.entries()) as Record<
          string,
          string
        >,
        ok: response.ok,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Erro na requisição ${method} ${route}: ${errorMessage}`);
    }
  }

  /**
   * Método GET
   */
  async get<T = any>(
    route: string,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>("GET", route, null, headers);
  }

  /**
   * Método POST
   */
  async post<T = any>(
    route: string,
    body: RequestBody = null,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>("POST", route, body, headers);
  }

  /**
   * Método PUT
   */
  async put<T = any>(
    route: string,
    body: RequestBody = null,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>("PUT", route, body, headers);
  }

  /**
   * Método DELETE
   */
  async delete<T = any>(
    route: string,
    headers: Record<string, string> = {}
  ): Promise<HttpResponse<T>> {
    return this.request<T>("DELETE", route, null, headers);
  }
}
