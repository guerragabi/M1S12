const { Router } = require("express")
const alunoRoutes = require("./alunos.routes")
const cursoRoutes = require("./cursos.routes")
const professorRoutes = require("./professores.routes")
const loginRoutes = require("./login.routes")
const usuarioRoutes = require("./usuarios.routes")

const routes = Router()

routes.use('/alunos', alunoRoutes)
routes.use('/cursos', cursoRoutes)
routes.use('/professores', professorRoutes)
routes.use('/login', loginRoutes)
routes.use('/usuarios', usuarioRoutes)

module.exports = routes
