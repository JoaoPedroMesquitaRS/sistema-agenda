import express from 'express';
import { alterarProfissional, criarProfissional, excluirProfissional, listarProfissional } from '../controllers/profissionalController.js';

const router = express.Router();

router.get('/', listarProfissional);
router.post('/', criarProfissional);
router.put('/:id', alterarProfissional);
router.delete('/:id', excluirProfissional);


export default router;