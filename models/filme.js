// Importa as configurações do Sequelize e o tipo de dados do Sequelize
const { sequelizeConfig, sequelizeDb } = require('./database')

// Define o modelo "autores" usando o Sequelize
const filme = sequelizeConfig.define(
    'filme', // Nome do modelo (será o nome da tabela no banco de dados)
    {
        // Define os campos da tabela "autores" com seus respectivos tipos de dados
        titulo: { type: sequelizeDb.STRING }, // Campo "titulo" do tipo STRING (texto)
        genero: { type: sequelizeDb.STRING }, // Campo "nacionalidade" do tipo STRING
        duracao: { type: sequelizeDb.STRING }, // Campo "data_nascimento" do tipo STRING (idealmente deveria ser do tipo DATE para datas)
        classificacao: { type: sequelizeDb.INTEGER }
    }
)

// Cria ou sincroniza a tabela "filme" no banco de dados
filme.sync()

// Exporta o modelo "filme" para ser usado em outros arquivos
module.exports = filme