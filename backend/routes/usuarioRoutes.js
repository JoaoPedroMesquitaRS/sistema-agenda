import express from 'express';
import { alterarUsuario, buscarId, criarUsuario, deletarUsuario, listarUsuario } from '../controllers/usuarioController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarUsuario);
router.post('/', autenticarToken, criarUsuario);
router.delete('/:id', autenticarToken, deletarUsuario);
router.get('/:id', autenticarToken, buscarId);
router.put('/:id', autenticarToken, alterarUsuario);

export default router;