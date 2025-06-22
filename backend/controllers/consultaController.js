import Consulta from "../models/Consulta.js";
import Paciente from "../models/Paciente.js";

export async function criarConsulta(req, res) {
    try{
        const consulta = await Consulta.create(req.body);
        res.status(201).json(consulta);   
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function listarConsulta(req, res) {
    const consulta = await Consulta.findAll();
    res.json(consulta);
};

// BUSCAR CONSULTAS POR PROFISSIONAL [id]
export async function buscarConsulta(req, res) {
    const { profissionalId, dia } = req.params;
    
    try{
        const consultas = await Consulta.findAll({
            where: {
                profissionalId,
                dia
            },
            include: [
                {
                    model: Paciente,
                    as: 'paciente',
                    attributes: ['nome', 'dataNascimento'] // ou apenas 'nome'
                }
            ]
        });

        // Calcular idade para cada paciente
        const resultado = consultas.map(consulta => {
            const nascimento = new Date(consulta.paciente?.dataNascimento);
            const hoje = new Date();
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const m = hoje.getMonth() - nascimento.getMonth();
            if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--;
            }

            return {
                ...consulta.toJSON(),
                paciente: {
                    ...consulta.paciente?.toJSON(),
                    idade
                }
            };
        });

        res.json(resultado);
    } catch(error){
        res.status(500).json(error)
    }
};

// Deletar Consulta
export async function deletarConsulta(req, res) {
    try{
        const { id } = req.params;

        const quantidadeExcluida = await Consulta.destroy({where: {id}});

        if(quantidadeExcluida === 0){
            res.status(400).json({error: 'Consulta não localizada!'});
        }
        res.status(200).json({message: 'Consulta excluida com sucesso!'});

    } catch(error){
        res.status(500).json({error: error.message})
    }
}