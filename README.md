# Integração Crédito - HTTP Client e Serviço de Autenticação

Classe TypeScript para realizar requisições HTTP de forma simples e tipada, com serviço de autenticação para gerar tokens via Keycloak e API REST completa.

## Instalação

```bash
npm install
```

## Compilação

```bash
npm run build
```

Isso irá compilar o TypeScript para JavaScript na pasta `dist/`.

## Uso do HTTP Client

### Importação

```typescript
import { HttpClient } from "./src";

// Ou após o build:
import { HttpClient } from "integracao-credito";
```

### Exemplos

#### Básico

```typescript
const client = new HttpClient("https://api.exemplo.com");

const response = await client.get("/usuarios/1");
console.log(response.data);
```

#### Com Token de Autenticação

```typescript
const client = new HttpClient("https://api.exemplo.com", {
  authToken: "seu_token_jwt_aqui",
  defaultHeaders: {
    "X-App": "integracao-credito",
  },
});

// Ou definir o token depois:
client.setAuthToken("novo_token");
```

#### Métodos Disponíveis

```typescript
// GET
await client.get("/recurso");

// POST (com JSON)
await client.post("/recurso", { dados: "aqui" });

// POST (com form-urlencoded)
const formData = new URLSearchParams();
formData.append("key", "value");
await client.post("/recurso", formData);

// PUT
await client.put("/recurso/1", { dados: originais: "atualizados" });

// DELETE
await client.delete("/recurso/1");
```

## Serviço de Autenticação (AuthService)

O `AuthService` encapsula a lógica para gerar tokens de autenticação usando o Keycloak.

### Exemplo de Uso (direto no código)

```typescript
import { HttpClient, AuthService } from "./src";

const httpClient = new HttpClient();
const tokenEndpoint =
  "https://amtf.app.dimensa.com.br/keycloakcorebank/auth/realms/master/protocol/openid-connect/token";

const authService = new AuthService(httpClient, {
  tokenEndpoint,
  clientId: "portal-admin-web",
  grantType: "password",
});

async function getToken() {
  try {
    const token = await authService.generateToken({
      username: "INTEGRACAO",
      password: "sua_senha",
    });
    console.log("Token gerado:", token.access_token);
  } catch (error) {
    console.error("Erro ao gerar token:", error);
  }
}

getToken();
```

## API REST para Geração de Token

Foi criada uma API REST completa usando Express.js para expor o serviço de autenticação.

### Iniciar o Servidor

Para iniciar o servidor em modo de desenvolvimento (com hot-reloading):

```bash
npm run dev
```

Para iniciar o servidor após a compilação:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou na porta definida pela variável de ambiente `PORT`).

### Endpoint de Geração de Token

- **URL:** `POST /auth/token`
- **Descrição:** Gera um token de autenticação usando credenciais do Keycloak
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "username": "seu_usuario",
    "password": "sua_senha",
    "clientId": "portal-admin-web", // opcional
    "grantType": "password" // opcional
  }
  ```
- **Resposta de Sucesso (200):**
  ```json
  {
    "success": true,
    "data": {
      "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI...",
      "expires_in": 300,
      "refresh_expires_in": 1800,
      "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI...",
      "token_type": "Bearer",
      "not-before-policy": 0,
      "session_state": "...",
      "scope": "openid profile email"
    }
  }
  ```
- **Resposta de Erro (400/500):**
  ```json
  {
    "success": false,
    "message": "Erro ao gerar token",
    "error": "Mensagem de erro detalhada"
  }
  ```

### Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "username": "INTEGRACAO",
    "password": "sua_senha"
  }'
```

### Outros Endpoints

- **GET /** - Informações sobre a API
- **GET /health** - Health check do servidor

## Scripts

- `npm run build` - Compila TypeScript para JavaScript
- `npm run build:watch` - Compila em modo watch
- `npm run start` - Compila e inicia o servidor
- `npm run dev` - Inicia o servidor em modo desenvolvimento (hot-reload)
- `npm run example` - Executa o exemplo (requer ts-node)
- `npm run example:build` - Compila e executa o exemplo
- `npm run type-check` - Verifica tipos sem compilar

## Estrutura do Projeto

```
.
├── dist/                     # Código compilado (gerado)
├── examples/
│   └── usage.ts              # Exemplo de uso do HttpClient
├── src/
│   ├── controllers/
│   │   └── AuthController.ts # Controller para autenticação
│   ├── http/
│   │   └── HttpClient.ts     # Classe HTTP Client genérica
│   ├── routes/
│   │   └── auth.routes.ts    # Rotas de autenticação
│   ├── services/
│   │   └── AuthService.ts    # Serviço de autenticação
│   ├── types/
│   │   ├── global.d.ts       # Declarações de tipos globais
│   │   └── index.ts          # Tipos e interfaces
│   ├── app.ts                # Aplicação Express principal
│   └── index.ts              # Ponto de entrada e exportações
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Requisitos

- Node.js >= 18.0.0
- TypeScript >= 5.3.3

## Padrões de Código

O projeto segue os padrões de mercado com:

- **Separação de responsabilidades**: Controllers, Services e Routes separados
- **TypeScript**: Tipagem completa e estrita
- **Error handling**: Tratamento de erros apropriado
- **REST API**: Endpoints bem estruturados
- **CORS**: Configurado para desenvolvimento
