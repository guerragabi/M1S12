const Curso = require('../models/Curso')

class CursoController {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const duracao_horas = req.body.duracao_horas

            if (!nome) {
                return res.status(400).json({ erro: 'O nome deve ser informado' })
            }
            if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({ erro: 'A duração do curso deve ser informada de 40 a 200 horas' })
            }

            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })

            res.status(201).json(curso)
        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro' })
        }
    }

    async listar(req, res) {
        try {
            let params = {}

            if (req.query.nome) {
                params = { ...params, nome: req.query.nome }
            }
            if (req.query.duracao_horas) {
                params = { ...params, duracao_horas: req.query.duracao_horas }
            }

            const cursos = await Curso.findAll({
                where: params
            })

            res.json(cursos)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não foi possível listar os cursos' })
        }
    }

    async atualizar(req, res) {
        const id = req.params.id
        const { nome, duracao_horas } = req.body

        try {
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(400).json({ erro: 'Curso não encontrado' })
            }

            await curso.update({
                nome: nome,
                duracao_horas: duracao_horas
            })

            await curso.save()

            res.status(200).json({ mensagem: 'Alterado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: 'Erro ao atualizar curso' })
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id
            const curso = await Curso.findByPk(id)
            
            if (!curso) {
                return res.status(404).json({ erro: 'Curso não encontrado' })
            }

            await curso.destroy()

            return res.status(204).json({})
        } catch (error) {
            res.status(500).json({error: 'Não foi possível excluir o curso'})
        }
    }
}

module.exports = new CursoController()