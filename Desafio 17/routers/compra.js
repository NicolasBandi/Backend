import { Router } from "express";

import logger from '../utils/logger.js'
import UserModel from '../models/user.js'
import sendMail from "../utils/nodemailer.js";
import sendWhatsapp from "../utils/twilio.js";

const router = Router();

router.get('/', async (req, res) => {
    if (!req.isAuthenticated()) {
        res.render('session-expired', { layout: 'main'});
        return;
    }

    const { user } = req;

    const userPopulated = await UserModel.findOne({ _id: user._id }).populate('cart');
    
    sendMail(`Nuevo pedido de ${userPopulated.name} ${userPopulated.email}`, JSON.stringify(userPopulated.cart.productos));
    sendWhatsapp(`Su pedido ha sido recibido y se encuentra en proceso.`, userPopulated.tel);

    logger.info(`Ruta ${req.originalUrl} metodo GET`);

    res.send(userPopulated.cart.productos);
})

export default router;