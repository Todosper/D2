import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

import MusicRoutes from './MusicRoutes.js'
import ArtistRoutes from './ArtistRoutes.js'
import GeneroRoutes from './GeneroRoutes.js'
import AlbumRoutes from './AlbumRoutes.js'

router.get('/', controle.home)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
router.get('/cliente', (req, res) => res.render('cliente'));
router.get('/adm', (req, res) => res.render('adm'));

router.use(MusicRoutes)
router.use(ArtistRoutes)
router.use(GeneroRoutes)
router.use(AlbumRoutes)

export default router