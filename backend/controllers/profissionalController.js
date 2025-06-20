import Profissional from "../models/Profissional.js";

export async function criarProfissional(req, res) {
    try{
        const profissional = await Profissional.create(req.body);
        res.status(201).json(profissional);
    } catch (error){
        res.status(400).json({error: error.message})
    }
};

export async function listarProfissional(req, res) {
    const profissional = await Profissional.findAll();
    res.json(profissional);    
};

export async function alterarProfissional(req, res) {
    try{
            const { id } = req.params;
            const { nome, registro, localId, especialidadeId, telefone, email } = req.body;
        
            const [quantidadeAtualizada] = await Profissional.update(
                {
                    nome, registro, localId, especialidadeId, telefone, email
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
}

// Excluir Profissional
export async function excluirProfissional(req, res){
    try{
        const { id } = req.params;

        const quantidadeExcluida = await Profissional.destroy({where: {id}});
    
        if(quantidadeExcluida === 0){
            return res.status(400).json({error: 'Profissional não localizado!'});
        }
        res.status(200).json({message: 'Profissional excluído com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}