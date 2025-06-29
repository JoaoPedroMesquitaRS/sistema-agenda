import jwt from 'jsonwebtoken';

const SECRET = 'ni36nod5646xsw';

export async function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    
    if(!token) return res.status(401).json({erro: 'Token ausente'});

    jwt.verify(token, SECRET, (err, usuario) => {
        if(err) return res.status(403).json({errp: 'Token inválido'});
        req.usuario = usuario;
        next();
    });
};