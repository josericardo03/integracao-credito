# Testes Unitários

## 🎯 Estrutura

```
tests/
├── mocks/              # Mocks reutilizáveis
│   └── HttpClient.mock.ts
├── services/           # Testes de Services
│   ├── AuthService.test.ts
│   └── CreditoService.test.ts
├── controllers/        # Testes de Controllers
│   └── CreditoController.test.ts
├── setup.ts           # Configuração global
└── README.md          # Esta documentação
```

## 🚀 Como Rodar

### Rodar todos os testes

```bash
npm test
```

### Rodar com watch (re-executa ao salvar)

```bash
npm run test:watch
```

### Rodar com coverage (cobertura de código)

```bash
npm run test:coverage
```

### Rodar com logs detalhados

```bash
npm run test:verbose
```

## 📝 Como Escrever Testes

### Padrão AAA (Arrange, Act, Assert)

```typescript
it("deve fazer algo", async () => {
  // Arrange (Preparar)
  const mockData = { id: 1, nome: "Teste" };
  mockService.metodo.mockResolvedValue(mockData);

  // Act (Agir)
  const result = await service.metodo();

  // Assert (Verificar)
  expect(result).toEqual(mockData);
});
```

### Testando Services

```typescript
describe("MeuService", () => {
  let service: MeuService;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient();
    service = new MeuService(mockHttpClient as any);
  });

  it("deve funcionar", async () => {
    // seu teste aqui
  });
});
```

### Testando Controllers

```typescript
describe("MeuController", () => {
  let controller: MeuController;
  let mockService: jest.Mocked<MeuService>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockService = { metodo: jest.fn() } as any;
    controller = new MeuController(mockService);

    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("deve retornar 200", async () => {
    // seu teste aqui
  });
});
```

## 📊 Coverage

Após rodar `npm run test:coverage`, abra:

```
coverage/lcov-report/index.html
```

Meta de cobertura: **80%+**

## ✅ Boas Práticas

1. **Um teste por comportamento**
2. **Nomes descritivos**: "deve retornar erro quando..."
3. **Mock de dependências externas**
4. **Testes independentes** (não dependem uns dos outros)
5. **Limpar mocks** após cada teste (afterEach)

## 🔍 Exemplos de Testes

Ver arquivos:

- `services/AuthService.test.ts` - Exemplo de teste de service
- `services/CreditoService.test.ts` - Exemplo com múltiplos mocks
- `controllers/CreditoController.test.ts` - Exemplo de teste de controller
