// Importa o módulo Express para criar o roteador
const express = require('express')

// Importa o connect-flash, usado para exibir mensagens temporárias entre requisições
const flash = require('connect-flash')

// Cria uma nova instância do roteador do Express
const router = express.Router()

// Importa os modelos "livros" e "filme" que são usados para interagir com o banco de dados
const filme = require('../models/filme')
const sessao = require('../models/sessao')

// Configura o connect-flash no roteador
router.use(flash()) // Permite o uso do flash para mensagens temporárias
router.use((req, res, next) => {
    // Define variáveis globais locais para armazenar mensagens de sucesso e erro
    res.locals.sucess_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    next() // Continua para o próximo middleware ou rota
})

// 1ª rota - Insere dados na tabela de filme
router.post('/store', async (req, res) => {
    // Usa o Sequelize para criar um novo autor no banco de dados
    const resultado = await filme.create({
        titulo: req.body.titulo,
        genero: req.body.genero,
        duracao: req.body.duracao,
        classificacao: req.body.classificacao
    })

    // Verifica se algum campo obrigatório está vazio
    if (req.body.titulo == "" || req.body.genero == "" || req.body.duracao == "" || req.body.classificacao == "") {
        // Define uma mensagem de erro e redireciona para a página inicial
        req.flash('error_msg', "Preencha todos os campos")
        res.redirect('/')
    } else {
        // Define uma mensagem de sucesso e redireciona para a página de filme
        req.flash('sucess_msg', "Autor criado com sucesso")
        res.redirect('/filme')
    }
})

// 2ª rota - Exibe a página inicial de filme
router.get('/show', async (req, res) => {
    // Retorna uma mensagem simples para indicar a página inicial
    res.send("<h1> página inicial dos filmes </h1>")
})

// 3ª rota - Consulta dados da tabela de filme e os relaciona com livros
router.get('/', async (req, res) => {
    // Busca todos os filme, incluindo os livros relacionados
    const resultado = await filme.findAll({ include: sessao })

    // Se os dados forem encontrados, renderiza a página de filme com os dados
    if (resultado) {
        console.log(resultado)
        res.render("filme/index", { dados: resultado })
    } else {
        // Caso contrário, exibe uma mensagem de erro no console
        console.log("Não foi possível exibir os dados")
    }
})

// 4ª rota - Deleta um autor baseado no ID
router.get('/destroy/:id', async (req, res) => {
    // Remove um autor com base no ID passado como parâmetro na rota
    const resultado = await filme.destroy({
        where: {
            id: req.params.id // O ID é extraído dos parâmetros da URL
        }
    })

    // Se o autor for deletado com sucesso, redireciona para a página inicial
    if (resultado) {
        res.redirect('/')
    } else {
        // Caso contrário, retorna uma mensagem de erro no formato JSON
        res.json({ erro: "Não foi possível excluir" })
    }
})

// 5ª rota - Exibe o formulário de cadastro de filme
router.get('/create', async (req, res) => {
    // Busca todos os livros para exibir no formulário
    let resultado = await sessao.findAll()

    // Se os dados forem encontrados, renderiza o formulário com os dados dos livros
    if (resultado) {
        res.render('filme/addFilme', { dados: resultado })
    } else {
        // Caso contrário, exibe uma mensagem de erro e redireciona para a página inicial
        console.log("Não foi possível carregar os dados")
        res.redirect('/')
    }
})

// Exporta o roteador para ser usado em outros arquivos
module.exports = router