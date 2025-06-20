import Especialidade from "../models/Especialidade.js";

export async function criarEspecialidade(req, res) {
    try{
        const especialidade = await Especialidade.create(req.body);
        res.status(201).json(especialidade);   
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

export async function listarEspecialidade(req, res) {
    const especialidade = await Especialidade.findAll();
    res.json(especialidade);    
};

export async function alterarEspecialidade(req, res) {
    try{
        const { id } = req.params;
        const { nome, descricao } = req.body;

        const [quantidadeAtualizada] = await Especialidade.update(
            {
                nome, descricao
            },
            {where: {id}}
        );
    
        if(quantidadeAtualizada === 0){
            return res.status(400).json({error: `Especialidade não localizada!`})
        }
        res.status(200).json({message: 'Especialidade alterada com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

// BUSCAR POR ID
export async function listarId(req, res) {
    const { id } = req.params;
    try{
        const especialidade = await Especialidade.findByPk(id)
        
        if(!especialidade){
            return res.status(404).json({error: 'Especialidade não encontrada!'});
        }

        res.json(especialidade);
    } catch (error) {
        console.error('Erro ao buscar especialidade por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
}

export async function excluirEspecialidade(req, res) {
    try{
        const { id } = req.params;
        const quantidadeExcluida = await Especialidade.destroy({where: {id}});

        if(quantidadeExcluida === 0){
            res.status(400).json({error: 'Especialidade não localizada!'});
        }
        res.status(200).json({message: 'Especialidade excluída com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }        
}