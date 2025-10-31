import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import creditoRoutes from "./routes/credito.routes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware de CORS (para permitir requisições de diferentes origens)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Rotas
app.use("/auth", authRoutes);
app.use("/credito", creditoRoutes);

// Rota de health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API de Integração Crédito está funcionando!",
    version: "1.0.0",
    endpoints: {
      auth: {
        token: "POST /auth/token",
        getToken: "GET /auth/get-token",
      },
      credito: {
        modalidades: "GET /credito/modalidades",
        operacoes: "GET /credito/operacoes",
      },
    },
  });
});

// Rota de health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: err.message,
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📝 Endpoint de token: POST http://localhost:${PORT}/auth/token`);
});

export default app;
