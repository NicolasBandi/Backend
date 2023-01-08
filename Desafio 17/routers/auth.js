import { Router } from "express"
import passport from "passport"

import logger from '../utils/logger.js'
import sendMail from '../utils/nodemailer.js'
import UserModel from '../models/user.js'
import { createCart } from "./carrito.js"

const router = Router();

let products = [];

router.post('/sign-in', passport.authenticate('sign-in', {
    failureRedirect: 'fail-sign-in',
}), async (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);
    res.redirect('/');
})
  
router.post('/sign-up', passport.authenticate('sign-up', {
    failureRedirect: 'fail-sign-up'
}), async (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo POST`);

    let cartId = await createCart(products);
    
    const { user } = req

    sendMail('Nuevo registro', JSON.stringify(user));

    await UserModel.updateOne({ _id: user._id }, { cart: cartId });

    res.redirect('/');
})
  
router.get('/sign-out', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.render('session-expired', { layout: 'main'});
        return;
    }

    const { user } = req

    req.logout((error) => {
        if (error) {
            return next(error)
        }
        logger.info(`Ruta ${req.originalUrl} metodo GET`);
        res.render('logout', { layout: 'main' , email: user.email});
    })
})

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).send('');
        return;
    }
    const { user } = req;

    const userObj = JSON.parse(JSON.stringify(user));
    
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    // res.status(200).send(user.email);
    res.status(200).send(userObj);
})

router.get('/login', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('login', { layout: 'main' });
})

router.get('/register', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('register', { layout: 'main' });
})

router.get('/fail-sign-in', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('login-error', { layout: 'main' });
})

router.get('/fail-sign-up', (req, res) => {
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('register-error', { layout: 'main' });
})

export default router;