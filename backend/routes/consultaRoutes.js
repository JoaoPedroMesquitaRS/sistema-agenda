import express from 'express';
import { alterarConsultaStatus, buscarConsulta, criarConsulta, deletarConsulta, listarConsulta } from '../controllers/consultaController.js';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router()

router.get('/', autenticarToken, listarConsulta);
router.post('/', autenticarToken, criarConsulta);
router.delete('/:id', autenticarToken, deletarConsulta)

// BUSCAR CONSULTAS POR PROFISSIONAL [id]
router.get('/:profissionalId/:dia', autenticarToken, buscarConsulta);

// 
router.put('/:id', autenticarToken, alterarConsultaStatus);

export default router;