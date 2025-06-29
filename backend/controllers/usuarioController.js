import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export async function criarUsuario(req, res) {
    try{
        const { nome, email, senha, tipo } = req.body;
        const senhaHash = await bcrypt.hash(senha, 10)
        const usuario = await Usuario.create({
            nome,
            email,
            senha: senhaHash,
            tipo
        });
        res.status(201).json(usuario);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function listarUsuario(req, res) {
    const usuario = await Usuario.findAll();
    res.json(usuario);    
};

export async function buscarId(req, res) {
    const { id } = req.params;
    try{
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            res.status(404).json({error: 'Usuario não localizado!'});
        }

    } catch(error){
        res.status(500).json(error);
    }
};

export async function deletarUsuario(req, res) {
    try{
        const { id } = req.params;
        const qtdExluida = await Usuario.destroy({where: {id}});
        if(!qtdExluida){
            res.status(404).json({error: 'Usuario não localizado!'});
        }
        res.status(200).json({message: 'Usuario excluído com sucesso!'})
    } catch(error){
        res.status(500).json(error);
    }
};

export async function alterarUsuario(req, res) {
    try{
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        const qtdAlterada = await Usuario.update(
            {
                nome, email, senha, tipo
            },
            {where: {id}} 
        );

        if(!qtdAlterada === 0){
            res.status(404).json({error: 'Usuario não localizado!'});
        } 
        res.status(200).json({message: 'Usuario alterado com sucesso!'});
    } catch(error){
        res.status(500).json({error: error.message});
    }  
};