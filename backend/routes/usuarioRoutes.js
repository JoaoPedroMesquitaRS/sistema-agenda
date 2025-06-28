import express from 'express';
import { alterarUsuario, buscarId, criarUsuario, deletarUsuario, listarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuario);
router.post('/', criarUsuario);
router.delete('/:id', deletarUsuario);
router.get('/:id', buscarId);
router.put('/:id', alterarUsuario);

export default router;