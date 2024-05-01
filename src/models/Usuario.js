const {DataTypes} = require('sequelize')
const {connection} = require('../database/connection')
const {hash} = require('bcrypt')

const Usuario = connection.define('usuarios', {
    nome: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

Usuario.beforeSave (async (user) => {
    user.password = await hash(user.password, 8)
    return user
})

module.exports = Usuario
