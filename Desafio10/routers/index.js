import { Router } from 'express'
import productos from './productos.js'
import carrito from './carrito.js'

const router = Router();

router.use('/productos', productos);
router.use('/carrito', carrito)

export default router