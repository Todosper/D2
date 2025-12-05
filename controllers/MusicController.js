import Musica from '../models/musica.js'
import fs from 'fs/promises'

export default class MusicController {
    constructor(caminhoBase = 'musica/') {
        this.caminhoBase = caminhoBase

        // helper para obter arquivo enviado, funciona com upload.fields() (obj) e upload.any() (array)
        this._getFile = (req, fieldName) => {
            if (!req.files) return null
            // multer with fields() produces object: req.files[fieldName] = [file]
            if (req.files[fieldName]) return req.files[fieldName][0]
            // multer any() produces array
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
            const resultado = await Musica.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'public', { Musicas: resultado, busca })
        }

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + 'add')
        }

        this.add = async (req, res) => {
            const imagemFile = this._getFile(req, 'imagem')
            const imagemPath = imagemFile ? '/uploads/' + imagemFile.filename : ''

            // cifra: pode vir por textarea (cifra_text) ou por upload de arquivo (cifra_file)
            let cifraText = ''
            if (req.body.cifra_tipo === 'arquivo') {
                const cifraFile = this._getFile(req, 'cifra_file')
                if (cifraFile) {
                    try {
                        cifraText = await fs.readFile(cifraFile.path, 'utf8')
                    } catch (err) {
                        cifraText = ''
                    }
                } else {
                    cifraText = ''
                }
            } else {
                cifraText = req.body.cifra_text || ''
            }

            await Musica.create({
                artista: req.body.artista,
                nome: req.body.nome,
                genero: req.body.genero,
                cifra: cifraText,
                imagem: imagemPath,
                youtube: req.body.youtube
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
            const resultado = await Musica.find(filtro).sort({ createdAt: -1 })
            res.render(caminhoBase + 'lst', { Musicas: resultado, busca })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const musica = await Musica.findById(id)
            res.render(caminhoBase + 'edt', { Musica: musica })
        }

        this.edt = async (req, res) => {
            const id = req.params.id
            const imagemFile = this._getFile(req, 'imagem')
            const update = {
                artista: req.body.artista,
                nome: req.body.nome,
                genero: req.body.genero,
                youtube: req.body.youtube
            }
            if (imagemFile) update.imagem = '/uploads/' + imagemFile.filename

            // cifra pode vir de arquivo ou textarea
            if (req.body.cifra_tipo === 'arquivo') {
                const cifraFile = this._getFile(req, 'cifra_file')
                if (cifraFile) {
                    try {
                        update.cifra = await fs.readFile(cifraFile.path, 'utf8')
                    } catch (err) {
                        // se falhar, não sobrescreve
                    }
                }
            } else {
                update.cifra = req.body.cifra_text || ''
            }

            await Musica.findByIdAndUpdate(id, update)
            res.redirect('/' + caminhoBase + 'lst')
        }

        this.del = async (req, res) => {
            await Musica.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}
