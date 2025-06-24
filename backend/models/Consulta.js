import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Consulta = sequelize.define('Consulta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pacienteId:{
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
    localId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locais',
            key: 'id'
        }
    },
    dia: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaAgendada: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'agendada'
    },
    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    tableName: 'consultas',
    timestamps: true
});

Consulta.associate = (models) => {
    Consulta.belongsTo(models.Paciente, {
        foreignKey: 'pacienteId',
        as: 'paciente'
    });
    Consulta.belongsTo(models.Profissional, {
        foreignKey: 'profissionalId',
        as: 'profissional'
    });
    Consulta.belongsTo(models.Local, {
        foreignKey: 'localId',
        as: 'local'
    });
};

export default Consulta;