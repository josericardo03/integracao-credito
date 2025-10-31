import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthService } from "../services/AuthService";
import { HttpClient } from "../http/HttpClient";
import { CONFIG } from "../config/constants";

const router = Router();

const httpClient = new HttpClient();
const authService = new AuthService(httpClient, {
  tokenEndpoint: CONFIG.URLS.TOKEN_ENDPOINT,
  clientId: CONFIG.AUTH.CLIENT_ID,
  grantType: CONFIG.AUTH.GRANT_TYPE,
});

const authController = new AuthController(authService);

/**
 * @route   POST /auth/token
 * @desc    Gera um token de autenticação (requer username e password no body)
 * @access  Public
 */
router.post("/token", (req, res) => authController.generateToken(req, res));

/**
 * @route   GET /auth/get-token
 * @desc    Retorna apenas o token JWT com credenciais pré-configuradas
 * @access  Public
 */
router.get("/get-token", (req, res) => authController.getToken(req, res));

export default router;
