import { alterarPaciente, buscarNome, criarPaciente, excluirPaciente, listarPacientes, listarPacientesId } from '../controllers/pacienteController.js';
import express from 'express';
import { autenticarToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', autenticarToken, listarPacientes);
router.get('/busca', autenticarToken, buscarNome);
router.get('/:id', autenticarToken, listarPacientesId);
router.post('/', autenticarToken, criarPaciente);
router.put('/:id', autenticarToken, alterarPaciente);

// AUTH OK
router.delete('/:id', autenticarToken, excluirPaciente);

export default router;