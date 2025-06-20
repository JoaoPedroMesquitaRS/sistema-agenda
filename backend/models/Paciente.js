import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Paciente = sequelize.define('Paciente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    sexo: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING
    }  
}, {
        tableName: 'pacientes',
        timestamps: false      
    }
);

Paciente.associate = (models) => {
    Paciente.hasMany(models.Consulta, {
        foreignKey: 'pacienteId',
        as: 'consultas'
    });
    Paciente.hasMany(models.Prontuario, {
        foreignKey: 'pacienteId',
        as: 'prontuarios'
    });
}

export default Paciente;
