import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

import MusicRoutes from './MusicRoutes.js'

router.get('/', controle.home)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)

router.use(MusicRoutes)

export default router