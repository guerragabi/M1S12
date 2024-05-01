const {Router} = require('express')
const professorRoutes = new Router()
const {auth} = require('../middleware/auth')
const ProfessorController = require('../controllers/ProfessorController')

professorRoutes.post('/', ProfessorController.cadastrar)
professorRoutes.get('/', auth, ProfessorController.listarTodos)
professorRoutes.get('/:id', auth, ProfessorController.listarUm)
professorRoutes.put('/:id', auth, ProfessorController.atualizar)
professorRoutes.delete('/:id', auth, ProfessorController.excluir)

module.exports = professorRoutes
