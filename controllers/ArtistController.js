import Artista from '../models/artista.js'

export default class ArtistController {
    constructor(caminhoBase = 'artista/') {
        this.caminhoBase = caminhoBase

        this._getFile = (req, fieldName) => {
            if (!req.files) return null
            if (req.files[fieldName]) return req.files[fieldName][0]
            if (Array.isArray(req.files)) {
                return req.files.find(f => f.fieldname === fieldName) || null
            }
            return null
        }

        this.publicList = async (req, res) => {
            const busca = req.query.busca || ''
            let filtro = {}
            if (busca) {
                const regex = { $regex: busca, $options: 'i' }
                filtro = { $or: [ { nome: regex }, { bio: regex } ] }
            }
            const resultado = await Artista.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'public', { Items: resultado, busca })
        }

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + 'add')
        }

        this.add = async (req, res) => {
            const imagemFile = this._getFile(req, 'imagem')
            const imagemPath = imagemFile ? '/uploads/' + imagemFile.filename : ''
            await Artista.create({
                nome: req.body.nome,
                bio: req.body.bio,
                imagem: imagemPath
            })
            res.redirect('/' + caminhoBase + 'add')
        }

        this.list = async (req, res) => {
            const busca = req.query.busca || ''
            let filtro = {}
            if (busca) {
                const regex = { $regex: busca, $options: 'i' }
                filtro = { $or: [ { nome: regex }, { bio: regex } ] }
            }
            const resultado = await Artista.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'lst', { Items: resultado, busca })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const item = await Artista.findById(id)
            res.render(caminhoBase + 'edt', { Item: item })
        }

        this.edt = async (req, res) => {
            const id = req.params.id
            const imagemFile = this._getFile(req, 'imagem')
            const update = {
                nome: req.body.nome,
                bio: req.body.bio
            }
            if (imagemFile) update.imagem = '/uploads/' + imagemFile.filename
            await Artista.findByIdAndUpdate(id, update)
            res.redirect('/' + caminhoBase + 'lst')
        }

        this.del = async (req, res) => {
            await Artista.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}
