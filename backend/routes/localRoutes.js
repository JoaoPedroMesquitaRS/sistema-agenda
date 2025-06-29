import express from 'express';
import { alterarLocal, criarLocal, excluirLocal, listarId, listarLocal } from '../controllers/localController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarLocal);
router.post('/', autenticarToken, criarLocal);
router.put('/:id', autenticarToken, alterarLocal);

// BUSCA POR ID
router.get('/:id', autenticarToken, listarId);

router.delete('/:id', autenticarToken, excluirLocal);

export default router;