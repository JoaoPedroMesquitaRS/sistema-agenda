import Paciente from '../models/Paciente.js';

export async function criarPaciente(req, res) {  
    try{
        const paciente = await Paciente.create(req.body);
        res.status(201).json(paciente);
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

export async function listarPacientes(req, res) {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
};

export async function alterarPaciente(req, res) {
    try{
        const { id } = req.params;
        const { nome, cpf, dataNascimento, telefone } = req.body;
    
        const [quantidadeAtualizada] = await Paciente.update(
            {
                nome, cpf, dataNascimento, telefone
            },
            {where: {id}}
        );

        if(quantidadeAtualizada === 0){
            return res.status(400).json({error: `Paciente não localizado!`})
        }
        res.status(200).json({message: 'Paciente alterado com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

// Excluir Paciente
export async function excluirPaciente(req, res) {
    try{
        const { id } = req.params;
        const quantidadeExcluida = await Paciente.destroy({where: {id}});

        if(quantidadeExcluida === 0){
            res.status(400).json({error: 'Paciente não localizado!'});
        }
        res.status(200).json({message: 'Paciente excluído com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

// Buscar Paciente por ID
export async function listarPacientesId(req, res) {
    const { id } = req.params;
    try{
        const paciente = await Paciente.findByPk(id)
        if(!paciente){
            return res.status(404).json({error: 'Paciente não encontrado!'});
        }
        res.json(paciente);
    } catch(error){
        res.status(500).json(error)
    }
};