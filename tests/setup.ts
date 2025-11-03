/**
 * Configuração global dos testes
 */

// Timeout padrão para testes (5 segundos)
jest.setTimeout(5000);

// Mock de console para testes (evita poluir os logs)
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
};
