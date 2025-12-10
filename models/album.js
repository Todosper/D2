import conexao from '../config/conexao.js'

const Album = conexao.Schema({
    nome: { type: String, required: true },
    artista: { type: String },
    genero: { type: String },
    ano: { type: Number },
    imagem: { type: String }
}, { timestamps: true })

export default conexao.model('Album', Album)
