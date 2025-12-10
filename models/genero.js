import conexao from '../config/conexao.js'

const Genero = conexao.Schema({
    nome: { type: String, required: true },
    descricao: { type: String }
}, { timestamps: true })

export default conexao.model('Genero', Genero)
