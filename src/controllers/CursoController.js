const Curso = require('../models/Curso')

class CursoControle {
    async cadastrar(req, res){
        try {
            const nome = req.body.nome
            const duracao_horas = req.body.duracao_horas

            if (!nome) {
                return res.status(400).json({ erro: 'O nome do curso deve ser informado.' })
            }
            if (!duracao_horas) {
                return res.status(400).json({ erro: 'A duração do curso deve ser informada.' })
            }

            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })

            res.status(201).json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: 'Não foi possível efetuar o cadastro do curso.'})
        }
    }

    async listarTodos(req, res) {
        try {
            const cursos = await Curso.findAll()
            res.json(cursos)
        } catch (error) {
            res.status(500).json({error: 'Não foi possível listar os cursos'})
        }
    }

    async listarUm (req, res) {
        try {
            const {id} = req.params
            const curso = await Curso.findByPk(id)

            if (!curso){
                return res.status(404).json({ erro: "Curso não encontrado." })
            }

            res.json(curso)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: "Não foi possível localizar o curso."})
        }
    }

    async atualizar(req, res) {
        const {id} = req.params
        try {
            const curso = await Curso.findByPk(id)
            if(!curso) {
                return res.status(400).json({erro: 'Curso não encontrado.'})
            }
            await curso.update(req.body)
            await curso.save()
            res.status(200).json({mensagem: 'Alterado com sucesso!'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({erro: 'Erro ao atualizar o curso.'})
        }

    }

    async excluir(req, res) {
        try {
            const {id} = req.params
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ erro: "Curso não foi encontrado" })
            }

            Aluno.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({mensagem: 'Curso exclído com sucesso'})
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: "Não foi possível atualizar o curso."})
        }
    }
}

module.exports = new CursoController()

