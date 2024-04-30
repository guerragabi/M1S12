const {Router} = require('express')
const routes = new Router()

const Aluno = require('../models/Aluno') 
const Curso = require('../models/Curso')
const Professor = require('../models/Professor')

const {auth} = require ('../middleware/auth')
const {sign} = require('jsonwebtoken')

// ALUNOS
// rota post para cadastrar novos alunos 
routes.post('/alunos', async (req, res) => {
    try {
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular
        const email = req.body.email
        const password = req.body.password
        if (!nome) {
            return res.status(400).json({erro:'Informe o nome do aluno.'})            
        }
        if (!data_nascimento) {
            return res.status(400).json({erro:'Informe a data de nascimento do aluno.'})
        }
        if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({erro:'A data de nascimento deve estar no formato AAAA-MM-DD.'})
        }
        const aluno = await Aluno.create({
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular,
            email: email,
            password: password
        })

        res.status(201).json(aluno)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({erro: 'Não foi possível efetuar o cadastro.'})
    }
})

// rota get para listar todos os alunos 
routes.get('/alunos', auth, async (req, res) => {
    const alunos = await Aluno.findAll()
    res.json(alunos)
})

// rota get para listar alunos pelo id 
routes.get('/alunos/:id', auth, async (req, res) => {
    const id = req.params.id
    const aluno = await Aluno.findByPk(id)
    if (!aluno){
        return res.status(400).json({erro: "Aluno não encontrado."})
    }
    return res.status(201).json({aluno})
})

// rota put para atualizar alunos pelo id 
routes.put('/alunos/:id', auth, async (req, res) => {
    const id = req.params.id
    const {nome, data_nascimento, celular} = req.body
    
    try {
        const aluno = await Aluno.findByPk(id)
        if (!aluno){
            return res.status(400).json({erro: "Aluno não encontrado."})
        }

        await aluno.update({
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular
        })
        await aluno.save()    
        res.status(200).json({"Informações do aluno atualizadas com sucesso!": aluno})
    } catch (error){
        console.log(error)
        return res.status(500).json({erro: "Não foi possível atualizar as informações do aluno."})
    }   
})

// rota delete para remover alunos pelo id 
routes.delete('/alunos/:id', auth, async (req, res) => {
    const id = req.params.id
    const aluno = await Aluno.findByPk(id)
    if (!aluno){
        return res.status(400).json({erro: "Aluno não encontrado."})
    }
    await aluno.destroy()
    return res.status(200).json({mensagem: 'Aluno removido.'})
})

// CURSOS
// rota post para cadastrar novos cursos 
routes.post('/cursos', async (req, res) => {
    try {
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if (!nome) {
            return res.status(400).json({erro: "Informe o nome do curso."})            
        }
        if(!(duracao_horas >=40 && duracao_horas <=200)) {
            return res.status(400).json({erro: "Informe a duração do curso (entre 40 e 200 horas)."})
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })
        res.status(201).json({"Curso cadastrado com sucesso!": curso})
    } catch (error) {
        res.status(500).json({erro: "Não foi possível efetuar o cadastro."})
    }
})

// rota get para listar todos os cursos 
routes.get('/cursos', auth, async (req, res) => {
    const cursos = await Curso.findAll()
    res.json(cursos)
})

// rota get para listar cursos por query params 
routes.get('/cursos', auth, async (req, res) => {
    const nome = req.query.nome
    const duracao_horas = req.query.duracao_horas
    const cursos = await Curso.findAll({
        where: {
            nome: nome,
            duracao_horas: duracao_horas
        }
    })
    res.json(cursos)
})

// rota get para listar cursos por route params (id) 
routes.get('/cursos/:id', auth, async (req, res) => {
    const {id} = req.params
    const curso = await Curso.findByPk(id)
    if(!curso){
        return res.status(400).json({erro: "Curso não encontrado."})        
    }
    return res.status(201).json({curso})
})

