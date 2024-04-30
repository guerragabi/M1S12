const Aluno = require('../models/Aluno')

class AlunoController {
    async cadastrar(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password
            const nome = req.body.nome
            const data_nascimento = req.body.data_nascimento
            const celular = req.body.celular

            if (!email) {
                return res.status(400).json({ erro: 'O email deve ser informado' })
            }
            if (!password) {
                return res.status(400).json({ erro: 'A senha deve ser informada' })
            }
            if (!nome) {
                return res.status(400).json({ erro: 'O nome deve ser informado' })
            }
            if (!data_nascimento) {
                return res.status(400).json({ erro: 'Preencha a data de nascimento' })
            }
            if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
                return res.status(400).json({ erro: 'A data de nascimento deve estar no formato AAAA-MM-DD' })
            }
            const aluno = await Aluno.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })

            res.status(201).json(aluno)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro' })
        }
    }

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll()
            res.json(alunos)
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível listar os alunos' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ erro: "Aluno não foi encontrado" })
            }

            res.json(aluno)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: "Não foi possível localizar o aluno",
                error: error
            })
        }
    }

    async atualizar(req, res) {
        const { id } = req.params

        try {
            const aluno = await Aluno.findByPk(id)
            if (!aluno) {
                return res.status(400).json({ erro: 'Aluno não encontrado' })
            }
            await aluno.update(req.body)
            await aluno.save()
            res.status(200).json({ mensagem: 'Alterado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: 'Erro ao atualizar aluno' })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ erro: "Aluno não foi encontrado" })
            }

            Aluno.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({ mensagem: 'Aluno excluído com sucesso' })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: "Não foi possível localizar o aluno",
                error: error
            })
        }
    }
}

module.exports = new AlunoController()