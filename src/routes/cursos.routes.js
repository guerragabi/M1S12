const {Router} = require('express')
const cursoRoutes = new Router()
const {auth} = require('../controllers/CursoController')
const CursoController = require('..controllers/CursoController')

cursoRoutes.post('/', CursoController.cadastrar)
cursoRoutes.get('/', auth, CursoController.listarTodos)
cursoRoutes.get('/:id', auth, CursoController.listarUm)
cursoRoutes.put('/:id', auth, CursoController.atualizar)
cursoRoutes.delete('/:id', auth, CursoController.excluir)

module.exports = cursoRoutes
