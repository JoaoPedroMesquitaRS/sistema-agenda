import express from 'express';
import { alterarConsultaStatus, buscarConsulta, criarConsulta, deletarConsulta, listarConsulta } from '../controllers/consultaController.js';

const router = express.Router()

router.get('/', listarConsulta);
router.post('/', criarConsulta);
router.delete('/:id', deletarConsulta)

// BUSCAR CONSULTAS POR PROFISSIONAL [id]
router.get('/:profissionalId/:dia', buscarConsulta);

// 
router.put('/:id', alterarConsultaStatus);

export default router;