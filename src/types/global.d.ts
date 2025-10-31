/**
 * Declaração de tipos globais para Node.js 18+
 * fetch, URLSearchParams, FormData e RequestInit estão disponíveis globalmente no Node.js 18+
 */

declare global {
  const fetch: typeof globalThis.fetch;
  const URLSearchParams: typeof globalThis.URLSearchParams;
  const FormData: typeof globalThis.FormData;
  type RequestInit = globalThis.RequestInit;
}

export {};
