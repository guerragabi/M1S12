const { Router } = require('express')
const alunoRoutes = new Router()
const { auth } = require('../middleware/auth')
const AlunoController = require('../controllers/AlunoController')


alunoRoutes.post('/', AlunoController.cadastrar)

alunoRoutes.get('/', auth, AlunoController.listarTodos)

alunoRoutes.get('/:id', auth, AlunoController.listarUm)

alunoRoutes.put('/:id', auth, AlunoController.atualizar)

alunoRoutes.delete('/:id', auth, AlunoController.excluir)

module.exports = alunoRoutes