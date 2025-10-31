import { Router } from "express";
import { CreditoController } from "../controllers/CreditoController";
import { CreditoService } from "../services/CreditoService";
import { AuthService } from "../services/AuthService";
import { HttpClient } from "../http/HttpClient";
import { CONFIG } from "../config/constants";

const router = Router();

// Configuração dos services
const authHttpClient = new HttpClient();
const creditoHttpClient = new HttpClient(CONFIG.URLS.CREDITO_BASE);

const authService = new AuthService(authHttpClient, {
  tokenEndpoint: CONFIG.URLS.TOKEN_ENDPOINT,
  clientId: CONFIG.AUTH.CLIENT_ID,
  grantType: CONFIG.AUTH.GRANT_TYPE,
});

const creditoService = new CreditoService(creditoHttpClient, authService);
const creditoController = new CreditoController(creditoService);

/**
 * @route   GET /credito/modalidades
 * @desc    Lista as modalidades de crédito
 * @access  Public (mas requer autenticação interna)
 */
router.get("/modalidades", (req, res) =>
  creditoController.listarModalidades(req, res)
);

/**
 * @route   GET /credito/operacoes
 * @desc    Lista as operações de crédito
 * @access  Public (mas requer autenticação interna)
 */
router.get("/operacoes", (req, res) =>
  creditoController.listarOperacoes(req, res)
);

export default router;
