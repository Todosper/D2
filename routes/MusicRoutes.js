import express from 'express'
const router = express.Router()
import MusicController from '../controllers/MusicController.js'
const controle = new MusicController()

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

const caminhobase = 'musica/'

// Public list and search
router.get('/' + caminhobase + 'public', controle.publicList)

// Admin
router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.any(), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.any(), controle.edt)
router.get('/' + caminhobase + 'del/:id', controle.del)

export default router
