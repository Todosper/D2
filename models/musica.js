import conexao from '../config/conexao.js'

const Musica = conexao.Schema({
    artista: { type: String, required: true },
    nome: { type: String, required: true },
    genero: { type: String, required: true },
    cifra: { type: String },
    imagem: { type: String },
    youtube: { type: String }
}, { timestamps: true })

export default conexao.model('Musica', Musica)
