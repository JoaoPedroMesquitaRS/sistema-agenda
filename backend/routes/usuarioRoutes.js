import express from 'express';
import { criarUsuario, listarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', listarUsuario);
router.post('/', criarUsuario);

export default router;