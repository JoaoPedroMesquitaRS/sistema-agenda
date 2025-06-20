import Local from "../models/Local.js";

export async function criarLocal(req, res) {
    try{
        const local = await Local.create(req.body);
        res.status(201).json(local);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function listarLocal(req, res) {
    const local = await Local.findAll();
    res.json(local);
};

export async function alterarLocal(req, res) {
    try{
        const { id } = req.params;
        const { nome, endereco, rota } = req.body;

        const [quantidadeAtualizada] = await Local.update(
            {
                nome, endereco, rota
            },
            {where: {id: id}}
        );
        if (quantidadeAtualizada === 0) {
            return res.status(404).json({ error: "Local não encontrado ou dados iguais." });
        }

        res.json({ message: "Local atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// BUSCAR POR ID
export async function listarId(req, res) {
    const { id } = req.params;
    try{
        const local = await Local.findByPk(id)
        
        if(!local){
            return res.status(404).json({error: 'Local não encontrado!'});
        }

        res.json(local);
    } catch (error) {
        console.error('Erro ao buscar local por ID:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
}

export async function excluirLocal(req, res) {
    try{
        const { id } = req.params;
        const quantidadeExcluida = await Local.destroy({where: {id}});

        if(quantidadeExcluida === 0){
            res.status(400).json({error: 'Local não localizado!'});
        }
        res.status(200).json({message: 'Local excluído com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }    
}