import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profissional = sequelize.define('Profissional', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'locais',
        key: 'id'
      }
    },
    especialidadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'especialidades',
        key: 'id'
      }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    tableName: 'profissionais',
    timestamps: false
});

Profissional.associate = (models) => {
  Profissional.belongsTo(models.Especialidade, {
    foreignKey: 'especialidadeId',
    as: 'especialidade'
  });
  Profissional.belongsTo(models.Local, {
    foreignKey: 'localId',
    as: 'local'
  });

  Profissional.hasMany(models.Consulta, {
    foreignKey: 'profissionalId',
    as: 'consultas'
  });
  Profissional.hasMany(models.Prontuario, {
    foreignKey: 'profissionalId',
    as: 'prontuarios'
  });
};

export default Profissional;