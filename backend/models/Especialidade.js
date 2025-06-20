import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Especialidade = sequelize.define('Especialidade', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'especialidades',
    timestamps: false
});

Especialidade.associate = (models) => {
    Especialidade.hasMany(models.Profissional, {
        foreignKey: 'especialidadeId',
        as: 'profissionais'
    });
};

export default Especialidade;