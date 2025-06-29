import express from 'express';
import { alterarEspecialidade, criarEspecialidade, excluirEspecialidade, listarEspecialidade, listarId } from '../controllers/especialidadeController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarEspecialidade);
router.post('/', autenticarToken, criarEspecialidade);
router.put('/:id', autenticarToken, alterarEspecialidade);
router.get('/:id', autenticarToken, listarId);
router.delete('/:id', autenticarToken, excluirEspecialidade);

export default router;