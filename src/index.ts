export { HttpClient } from "./http/HttpClient";
export type {
  HttpMethod,
  HttpClientOptions,
  HttpResponse,
  RequestConfig,
  RequestBody,
} from "./types";

// Exports do módulo de autenticação
export { AuthService } from "./services/AuthService";
export type {
  TokenResponse,
  GenerateTokenParams,
  AuthServiceConfig,
} from "./services/AuthService";

export { AuthController } from "./controllers/AuthController";

// Exports do módulo de crédito
export { CreditoService } from "./services/CreditoService";
export type {
  ModalidadeResponse,
  OperacaoResponse,
} from "./services/CreditoService";

export { CreditoController } from "./controllers/CreditoController";
