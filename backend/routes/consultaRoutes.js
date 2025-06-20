import express from 'express';
import { buscarConsulta, criarConsulta, listarConsulta } from '../controllers/consultaController.js';

const router = express.Router()

router.get('/', listarConsulta);
router.post('/', criarConsulta);

// BUSCAR CONSULTAS POR PROFISSIONAL [id]
router.get('/:profissionalId/:dia', buscarConsulta);

export default router;