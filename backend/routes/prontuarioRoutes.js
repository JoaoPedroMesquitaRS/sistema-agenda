import express from 'express';
import { criarProntuario, listarProntuario } from '../controllers/prontuarioController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarProntuario);
router.post('/', autenticarToken, criarProntuario);

export default router;