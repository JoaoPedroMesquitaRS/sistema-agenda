import express from 'express';
import { alterarProfissional, criarProfissional, excluirProfissional, listarProfissional } from '../controllers/profissionalController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarProfissional);
router.post('/', autenticarToken, criarProfissional);
router.put('/:id', autenticarToken, alterarProfissional);

// AUTH N OK
router.delete('/:id', autenticarToken, excluirProfissional);


export default router;