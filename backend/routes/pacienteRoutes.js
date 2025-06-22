import { alterarPaciente, buscarNome, criarPaciente, excluirPaciente, listarPacientes, listarPacientesId } from '../controllers/pacienteController.js';
import express from 'express';

const router = express.Router();

router.get('/', listarPacientes);
router.get('/busca', buscarNome);
router.get('/:id', listarPacientesId);
router.post('/', criarPaciente);
router.put('/:id', alterarPaciente);
router.delete('/:id', excluirPaciente);

export default router;