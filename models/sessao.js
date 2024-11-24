// Importa o modelo "autores" para criar a relação entre livros e autores
const filme = require('./filme')

// Importa as configurações do Sequelize e o tipo de dados do Sequelize
const { sequelizeConfig, sequelizeDb } = require('./database')

// Define o modelo "livros" usando o Sequelize
const sessao = sequelizeConfig.define(
    'sessao', // Nome do modelo
    {
        // Define os campos da tabela "livros" com seus respectivos tipos de dados
        data: { type: sequelizeDb.DATE 
        }, // Campo "titulo" do tipo STRING
        horario: { type: sequelizeDb.TIME } // Campo "ano_publicacao" do tipo NUMBER
    }
)

// Cria a relação entre "autores" e "livros": um autor pode ter muitos livros
filme.hasMany(sessao, {
    onDelete: 'CASCADE', // Se um autor for deletado, todos os livros associados serão deletados
    onUpdate: 'CASCADE' // Se os dados do autor forem atualizados, os livros associados serão atualizados
})

// Cria a relação inversa: um livro pertence a um único autor
sessao.belongsTo(filme)

// Garante que a tabela "livros" será criada no banco de dados, se ainda não existir
sessao.sync()

// Exporta o modelo "livros" para ser usado em outros arquivos
module.exports = sessao