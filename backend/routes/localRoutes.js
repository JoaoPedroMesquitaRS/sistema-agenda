import express from 'express';
import { alterarLocal, criarLocal, excluirLocal, listarId, listarLocal } from '../controllers/localController.js';

const router = express.Router();

router.get('/', listarLocal);
router.post('/', criarLocal);
router.put('/:id', alterarLocal);

// BUSCA POR ID
router.get('/:id', listarId);


router.delete('/:id', excluirLocal);

export default router;