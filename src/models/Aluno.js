const { DataTypes } = require("sequelize");

const { connection } = require("../database/connection");

const Aluno = connection.define("alunos", {
  nome: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  data_nascimento: {
    allowNull: false,
    type: DataTypes.DATE,
  },

  telefone: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  }
});

module.exports = Aluno;
