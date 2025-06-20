import Prontuario from "../models/Prontuario.js";

export async function criarProntuario(req, res) {
    try{
        const prontuario = await Prontuario.create(req.body);
        res.status(201).json(prontuario);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

export async function listarProntuario(req, res) {
    const prontuario = await Prontuario.findAll();
    res.json(prontuario);    
};