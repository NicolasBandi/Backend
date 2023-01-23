import { Router } from 'express';
import productosTest from './productosTest.js';

const router = Router();

router.use('/productos-test', productosTest);

export default router;