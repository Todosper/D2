import Genero from '../models/genero.js'

export default class GeneroController {
    constructor(caminhoBase = 'genero/') {
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
                filtro = { nome: regex }
            }
            const resultado = await Genero.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'public', { Items: resultado, busca })
        }

        this.openAdd = async (req, res) => res.render(caminhoBase + 'add')

        this.add = async (req, res) => {
            await Genero.create({ nome: req.body.nome, descricao: req.body.descricao })
            res.redirect('/' + caminhoBase + 'add')
        }

        this.list = async (req, res) => {
            const busca = req.query.busca || ''
            let filtro = {}
            if (busca) filtro = { nome: { $regex: busca, $options: 'i' } }
            const resultado = await Genero.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'lst', { Items: resultado, busca })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const item = await Genero.findById(id)
            res.render(caminhoBase + 'edt', { Item: item })
        }

        this.edt = async (req, res) => {
            const id = req.params.id
            const update = { nome: req.body.nome, descricao: req.body.descricao }
            await Genero.findByIdAndUpdate(id, update)
            res.redirect('/' + caminhoBase + 'lst')
        }

        this.del = async (req, res) => {
            await Genero.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}
