import { Router } from 'express';

import productsRouter from './productsRouter.js'

const router = Router();

router.use('/products', productsRouter);

export default router;