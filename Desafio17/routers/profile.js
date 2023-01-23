import { Router } from "express";

import logger from '../utils/logger.js'

const router = Router();

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('session-expired', { layout: 'main'});
        return;
    }

    const { user } = req;

    const profile = {
        email: user.email,
        name: user.name,
        adress: user.adress,
        age: user.age,
        tel: user.tel,
        img: user.img,
    }

    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.render('profile', { layout: 'main' , user: profile});
})

export default router;