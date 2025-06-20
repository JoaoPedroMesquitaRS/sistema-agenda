import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Local = sequelize.define('Local', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rota: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'locais',
    timestamps: false
});

Local.associate = (models) => {
    Local.hasMany(models.Profissional, {
        foreignKey: 'localId',
        as: 'profissionais'
    });
    Local.hasMany(models.Consulta, {
        foreignKey: 'localId',
        as: 'consultas'
    });
}

export default Local;