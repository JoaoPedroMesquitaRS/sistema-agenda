import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';

// Rotas
import loginRoutes from './routes/loginRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import profissionalRoutes from './routes/profissionalRoutes.js';
import especialidadeRoutes from './routes/especialidadeRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';
import localRouter from './routes/localRoutes.js';
import prontuariosRouter from './routes/prontuarioRoutes.js';
import consultasRouter from './routes/consultaRoutes.js';

// Modelos
import Paciente from './models/Paciente.js';
import Profissional from './models/Profissional.js';
import Especialidade from './models/Especialidade.js';
import Local from './models/Local.js';
import Consulta from './models/Consulta.js';
import Prontuario from './models/Prontuario.js';

// Inicializa o app
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/login', loginRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/especialidades', especialidadeRoutes);
app.use('/usuarios', usuarioRouter);
app.use('/locais', localRouter);
app.use('/prontuarios', prontuariosRouter);
app.use('/consultas', consultasRouter);

// Associações
const models = { Paciente, Profissional, Especialidade, Local, Consulta, Prontuario };
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

async function startServer() {

  sequelize.sync().then(() => {
    console.log('Banco sincronizado');
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  });

  // await sequelize.query('PRAGMA foreign_keys = OFF'); // Desativa constraints temporariamente
  // await sequelize.sync({ force: true });
  // await sequelize.query('PRAGMA foreign_keys = ON');  
}

startServer();
