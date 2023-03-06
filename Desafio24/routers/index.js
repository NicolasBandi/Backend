import { Router } from 'express';
import passport from 'passport';

import productsRouter from './productsRouter.js'
import cartsRouter from './cartsRouter.js'
import chatsRouter from './chatsRouter.js'
import authRouter from './authRouter.js'
import ordersRouter from './ordersRouter.js'

const router = Router();

router.use('/productos', passport.authenticate('jwt', { failureRedirect: '/unauthorized', failureMessage: true }), productsRouter);

router.use('/carrito', passport.authenticate('jwt', { failureRedirect: '/unauthorized', failureMessage: true }), cartsRouter);

router.use('/chat', passport.authenticate('jwt', { failureRedirect: '/unauthorized', failureMessage: true }), chatsRouter);

router.use('/', authRouter);

router.use('/orden', passport.authenticate('jwt', { failureRedirect: '/unauthorized', failureMessage: true }), ordersRouter);

export default router;