import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Prontuario = sequelize.define('Prontuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pacienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pacientes',
            key: 'id'
        }
    },
    profissionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'profissionais',
            key: 'id'
        }
    },
    subjetivo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    objetivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    avaliacao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    plano: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'prontuarios',
    timestamps: false
});

Prontuario.associate = (models) => {
    Prontuario.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente'
    });
    Prontuario.belongsTo(models.Profissional, {
        foreignKey: 'profissionalId',
        as: 'profissional'
    });
};

export default Prontuario;