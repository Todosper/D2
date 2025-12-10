import conexao from '../config/conexao.js'

const Artista = conexao.Schema({
    nome: { type: String, required: true },
    bio: { type: String },
    imagem: { type: String }
}, { timestamps: true })

export default conexao.model('Artista', Artista)
