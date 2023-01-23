import { Router } from 'express';
import login from './login.js'
import productosTest from './productosTest.js';

const router = Router();

router.use('/', login);
router.use('/productos-test', productosTest);

export default router;