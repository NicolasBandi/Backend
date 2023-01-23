import { Router } from 'express'

import productos from './productos.js'
import carrito from './carrito.js'
import profile from './profile.js'
import compra from './compra.js'
import auth from './auth.js'

const router = Router();

router.use('/productos', productos);
router.use('/carrito', carrito);
router.use('/profile', profile);
router.use('/compra', compra)
router.use('/', auth);

export default router