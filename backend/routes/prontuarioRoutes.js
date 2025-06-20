import express from 'express';
import { criarProntuario, listarProntuario } from '../controllers/prontuarioController.js';

const router = express.Router();

router.get('/', listarProntuario);
router.post('/', criarProntuario);

export default router;