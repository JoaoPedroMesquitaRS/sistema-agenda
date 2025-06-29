import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = 'ni36nod5646xsw';

export async function loginUsuario(req, res) {
    const { email, senha } = req.body;
    
    const usuario = await Usuario.findOne({where: {email}});
    if(!usuario) return res.status(401).send('Usuario não localizado!');
    
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if(!senhaCorreta) return res.status(401).send('Senha incorreta!');

    const token = jwt.sign({id: usuario.id, perfil: usuario.perfil}, SECRET, {expiresIn: '1h'});

    res.json({token});
};