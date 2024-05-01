const Usuario = require('../models/Usuario')

class UsuarioController {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const email = req.body.email
            const password = req.body.password

            if (!nome) {
                return res.status(400).json({ erro: "Informe o nome."})
            }         
            if (!email) {
                return res.status(400).json({ erro: "Informe o email." })
            }
            if (!password) {
                return res.status(400).json({ erro: "Informe a senha." })
            }

            const usuario = await Usuario.create({
                nome: nome,
                email: email,
                password: password                
            })

            res.status(201).json(usuario)

        } catch (error) {          
            console.log(error.message)  
            res.status(500).json({ erro: "Não foi possível cadastrar o usuário." })
        }
    }

    async listarTodos(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)

        } catch (error) {
            res.status(500).json({ error: "Não foi possível listar os usuários." })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ erro: "Nenhum usuário cadastrado com o id informado." })
            }

            res.json(usuario)

        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível listar o usuário."})
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(400).json({ erro: "Nenhum usuário cadastrado com o id informado."})
            }

            await usuario.update(req.body)
            await usuario.save()

            res.status(200).json({ mensagem: "Cadastro atualizado com sucesso."})
        
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: "Erro ao atualizar o cadastro." })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ erro: "Nenhum usuário cadastrado com o id informado."})
            }

            Usuario.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({ mensagem: "Cadastro excluído com sucesso." })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({erro: "Não foi possível excluir o cadastro."})
        }
    }
}

module.exports = new UsuarioController()
