import Usuario from "../models/Usuario.js";

export async function criarUsuario(req, res) {
    try{
        const usuario = await Usuario.create(req.body);
        res.status(201).json(usuario);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function listarUsuario(req, res) {
    const usuario = await Usuario.findAll();
    res.json(usuario);    
};