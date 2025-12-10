import express from 'express'
const router = express.Router()
import GeneroController from '../controllers/GeneroController.js'
const controle = new GeneroController()

const caminhobase = 'genero/'

// Public list and search
router.get('/' + caminhobase + 'public', controle.publicList)
router.get('/' + caminhobase, controle.publicList)
router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
router.get('/' + caminhobase + 'del/:id', controle.del)

export default router
