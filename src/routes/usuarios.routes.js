const { Router } = require('express')
const usuarioRoutes = new Router()
const { auth } = require('../middleware/auth')
const UsuarioController = require('../controllers/UsuarioController')


usuarioRoutes.post('/', UsuarioController.cadastrar)
usuarioRoutes.get('/', auth, UsuarioController.listarTodos)
usuarioRoutes.get('/:id', auth, UsuarioController.listarUm)
usuarioRoutes.put('/:id', auth, UsuarioController.atualizar)
usuarioRoutes.delete('/:id', auth, UsuarioController.excluir)

module.exports = usuarioRoutes
