import express from 'express'
const router = express.Router()
import ArtistController from '../controllers/ArtistController.js'
const controle = new ArtistController()

import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + file.originalname
        cb(null, unique)
    }
})
const upload = multer({ storage })

const caminhobase = 'artista/'

router.get('/' + caminhobase, controle.publicList)
router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.any(), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.any(), controle.edt)
router.get('/' + caminhobase + 'del/:id', controle.del)

export default router
