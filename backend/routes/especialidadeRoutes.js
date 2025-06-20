import express from 'express';
import { alterarEspecialidade, criarEspecialidade, excluirEspecialidade, listarEspecialidade, listarId } from '../controllers/especialidadeController.js';

const router = express.Router();

router.get('/', listarEspecialidade);
router.post('/', criarEspecialidade);
router.put('/:id', alterarEspecialidade);
router.get('/:id', listarId);
router.delete('/:id', excluirEspecialidade);

export default router;