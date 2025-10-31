/**
 * Tipos e interfaces para o HttpClient
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpClientOptions {
  authToken?: string | null;
  defaultHeaders?: Record<string, string>;
}

export interface HttpResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
  ok: boolean;
}

// Tipos para URLSearchParams e FormData (disponíveis no Node.js 18+)
type URLSearchParamsType = typeof URLSearchParams extends new (
  ...args: any
) => infer R
  ? R
  : never;
type FormDataType = typeof FormData extends new (...args: any) => infer R
  ? R
  : never;

export type RequestBody =
  | string
  | object
  | URLSearchParamsType
  | FormDataType
  | null;

export interface RequestConfig {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
}
