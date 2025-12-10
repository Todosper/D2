import Album from '../models/album.js'

export default class AlbumController {
    constructor(caminhoBase = 'album/') {
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
                filtro = { $or: [ { nome: regex }, { artista: regex }, { genero: regex } ] }
            }
            const resultado = await Album.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'public', { Items: resultado, busca })
        }

        this.openAdd = async (req, res) => res.render(caminhoBase + 'add')

        this.add = async (req, res) => {
            const imagemFile = this._getFile(req, 'imagem')
            const imagemPath = imagemFile ? '/uploads/' + imagemFile.filename : ''
            await Album.create({
                nome: req.body.nome,
                artista: req.body.artista,
                genero: req.body.genero,
                ano: req.body.ano || null,
                imagem: imagemPath
            })
            res.redirect('/' + caminhoBase + 'add')
        }

        this.list = async (req, res) => {
            const busca = req.query.busca || ''
            let filtro = {}
            if (busca) {
                const regex = { $regex: busca, $options: 'i' }
                filtro = { $or: [ { nome: regex }, { artista: regex }, { genero: regex } ] }
            }
            const resultado = await Album.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'lst', { Items: resultado, busca })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const item = await Album.findById(id)
            res.render(caminhoBase + 'edt', { Item: item })
        }

        this.edt = async (req, res) => {
            const id = req.params.id
            const imagemFile = this._getFile(req, 'imagem')
            const update = {
                nome: req.body.nome,
                artista: req.body.artista,
                genero: req.body.genero,
                ano: req.body.ano || null
            }
            if (imagemFile) update.imagem = '/uploads/' + imagemFile.filename
            await Album.findByIdAndUpdate(id, update)
            res.redirect('/' + caminhoBase + 'lst')
        }

        this.del = async (req, res) => {
            await Album.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}