// rota put para atualizar cursos pelo id 
routes.put('/cursos/:id', auth, async (req,res) => {
    const id = req.params.id
    const {nome, duracao_horas} = req.body

    try {
        const curso = await Curso.findByPk(id)
        if(!curso){
            return res.status(400).json({erro: "Curso não encontrado."})        
        }

         // verificar se a duração do curso está dentro do intervalo esperado
         if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({erro: "A duração do curso deve ser entre 40 e 200 horas."});
        }

        await curso.update({
            nome: nome,
            duracao_horas: duracao_horas
        })
        await curso.save()    
        res.status(200).json({"Informações do curso atualizadas com sucesso!": curso})
    } catch (error){
        console.log(error)
        return res.status(500).json({erro: "Não foi possível atualizar as informações do curso."})
    }    
})

// rota delete para remover cursos pelo id 
routes.delete('/cursos/:id', auth, async (req,res) => {
    const id = req.params.id
    const curso = await Curso.findByPk(id)
    if(!curso){
        return res.status(404).json({erro: 'Curso não encontrado.'})
    }
    await curso.destroy()
    return res.status(200).json({mensagem: "Curso removido."})
})

// PROFESSORES
// rota post para cadastrar novos professores
routes.post('/professores', async (req, res) => {
    try {
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular
        const materia = req.body.materia

        if (!nome){
            return res.status(400).json({erro:'Informe o nome do professor.'})            
        }
        if (!data_nascimento) {
            return res.status(400).json({erro:'Informe a data de nascimento do professor.'})
        }
        if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({erro:'A data de nascimento deve estar no formato AAAA-MM-DD.'})
        }
        if (!materia){
            return res.status(400).json({erro: 'Informe a matéria do professor.'})
        }

        const professor = await Professor.create({
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular,
            materia: materia
        })

        res.status(201).json({"Professor cadastrado com sucesso:": professor})
    } catch (error){
        console.log(error.message)
        res.status(500).json({erro: "Não foi possível efetuar o cadastro."})
    }
})

// rota get para listar todos os professores
routes.get('/professores', auth, async (req, res) => {
    const professores = await Professor.findAll()
    res.json(professores)
})

// rota put para atualizar professores pelo id
routes.put('/professores/:id', auth, async (req, res) => {
    const id = req.params.id
    const {nome, data_nascimento, celular, materia} = req.body

    try {
        const professor = await Professor.findByPk(id)
        if (!professor){
            return res.status(400).json({erro: "Professor não encontrado."})
        }

        await professor.update({
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular,
            materia: materia
        })

        await professor.save()
        res.status(200).json({"Informações do professor atualizadas com sucesso:": professor})
    } catch (error){
        console.log(error)
        return res.status(500).json({erro: "Não foi possível atualizar as informações do professor."})
    }
})

// rota delete para remover professores pelo id
routes.delete('/professores/:id', auth, async (req, res) => {
    const id = req.params.id
    const professor = await Professor.findByPk(id)
    if (!professor){
        return res.status(400).json({erro: "Professor não encontrado."})
    }
    await professor.destroy()
    return res.status(200).json({mensagem: "Professor removido."}) 
})

// LOGIN
routes.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        
        if (!email) {
            return res.status(404).json({erro: "Informe o email do aluno."})
        }

        if (!password) {
            return res.status(404).json({erro: "Informe a senha do aluno."})
        }
    
        const aluno = await Aluno.findOne({
            where: {
                email: email,
                password: password
            }
        })

        if (!aluno) {
            return res.status(404).json({mensagem: "Aluno não encontrado."})
        }
    
        const payload = {sub: aluno.id, email: aluno.email, nome: aluno.nome}
        const token = sign(payload, process.env.SECRET_JWT)
        res.status(200).json({token: token})
    } catch (error) {
        return res.status(500).json({error: error, message: "Algo deu errado."})
    }
})

// USUÁRIOS
// rota para criação de usuários



module.exports = routes
